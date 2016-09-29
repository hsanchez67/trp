var selectResponsive2 = {
    width: '100%'
};

var SearchBox = React.createClass({
    getInitialState: function() {
        return {
            groupList: [],
            networkList: []
        };
    },
    doSearch: function() {
        var queryName = this.refs.searchName.value;
        var queryProfession = $("#searchProfessionSelect :selected").text();
        if(queryProfession == "Profession") queryProfession = "";
        var queryLocation = this.refs.searchLocation.value;
        var queryNetwork = this.refs.searchNetwork.value;
        var sort = this.refs.orderBy.value;
        var page = 0;
        this.props.doSearch(queryName, queryProfession, queryLocation, queryNetwork, sort, page);
    },
    doSearchByScore: function() {
        this.refs.orderBy.value = 'score';
        var queryName = this.refs.searchName.value;
        var queryProfession = $("#searchProfessionSelect :selected").text();
        if(queryProfession == "Profession") queryProfession = "";
        var queryLocation = this.refs.searchLocation.value;
        var queryNetwork = this.refs.searchNetwork.value;
        var sort = this.refs.orderBy.value;
        console.log(sort);
        var page = 0;
        this.props.doSearch(queryName, queryProfession, queryLocation, queryNetwork, sort, page);
    },
    doSearchByName: function() {
        this.refs.orderBy.value = 'lastName';
        var queryName = this.refs.searchName.value;
        var queryProfession = $("#searchProfessionSelect :selected").text();
        if(queryProfession == "Profession") queryProfession = "";
        var queryLocation = this.refs.searchLocation.value;
        var queryNetwork = this.refs.searchNetwork.value;
        var sort = this.refs.orderBy.value;
        console.log(sort);
        var page = 0;
        this.props.doSearch(queryName, queryProfession, queryLocation, queryNetwork, sort, page);
    },
    doClear: function(){
        this.refs.searchName.value = '';
        this.refs.searchProfession.value = '';
        this.refs.searchLocation.value = '';
        this.refs.searchNetwork.value = '';
        $("#searchProfessionSelect").select2("val", "");
        var queryName = '';
        var queryProfession = '';
        var queryLocation = '';
        var queryNetwork = '';
        this.props.doSearch(queryName, queryProfession, queryLocation, queryNetwork, '', 0);
    },
    onToggle: function () {
        this.props.onToggle($("#checkAll").prop('checked'));
    },
    componentDidMount: function() {
        var input = document.getElementById('searchLocation');
        var options = {
            types: ['(cities)'],
            componentRestrictions: {country: 'us'}
        };
        new google.maps.places.Autocomplete(input, options);

        $("#searchProfessionSelect").select2({
            minimumInputLength: 3,
            ajax: {
                url: "/searchProfession",
                method: 'POST',
                dataType: 'json',
                contentType : "application/json",
                delay: 250,
                data: function (params) {
                    return {
                        search: params.term // search term
                    };
                },
                processResults: function (data, params) {
                    if (!$.isEmptyObject(data) && data != undefined ) {
                        var select2Data = $.map(data._embedded.professionDTOList, function (obj) {
                        //    obj.id = obj.text;
                            obj.text = obj.title;
                            return obj;
                        });
                        return {
                            results: select2Data
                        };
                    } else {
                        return false;
                    }
                }
            },
            escapeMarkup:function(t) { return t; }, // let our custom formatter work
            templateResult: formatAjaxResponse, // omitted for brevity, see the source of this page
            templateSelection: formatAjaxSelection // omitted for brevity, see the source of this page
        });
        function formatAjaxResponse (data){
            var markup = '<div class="clearfix">' +
                '<div class="col-sm-12 cursor text-left">' +
                '<div id="'+data.text+'">' + data.title +
                '</div>' +
                '</div>';
            return markup;
        }
        function formatAjaxSelection (data) {
            $("#searchProfession").val(data.title);
            return data.title || data.text;
        }
        this.getNetworkList();
        this.getGroupList();
    },
    getGroupList: function() {
        var data = {
            id: $('#id').val()
        };
        data = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getGroupTagsList",
            data: data,
            success: function (result) {
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        groupList: result.groupList
                    });
                }
            }.bind(this),
            error: function (error) {
                console.log("error: " + error.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    getNetworkList: function() {
        console.log("SearchBox:getNetworkList:")
        var data = {
            id: $('#id').val()
        };
        data = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getNetworkList",
            data: data,
            success: function (result) {
                console.log(result);
                if (!$.isEmptyObject(result) && result.networkList != null) {
                    this.setState({
                        networkList: result.networkList
                    });
                }
            }.bind(this),
            error: function (error) {
                console.log("error: " + error.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    render: function() {
        var shortlistEntry = <NetworksListEntry name="Your Short List"  id="shortlist" />;
        var NetworksList = this.state.networkList.map(function (net) {
            return (
                <NetworksListEntry key={net.id} name={net.name} id={'my-network-'+net.id} />
            );
        }.bind(this));
        this.state.groupList.map(function (tag) {
            return (
                NetworksList.unshift(<NetworksListEntry key={tag.id} name={tag.name} id={tag.id} selected={this.state.groupName} />)
            );
        }.bind(this));
        NetworksList.unshift(shortlistEntry);
        return (
            <section className="panel">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <form>
                                <div className="form-group text-left">
                                    <label className="control-label">Name</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                        <input type="text" className="form-control" ref="searchName" placeholder="Name" />
                                    </div>
                                </div>
                                <div className="form-group text-left">
                                    <label className="control-label">Profession</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-briefcase"></i></span>
                                        <select id="searchProfessionSelect" className="form-control js-example-placeholder-single searchProfession" style={selectResponsive2} ref="searchProfession">
                                            <option value="" selected="selected">Profession</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group text-left">
                                    <label className="control-label">Location</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-location-arrow"></i></span>
                                        <input type="text" className="form-control" id="searchLocation" ref="searchLocation" placeholder="Location" style={selectResponsive2} />
                                    </div>
                                </div>
                                <div className="form-group text-left">
                                    <label className="control-label" >Network</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-users"></i></span>
                                        <select className="form-control" id="searchNetwork" ref="searchNetwork" style={selectResponsive2}>
                                            <option value="" selected="selected"></option>
                                            {NetworksList}
                                        </select>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-default btn-primary" onClick={this.doSearch} >
                                    <i id="send-intro-icon" className="fa fa-search "></i>&nbsp;
                                    Search
                                </button>&nbsp;&nbsp;
                                <button type="button" className="btn btn-default" onClick={this.doClear}>Clear</button>

                                <div className="row margin-top-50">
                                    <div className="col-xs-6 col-md-6">
                                        <div id="check-all-container" className="checkbox text-left">
                                            <label>
                                                <input className="check" ref="checkAll" id="checkAll" onClick={this.onToggle}  value="Check All" type="checkbox"/> Select All
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-md-6">
                                        <div className="text-right">
                                            Order By <a className="pointer" onClick={this.doSearchByName}>Name</a>&nbsp;|&nbsp;<a className="pointer" onClick={this.doSearchByScore}>Score</a>
                                         </div>
                                    </div>
                                </div>
                                <input type="hidden" ref="orderBy" value="score" />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

var NetworksListEntry = React.createClass({
    render: function() {
        return (
            <option value={this.props.id}>{this.props.name}</option>
        );
    }
});

var Result = React.createClass({
    showInMap: function() {
        console.log(this.props.id);
        this.setMapCenter(this.props.id);
    },
    setMapCenter: function(key) {
        var source =  '/api/users/'+key;
        $.get(source, (function (result) {
         //   console.log(result);
            if ($.isEmptyObject(result)) {
                return null;
            } else {
                var data = result;
           //     console.log('setMapCenter at: ' + data.lat + ', '+ data.lng);
            }
        }).bind(this));
    },
    reCenter: function() {
       // console.log('leave');
    },
    render:function() {
        var leadParagraph = '';
        if (this.props.user.leadParagraph != null && this.props.user.leadParagraph != "") {
            leadParagraph = this.props.user.leadParagraph;
            var maxLength = 180;
            var trimmedString = leadParagraph.substr(0, maxLength);
            var length = leadParagraph.length;
            if (length > maxLength) {
                console.log(trimmedString);
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
                console.log(trimmedString);
                leadParagraph = trimmedString.concat("...");
                console.log(leadParagraph);
            }
        }
        return (
            <div className={this.props.count%2===0 ? 'row resultInstant' : 'row resultInstantGrey'}>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center vert-align">
                    <div className='checkbox'>
                        <label>
                            <input className="check" type="checkbox" id={'check-' + this.props.id} name={'check-'+ this.props.id} value={this.props.id} aria-label='...' />
                        </label>
                    </div>
                    <ul className="source">
                        <Avatar id={this.props.id} username={this.props.avatar} name={this.props.firstName + ' ' + this.props.lastName} className="task-thumb" />
                    </ul>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-left">
                    <input type="hidden" class="id-input" name={"id-"+this.props.id} id={"id-"+this.props.id}  value={this.props.id} />
                    <input type="hidden" class="email-input" name={"email-"+this.props.id} id={"email-"+this.props.id}  value={this.props.email} />
                    <input type="hidden" class="firstName-input" name={"firstName-"+this.props.id} id={"firstName-"+this.props.id}  value={this.props.firstName} />
                    <input type="hidden" class="lastName-input" name={"lastName-"+this.props.id} id={"lastName-"+this.props.id}  value={this.props.lastName} />
                    <strong>{this.props.firstName} {this.props.lastName}</strong><br />
                    {this.props.profession}<br />
                    {this.props.business}<br />
                    {this.props.city}, {this.props.state}<br />
                    <a href={'/introduction/' +this.props.id} role="button" className="btn btn-xs btn-primary">
                        <i className="fa fa-share-alt" title={'Introduce ' + this.props.firstName} aria-hidden="true"></i>
                        <span className="sr-only">Introduce {this.props.firstName}</span>
                    </a>
                    <a href={'/referral/' +this.props.id} role="button" className="btn btn-xs btn-primary">
                        <i className="fa fa-arrow-right" title={'Refer ' + this.props.firstName} aria-hidden="true"></i>
                        <span className="sr-only">Refer {this.props.firstName}</span>
                    </a>
                    <a href={'/profile/' +this.props.id} role="button" className="btn btn-xs btn-primary">
                        <i className="fa fa-user" title={'View ' + this.props.firstName + ' profile'} aria-hidden="true"></i>
                        <span className="sr-only">View {this.props.firstName}'s profile</span>
                    </a>
                </div>
                <div className="ol-lg-5 col-md-5 col-sm-5 hidden-xs text-left">
                    {leadParagraph}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-center">
                    <div className="canvas-score">
                        <ScoreChartSearch avatar={this.props.avatar} score={this.props.score} count={this.props.count} />
                    </div>
                </div>
            </div>);
    }
});


var SearchResults = React.createClass({
    componentDidUpdate: function() {
        console.log("componentDidUpdate: " + this.props.selectAll);
        var checkAll = this.props.selectAll;
        var $entries = $("#myTabContent");
        $entries.each(function(i, entry) {
            $(entry).find(':input:checkbox').each(function(){
                $(this).prop('checked', checkAll);
            })
        });
        // drag & drop
        $(".source li").draggable({
            addClasses: false,
            appendTo: "body",
            helper: "clone"
        });
    },
    render:function() {
        if ($.isEmptyObject(this.props.data)) {
            return <div className="no-entries">No results!</div>;
        } else {
            var users = [];
            var count = 0;
            var selectAll = this.props.selectAll;
            this.props.data.forEach(function (user) {
                users.push(<Result key={user.id} id={user.id} avatar={user.avatar} firstName={user.firstName}
                                       lastName={user.lastName} email={user.email} profession={user.profession} business={user.businessName}
                                       city={user.businessCity} state={user.businessState} user={user}
                                       score={user.score} count={count++} selectAll={selectAll} />)
            });
            return (
                <div>{users}</div>
            );
        }
    }
});

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

var SendingReviewRequestModal = React.createClass({
    render(){
        return (
            <div id="sendingReviewRequestModal" className="modal fade" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title">Your review request are being created.</h4>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                <i className="fa fa-5x fa-cog fa-spin"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var SearchContent = React.createClass({
    displayName: 'Search Content',
    doSearchForAnSpecificName: function(queryName) {
        $.ajax({
            url: '/userSearch',
            dataType: 'json',
            type: 'POST',
            data: 'search='+queryName,
            success: function(data) {
                console.log("doSearchForAnSpecificName:");
                console.log(data);
                console.log(this.state.filteredConsumers);
                if ($.isEmptyObject(data)) {
                    this.setState({
                        filteredConsumers: []
                    });
                    return null;
                } else {
                    console.log(data);
                }
                this.setState({
                    filteredConsumers: data._embedded.userDTOList
                });
                $("#paginator" ).empty();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    doSearch: function(queryName, queryProfession, queryLocation, queryNetwork, sort, page) {
        if (!queryName && !queryProfession && !queryLocation && !queryNetwork) {
            this.setState({
                filteredConsumers: [],
                markers: []
            });
            $("#paginator" ).empty();
            return null;
        }
        console.log("Query Elements: " + queryName+' '+queryProfession+' '+queryLocation+' '+queryNetwork+' '+page);
        if (queryLocation == '' && queryProfession == '' && queryName != '' && queryNetwork == '') {
            var name = queryName.split(" ");
            console.log (name);
            if (name.length > 1) {
                this.doSearchForAnSpecificName(queryName);
                return null;
            }
        }
        if (queryName != '' && (queryLocation != '' || queryProfession != '' || queryNetwork != '')) {
            var name = queryName.split(" ");
            if (name.length > 1) {
                queryName = $.trim(name[1]);
            }
        }
        var city = '';
        var state = '';
        if (queryLocation != '') {
            var location = queryLocation.split(",");
            city = location[0];
            state = $.trim(location[1]);
        }
        var originalQueryName = queryName + "%";
        var originalQueryProfession = queryProfession;
        var originalLocationCity = city;
        var originalLocationState = state;
        var originalQueryNetwork  = queryNetwork;
        if (originalQueryProfession == "") originalQueryProfession = "%";
        if (originalLocationCity == "") originalLocationCity = "%";
        if (originalLocationState == "") originalLocationState = "%";
        queryName = queryName + "%25";
        if (queryProfession == "") queryProfession = "%25";
        if (city == "") city = "%25";
        if (state == "") state = "%25";
        var networkType = "networkid";
        var visible = '1,0';
        console.log(queryNetwork.substring(0, 11));
        if (queryNetwork == "") {
            queryNetwork = "%25";
            visible = '1';
        } else {
            if (queryNetwork.substring(0, 11) == 'my-network-') {
                queryNetwork = queryNetwork.substring(11, queryNetwork.length);
                networkType = "networkid";
            } else if (queryNetwork == 'shortlist') {
                queryNetwork = $('#id').val();
                networkType = "shortlistid";
            } else {
                networkType = "tagid";
            }
        }

        var source = '/api/users/search/findUsers?sort=score,desc&size=10&name=' + queryName  + '&profession=' + queryProfession + '&city=' + city + '&state=' + state + '&' + networkType + '=' + queryNetwork + '&visible' + '=' + visible + '&page=' + page;
        if (sort == 'lastName') {
            source = '/api/users/search/findUsers?sort=lastName,desc&size=10&name=' + queryName  + '&profession=' + queryProfession + '&city=' + city + '&state=' + state + '&' + networkType + '=' + queryNetwork + '&visible' + '=' + visible + '&page=' + page;
        }
        console.log(source);
        $("#paginator" ).empty();
        $.get(source, (function (result) {
            console.log(result);
            if ($.contains(result, '<!DOCTYPE html>')) {
                window.location = '/search';
            } else if (result.page.totalElements == 0) {
                console.log("No results");
                this.setState({
                    filteredConsumers: []
                });
                return null;
            } else {
                console.log("doSearch:");
                console.log(result);
                console.log(this.state.filteredConsumers);
            }
            this.setState({
                filteredConsumers: result._embedded.users
            });
            console.log(result.page.number + ' ' + result.page.totalPages);
            var currentPage = result.page.number;
            var totalPages = result.page.totalPages;
            var options = {
                currentPage: currentPage+1,
                totalPages: totalPages,
                size: 'normal',
                alignment: 'center',
                onPageClicked: function(e, originalEvent,type,page) {
                    console.log(page);
                    this.doSearch(queryName, queryProfession, queryLocation, originalQueryNetwork, sort, page-1);
                }.bind(this),
            /*    pageUrl: function(type, page, current) {
                    return '/api/users/search/findUsers?sort='+sort+',desc&size=10&name=' + queryName + '&profession=' + queryProfession + '&city=' + city + '&state=' + state + '&page=' + page;
                }, */
                itemTexts: function (type, page, current) {
                    switch (type) {
                        case "first":
                            return "First";
                        case "prev":
                            return "Previous";
                        case "next":
                            return "Next";
                        case "last":
                            return "Last";
                        case "page":
                            return page;
                    }
                }
            }
            $('#paginator').bootstrapPaginator(options);
        }).bind(this));
      //  this.getMarkers(JSON.stringify({"name": originalQueryName, "profession": originalQueryProfession, "city": originalLocationCity, "state": originalLocationState}));
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
    getInitialState: function() {
        return {
            queryName:'',
            queryProfession:'',
            queryLocation:'',
            filteredConsumers: [],
            markers: [],
            avatar: '01b41398-ba97-462f-b769-c02f327c8a7d',
            avatarUrl: '/api/remoteFiles/view/01b41398-ba97-462f-b769-c02f327c8a7d',
            score: '8.1',
            mapCoordinates: {
                lat: 38.7447724,
                lng: -121.1939505
            },
            selectAll: false,
            contacts: [],
            view: {showModal: false, showGroupsModal: false},
            review: false
        };
    },
    handleMessageClick: function (m) {
        console.log("Message: " + m);
    },
    onChildToggle: function(selected) {
        console.log(selected);
        this.setState({
            selectAll: selected
        });
    },
    addToShortlist: function() {
        this.addToDefaultGroup('shortlist');
    },
    addToGroup: function() {
        this.addToDefaultGroup('defaultGroup');
    },
    addToMyNetwork: function() {
        var contacts = this.createListOfCheckedUsers();
        if (contacts.length == 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> No contacts selected, please try again!</label></div>";
            $("#content-results").fadeTo(4000, 500).slideUp(500, function(){
                $("#content-results").alert('close');
                document.getElementById("content-results").innerHTML = "";
            });
            return false;
        } else {
            var data = {
                id: $('#id').val(),
                groupId: 'my-network',
                users: contacts
            }
            data = JSON.stringify(data, null, ' ');
            console.log(data);
            $.ajax({
                type: "POST",
                url: "/addToShortList",
                data: data,
                success: function (result) {
                    console.log(result);
                    this.setState({
                        selectAll: false
                    });
                    document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> You successfully added contacts to your Network!</label></div>";
                    $("#content-results").alert();
                    $("#content-results").fadeTo(4000, 500).slideUp(500, function () {
                        $("#content-results").alert('close');
                        document.getElementById("content-results").innerHTML = "";
                    });
                }.bind(this),
                error: function (error) {
                    console.log("error: " + error.toString());
                    document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> Something went wrong, please try again!</label></div>";
                    $("#content-results").alert();
                    $("#content-results").fadeTo(4000, 500).slideUp(500, function () {
                        $("#content-results").alert('close');
                        document.getElementById("content-results").innerHTML = "";
                    });
                },
                dataType: "json",
                contentType: "application/json"
            });
        }
    },
    addToDefaultGroup: function(group) {
        var contacts = this.createListOfCheckedUsers();
        if (contacts.length == 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> No contacts selected, please try again!</label></div>";
            $("#content-results").fadeTo(4000, 500).slideUp(500, function(){
                $("#content-results").alert('close');
                document.getElementById("content-results").innerHTML = "";
            });
            return false;
        } else {
            this.handleAddUsersToCurrentGroup(contacts);
        }
    },
    createListOfCheckedUsers: function() {
        $.fn.serializeObject = function()
        {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
        var contacts = [];
        var dataList = [];
        var $entries = $("#myTabContent");
        $entries.each(function(i, entry) {
            console.log($(entry).find(':input:checkbox').prop('checked'));
            $(entry).find(':input:checkbox').each(function(){
                if ($(this).prop('checked')==true){
                    dataList.push(JSON.stringify($(entry).serializeObject()));
                    console.log($(this).val());
                    var id = $(this).val();
                    var contact = {
                        'id': $(entry).find('#id-'+id).val(),
                    };
                    contacts.push(contact);
                }
            });
        });
        console.log(dataList);
        console.log(contacts);
        return contacts;
    },
    handleAddUsersToCurrentGroup: function (users) {
        this.props.handleAddUsersToCurrentGroup(users);
    },
    sendMessage: function() {
        $.fn.serializeObject = function()
        {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
        var contacts = [];
        var dataList = [];
        var $entries = $("#myTabContent");
        $entries.each(function(i, entry) {
            console.log($(entry).find(':input:checkbox').prop('checked'));
            $(entry).find(':input:checkbox').each(function(){
                if ($(this).prop('checked')==true){
                    dataList.push(JSON.stringify($(entry).serializeObject()));
                    console.log($(this).val());
                    var id = $(this).val();
                    var contact = {
                        'id': $(entry).find('#id-'+id).val(),
                        'email': $(entry).find('#email-'+id).val(),
                        'firstName': $(entry).find('#firstName-'+id).val(),
                        'lastName': $(entry).find('#lastName-'+id).val()
                    };
                    contacts.push(contact);
                }
            });
        });
        console.log(dataList);
        console.log(contacts);
        if (contacts.length == 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> No contacts selected, please try again!</label></div>";
            $("#content-results").fadeTo(4000, 500).slideUp(500, function(){
                $("#content-results").alert('close');
                document.getElementById("content-results").innerHTML = "";
            });
            return false;
        } else {
            this.setState({
                contacts: contacts,
                view: {showModal: true}
            });
        }
    },
    reviewRequest: function() {
        $.fn.serializeObject = function()
        {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
        var contacts = [];
        var dataList = [];
        var $entries = $("#myTabContent");
        $entries.each(function(i, entry) {
            console.log($(entry).find(':input:checkbox').prop('checked'));
            $(entry).find(':input:checkbox').each(function(){
                if ($(this).prop('checked')==true){
                    dataList.push(JSON.stringify($(entry).serializeObject()));
                    console.log($(this).val());
                    var id = $(this).val();
                    var contact = {
                        'id': $(entry).find('#id-'+id).val(),
                        'email': $(entry).find('#email-'+id).val(),
                        'firstName': $(entry).find('#firstName-'+id).val(),
                        'lastName': $(entry).find('#lastName-'+id).val()
                    };
                    contacts.push(contact);
                }
            });
        });
        console.log(dataList);
        console.log(contacts);
        if (contacts.length == 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> No contacts selected, please try again!</label></div>";
            $("#content-results").fadeTo(4000, 500).slideUp(500, function(){
                $("#content-results").alert('close');
                document.getElementById("content-results").innerHTML = "";
            });
            return false;
        } else {
            this.setState({
                contacts: contacts
                // Set this is sending the Review Request myself from sendMessageModal.js
                // view: {showModal: true},
                // review: true
            });
            var data = this.getFormData();
            data.users = contacts;
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            var results = [];
            $("#sendingReviewRequestModal").modal('show');
            $.ajax({
                type: "POST",
                url: "/scheduleReviewRequest",
                async: true,
                data: formData,
                success: function (result) {
                    console.log("Inside Success");
                    $("#sendingReviewRequestModal").delay(3000).modal('hide');
                    $("#sendingModal").modal('hide');
                    results = result;
                    console.log(results);
                    this.handleReviewsResults(results.users.length);
                    $("#closeButton").trigger('click');
                }.bind(this),
                error: function (error) {
                    $("#sendingReviewRequestModal").modal('show');
                    console.log('Send review request error message');
                    document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> Something went wrong, please try again!</label></div>";
                    $("#content-results").fadeTo(4000, 500).slideUp(500, function () {
                        $("#content-results").alert('close');
                        document.getElementById("content-results").innerHTML = "";
                    });
                },
                dataType: "json",
                contentType: "application/json"
            });
        }
    },
    getFormData: function () {
        return {
            id:  $('#id').val(),
            users: [],
        }
    },
    handleReviewsResults: function(results) {
        console.log("In Reviews handleResults");
        console.log(results);
        if (results > 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> You successfully sent a review requests to " + results + " contacts!</label></div>";
            $("#content-results").fadeTo(4000, 500).slideUp(500, function(){
                $("#content-results").alert('close');
                document.getElementById("content-results").innerHTML = "";
            });
        } else {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> Something went wrong, please try again!</label></div>";
            $("#content-results").fadeTo(4000, 500).slideUp(500, function(){
                $("#content-results").alert('close');
                document.getElementById("content-results").innerHTML = "";
            });
        }
    },
    handleHideGroupsModal(){
        this.setState({view: {showGroupsModal: false}})
    },
    handleHideModal(){
        this.setState({view: {showModal: false}, review: false})
    },
    handleResults: function(results) {
        console.log("In handleResults");
        console.log(results);
        if (results > 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> You successfully sent a message to " + results + " contacts!</label></div>";
            $("#content-results").fadeTo(4000, 500).slideUp(500, function(){
                $("#content-results").alert('close');
                document.getElementById("content-results").innerHTML = "";
            });
        } else {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> Something went wrong, please try again!</label></div>";
            $("#content-results").fadeTo(4000, 500).slideUp(500, function(){
                $("#content-results").alert('close');
                document.getElementById("content-results").innerHTML = "";
            });
        }
    },
    componentDidMount: function() {
        $('a[href="#map-view"]').on('shown.bs.tab',function(){google.maps.event.trigger(window,'resize',{});})
    },
    render: function () {
        return (
            <div className="col-lg-8">
                <div id="search-content-row" className="row state-overview">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="panel panel-default" id="search-panel">
                                <div className="panel-heading">
                                    <header className="panel-title">
                                        <div className="row">
                                            <div className="col-md-8 col-md-offset-2 text-center">
                                                <strong>Search for a Professional</strong>
                                            </div>
                                            <div className="col-md-2">
                                                <a className="video" title="Search for a Contact" href="https://youtu.be/8NvFtj3XBmk"><img className="video-icon pull-right" src="/images/youTube.png" alt="Latch channel" /></a>
                                            </div>
                                        </div>
                                    </header>
                                </div>
                                <div className="panel-body">
                                    <div className="col-md-12">
                                        <SearchBox doSearch={this.doSearch} networkid={this.props.networkid} onToggle={this.onChildToggle}/>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div id="content-results">
                                            </div>
                                        </div>
                                    </div>
                                    <div id="searchResults">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div id="paginator" className="pagination"></div>
                                            </div>
                                        </div>
                                        <div className="btn-group pull-right">
                                            <button type="button" className="btn btn-default dropdown-toggle"
                                                    data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                Action <span className="caret"></span>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a onClick={this.sendMessage}>Send a message...</a></li>
                                                <li><a onClick={this.addToGroup}>Add to Current Group</a></li>
                                                <li><a onClick={this.addToMyNetwork}>Add to My Network</a></li>
                                                <li><a onClick={this.reviewRequest}>Request a review...</a></li>
                                            </ul>
                                        </div>
                                        {this.state.view.showModal ?
                                            <SendMessageModal user={this.props.user}
                                                              contacts={this.state.contacts}
                                                              review={this.state.review}
                                                              handleResults={this.handleResults}
                                                              handleHideModal={this.handleHideModal}/> : null}
                                        {this.state.view.showGroupsModal ? <GroupsModal handleHideModal={this.handleHideGroupsModal}/> : null}
                                        <ul id="myTab" className="nav nav-tabs">
                                            <li className="active "><a href="#list-view" data-toggle="tab">List
                                                View</a></li>
                                            <li className=" "><a href="#map-view" data-toggle="tab">Map View</a>
                                            </li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content">
                                            <div className="tab-pane fade active in" id="list-view">
                                                <SearchResults selectAll={this.state.selectAll}
                                                               data={this.state.filteredConsumers}/>
                                            </div>
                                            <div className="tab-pane fade " id="map-view">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="simple-map">
                                        <MapView lat={this.state.mapCoordinates.lat}
                                                 lng={this.state.mapCoordinates.lng} url={this.state.avatarUrl}
                                                 data={this.state.markers}/>
                                    </div>
                                    <SendingReviewRequestModal />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

