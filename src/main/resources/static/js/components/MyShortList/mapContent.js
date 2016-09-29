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
    zIndex: 1000000000000000
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
        window.location.href = '/profile/'+this.props.username;
    },
    render: function() {
        const style = this.props.$hover ? markerStyleHover : markerStyle;
        return (
            <div id={this.props.id} data-toggle="popover" data-title={this.props.text}
                 data-trigger="hover" data-placement="top"
                 data-content="Click picture to see profile!">
                <img src={this.props.url} onClick={this._gotoProfile} style={style} />
            </div>
        );
    }
});

var MapView = React.createClass({
    propTypes: {
        lat: React.PropTypes.number,
        lng: React.PropTypes.number,
        data: React.PropTypes.any
    },
    getDefaultProps: function() {
        return {
            zoom: 12
        };
    },
    render() {
        console.log('Inside Map View: '+this.props.lat+', '+this.props.lng);
        const Markers = [];
        if ($.isEmptyObject(this.props.data)) {
            console.log('no map');
            return(
                false
            );
        } else {
            var createMarker = function(marker) {
                return  <Marker key={marker.id} id={marker.id} lat={marker.lat} lng={marker.lng}
                                url={'/api/remoteFiles/view/'+marker.avatar} text={marker.firstName+' '+marker.lastName}
                                username={marker.id} />;
            };
            this.props.data.forEach(function (marker) {
                Markers.push(createMarker(marker))
            });
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

var MapContent = React.createClass({
    displayName: 'MapContent',
    getInitialState: function () {
        return {
            data: [],
            markers: [],
            avatar: '01b41398-ba97-462f-b769-c02f327c8a7d',
            avatarUrl: '/api/remoteFiles/view/01b41398-ba97-462f-b769-c02f327c8a7d',
            mapCoordinates: {
                lat: 38.7447724,
                lng: -121.1939505
            },
        };
    },
    getMarkers: function(searchTerm) {
        console.log(searchTerm);
        $.ajax({
            type: "POST",
            url: "/getMarkers",
            data: searchTerm,
            success: function success(result) {
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
                })
            }.bind(this),
            error: function (error) {
                console.log('Error: '+ error);
                return false;
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    render: function () {
        return (
            <div className="tab-pane fade" id="map-content">
                <div className="simple-map">
                    <MapView lat={this.state.mapCoordinates.lat}
                             lng={this.state.mapCoordinates.lng} url={this.state.avatarUrl}
                             data={this.state.markers}/>
                </div>
            </div>
        );
    }
});