var MyShortListContent = React.createClass({
    displayName: 'MyShortListContent',
    getInitialState: function() {
        return {
            user: [],
            firstUser: [],
            shortlist: [],
            myNetwork: [],
            myGroup: [],
            topLabel: '',
            groupList: [],
            groupId: '',
            addToCurrentGroup: '',
            doAdd: false,
            currentProfileView: ''
        };
    },
    componentDidMount: function () {
        var groupId = $('#groupId').val();
        console.log("MyShortListContent:componentDidMount");
        if (groupId != "") {
            if (groupId == "shortlist") {
                return false;
            } else {
             /*   $('.nav-pills a[href="#my-group-content"]').tab('show'); */
            /*    var groupLink = "#my-group-" + groupId;
                console.log(groupLink);
                $(groupLink).addClass('active'); */
                this.handleGroupChange(groupId);
            }
        }

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href") // activated tab
            if (target != '#grid-content') {
                this.viewUserProfilePanel('');
            } else {
                this.viewUserProfilePanel(this.state.currentProfileView);
            }
        }.bind(this));
    },
    resetAddToCurrentGroup: function() {
        this.setState({
            addToCurrentGroup: '',
            doAdd: false
        });
        this.props.resetAddToCurrentGroup();
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.addToCurrentGroup != this.props.addToCurrentGroup && nextProps.addToCurrentGroup != '') {
            this.setState({
                addToCurrentGroup: nextProps.addToCurrentGroup,
                doAdd: true
            });
        }
        if (!$.isEmptyObject(nextProps.user) && nextProps.user != this.props.user) {
            this.setState({
                user: nextProps.user
            });
            console.log("MyShortListContent:componentWillReceiveProps:user: ");
            console.log(nextProps.user);
            var data = {
                userId: nextProps.user.id
            };
            // Get ShortList
            $.ajax({
                type: "POST",
                url: "/getShortListWithOwner",
                data: data,
                success: function(result){
                    console.log(result);
                    if (!$.isEmptyObject(result) && result.children._embedded != undefined) {
                        this.setState({
                            shortlist: result.children._embedded.userDTOList,
                            user: result.user
                        });
                    }
                }.bind(this),
                error: function(error) {
                    console.log("error: " + error.toString());
                },
                dataType: "json",
                contentType : "application/json"
            });
            // Get MyNetwork
            $.ajax({
                type: "POST",
                url: "/getMyNetworkWithOwner",
                data: data,
                success: function(result){
                    console.log(result);
                    if (!$.isEmptyObject(result) && result.children._embedded != undefined) {
                        this.setState({
                            myNetwork: result.children._embedded.userDTOList,
                            user: result.user
                        });
                    }
                }.bind(this),
                error: function(error) {
                    console.log("error: " + error.toString());
                },
                dataType: "json",
                contentType : "application/json"
            });
            console.log("Is myGroup null");
            console.log(this.state.myGroup.length);
            if (this.state.myGroup.length == 0) {
                this.getGroup(nextProps.user.id, nextProps.user.defaultGroup);
            }
            this.getGroupList(nextProps.user.id);
        }
    },
    getGroupList: function(id) {
        var data = {
            id: id
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
    getGroup: function (id, groupId) {
        var data = {
            id: id,
            groupId: groupId
        };
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/getGroup",
            data: data,
            success: function(result){
                console.log(result);
                if (!$.isEmptyObject(result.users) && result.users.length > 0) {
                    this.setState({
                        groupId: result.groupId,
                        myGroup: result.users,
                        topLabel: result.groupName,
                        firstUser: result.users[0],
                        currentProfileView: result.users[0].id
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
    getGroup2: function (id, groupId) {
        var data = {
            id: id,
            groupId: groupId
        };
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/getGroup",
            data: data,
            success: function(result){
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        groupId: result.groupId,
                        myGroup: result.users,
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
    handleGroupChange: function(groupId) {
        console.log(groupId);
        var id = this.state.user.id;
        if (id == null) {
            id = $('#id').val();
        }
        this.getGroup(id, groupId);
    },
    handleGroupChangeInGroups: function(groupId) {
        console.log(groupId);
        var id = this.state.user.id;
        if (id == null) {
            id = $('#id').val();
        }
        this.getGroup2(id, groupId);
    },
    viewUserProfilePanel: function(id) {
        if (id == '') {
            this.setState({
                firstUser: []
            });
        } else {
            var source = '/api/users/' + id;
            console.log(source);
            $.get(source, function (result) {
                console.log("New User data: ");
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    var data = result;
                    this.setState({
                        firstUser: data,
                        currentProfileView: id
                    });
                }
            }.bind(this));
        }
    },
    render: function () {
        var shortlistEntry = <GroupEntry name="Your Short List"  id="shortlist" groupId="shortlist" />;
        var GroupList = this.state.groupList.map(function (tag) {
            return (
                <GroupEntry key={tag.id} name={tag.name} id={tag.id} groupId={this.state.groupId} />
            );
        }.bind(this));
        GroupList.unshift(shortlistEntry);
        return (
            <div className="row" id="home-content">
                <div className="col-lg-8">
                    <div className="row state-overview" id="sl-content">
                        <div className="col-lg-12 col-md-12 col-xs-12">
                            <div className="panel">
                                <div className="panel-body">
                                    <ul id="myTab" className="nav nav-pills">
                                        <li className="active"><a href="#grid-content" data-toggle="tab">List View</a></li>
                                        <li className=""><a href="#my-group-content" data-toggle="tab">Groups Graphical View</a></li>
                                    </ul>
                                    <div id="myTabContent" className="tab-content">
                                        <GridContent user={this.state.user} addToCurrentGroup={this.state.addToCurrentGroup} doAdd={this.state.doAdd} resetAddToCurrentGroup={this.resetAddToCurrentGroup} viewUserProfilePanel={this.viewUserProfilePanel} />
                                        <GroupsContent myGroup={this.state.myGroup} user={this.state.user} groupName={this.state.topLabel}  handleGroupChange={this.handleGroupChangeInGroups} groupList={GroupList} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <ProfilePanelPlus  user={this.state.firstUser}  />
                </div>
            </div>
        );
    },
});

var GroupEntry = React.createClass({
    render: function() {
        return (
            <option key={this.props.key} value={this.props.id}>{this.props.name}</option>
        );
    }
});