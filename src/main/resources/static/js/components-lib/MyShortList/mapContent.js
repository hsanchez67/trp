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
    zIndex: 1000000000000000
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
        window.location.href = '/profile/' + this.props.username;
    },
    render: function render() {
        var style = this.props.$hover ? markerStyleHover : markerStyle;
        return React.createElement(
            'div',
            { id: this.props.id, 'data-toggle': 'popover', 'data-title': this.props.text,
                'data-trigger': 'hover', 'data-placement': 'top',
                'data-content': 'Click picture to see profile!' },
            React.createElement('img', { src: this.props.url, onClick: this._gotoProfile, style: style })
        );
    }
});

var MapView = React.createClass({
    displayName: 'MapView',

    propTypes: {
        lat: React.PropTypes.number,
        lng: React.PropTypes.number,
        data: React.PropTypes.any
    },
    getDefaultProps: function getDefaultProps() {
        return {
            zoom: 12
        };
    },
    render: function render() {
        console.log('Inside Map View: ' + this.props.lat + ', ' + this.props.lng);
        var Markers = [];
        if ($.isEmptyObject(this.props.data)) {
            console.log('no map');
            return false;
        } else {
            var createMarker = function createMarker(marker) {
                return React.createElement(Marker, { key: marker.id, id: marker.id, lat: marker.lat, lng: marker.lng,
                    url: '/api/remoteFiles/view/' + marker.avatar, text: marker.firstName + ' ' + marker.lastName,
                    username: marker.id });
            };
            this.props.data.forEach(function (marker) {
                Markers.push(createMarker(marker));
            });
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

var MapContent = React.createClass({
    displayName: 'MapContent',
    getInitialState: function getInitialState() {
        return {
            data: [],
            markers: [],
            avatar: '01b41398-ba97-462f-b769-c02f327c8a7d',
            avatarUrl: '/api/remoteFiles/view/01b41398-ba97-462f-b769-c02f327c8a7d',
            mapCoordinates: {
                lat: 38.7447724,
                lng: -121.1939505
            }
        };
    },
    getMarkers: function getMarkers(searchTerm) {
        console.log(searchTerm);
        $.ajax({
            type: "POST",
            url: "/getMarkers",
            data: searchTerm,
            success: (function success(result) {
                if ($.isEmptyObject(result)) {
                    console.log("No marker results");
                    this.setState({
                        markers: [],
                        mapCoordinates: {
                            lat: 38.7447724,
                            lng: -121.1939505
                        }
                    });
                    return null;
                }
                this.setState({
                    filteredConsumers: result.markers,
                    markers: result.markers,
                    mapCoordinates: {
                        lat: result.lat,
                        lng: result.lng
                    }
                });
            }).bind(this),
            error: function error(_error) {
                console.log('Error: ' + _error);
                return false;
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'tab-pane fade', id: 'map-content' },
            React.createElement(
                'div',
                { className: 'simple-map' },
                React.createElement(MapView, { lat: this.state.mapCoordinates.lat,
                    lng: this.state.mapCoordinates.lng, url: this.state.avatarUrl,
                    data: this.state.markers })
            )
        );
    }
});