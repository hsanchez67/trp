"use strict";

var MessageResults = React.createClass({
    displayName: "MessageResults",

    getInitialState: function getInitialState() {
        return {
            toUser: this.props.toUser,
            fromUser: this.props.fromUser,
            subjectUser: this.props.subjectUser,
            loading: true,
            readOnly: this.props.readOnly,
            groupName: this.props.groupName,
            groupUsers: this.props.groupUsers
        };
    },
    componentDidUpdate: function componentDidUpdate() {
        // drag & drop
        $(".source li").draggable({
            addClasses: false,
            appendTo: "body",
            helper: "clone"
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("MessageResults:nextProps");
        console.log(nextProps);
        if (nextProps.toUser != this.props.toUser) {
            this.setState({
                toUser: nextProps.toUser
            });
        }
        if (nextProps.communication != this.props.communication) {
            this.setState({
                communication: nextProps.communication
            });
        }
        if (nextProps.fromUser != this.props.fromUser) {
            this.setState({
                fromUser: nextProps.fromUser
            });
        }
        if (nextProps.subjectUser != this.props.subjectUser) {
            this.setState({
                subjectUser: nextProps.subjectUser
            });
        }
        if (nextProps.readOnly != this.props.readOnly) {
            this.setState({
                readOnly: nextProps.readOnly
            });
        }
        if (nextProps.groupName != this.props.groupName) {
            this.setState({
                groupName: nextProps.groupName
            });
        }
        if (nextProps.groupUsers != this.props.groupUsers) {
            this.setState({
                groupUsers: nextProps.groupUsers
            });
        }
    },
    deleteMessage: function deleteMessage() {
        console.log('Delete Message:' + this.props.communication.id);
        var id = $('#id').val();
        var data = {
            id: id,
            commId: this.props.communication.id
        };
        $.ajax({
            type: "POST",
            url: "/deleteCommunication",
            data: JSON.stringify(data, null, ' '),
            success: function success(result) {
                console.log("Success deleted");
            },
            error: function error(_error) {
                console.log(_error);
                return false;
            },
            complete: function complete(e, xhr, settings) {
                console.log(e.status);
                if (e.status === 401) {
                    window.location.href = '/login';
                    console.log(e);
                } else {
                    window.location.href = '/inbox';
                }
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    goToProfile: function goToProfile() {
        window.location.href = '/profile/' + this.props.subjectUser.id;
    },
    replyToMessage: function replyToMessage() {
        window.location.href = '/replyToMessage/' + this.props.communication.id;
    },
    replyToGroup: function replyToGroup() {
        if (this.state.communication.groupId != null && this.state.groupUsers.length > 0) {
            var groupId = this.state.communication.groupId;
            var commId = this.state.communication.id;
            console.log("replyToGroup: " + groupId);
            window.location.href = '/replyMessageToGroup?group=' + groupId + '&comm=' + commId;
        } else {
            bootbox.alert("Group is empty or deleted!");
            return null;
        }
    },
    handleClose: function handleClose() {
        var closeUrl = $('#closeUrl').val();
        if (this.state.communication.status == 'Archived') {
            window.location.href = '/archive';
        } else if (this.state.communication.status == 'Deleted' || this.state.communication.status == 'Dejected') {
            window.location.href = '/deleted';
        } else if (this.state.communication.status == 'Accepted' || this.state.communication.status == 'Rejected') {
            window.location.href = '/inbox';
        } else if (closeUrl == "sent") {
            window.location.href = '/sent';
        } else {
            window.location.href = '/inbox';
        }
    },
    popoverContent: function popoverContent() {
        if (this.state.communication.groupId != null && this.state.groupUsers.length > 0) {
            var result = "";
            bootbox.dialog({
                title: this.state.groupName,
                message: '<div class="row">' + $('#avatar-nodes').html() + '</div>'
            });
        } else {
            bootbox.alert("Group is empty or deleted!");
        }
    },
    render: function render() {
        if ($.isEmptyObject(this.props.communication)) {
            return React.createElement(
                "div",
                { className: "panel panel-default", id: "inbox-panel" },
                React.createElement(
                    "div",
                    { className: "panel-heading" },
                    React.createElement(
                        "header",
                        { className: "panel-title" },
                        React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(
                                "strong",
                                null,
                                "Message from  "
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "div",
                        { className: "no-entries" },
                        React.createElement("i", { className: "fa fa-5x fa-cog fa-spin" })
                    )
                )
            );
        } else if (this.state.readOnly) {
            var created = new Date(this.props.communication.created);
            var hours = created.getHours();
            var minutes = created.getMinutes();
            var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
            var createdTime = $.datepicker.formatTime("h:mm tt", { hour: hours, minute: minutes }, {});
            var isGroupMessage = classNames({
                'fa fa-users hidden': this.props.communication.groupId == null,
                'fa fa-users': this.props.communication.groupId != null
            });
            if (this.state.groupUsers != null) {
                var AvatarNodes = this.state.groupUsers.map(function (user) {
                    return React.createElement(Avatar, { key: user.id, id: user.id, username: user.avatar, name: user.firstName + ' ' + user.lastName, className: "task-thumb" });
                });
                console.log("Group Avatars");
                console.log(AvatarNodes);
            }
            return React.createElement(
                "div",
                { className: "panel panel-default", id: "inbox-panel" },
                React.createElement(
                    "div",
                    { className: "panel-heading" },
                    React.createElement(
                        "header",
                        { className: "panel-title" },
                        React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(
                                "strong",
                                null,
                                "Message to  ",
                                this.props.toUser.firstName,
                                " ",
                                this.props.toUser.lastName
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { id: "avatar-nodes", className: "hidden" },
                    AvatarNodes
                ),
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "div",
                        { className: "col-md-12 message-timestamp" },
                        React.createElement(
                            "a",
                            { id: "group-popover", tabindex: "0", role: "button", "data-toggle": "popover" },
                            React.createElement(
                                "span",
                                { className: "margin-right-10" },
                                React.createElement("i", { className: isGroupMessage })
                            )
                        ),
                        createdDate,
                        " ",
                        createdTime
                    ),
                    React.createElement(
                        "div",
                        { className: "col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up" },
                        React.createElement(
                            "div",
                            { className: "input-type-logo" },
                            React.createElement("i", { className: "fa fa-envelope" })
                        ),
                        React.createElement(
                            "ul",
                            { className: "source" },
                            React.createElement(Avatar, { id: this.props.toUser.id, username: this.props.toUser.avatar, name: this.props.toUser.firstName + ' ' + this.props.toUser.lastName, className: "task-thumb" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-lg-10 col-md-10 col-sm-10 col-xs-12 text-left vert-align" },
                        React.createElement(
                            "span",
                            { className: "subject-line-label" },
                            "Subject Line:"
                        ),
                        React.createElement("br", null),
                        this.props.communication.subject
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel panel-default panel-white" },
                    React.createElement(
                        "div",
                        { className: "panel-body" },
                        React.createElement(
                            "div",
                            { id: "mainHtmlText", className: "col-lg-12" },
                            React.createElement(
                                "p",
                                { className: "mainText bottom10" },
                                React.createElement("div", { dangerouslySetInnerHTML: { __html: marked(this.props.communication.htmlText) } })
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel-footer text-right" },
                    React.createElement(
                        "button",
                        { type: "button", onClick: this.handleClose, className: "btn btn-sm btn-default" },
                        "Close"
                    )
                )
            );
        } else {
            var displayDeleteButton = classNames({
                'btn btn-sm btn-primary': this.props.communication.status != 'Deleted' && this.props.communication.status != 'Archive',
                'btn btn-sm btn-primary hidden': this.props.communication.status == 'Deleted' || this.props.communication.status == 'Archive'
            });
            var displayReplyToGroupButton = classNames({
                'btn btn-sm btn-primary': this.props.communication.groupId != null || this.props.communication.groupId != "",
                'btn btn-sm btn-primary hidden': this.props.communication.groupId == null || this.props.communication.groupId == ""
            });
            var isGroupMessage = classNames({
                'fa fa-users hidden': this.props.communication.groupId == null || this.props.communication.groupId == "",
                'fa fa-users': this.props.communication.groupId != null || this.props.communication.groupId != ""
            });
            var created = new Date(this.props.communication.created);
            var hours = created.getHours();
            var minutes = created.getMinutes();
            var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
            var createdTime = $.datepicker.formatTime("h:mm tt", { hour: hours, minute: minutes }, {});
            if (this.state.groupUsers != null) {
                var AvatarNodes = this.state.groupUsers.map(function (user) {
                    return React.createElement(Avatar, { key: user.id, id: user.id, username: user.avatar, name: user.firstName + ' ' + user.lastName, className: "task-thumb" });
                });
                console.log("Group Avatars");
                console.log(AvatarNodes);
            }
            return React.createElement(
                "div",
                { className: "panel panel-default", id: "inbox-panel" },
                React.createElement(
                    "div",
                    { className: "panel-heading" },
                    React.createElement(
                        "header",
                        { className: "panel-title" },
                        React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(
                                "strong",
                                null,
                                "Message from  ",
                                this.props.fromUser.firstName,
                                " ",
                                this.props.fromUser.lastName
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { id: "avatar-nodes", className: "hidden" },
                    AvatarNodes
                ),
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "div",
                        { className: "col-md-12 message-timestamp" },
                        React.createElement(
                            "a",
                            { id: "group-popover", tabindex: "0", role: "button", onClick: this.popoverContent },
                            React.createElement(
                                "span",
                                { className: "margin-right-10" },
                                React.createElement("i", { className: isGroupMessage })
                            )
                        ),
                        createdDate,
                        " ",
                        createdTime
                    ),
                    React.createElement(
                        "div",
                        { className: "col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up" },
                        React.createElement(
                            "div",
                            { className: "input-type-logo" },
                            React.createElement("i", { className: "fa fa-envelope" })
                        ),
                        React.createElement(
                            "ul",
                            { className: "source" },
                            React.createElement(Avatar, { id: this.props.fromUser.id, username: this.props.fromUser.avatar, name: this.props.fromUser.firstName + ' ' + this.props.fromUser.lastName, className: "task-thumb" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-lg-10 col-md-10 col-sm-10 col-xs-12 text-left vert-align" },
                        React.createElement(
                            "span",
                            { className: "subject-line-label" },
                            "Subject Line:"
                        ),
                        React.createElement("br", null),
                        this.props.communication.subject
                    )
                ),
                React.createElement(Attachments, { attachments: this.props.communication.attachedAssetIds }),
                React.createElement(
                    "div",
                    { className: "panel panel-default panel-white" },
                    React.createElement(
                        "div",
                        { className: "panel-body" },
                        React.createElement(
                            "div",
                            { id: "mainHtmlText", className: "col-lg-12" },
                            React.createElement(
                                "p",
                                { className: "mainText bottom10" },
                                React.createElement("div", { dangerouslySetInnerHTML: { __html: marked(this.props.communication.htmlText) } })
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel-footer text-right" },
                    React.createElement(
                        "button",
                        { type: "button", className: displayDeleteButton, onClick: this.deleteMessage },
                        React.createElement("i", { className: "fa fa-trash" }),
                        "  Delete"
                    ),
                    " ",
                    React.createElement(
                        "button",
                        { type: "button", onClick: this.goToProfile, className: "btn btn-sm btn-primary" },
                        React.createElement("i", { className: "fa fa-user" }),
                        "  See ",
                        this.props.subjectUser.firstName,
                        "'s Full Profile"
                    ),
                    " ",
                    React.createElement(
                        "button",
                        { type: "button", onClick: this.replyToMessage, className: "btn btn-sm btn-primary" },
                        React.createElement("i", { className: "fa fa-reply" }),
                        "  Reply To Message"
                    ),
                    " ",
                    React.createElement(
                        "button",
                        { type: "button", className: displayReplyToGroupButton, onClick: this.replyToGroup },
                        React.createElement("i", { className: "fa fa-reply-all" }),
                        "  Reply To Group"
                    ),
                    " ",
                    React.createElement(
                        "button",
                        { type: "button", onClick: this.handleClose, className: "btn btn-sm btn-default" },
                        "Close"
                    )
                )
            );
        }
    }
});

var Result = React.createClass({
    displayName: "Result",

    render: function render() {
        return React.createElement(
            "div",
            { className: "attachment-icon pull-left" },
            React.createElement(
                "a",
                { href: '/downloadFile/' + this.props.id, className: "btn btn-default" },
                React.createElement("i", { className: "fa fa-cloud-download", title: "Download", "aria-hidden": "true" }),
                React.createElement(
                    "span",
                    { className: "sr-only" },
                    "Download from cloud"
                )
            )
        );
    }
});

var Attachments = React.createClass({
    displayName: 'Attachments',
    getInitialState: function getInitialState() {
        return {
            attachments: this.props.attachments
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("Attachments:nextProps");
        console.log(nextProps);
        if (nextProps.attachments != this.props.attachments) {
            this.setState({ attachments: nextProps.attachments });
        }
    },
    render: function render() {
        if ($.isEmptyObject(this.state.attachments)) {
            return React.createElement("div", { className: "hidden" });
        } else {
            var attachments = [];
            var count = 0;
            this.state.attachments.forEach((function (record) {
                attachments.push(React.createElement(Result, { key: record, id: record, count: count++ }));
            }).bind(this));
            return React.createElement(
                "div",
                { className: "panel" },
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-lg-12 col-sm-12" },
                            attachments
                        )
                    )
                )
            );
        }
    }
});

var MessageContent = React.createClass({
    displayName: 'MessageContent',
    getInitialState: function getInitialState() {
        return {
            user: this.props.user,
            toUser: [],
            fromUser: [],
            subjectUser: [],
            communication: [],
            groupName: '',
            groupUsers: []
        };
    },
    loadCommunication: function loadCommunication(commId, readOnly) {
        var self = this;
        var data = {
            commId: commId,
            readOnly: readOnly
        };
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/getMessageById",
            data: data,
            success: function success(result) {
                self.setState({
                    communication: result.communication,
                    fromUser: result.fromUser,
                    toUser: result.toUser,
                    subjectUser: result.subjectUser,
                    readOnly: result.readOnly,
                    groupName: result.groupName,
                    groupUsers: result.users
                });
            },
            error: function error(_error2) {
                console.log(_error2);
                return false;
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    componentWillMount: function componentWillMount() {
        var commId = $('#commId').val();
        console.log(commId);
        var readOnly = $('#readOnly').val();
        this.loadCommunication(commId, readOnly);
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "col-lg-8" },
            React.createElement(
                "div",
                { id: "inbox-content-row", className: "row state-overview" },
                React.createElement(
                    "div",
                    { className: "row", id: "profile-content" },
                    React.createElement(
                        "div",
                        { className: "col-lg-12" },
                        React.createElement(MessageResults, { communication: this.state.communication, fromUser: this.state.fromUser, toUser: this.state.toUser, subjectUser: this.state.subjectUser, readOnly: this.state.readOnly, groupName: this.state.groupName, groupUsers: this.state.groupUsers })
                    )
                )
            )
        );
    }
});