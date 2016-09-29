'use strict';

var MyGroupsPanel = React.createClass({
    displayName: 'MyGroupsPanel',
    getInitialState: function getInitialState() {
        return {
            groups: [],
            activeGroup: []
        };
    },
    componentWillMount: function componentWillMount() {
        console.log("MyGroupPanel:componentWillMount");
        var id = $('#id').val();
        var data = {
            userId: id
        };
        $.ajax({
            type: "POST",
            url: "/getGroupsList",
            data: data,
            success: (function (result) {
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        groups: result._embedded.tagDTOList,
                        activeGroup: result._embedded.tagDTOList[0]
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
    render: function render() {
        return React.createElement(
            'div',
            { id: 'my-groups-panel' },
            React.createElement(
                'div',
                { className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { id: 'delete-from-group-icon-heading', className: 'panel-heading' },
                    React.createElement(
                        'header',
                        { className: 'panel-title' },
                        React.createElement(
                            'div',
                            { className: 'text-center' },
                            React.createElement(
                                'strong',
                                null,
                                this.state.activeGroup.name
                            ),
                            React.createElement('span', { id: 'delete-from-group-icon', className: 'glyphicon glyphicon-trash pull-left delete-from-group' }),
                            React.createElement(
                                'a',
                                { href: '/myShortList', alt: 'Nodal view' },
                                React.createElement('span', { className: 'glyphicon glyphicon-new-window pull-right' })
                            )
                        )
                    )
                ),
                React.createElement(Group, { groupId: this.state.activeGroup.id })
            )
        );
    }
});

var Group = React.createClass({
    displayName: 'Group',
    getInitialState: function getInitialState() {
        return {
            data: []
        };
    },
    componentWillMount: function componentWillMount() {
        if (this.props.groupId != null) {
            this.prepareGroupList(this.props.groupId);
        }
    },
    prepareGroupList: function prepareGroupList(groupId) {
        console.log("Group:prepareGroupList");
        var data = {
            groupId: groupId
        };
        $.ajax({
            type: "POST",
            url: "/getGroupList",
            data: data,
            success: (function (result) {
                console.log(result);
                if (result._embedded.userDTOList != null && !$.isEmptyObject(result._embedded.userDTOList)) {
                    this.setState({ data: result._embedded.userDTOList });
                }
            }).bind(this),
            error: function error(_error2) {
                console.log("error: " + _error2.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    componentDidMount: function componentDidMount() {
        console.log("Group:componentDidMount: this.props.droppable=" + this.props.droppable);
        $(".source li").draggable({
            addClasses: false,
            appendTo: "#delete-from-group-icon",
            helper: "clone"
        });
        $("#delete-from-group-icon-heading").droppable({
            addClasses: false,
            accept: ":not(.ui-sortable-helper)",
            activate: function activate() {
                $("#delete-from-group-icon").attr("class", "glyphicon glyphicon-trash pull-left delete-from-group-icon-on delete-from-group");
            },
            deactivate: function deactivate() {
                $("#delete-from-group-icon").attr("class", "glyphicon glyphicon-trash pull-left  delete-from-group");
            },
            drop: (function (event, ui) {
                console.log("Delete from my group");
                // Add user to shortlist and update data
                var avatar = ui.draggable.find("img").attr("id");
                console.log("avatar: " + avatar);
                var id = $('#id').val();
                var data = {
                    id: id,
                    message: '',
                    groupId: this.props.groupId,
                    contacts: [{ id: avatar }]
                };
                data = JSON.stringify(data, null, ' ');
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: "/removeFromGroup",
                    data: data,
                    success: (function (result) {
                        console.log(result._embedded.userDTOList);
                        if (!$.isEmptyObject(result)) {
                            this.setState({ data: result._embedded.userDTOList });
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
        $(".panel-group-body-target").droppable({
            addClasses: false,
            disabled: this.props.droppable,
            /*activeClass: "listActive", */
            accept: ":not(#my-groups-panel li)",
            activate: function activate() {
                //    $(this).find(".placeholder").attr("class", "placeholderOn");
                $(this).attr("class", "panel-body panel-body-border-on panel-group-body-target");
            },
            deactivate: function deactivate() {
                //      $(this).find(".placeholderOn").attr("class", "placeholder");
                $(this).attr("class", "panel-body  panel-group-border-target");
            },
            drop: (function (event, ui) {
                // Add user to group and update data
                var avatar = ui.draggable.find("img").attr("id");
                console.log("avatar: " + avatar);
                var id = $('#id').val();
                var data = {
                    id: id,
                    message: '',
                    groupId: this.props.groupId,
                    contacts: [{ id: avatar }]
                };
                data = JSON.stringify(data, null, ' ');
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: "/addToGroup",
                    data: data,
                    success: (function (result) {
                        console.log(result._embedded.userDTOList);
                        if (!$.isEmptyObject(result)) {
                            this.setState({ data: result._embedded.userDTOList });
                        }
                    }).bind(this),
                    error: function error(_error4) {
                        console.log("error: " + _error4.toString());
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
            appendTo: "#delete-from-group-icon",
            helper: "clone"
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("Group:componentWillReceiveProps:nextProps");
        console.log(nextProps);
        if (nextProps.groupId != this.props.groupId) {
            this.prepareGroupList(nextProps.groupId);
        }
    },
    render: function render() {
        var AvatarNodes = this.state.data.map(function (user) {
            return React.createElement(Avatar, { key: user.id, id: user.id, username: user.avatar, name: user.firstName + ' ' + user.lastName, className: 'task-thumb' });
        });
        return React.createElement(
            'div',
            { className: 'panel-body panel-group-body-target' },
            React.createElement(
                'ul',
                { className: 'source' },
                AvatarNodes
            )
        );
    }
});