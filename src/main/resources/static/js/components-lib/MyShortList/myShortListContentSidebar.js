'use strict';

var MyShortListContent = React.createClass({
    displayName: 'MyShortListContent',
    getInitialState: function getInitialState() {
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
    componentDidMount: function componentDidMount() {
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

        $('a[data-toggle="tab"]').on('shown.bs.tab', (function (e) {
            var target = $(e.target).attr("href"); // activated tab
            if (target != '#grid-content') {
                this.viewUserProfilePanel('');
            } else {
                this.viewUserProfilePanel(this.state.currentProfileView);
            }
        }).bind(this));
    },
    resetAddToCurrentGroup: function resetAddToCurrentGroup() {
        this.setState({
            addToCurrentGroup: '',
            doAdd: false
        });
        this.props.resetAddToCurrentGroup();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
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
                success: (function (result) {
                    console.log(result);
                    if (!$.isEmptyObject(result) && result.children._embedded != undefined) {
                        this.setState({
                            shortlist: result.children._embedded.userDTOList,
                            user: result.user
                        });
                    }
                }).bind(this),
                error: function error(_error) {
                    console.log("error: " + _error.toString());
                },
                dataType: "json",
                contentType: "application/json"
            });
            // Get MyNetwork
            $.ajax({
                type: "POST",
                url: "/getMyNetworkWithOwner",
                data: data,
                success: (function (result) {
                    console.log(result);
                    if (!$.isEmptyObject(result) && result.children._embedded != undefined) {
                        this.setState({
                            myNetwork: result.children._embedded.userDTOList,
                            user: result.user
                        });
                    }
                }).bind(this),
                error: function error(_error2) {
                    console.log("error: " + _error2.toString());
                },
                dataType: "json",
                contentType: "application/json"
            });
            console.log("Is myGroup null");
            console.log(this.state.myGroup.length);
            if (this.state.myGroup.length == 0) {
                this.getGroup(nextProps.user.id, nextProps.user.defaultGroup);
            }
            this.getGroupList(nextProps.user.id);
        }
    },
    getGroupList: function getGroupList(id) {
        var data = {
            id: id
        };
        data = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getGroupTagsList",
            data: data,
            success: (function (result) {
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
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
    },
    getGroup: function getGroup(id, groupId) {
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
            success: (function (result) {
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
            }).bind(this),
            error: function error(_error4) {
                console.log("error: " + _error4.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    getGroup2: function getGroup2(id, groupId) {
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
            success: (function (result) {
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        groupId: result.groupId,
                        myGroup: result.users
                    });
                }
            }).bind(this),
            error: function error(_error5) {
                console.log("error: " + _error5.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    handleGroupChange: function handleGroupChange(groupId) {
        console.log(groupId);
        var id = this.state.user.id;
        if (id == null) {
            id = $('#id').val();
        }
        this.getGroup(id, groupId);
    },
    handleGroupChangeInGroups: function handleGroupChangeInGroups(groupId) {
        console.log(groupId);
        var id = this.state.user.id;
        if (id == null) {
            id = $('#id').val();
        }
        this.getGroup2(id, groupId);
    },
    viewUserProfilePanel: function viewUserProfilePanel(id) {
        if (id == '') {
            this.setState({
                firstUser: []
            });
        } else {
            var source = '/api/users/' + id;
            console.log(source);
            $.get(source, (function (result) {
                console.log("New User data: ");
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    var data = result;
                    this.setState({
                        firstUser: data,
                        currentProfileView: id
                    });
                }
            }).bind(this));
        }
    },
    render: function render() {
        var shortlistEntry = React.createElement(GroupEntry, { name: 'Your Short List', id: 'shortlist', groupId: 'shortlist' });
        var GroupList = this.state.groupList.map((function (tag) {
            return React.createElement(GroupEntry, { key: tag.id, name: tag.name, id: tag.id, groupId: this.state.groupId });
        }).bind(this));
        GroupList.unshift(shortlistEntry);
        return React.createElement(
            'div',
            { className: 'row', id: 'home-content' },
            React.createElement(
                'div',
                { className: 'col-lg-8' },
                React.createElement(
                    'div',
                    { className: 'row state-overview', id: 'sl-content' },
                    React.createElement(
                        'div',
                        { className: 'col-lg-12 col-md-12 col-xs-12' },
                        React.createElement(
                            'div',
                            { className: 'panel' },
                            React.createElement(
                                'div',
                                { className: 'panel-body' },
                                React.createElement(
                                    'ul',
                                    { id: 'myTab', className: 'nav nav-pills' },
                                    React.createElement(
                                        'li',
                                        { className: 'active' },
                                        React.createElement(
                                            'a',
                                            { href: '#grid-content', 'data-toggle': 'tab' },
                                            'List View'
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { className: '' },
                                        React.createElement(
                                            'a',
                                            { href: '#my-group-content', 'data-toggle': 'tab' },
                                            'Groups Graphical View'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { id: 'myTabContent', className: 'tab-content' },
                                    React.createElement(GridContent, { user: this.state.user, addToCurrentGroup: this.state.addToCurrentGroup, doAdd: this.state.doAdd, resetAddToCurrentGroup: this.resetAddToCurrentGroup, viewUserProfilePanel: this.viewUserProfilePanel }),
                                    React.createElement(GroupsContent, { myGroup: this.state.myGroup, user: this.state.user, groupName: this.state.topLabel, handleGroupChange: this.handleGroupChangeInGroups, groupList: GroupList })
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-4' },
                React.createElement(ProfilePanelPlus, { user: this.state.firstUser })
            )
        );
    }
});

var GroupEntry = React.createClass({
    displayName: 'GroupEntry',

    render: function render() {
        return React.createElement(
            'option',
            { key: this.props.key, value: this.props.id },
            this.props.name
        );
    }
});