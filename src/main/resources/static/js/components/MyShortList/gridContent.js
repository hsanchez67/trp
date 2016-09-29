var selectResponsive2 = {
    width: '50%'
};

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
    loadDetails: function(id) {
        console.log(id);
        $("#resultsContent div").removeClass("resultInstantSelected");
        $('#result'+id).addClass('resultInstantSelected');
        this.props.viewUserProfilePanel(id);
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
        };
        let rowColor = classNames({
            'row resultInstant': this.props.count%2===0 && !this.props.selected,
            'row resultInstantGrey': this.props.count%2!==0 && !this.props.selected,
            'row resultInstant resultInstantSelected': this.props.count%2===0 && this.props.selected,
            'row resultInstantGrey resultInstantSelected': this.props.count%2!==0 && this.props.selected
        });
        var resultId = 'result' + this.props.id;
        var address = '';
        if (this.props.city != null && this.props.city != "" && this.props.state != null && this.props.city != "") {
            address = this.props.city + ", " + this.props.state;
        }
        return (
            <div id={resultId} className={rowColor}>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center vert-align">
                    <div className='checkbox'>
                        <label>
                            <input className="check" type="checkbox" id={'check-' + this.props.id} name={'check-'+ this.props.id} value={this.props.id} aria-label='...' />
                        </label>
                    </div>
                    <ul className="source">
                        <Avatar id={this.props.id} username={this.props.avatar} name={this.props.firstName + ' ' + this.props.lastName} className="task-thumb" />
                    </ul>
                    <div className="details">
                        <a className="btn btn-default btn-xs pointer" onClick={this.loadDetails.bind(this, this.props.id)}>
                            <i className="fa fa-cog"></i> View</a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-left">
                    <input type="hidden" className="id-input" name={"id-"+this.props.id} id={"id-"+this.props.id}  value={this.props.id} />
                    <input type="hidden" className="email-input" name={"email-"+this.props.id} id={"email-"+this.props.id}  value={this.props.email} />
                    <input type="hidden" className="firstName-input" name={"firstName-"+this.props.id} id={"firstName-"+this.props.id}  value={this.props.firstName} />
                    <input type="hidden" className="lastName-input" name={"lastName-"+this.props.id} id={"lastName-"+this.props.id}  value={this.props.lastName} />
                    <strong>{this.props.firstName} {this.props.lastName}</strong><br />
                    {this.props.profession}<br />
                    {this.props.business}<br />
                    {address}<br />
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
                <div className="col-lg-5 col-md-5 col-sm-5 hidden-xs text-left">
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
        var $entries = $("#resultsContent");
        $entries.each(function(i, entry) {
            $(entry).find(':input:checkbox').each(function(){
                $(this).prop('checked', checkAll);
            })
        });
    },
    viewUserProfilePanel: function(id) {
        this.props.viewUserProfilePanel(id);
    },
    render:function() {
        if ($.isEmptyObject(this.props.data) && this.props.loading) {
            return <div className="no-entries"><i className="fa fa-cog fa-spin fa-5x fa-fw"></i>
            <span className="sr-only">Loading...</span></div>;
        } else if ($.isEmptyObject(this.props.data) && !this.props.loading) {
            return <div className="no-entries">No results!</div>;
        } else {
            var users = [];
            var count = 0;
            var selected = false;
            var selectAll = this.props.selectAll;
            this.props.data.forEach(function (user) {
                if (count == 0) {selected = true;} else {selected = false;}
                users.push(<Result key={user.id} id={user.id} avatar={user.avatar} firstName={user.firstName}
                                   lastName={user.lastName} email={user.email} profession={user.profession} business={user.businessName}
                                   city={user.businessCity} state={user.businessState} user={user}
                                   score={user.score} count={count++} selectAll={selectAll} selected={selected} viewUserProfilePanel={this.viewUserProfilePanel} />)
            }.bind(this));
            return (
                <div>{users}</div>
            );
        }
    }
});

var GridContent = React.createClass({
    displayName: 'GridContent',
    getInitialState: function () {
        return {
            data: [],
            shortlist: [],
            user: this.props.user,
            groupId: '',
            groupName: '',
            groupList: [],
            selectAll: false,
            isActive: false,
            loading: true,
            view: {showModal: false}
        };
    },
    handleGroupNameChange: function(groupName) {
        if (groupName == "shortlist") {
            return "Your Short List";
        }  else {
            return groupName;
        }
    },
    handleGroupChange: function(groupId) {
        if (this.state.groupId != groupId && groupId != undefined) {
            this.setState({
                data: [],
                loading: true
            });
            console.log("handleGroupChange: " + groupId);
            var id = $('#id').val();
            var data = {
                id: id,
                groupId: groupId
            };
            data = JSON.stringify(data, null, ' ');
            $.ajax({
                type: "POST",
                url: "/handleNetworkChangeView",
                data: data,
                success: function (result, textStatus, xhr) {
                    console.log(textStatus);
                    if (xhr.status != 200) {
                        window.local.href = "/myShortList";
                    }
                    console.log(result);
                    if (!$.isEmptyObject(result)) {
                        this.setState({
                            data: result.users,
                            groupId: result.groupId,
                            groupName: this.handleGroupNameChange(result.groupName),
                            groupList: result.groupList,
                            loading: false
                        });
                        if (result.users.length > 0) {
                            this.props.viewUserProfilePanel(result.users[0].id);
                        } else {
                            this.props.viewUserProfilePanel('');
                        }
                    } else {
                        this.setState({
                            loading: false
                        });
                        this.props.viewUserProfilePanel('');
                    }
                }.bind(this),
                error: function (error) {
                    console.log("error: " + error.toString());
                },
                complete: function(xhr, textStatus){
                    if (xhr.status == 401) {
                        window.location.href = "/myShortList"
                    }
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            this.setState({
                data: [],
                loading: false
            });
        }
    },
    componentWillMount: function () {
        var id = $('#id').val();
        var data = {
            id: id
        };
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/getDefaultGroup",
            data: data,
            success: function(result){
                console.log("GridContent:componentWillMount:getDefaultGroup:")
                console.log(result);
                if (!$.isEmptyObject(result) && result.users.length > 0) {
                    this.setState({
                        data: result.users,
                        groupId: result.groupId,
                        groupName: this.handleGroupNameChange(result.groupName==null?"shortlist":result.groupName),
                        groupList: result.groupList,
                        loading: false
                    });
                    this.props.viewUserProfilePanel(result.users[0].id);
                }  else {
                    this.setState({
                        data: [],
                        loading: false
                    });
                }
            }.bind(this),
            error: function(error) {
                console.log("error: " + error.toString());
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    componentDidMount: function () {
        $('#loadNetwork').on('change', function() {
            this.handleGroupChange( $('#loadNetwork').val() );
        }.bind(this));
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.addToCurrentGroup != this.props.addToCurrentGroup && nextProps.doAdd) {
            this.addToCurrentGroup(nextProps.addToCurrentGroup);
        }
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
        var $entries = $("#resultsContent");
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
            bootbox.alert("<span class='fa fa-exclamation-triangle text-primary'></span> <strong>Heads Up!</strong> No contacts have been selected", function() {
                return null;
            });
        }  else {
            this.setState({
                contacts: contacts,
                view: {showModal: true}
            });
        }
    },
    handleHideModal(){
        this.setState({view: {showModal: false}, review: false})
    },
    handleResults: function(results) {
        console.log("In handleResults");
        console.log(results);
        if (results > 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Congratulations!</strong> You successfully sent a message to " + results + " contacts!</div>";
        } else {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Heads Up!</strong> Heads up! Something went wrong, please try again!</div>";
        }
    },
    addToCurrentGroup: function(toAddId) {
        var users = [{id: toAddId}];
        var id = $('#id').val();
        var data = {
            id: id,
            groupId: this.state.groupId,
            users: users
        }
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/addToShortList",
            data: data,
            success: function(result){
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        data: result.users,
                        groupId: result.groupId,
                        groupName: this.handleGroupNameChange(result.groupName==null?"shortlist":result.groupName),
                        groupList: result.groupList,
                        loading: false
                    });
                }
                if (result.error != null) {
                    bootbox.alert(result.error);
                }
                this.handleAddToGroupResults(result.users.length);
            }.bind(this),
            error: function(error) {
                console.log("error: " + error.toString());
            },
            dataType: "json",
            contentType : "application/json"
        });
        this.props.resetAddToCurrentGroup();
    },
    deleteFromGroup: function() {
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
        var $entries = $("#resultsContent");
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
            bootbox.alert("<span class='fa fa-exclamation-triangle text-primary'></span> <strong>Heads Up!</strong> No contacts have been selected", function() {
                return null;
            });
        }  else {
            var data = this.getFormData();
            data.users = contacts;
            data.groupId = this.state.groupId;
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            var results = [];
            $("#removingUsersRequestModal").modal('show');
            this.setState({
                data: [],
                groupId: '',
                groupName: ''
            });
            $.ajax({
                type: "POST",
                url: "/removeUsersFromList",
                async: true,
                data: formData,
                success: function (result) {
                    console.log("Inside Success");
                    $("#removingUsersRequestModal").delay(3000).modal('hide');
                    results = result;
                    console.log(results);
                    this.handleRemoveUsersResults(results.users.length);
                    $("#closeButton").trigger('click');
                    this.handleGroupChange(result.groupId);
                }.bind(this),
                error: function (error) {
                    $("#removingUsersRequestModal").modal('hide');
                    console.log('Send review request error message');
                    document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Heads Up!</strong> Heads up! Something went wrong, please try again!</div>";
                },
                dataType: "json",
                contentType: "application/json"
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
        var $entries = $("#resultsContent");
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
            bootbox.alert("<span class='fa fa-exclamation-triangle text-primary'></span> <strong>Heads Up!</strong> No contacts have been selected", function() {
                return null;
            });
        }  else {
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
                    $("#sendingReviewRequestModal").modal('hide');
                    console.log('Send review request error message');
                    document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Heads Up!</strong> Heads up! Something went wrong, please try again!</div>";
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
            groupId: ''
        }
    },
    handleAddToGroupResults: function(results) {
        console.log("In AddUsers handleResults");
        console.log(results);
        if (results > 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Congratulations!</strong> You successfully added 1 to this list!</div>";
            $('#content-results').delay(5000).slideUp(500);
        } else {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Heads Up!</strong> Heads up! Something went wrong, please try again!</div>";
            $('#content-results').delay(5000).slideUp(500);
        }
    },
    handleRemoveUsersResults: function(results) {
        console.log("In RemoveUsers handleResults");
        console.log(results);
        if (results > 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Congratulations!</strong> You successfully removed " + results + " from this list!</div>";
            $('#content-results').delay(5000).slideUp(500);
        } else {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Heads Up!</strong> Heads up! Something went wrong, please try again!</div>";
            $('#content-results').delay(5000).slideUp(500);
        }
    },
    handleReviewsResults: function(results) {
        console.log("In Reviews handleResults");
        console.log(results);
        if (results > 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Congratulations!</strong> You successfully sent a review requests to " + results + " contacts!</div>";
            $('#content-results').delay(5000).slideUp(500);
        } else {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Heads Up!</strong> Heads up! Something went wrong, please try again!</div>";
            $('#content-results').delay(5000).slideUp(500);
        }
    },
    onToggle: function() {
        this.setState({
            selectAll: $("#checkAll").prop('checked')
        });
    },
    viewUserProfilePanel: function(id) {
        this.props.viewUserProfilePanel(id);
    },
    render: function () {
        var shortlistEntry = <NetworksListEntry name="Your Short List"  id="shortlist" />;
        var myNetworkEntry = <NetworksListEntry name="My Network"  id="my-network" />;
        var NetworksList = this.state.groupList.map(function (tag) {
            return (
                <NetworksListEntry key={tag.id} name={tag.name} id={tag.id} selected={this.state.groupName} />
            );
        }.bind(this));
        NetworksList.unshift(myNetworkEntry);
        NetworksList.unshift(shortlistEntry);
        return (
            <div className="tab-pane active in fade" id="grid-content">
                <div className="form-group text-left margin-top-20">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-users"></i></span>
                        <select className="form-control" id="loadNetwork" ref="loadNetwork" style={selectResponsive2} value={this.state.groupId}>
                            {NetworksList}
                        </select>
                    </div>
                    <div className="btn-group pull-right">
                        <button type="button" className="btn btn-default dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                            Action <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a onClick={this.sendMessage}>Send a message...</a></li>
                            <li><a onClick={this.reviewRequest}>Request a review...</a></li>
                            <li><a onClick={this.deleteFromGroup}>Remove from group...</a></li>
                        </ul>
                    </div>
                    {this.state.view.showModal ?
                        <SendMessageModal user={this.props.user}
                                          contacts={this.state.contacts}
                                          review={false}
                                          handleResults={this.handleResults}
                                          handleHideModal={this.handleHideModal}/> : null}
                    <SendingReviewRequestModal />
                    <RemovingUsersRequestModal />
                </div>
                <div id="check-all-container" className="checkbox pull-left">
                    <label>
                        <input className="check" ref="checkAll" id="checkAll" onClick={this.onToggle}  value="Check All" type="checkbox"/> Select All
                    </label>
                </div>
                <div className="border-bottom">
                    <div className="margin-top-20 text-left">
                        <div id="content-results">
                        </div>
                    </div>
                </div>
                <div id="resultsContent" className="row margin-top-20">
                    <SearchResults selectAll={this.state.selectAll} data={this.state.data} loading={this.state.loading} viewUserProfilePanel={this.props.viewUserProfilePanel} />
                </div>
            </div>
        );
    },
});

var NetworksListEntry = React.createClass({
    render: function() {
        return (
            <option key={this.props.key} value={this.props.id}>{this.props.name}</option>
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

var RemovingUsersRequestModal = React.createClass({
    render(){
        return (
            <div id="removingUsersRequestModal" className="modal fade" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title">Contacts are being removed from your list.</h4>
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


