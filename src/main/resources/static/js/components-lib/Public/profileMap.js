'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var K_WIDTH = 40;
var K_HEIGHT = 40;

var K_SIZE = 40;

var markerStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    borderRadius: K_HEIGHT,
    cursor: 'pointer',
    zIndex: 0
};

var markerStyleHover = _extends({}, markerStyle, {
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    zIndex: 1000000000000000,
    fontSize: '12px'
});

var Marker = React.createClass({
    displayName: 'Marker',

    propTypes: {
        $hover: React.PropTypes.bool,
        text: React.PropTypes.string
    },
    componentDidMount: function componentDidMount() {
        $("[data-toggle=popover]").popover();
    },
    _gotoProfile: function _gotoProfile() {
        var address = this.props.profile.businessAddress1 + "+" + this.props.profile.businessCity + "+" + this.props.profile.businessState + "+" + this.props.profile.businessZip;
        // window.location.href = 'http://maps.google.com/?q='+address;
        window.open('https://maps.google.com/?q=' + address, '_blank' //
        );
    },
    render: function render() {
        var style = this.props.$hover ? markerStyleHover : markerStyle;
        return React.createElement(
            'div',
            { id: this.props.id, 'data-toggle': 'popover', 'data-title': this.props.text,
                'data-trigger': 'hover', 'data-placement': 'top',
                'data-content': 'Full map!' },
            React.createElement('img', { src: this.props.url, onClick: this._gotoProfile, style: style })
        );
    }
});

var MapView = React.createClass({
    displayName: 'MapView',

    propTypes: {
        lat: React.PropTypes.number,
        lng: React.PropTypes.number
    },
    getDefaultProps: function getDefaultProps() {
        return {
            zoom: 15
        };
    },
    getInitialState: function getInitialState() {
        return {
            profile: [],
            mapCoordinates: {
                lat: this.props.lat,
                lng: this.props.lng
            }
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log('MapView:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - " + this.props.profile.id);
        if (nextProps.profile.id != this.props.profile.id) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function prepareComponentState(props) {
        if (!$.isEmptyObject(props.profile)) {
            if (props.profile.lat == undefined || props.profile.lat == "" || props.profile.lng == undefined || props.profile.lng == "") {
                var data = {
                    id: props.profile.id
                };
                var formData = JSON.stringify(data, null, ' ');
                console.log("Get Marker:");
                console.log(formData);
                $.ajax({
                    type: "POST",
                    url: "/getMarker",
                    async: true,
                    data: formData,
                    success: (function (result) {
                        console.log(result);
                        this.setState({
                            profile: result,
                            mapCoordinates: { lat: result.lat, lng: result.lng }
                        });
                    }).bind(this),
                    dataType: "json",
                    contentType: "application/json"
                });
            } else {
                this.setState({
                    profile: props.profile
                });
            }
        }
    },
    render: function render() {
        console.log('Inside Map View: ' + this.state.profile.lat + ', ' + this.state.profile.lng);
        var Markers = [];
        if ($.isEmptyObject(this.state.profile) || this.state.profile.businessAddress1 == undefined || this.state.profile.businessCity == undefined || this.state.profile.lat == undefined || this.state.profile.lng == undefined) {
            console.log('no map yet');
            return false;
        } else {
            var createMarker = function createMarker(marker) {
                return React.createElement(Marker, { key: marker.id, id: marker.id, lat: marker.lat, lng: marker.lng,
                    url: '/api/remoteFiles/view/' + marker.avatar, text: marker.firstName + ' ' + marker.lastName,
                    username: marker.id, profile: marker });
            };
            Markers.push(createMarker(this.state.profile));
        }
        return React.createElement(
            GoogleMapReact,
            {
                bootstrapURLKeys: {
                    key: 'AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY'
                },
                center: [this.props.lat, this.props.lng],
                zoom: this.props.zoom,
                hoverDistance: K_SIZE },
            Markers
        );
    }

});