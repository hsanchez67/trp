const K_WIDTH = 40;
const K_HEIGHT = 40;

const K_SIZE = 40;

const markerStyle = {
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

const markerStyleHover = {
    ...markerStyle,
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    zIndex: 1000000000000000,
    fontSize: '12px'
};


var Marker =  React.createClass({
    propTypes: {
        $hover: React.PropTypes.bool,
        text: React.PropTypes.string
    },
    componentDidMount: function() {
        $("[data-toggle=popover]").popover();
    },
    _gotoProfile: function() {
        var address = this.props.profile.businessAddress1+"+"+this.props.profile.businessCity+"+"+this.props.profile.businessState+"+"+this.props.profile.businessZip;
       // window.location.href = 'http://maps.google.com/?q='+address;
        window.open(
            'https://maps.google.com/?q='+address,
            '_blank' //
        );
    },
    render: function() {
        const style = this.props.$hover ? markerStyleHover : markerStyle;
        return (
            <div id={this.props.id} data-toggle="popover" data-title={this.props.text}
                 data-trigger="hover" data-placement="top"
                 data-content="Full map!">
                <img src={this.props.url} onClick={this._gotoProfile} style={style} />
            </div>
        );
    }
});

var MapView = React.createClass({
    propTypes: {
        lat: React.PropTypes.number,
        lng: React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
            zoom: 15
        };
    },
    getInitialState: function() {
        return {
            profile: [],
            mapCoordinates: {
                lat: this.props.lat,
                lng: this.props.lng
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        console.log('MapView:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - " + this.props.profile.id);
        if (nextProps.profile.id != this.props.profile.id) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function (props) {
        if (!$.isEmptyObject(props.profile)) {
            if (props.profile.lat == undefined || props.profile.lat == "" || props.profile.lng == undefined || props.profile.lng == "") {
                var data = {
                    id: props.profile.id
                }
                var formData = JSON.stringify(data, null, ' ');
                console.log("Get Marker:")
                console.log(formData);
                $.ajax({
                    type: "POST",
                    url: "/getMarker",
                    async: true,
                    data: formData,
                    success: function (result) {
                        console.log(result)
                        this.setState({
                            profile: result,
                            mapCoordinates: { lat: result.lat, lng: result.lng}
                        });
                    }.bind(this),
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
    render() {
        console.log('Inside Map View: '+this.state.profile.lat+', '+this.state.profile.lng);
        const Markers = [];
        if ($.isEmptyObject(this.state.profile) || this.state.profile.businessAddress1 == undefined || this.state.profile.businessCity == undefined || this.state.profile.lat == undefined || this.state.profile.lng == undefined) {
            console.log('no map yet');
            return(
                false
            );
        } else {
            var createMarker = function(marker) {
                return  <Marker key={marker.id} id={marker.id} lat={marker.lat} lng={marker.lng}
                                url={'/api/remoteFiles/view/'+marker.avatar} text={marker.firstName+' '+marker.lastName}
                                username={marker.id} profile={marker} />;
            };
            Markers.push(createMarker(this.state.profile))
        }
        return(
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY'
                }}
                center={[this.props.lat, this.props.lng]}
                zoom={this.props.zoom}
                hoverDistance={K_SIZE}>
                {Markers}
            </GoogleMapReact>
        );
    }

});