var MyShortListPanel = React.createClass({
    displayName: 'MyShortListPanel',
    getInitialState: function () {
        return {
            data: [],
            shortlist: [],
            user: this.props.user,
            groupId: '',
            groupName: '',
            groupList: [],
            isActive: false
        };
    },
    handleGroupNameChange: function(groupName) {
        if (groupName == "shortlist") {
            return "Your Short List";
        }  else {
            return groupName;
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
                console.log("ShortListPanel:componentWillMount:getDefaultGroup:")
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        data: result.users,
                        groupId: result.groupId==null?"shortlist":result.groupId,
                        groupName: this.handleGroupNameChange(result.groupName==null?"shortlist":result.groupName),
                        groupList: result.groupList
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
    componentDidMount: function() {
        console.log("MyShortListPanel:componentDidMount: this.props.droppable="+ this.props.droppable);
        $(".source li")
            .draggable({
                addClasses: false,
                appendTo: "#delete-icon",
                helper: "clone"
        });
        $("#delete-icon-heading").droppable({
            addClasses: false,
            accept: ":not(.ui-sortable-helper)",
            activate: function() {
                $("#delete-icon").attr("class", "glyphicon glyphicon-trash pull-left delete-icon-on delete-from-shortlist");
            },
            deactivate: function() {
                $("#delete-icon").attr("class", "glyphicon glyphicon-trash pull-left  delete-from-shortlist");
            },
            drop: function(event, ui) {
                console.log("Delete from my shortlist");
                // Add user to shortlist and update data
                var avatar = ui.draggable.find("img").attr("id");
                console.log("avatar: " + avatar);
                var id = $('#id').val();
                var data = {
                    id: id,
                    groupId: this.state.groupId,
                    users: [{id: avatar}]
                }
                data = JSON.stringify(data, null, ' ');
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: "/removeFromShortList",
                    data: data,
                    success: function(result){
                        console.log(result);
                        if (!$.isEmptyObject(result)) {
                            this.setState({
                                data: result.users,
                                groupId: result.groupId,
                                groupName: this.handleGroupNameChange(result.groupName),
                                groupList: result.groupList
                            });
                        }
                    }.bind(this),
                    error: function(error) {
                        console.log("error: " + error.toString());
                    },
                    dataType: "json",
                    contentType : "application/json"
                });
            }.bind(this)
        });
        $(".panel-body-target").droppable({
            addClasses: false,
            disabled: this.props.droppable,
            /*activeClass: "listActive", */
            accept: ":not(#my-short-list-panel li)",
            activate: function() {
                //    $(this).find(".placeholder").attr("class", "placeholderOn");
                $(this).attr("class", "panel-body panel-body-border-on panel-body-target");
            },
            deactivate: function() {
                //      $(this).find(".placeholderOn").attr("class", "placeholder");
                $(this).attr("class", "panel-body  panel-border-target");
            },
            drop: function(event, ui) {
               // Add user to shortlist and update data
                var avatar = ui.draggable.find("img").attr("id");
                console.log("avatar: " + avatar);
                var id = $('#id').val();
                var data = {
                    id: id,
                    groupId: this.state.groupId,
                    users: [{id: avatar}]
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
                                groupName: this.handleGroupNameChange(result.groupName),
                                groupList: result.groupList
                            });
                        }
                    }.bind(this),
                    error: function(error) {
                        console.log("error: " + error.toString());
                    },
                    dataType: "json",
                    contentType : "application/json"
                });
            }.bind(this)
        });
    },
    componentDidUpdate: function () {
        $(".source li").draggable({
            addClasses: false,
            appendTo: "#delete-icon",
            helper: "clone"
        });
    },
    componentWillReceiveProps: function (nextProps) {
        console.log("MyShortListPanel:componentWillReceiveProps:nextProps");
        console.log(nextProps);
        if (nextProps.shortlist != this.props.shortlist) {
           this.addToDefaultGroup(nextProps.shortlist)
        }
        if (nextProps.addToCurrentGroup != this.props.addToCurrentGroup) {
            this.addToShortlist(nextProps.addToCurrentGroup);
        }
    },
    addToDefaultGroup: function(users) {
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
                        groupName: this.handleGroupNameChange(result.groupName),
                        groupList: result.groupList
                    });
                }
                if (result.error != null) {
                    bootbox.alert(result.error);
                }
            }.bind(this),
            error: function(error) {
                console.log("error: " + error.toString());
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    addToShortlist: function(userId) {
        var id = $('#id').val();
        var data = {
            id: id,
            groupId: this.state.groupId,
            users: [{id: userId}]
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
                        groupName: this.handleGroupNameChange(result.groupName),
                        groupList: result.groupList
                    });
                }
                if (result.error != null) {
                    bootbox.alert(result.error);
                }
            }.bind(this),
            error: function(error) {
                console.log("error: " + error.toString());
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    handleNewGroupEntry: function() {
        console.log("Create New Group/Tag");
        bootbox.prompt("New Group Name", function(result) {
            if (result === null) {
                console.log("Prompt dismissed");
                return null;
            } else {
                console.log("New Group: "+result);
                var id = $('#id').val();
                var data = {
                    id: id,
                    groupName: result
                };
                data = JSON.stringify(data, null, ' ');
                $.ajax({
                    type: "POST",
                    url: "/createNewGroup",
                    data: data,
                    success: function (result) {
                        console.log(result);
                        if (!$.isEmptyObject(result)) {
                            this.setState({
                                data: result.users,
                                groupId: result.groupId,
                                groupName: this.handleGroupNameChange(result.groupName),
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
            }
        }.bind(this));
    },
    handleDeleteGroupEntry: function() {
        console.log("Delete Group/Tag");
        if (this.state.groupId != "shortlist") {
            bootbox.confirm("Are you sure you want to delete " + this.state.groupName + " group", function (result) {
                if (!result) {
                    console.log("Delete cancelled");
                    return null;
                } else {
                    console.log("Delete Group: " + result);
                    var id = $('#id').val();
                    var data = {
                        id: id,
                        groupId: this.state.groupId
                    };
                    data = JSON.stringify(data, null, ' ');
                    $.ajax({
                        type: "POST",
                        url: "/deleteGroup",
                        data: data,
                        success: function (result) {
                            console.log(result);
                            if (!$.isEmptyObject(result)) {
                                this.setState({
                                    data: result.users,
                                    groupId: result.groupId,
                                    groupName: this.handleGroupNameChange(result.groupName),
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
                }
            }.bind(this));
        } else {
            bootbox.alert("Sorry, you cant delete you Short List!!", function() {
                console.log("Shortlist not deletable");
            });
        }
    },
    handleGroupChange: function(groupId) {
        if (this.state.groupId != groupId) {
            this.setState({
                isActive: true
            });
            console.log("handleGroupMessage: " + groupId);
            var id = $('#id').val();
            var data = {
                id: id,
                groupId: groupId
            };
            data = JSON.stringify(data, null, ' ');
            $.ajax({
                type: "POST",
                url: "/handleGroupChange",
                data: data,
                success: function (result) {
                    console.log(result);
                    if (!$.isEmptyObject(result)) {
                        this.setState({
                            data: result.users,
                            groupId: result.groupId,
                            groupName: this.handleGroupNameChange(result.groupName),
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
        } else {
            return null;
        }
    },
    handleGroupMessage: function() {
        if (this.state.groupId != null) {
            var groupId = this.state.groupId
            console.log("handleGroupMessage: " + groupId);
            window.location.href = '/sendMessageToGroup?group=' + groupId;
        } else {
            return null;
        }
    },
    handleViewGroupEntry: function() {
        if (this.state.groupId != null) {
            var groupId = this.state.groupId
            console.log("handleGroupMessage: " + groupId);
            window.location.href = '/sendMessageToGroup?group=' + groupId;
        } else {
            return null;
        }
    },
    componentDidUpdate: function(prevProps, prevState) {
        console.log("MyShortListPanel:componentDidUpdate");
        console.log(prevState);
        if (prevState.isActive) {
            this.setState({
                isActive: false
            });
        }
        $(".source li").draggable({
            addClasses: false,
            appendTo: "#delete-icon",
            helper: "clone"
        });
    },
    render: function () {
        var count=0;
        var AvatarNodes = this.state.data.map(function (user) {
            count++;
            return (
                <Avatar key={user.id} id={user.id} username={user.avatar} name={user.firstName + ' ' + user.lastName} score={user.score} firstName={user.firstName} className="task-thumb" />
            );
        });
        var shortlistEntry = <GroupEntry key="sl" name="Your Short List" handleGroupChange={this.handleGroupChange} id="shortlist" />;
        var GroupList = this.state.groupList.map(function (tag) {
            return (
                <GroupEntry key={tag.id} name={tag.name} handleGroupChange={this.handleGroupChange} id={tag.id}/>
            );
        }.bind(this));
        GroupList.unshift(shortlistEntry);
        console.log("GroupList:");
        console.log(GroupList);
        let link = "/myShortList/" +  this.state.groupId;
        var ActionList = [];
        ActionList.push(<ViewGroupEntry key="1" link={link} />);
        ActionList.push(<Divider key="2" />);
        ActionList.push(<MessageGroup key="3" handleGroupMessage={this.handleGroupMessage} />);
        ActionList.push(<Divider key="4" />);
        ActionList.push(<NewGroupEntry key="5" handleNewGroupEntry={this.handleNewGroupEntry} />);
        ActionList.push(<DeleteGroupEntry key="6" handleDeleteGroupEntry={this.handleDeleteGroupEntry} />);
        return (
            <div id="my-short-list-panel">
                <div className="panel panel-default">
                    <div id="delete-icon-heading" className="panel-heading">
                        <header className="panel-title">
                            <div className="row">
                                <div className="col-md-2">
                                    <span id="delete-icon" className="glyphicon glyphicon-trash pull-left delete-from-shortlist"></span>
                                </div>
                                <div className="col-md-8 text-center">
                                    <li className="dropdown">
                                        <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                            <strong>{this.state.groupName}</strong>
                                            <b className="caret"></b>
                                        </a>
                                        <ul id="shortlist-dropdown-menu" className="dropdown-menu">
                                            {GroupList}
                                        </ul>
                                    </li>
                                </div>
                                <div className="col-md-2">
                                    <div className="btn-group pull-right">
                                        <button type="button" className="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Action <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            {ActionList}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                    <div className="panel-body panel-body-target">
                        <Loader isActive={this.state.isActive} />
                        <Nodes avatarNodes={AvatarNodes} isActive={this.state.isActive} />
                    </div>
                </div>
            </div>
        );
    },
});

var Nodes = React.createClass({
    render: function() {
        let isActive = classNames({
            'source hidden': this.props.isActive,
            'source': !this.props.isActive
        });
        return (
            <ul id="my-shortlist-container" className={isActive}>
                {this.props.avatarNodes}
            </ul>
        );
    }
});

var Loader = React.createClass({
    render: function() {
        let isActive = classNames({
            'hidden': !this.props.isActive,
            ' ': this.props.isActive
        });
        return (
            <div className={isActive}><i className="fa fa-5x fa-cog fa-spin"></i></div>
        );
    }
});

var MessageGroup = React.createClass({
    handleGroupMessage: function () {
        this.props.handleGroupMessage();
    },
    render: function() {
        return (
            <li>
                <a href="javascript: void(0)" onClick={this.handleGroupMessage}>
                    Send Message to Group
                </a>
            </li>
        );
    }
})

var GroupEntry = React.createClass({
    handleGroupChange: function () {
       this.props.handleGroupChange(this.props.id);
    },
    render: function() {
        return (
            <li>
                <a href="javascript: void(0)" onClick={this.handleGroupChange}>
                    {this.props.name}
                </a>
            </li>
        );
    }
});

var Divider = React.createClass({
    render: function() {
        return (
            <li className="divider"></li>
        );
    }
});

var NewGroupEntry = React.createClass({
    handleNewGroupEntry: function () {
        this.props.handleNewGroupEntry();
    },
    render: function() {
        return (
            <li>
                <a href="javascript: void(0)" onClick={this.handleNewGroupEntry}>
                    Create New Group
                </a>
            </li>
        );
    }
});

var DeleteGroupEntry = React.createClass({
    handleDeleteGroupEntry: function () {
        this.props.handleDeleteGroupEntry();
    },
    render: function() {
        return (
            <li>
                <a href="javascript: void(0)" onClick={this.handleDeleteGroupEntry}>
                    Delete Group
                </a>
            </li>
        );
    }
});

var ViewGroupEntry = React.createClass({
    handleViewGroupEntry: function () {
        window.location.href = this.props.link;
    },
    render: function() {
        return (
            <li>
                <a href="javascript: void(0)" onClick={this.handleViewGroupEntry}>
                    View Group
                </a>
            </li>
        );
    }
});
