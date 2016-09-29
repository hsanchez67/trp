'use strict';

var MyShortListPanel = React.createClass({
    displayName: 'MyShortListPanel',
    getInitialState: function getInitialState() {
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
    handleGroupNameChange: function handleGroupNameChange(groupName) {
        if (groupName == "shortlist") {
            return "Your Short List";
        } else {
            return groupName;
        }
    },
    componentWillMount: function componentWillMount() {
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
            success: (function (result) {
                console.log("ShortListPanel:componentWillMount:getDefaultGroup:");
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        data: result.users,
                        groupId: result.groupId == null ? "shortlist" : result.groupId,
                        groupName: this.handleGroupNameChange(result.groupName == null ? "shortlist" : result.groupName),
                        groupList: result.groupList
                    });
                }
            }).bind(this),
            error: function error(_error) {
                console.log("error: " + _error.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    componentDidMount: function componentDidMount() {
        console.log("MyShortListPanel:componentDidMount: this.props.droppable=" + this.props.droppable);
        $(".source li").draggable({
            addClasses: false,
            appendTo: "#delete-icon",
            helper: "clone"
        });
        $("#delete-icon-heading").droppable({
            addClasses: false,
            accept: ":not(.ui-sortable-helper)",
            activate: function activate() {
                $("#delete-icon").attr("class", "glyphicon glyphicon-trash pull-left delete-icon-on delete-from-shortlist");
            },
            deactivate: function deactivate() {
                $("#delete-icon").attr("class", "glyphicon glyphicon-trash pull-left  delete-from-shortlist");
            },
            drop: (function (event, ui) {
                console.log("Delete from my shortlist");
                // Add user to shortlist and update data
                var avatar = ui.draggable.find("img").attr("id");
                console.log("avatar: " + avatar);
                var id = $('#id').val();
                var data = {
                    id: id,
                    groupId: this.state.groupId,
                    users: [{ id: avatar }]
                };
                data = JSON.stringify(data, null, ' ');
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: "/removeFromShortList",
                    data: data,
                    success: (function (result) {
                        console.log(result);
                        if (!$.isEmptyObject(result)) {
                            this.setState({
                                data: result.users,
                                groupId: result.groupId,
                                groupName: this.handleGroupNameChange(result.groupName),
                                groupList: result.groupList
                            });
                        }
                    }).bind(this),
                    error: function error(_error2) {
                        console.log("error: " + _error2.toString());
                    },
                    dataType: "json",
                    contentType: "application/json"
                });
            }).bind(this)
        });
        $(".panel-body-target").droppable({
            addClasses: false,
            disabled: this.props.droppable,
            /*activeClass: "listActive", */
            accept: ":not(#my-short-list-panel li)",
            activate: function activate() {
                //    $(this).find(".placeholder").attr("class", "placeholderOn");
                $(this).attr("class", "panel-body panel-body-border-on panel-body-target");
            },
            deactivate: function deactivate() {
                //      $(this).find(".placeholderOn").attr("class", "placeholder");
                $(this).attr("class", "panel-body  panel-border-target");
            },
            drop: (function (event, ui) {
                // Add user to shortlist and update data
                var avatar = ui.draggable.find("img").attr("id");
                console.log("avatar: " + avatar);
                var id = $('#id').val();
                var data = {
                    id: id,
                    groupId: this.state.groupId,
                    users: [{ id: avatar }]
                };
                data = JSON.stringify(data, null, ' ');
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: "/addToShortList",
                    data: data,
                    success: (function (result) {
                        console.log(result);
                        if (!$.isEmptyObject(result)) {
                            this.setState({
                                data: result.users,
                                groupId: result.groupId,
                                groupName: this.handleGroupNameChange(result.groupName),
                                groupList: result.groupList
                            });
                        }
                    }).bind(this),
                    error: function error(_error3) {
                        console.log("error: " + _error3.toString());
                    },
                    dataType: "json",
                    contentType: "application/json"
                });
            }).bind(this)
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        $(".source li").draggable({
            addClasses: false,
            appendTo: "#delete-icon",
            helper: "clone"
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("MyShortListPanel:componentWillReceiveProps:nextProps");
        console.log(nextProps);
        if (nextProps.shortlist != this.props.shortlist) {
            this.addToDefaultGroup(nextProps.shortlist);
        }
        if (nextProps.addToCurrentGroup != this.props.addToCurrentGroup) {
            this.addToShortlist(nextProps.addToCurrentGroup);
        }
    },
    addToDefaultGroup: function addToDefaultGroup(users) {
        var id = $('#id').val();
        var data = {
            id: id,
            groupId: this.state.groupId,
            users: users
        };
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/addToShortList",
            data: data,
            success: (function (result) {
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
            }).bind(this),
            error: function error(_error4) {
                console.log("error: " + _error4.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    addToShortlist: function addToShortlist(userId) {
        var id = $('#id').val();
        var data = {
            id: id,
            groupId: this.state.groupId,
            users: [{ id: userId }]
        };
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/addToShortList",
            data: data,
            success: (function (result) {
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
            }).bind(this),
            error: function error(_error5) {
                console.log("error: " + _error5.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    handleNewGroupEntry: function handleNewGroupEntry() {
        console.log("Create New Group/Tag");
        bootbox.prompt("New Group Name", (function (result) {
            if (result === null) {
                console.log("Prompt dismissed");
                return null;
            } else {
                console.log("New Group: " + result);
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
                    success: (function (result) {
                        console.log(result);
                        if (!$.isEmptyObject(result)) {
                            this.setState({
                                data: result.users,
                                groupId: result.groupId,
                                groupName: this.handleGroupNameChange(result.groupName),
                                groupList: result.groupList
                            });
                        }
                    }).bind(this),
                    error: function error(_error6) {
                        console.log("error: " + _error6.toString());
                    },
                    dataType: "json",
                    contentType: "application/json"
                });
            }
        }).bind(this));
    },
    handleDeleteGroupEntry: function handleDeleteGroupEntry() {
        console.log("Delete Group/Tag");
        if (this.state.groupId != "shortlist") {
            bootbox.confirm("Are you sure you want to delete " + this.state.groupName + " group", (function (result) {
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
                        success: (function (result) {
                            console.log(result);
                            if (!$.isEmptyObject(result)) {
                                this.setState({
                                    data: result.users,
                                    groupId: result.groupId,
                                    groupName: this.handleGroupNameChange(result.groupName),
                                    groupList: result.groupList
                                });
                            }
                        }).bind(this),
                        error: function error(_error7) {
                            console.log("error: " + _error7.toString());
                        },
                        dataType: "json",
                        contentType: "application/json"
                    });
                }
            }).bind(this));
        } else {
            bootbox.alert("Sorry, you cant delete you Short List!!", function () {
                console.log("Shortlist not deletable");
            });
        }
    },
    handleGroupChange: function handleGroupChange(groupId) {
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
                success: (function (result) {
                    console.log(result);
                    if (!$.isEmptyObject(result)) {
                        this.setState({
                            data: result.users,
                            groupId: result.groupId,
                            groupName: this.handleGroupNameChange(result.groupName),
                            groupList: result.groupList
                        });
                    }
                }).bind(this),
                error: function error(_error8) {
                    console.log("error: " + _error8.toString());
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            return null;
        }
    },
    handleGroupMessage: function handleGroupMessage() {
        if (this.state.groupId != null) {
            var groupId = this.state.groupId;
            console.log("handleGroupMessage: " + groupId);
            window.location.href = '/sendMessageToGroup?group=' + groupId;
        } else {
            return null;
        }
    },
    handleViewGroupEntry: function handleViewGroupEntry() {
        if (this.state.groupId != null) {
            var groupId = this.state.groupId;
            console.log("handleGroupMessage: " + groupId);
            window.location.href = '/sendMessageToGroup?group=' + groupId;
        } else {
            return null;
        }
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
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
    render: function render() {
        var count = 0;
        var AvatarNodes = this.state.data.map(function (user) {
            count++;
            return React.createElement(Avatar, { key: user.id, id: user.id, username: user.avatar, name: user.firstName + ' ' + user.lastName, score: user.score, firstName: user.firstName, className: 'task-thumb' });
        });
        var shortlistEntry = React.createElement(GroupEntry, { key: 'sl', name: 'Your Short List', handleGroupChange: this.handleGroupChange, id: 'shortlist' });
        var GroupList = this.state.groupList.map((function (tag) {
            return React.createElement(GroupEntry, { key: tag.id, name: tag.name, handleGroupChange: this.handleGroupChange, id: tag.id });
        }).bind(this));
        GroupList.unshift(shortlistEntry);
        console.log("GroupList:");
        console.log(GroupList);
        var link = "/myShortList/" + this.state.groupId;
        var ActionList = [];
        ActionList.push(React.createElement(ViewGroupEntry, { key: '1', link: link }));
        ActionList.push(React.createElement(Divider, { key: '2' }));
        ActionList.push(React.createElement(MessageGroup, { key: '3', handleGroupMessage: this.handleGroupMessage }));
        ActionList.push(React.createElement(Divider, { key: '4' }));
        ActionList.push(React.createElement(NewGroupEntry, { key: '5', handleNewGroupEntry: this.handleNewGroupEntry }));
        ActionList.push(React.createElement(DeleteGroupEntry, { key: '6', handleDeleteGroupEntry: this.handleDeleteGroupEntry }));
        return React.createElement(
            'div',
            { id: 'my-short-list-panel' },
            React.createElement(
                'div',
                { className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { id: 'delete-icon-heading', className: 'panel-heading' },
                    React.createElement(
                        'header',
                        { className: 'panel-title' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-2' },
                                React.createElement('span', { id: 'delete-icon', className: 'glyphicon glyphicon-trash pull-left delete-from-shortlist' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-8 text-center' },
                                React.createElement(
                                    'li',
                                    { className: 'dropdown' },
                                    React.createElement(
                                        'a',
                                        { 'data-toggle': 'dropdown', className: 'dropdown-toggle', href: '#' },
                                        React.createElement(
                                            'strong',
                                            null,
                                            this.state.groupName
                                        ),
                                        React.createElement('b', { className: 'caret' })
                                    ),
                                    React.createElement(
                                        'ul',
                                        { id: 'shortlist-dropdown-menu', className: 'dropdown-menu' },
                                        GroupList
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-2' },
                                React.createElement(
                                    'div',
                                    { className: 'btn-group pull-right' },
                                    React.createElement(
                                        'button',
                                        { type: 'button', className: 'btn btn-xs btn-default dropdown-toggle', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                                        'Action ',
                                        React.createElement('span', { className: 'caret' })
                                    ),
                                    React.createElement(
                                        'ul',
                                        { className: 'dropdown-menu' },
                                        ActionList
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body panel-body-target' },
                    React.createElement(Loader, { isActive: this.state.isActive }),
                    React.createElement(Nodes, { avatarNodes: AvatarNodes, isActive: this.state.isActive })
                )
            )
        );
    }
});

var Nodes = React.createClass({
    displayName: 'Nodes',

    render: function render() {
        var isActive = classNames({
            'source hidden': this.props.isActive,
            'source': !this.props.isActive
        });
        return React.createElement(
            'ul',
            { id: 'my-shortlist-container', className: isActive },
            this.props.avatarNodes
        );
    }
});

var Loader = React.createClass({
    displayName: 'Loader',

    render: function render() {
        var isActive = classNames({
            'hidden': !this.props.isActive,
            ' ': this.props.isActive
        });
        return React.createElement(
            'div',
            { className: isActive },
            React.createElement('i', { className: 'fa fa-5x fa-cog fa-spin' })
        );
    }
});

var MessageGroup = React.createClass({
    displayName: 'MessageGroup',

    handleGroupMessage: function handleGroupMessage() {
        this.props.handleGroupMessage();
    },
    render: function render() {
        return React.createElement(
            'li',
            null,
            React.createElement(
                'a',
                { href: 'javascript: void(0)', onClick: this.handleGroupMessage },
                'Send Message to Group'
            )
        );
    }
});

var GroupEntry = React.createClass({
    displayName: 'GroupEntry',

    handleGroupChange: function handleGroupChange() {
        this.props.handleGroupChange(this.props.id);
    },
    render: function render() {
        return React.createElement(
            'li',
            null,
            React.createElement(
                'a',
                { href: 'javascript: void(0)', onClick: this.handleGroupChange },
                this.props.name
            )
        );
    }
});

var Divider = React.createClass({
    displayName: 'Divider',

    render: function render() {
        return React.createElement('li', { className: 'divider' });
    }
});

var NewGroupEntry = React.createClass({
    displayName: 'NewGroupEntry',

    handleNewGroupEntry: function handleNewGroupEntry() {
        this.props.handleNewGroupEntry();
    },
    render: function render() {
        return React.createElement(
            'li',
            null,
            React.createElement(
                'a',
                { href: 'javascript: void(0)', onClick: this.handleNewGroupEntry },
                'Create New Group'
            )
        );
    }
});

var DeleteGroupEntry = React.createClass({
    displayName: 'DeleteGroupEntry',

    handleDeleteGroupEntry: function handleDeleteGroupEntry() {
        this.props.handleDeleteGroupEntry();
    },
    render: function render() {
        return React.createElement(
            'li',
            null,
            React.createElement(
                'a',
                { href: 'javascript: void(0)', onClick: this.handleDeleteGroupEntry },
                'Delete Group'
            )
        );
    }
});

var ViewGroupEntry = React.createClass({
    displayName: 'ViewGroupEntry',

    handleViewGroupEntry: function handleViewGroupEntry() {
        window.location.href = this.props.link;
    },
    render: function render() {
        return React.createElement(
            'li',
            null,
            React.createElement(
                'a',
                { href: 'javascript: void(0)', onClick: this.handleViewGroupEntry },
                'View Group'
            )
        );
    }
});