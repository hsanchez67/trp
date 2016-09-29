"use strict";

var ReferralRequestResult = React.createClass({
    displayName: 'ReferralRequestResult',
    getInitialState: function getInitialState() {
        return {
            toUser: this.props.toUser,
            fromUser: this.props.fromUser,
            subjectUser: this.props.subjectUser,
            communication: this.props.communication,
            readOnly: this.props.readOnly
        };
    },
    componentDidMount: function componentDidMount() {
        // drag & drop
        $(".source li").draggable({
            addClasses: false,
            appendTo: "body",
            helper: "clone"
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("ReferralRequestResult:nextProps");
        console.log(nextProps);
        if (nextProps.toUser != this.props.toUser) {
            this.setState({
                toUser: nextProps.toUser
            });
        }
        if (nextProps.subjectUser != this.props.subjectUser) {
            this.setState({
                subjectUser: nextProps.subjectUser
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
        if (nextProps.readOnly != this.props.readOnly) {
            this.setState({
                readOnly: nextProps.readOnly
            });
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
    replyToMessage: function replyToMessage() {
        window.location.href = '/replyToMessage/' + this.props.communication.id;
    },
    acceptReferral: function acceptReferral() {
        var data = {
            toUserId: this.state.toUser.id,
            users: [this.state.subjectUser],
            commId: this.state.communication.id
        };
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $("#sendingModal").modal('show');
        $.ajax({
            type: "POST",
            url: "/acceptReferral",
            data: formData,
            success: function success(result) {
                console.log("ReferralRequestResult:acceptReferral:success:result:");
                console.log(result);
                if (result.communication.status == "Accepted") {
                    $('#acceptReferral').addClass('disabled');
                    $('#rejectReferral').addClass('disabled');
                    $('#sendMessageTo').removeClass('hidden');
                    $('#displayLatchedLogo').removeClass('hidden');
                    $("#sendingModal").modal('hide');
                }
            },
            error: function error(_error) {
                console.log("error: " + _error.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    rejectReferral: function rejectReferral() {
        var data = {
            toUserId: this.state.toUser.id,
            users: [this.state.subjectUser],
            commId: this.state.communication.id
        };
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $("#sendingModal").modal('show');
        $.ajax({
            type: "POST",
            url: "/rejectReferral",
            data: formData,
            success: function success(result) {
                console.log("ReferralRequestResult:rejectReferral:success:result:");
                console.log(result);
                if (result.communication.status == "Rejected") {
                    $('#rejectReferral').addClass('disabled');
                    $('#acceptReferral').addClass('disabled');
                    $('#displayNotLatchedLogo').removeClass('hidden');
                    $("#sendingModal").modal('hide');
                }
            },
            error: function error(_error2) {
                console.log("error: " + _error2.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    sendMessage: function sendMessage() {
        window.location.href = '/sendMessage/' + this.props.subjectUser.id;
    },
    render: function render() {
        if ($.isEmptyObject(this.props.communication)) {
            return React.createElement(
                "div",
                { className: "no-entries" },
                React.createElement("i", { className: "fa fa-5x fa-cog fa-spin" })
            );
        } else if (this.state.readOnly) {
            var displayLatchedLogo = classNames({
                'pull-right hidden': this.props.communication.status != 'Accepted' && this.props.communication.status != 'Archived',
                'pull-right': this.props.communication.status == 'Accepted' || this.props.communication.status == 'Archived'
            });
            var displayNotLatchedLogo = classNames({
                'pull-right hidden': this.props.communication.status != 'Rejected' && this.props.communication.status != 'Dejected',
                'pull-right': this.props.communication.status == 'Rejected' || this.props.communication.status == 'Dejected'
            });
            var displayReasonNote = classNames({
                'text-left col-md-12 hidden': this.props.communication.noteSwitch == false || this.props.communication.noteSwitch == null,
                'text-left col-md-12': this.props.communication.noteSwitch == true || this.props.communication.noteSwitch != null
            });
            var created = new Date(this.props.communication.created);
            var hours = created.getHours();
            var minutes = created.getMinutes();
            var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
            var createdTime = $.datepicker.formatTime("h:mm tt", { hour: hours, minute: minutes }, {});
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
                                "A referral from ",
                                this.props.fromUser.firstName,
                                " ",
                                this.props.fromUser.lastName,
                                " to ",
                                this.props.toUser.firstName,
                                " ",
                                this.props.toUser.lastName
                            ),
                            React.createElement(
                                "div",
                                { id: "displayLatchedLogo", className: displayLatchedLogo },
                                React.createElement("img", { className: "latched-icon img-responsive", src: "/images/LATCHED-Logo.png", alt: "Latched" })
                            ),
                            React.createElement(
                                "div",
                                { id: "displayNotLatchedLogo", className: displayNotLatchedLogo },
                                React.createElement("img", { className: "latched-icon img-responsive", src: "/images/LATCHED-X-Logo_updated.png", alt: "Latched" })
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-12 message-timestamp" },
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
                                React.createElement("i", { className: "fa fa-arrow-right" })
                            ),
                            React.createElement(
                                "ul",
                                { className: "source" },
                                React.createElement(Avatar, { id: this.props.fromUser.id, username: this.props.fromUser.avatar, name: this.props.fromUser.firstName + ' ' + this.props.fromUser.lastName, className: "task-thumb" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left" },
                            React.createElement(
                                "div",
                                { className: "subject-text-div" },
                                React.createElement(
                                    "span",
                                    { className: "headerSubjectText" },
                                    this.props.fromUser.firstName,
                                    " ",
                                    this.props.fromUser.lastName,
                                    " wrote:"
                                ),
                                " ",
                                React.createElement(
                                    "span",
                                    { className: "subjectText" },
                                    this.props.communication.subject
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "mainText" },
                                React.createElement("div", { dangerouslySetInnerHTML: { __html: marked(this.props.communication.htmlText) } })
                            )
                        ),
                        React.createElement(
                            "div",
                            { id: "reason-note", className: displayReasonNote },
                            React.createElement(
                                "strong",
                                null,
                                "Re: "
                            ),
                            this.props.communication.note
                        )
                    ),
                    React.createElement(ProfileIntro, { profile: this.props.subjectUser })
                ),
                React.createElement("input", { type: "hidden", ref: "userId", id: "userId", name: "userId", value: this.props.toUser.id }),
                React.createElement(
                    "div",
                    { className: "panel-footer text-right" },
                    React.createElement(
                        "button",
                        { type: "button", onClick: this.handleClose, className: "btn btn-sm btn-default btn-space" },
                        "Close"
                    )
                )
            );
        } else {
            var latchedClass = classNames({
                'btn btn-sm btn-primary btn-space': this.props.communication.status != 'Accepted' && this.props.communication.status != 'Rejected',
                'btn btn-sm btn-primary btn-space disabled': this.props.communication.status == 'Accepted' || this.props.communication.status == 'Rejected'
            });
            var displayLatchedLogo = classNames({
                'pull-right hidden': this.props.communication.status != 'Accepted' && this.props.communication.status != 'Archived',
                'pull-right': this.props.communication.status == 'Accepted' || this.props.communication.status == 'Archived'
            });
            var displaySendMessageButton = classNames({
                'btn btn-sm btn-primary btn-space hidden': this.props.communication.status != 'Accepted',
                'btn btn-sm btn-primary btn-space': this.props.communication.status == 'Accepted'
            });
            var displayNotLatchedLogo = classNames({
                'pull-right hidden': this.props.communication.status != 'Rejected' && this.props.communication.status != 'Dejected',
                'pull-right': this.props.communication.status == 'Rejected' || this.props.communication.status == 'Dejected'
            });
            var displayReasonNote = classNames({
                'text-left col-md-12 hidden': this.props.communication.noteSwitch == false || this.props.communication.noteSwitch == null,
                'text-left col-md-12': this.props.communication.noteSwitch == true || this.props.communication.noteSwitch != null
            });
            var created = new Date(this.props.communication.created);
            var hours = created.getHours();
            var minutes = created.getMinutes();
            var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
            var createdTime = $.datepicker.formatTime("h:mm tt", { hour: hours, minute: minutes }, {});
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
                                "A referral from ",
                                this.props.fromUser.firstName,
                                " ",
                                this.props.fromUser.lastName
                            ),
                            React.createElement(
                                "div",
                                { id: "displayLatchedLogo", className: displayLatchedLogo },
                                React.createElement("img", { className: "latched-icon img-responsive", src: "/images/LATCHED-Logo.png", alt: "Latched" })
                            ),
                            React.createElement(
                                "div",
                                { id: "displayNotLatchedLogo", className: displayNotLatchedLogo },
                                React.createElement("img", { className: "latched-icon img-responsive", src: "/images/LATCHED-X-Logo_updated.png", alt: "Latched" })
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-12 message-timestamp" },
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
                                React.createElement("i", { className: "fa fa-arrow-right" })
                            ),
                            React.createElement(
                                "ul",
                                { className: "source" },
                                React.createElement(Avatar, { id: this.props.fromUser.id, username: this.props.fromUser.avatar, className: "task-thumb" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-lg-10 col-md-10 col-sm-10 col-xs-12 text-left" },
                            React.createElement(
                                "div",
                                { className: "subject-text-div" },
                                React.createElement(
                                    "span",
                                    { className: "headerSubjectText" },
                                    this.props.fromUser.firstName,
                                    " ",
                                    this.props.fromUser.lastName,
                                    " wrote:"
                                ),
                                " ",
                                React.createElement(
                                    "span",
                                    { className: "subjectText" },
                                    this.props.communication.subject
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "mainText" },
                                React.createElement("div", { dangerouslySetInnerHTML: { __html: marked(this.props.communication.htmlText) } })
                            )
                        ),
                        React.createElement(
                            "div",
                            { id: "reason-note", className: displayReasonNote },
                            React.createElement(
                                "strong",
                                null,
                                "Re: "
                            ),
                            this.props.communication.note
                        )
                    ),
                    React.createElement(ProfileIntro, { profile: this.props.subjectUser })
                ),
                React.createElement(Attachments, { attachments: this.props.communication.attachedAssetIds }),
                React.createElement("input", { type: "hidden", ref: "userId", id: "userId", name: "userId", value: this.props.toUser.id }),
                React.createElement(
                    "div",
                    { className: "panel-footer text-right" },
                    React.createElement(
                        "button",
                        { id: "acceptReferral", type: "button", onClick: this.acceptReferral, className: latchedClass },
                        "Accept Referral"
                    ),
                    React.createElement(
                        "button",
                        { id: "rejectReferral", type: "button", onClick: this.rejectReferral, className: latchedClass },
                        "Reject Referral"
                    ),
                    React.createElement(
                        "button",
                        { type: "button", onClick: this.replyToMessage, className: "btn btn-sm btn-primary btn-space" },
                        React.createElement("i", { className: "fa fa-reply" }),
                        "  Reply To ",
                        this.props.fromUser.firstName
                    ),
                    React.createElement(
                        "button",
                        { id: "sendMessageTo", type: "button", onClick: this.sendMessage, className: displaySendMessageButton },
                        React.createElement("i", { className: "fa fa-envelope" }),
                        "  Send Message To ",
                        this.props.subjectUser.firstName
                    ),
                    React.createElement(
                        "button",
                        { type: "button", onClick: this.handleClose, className: "btn btn-sm btn-default btn-space" },
                        "Close"
                    )
                )
            );
        }
        return React.createElement("div", null);
    }
});

var SendingModal = React.createClass({
    displayName: "SendingModal",

    render: function render() {
        return React.createElement(
            "div",
            { id: "sendingModal", className: "modal fade", role: "dialog", "aria-labelledby": "myModalLabel3", "aria-hidden": "true" },
            React.createElement(
                "div",
                { className: "modal-dialog" },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "div",
                        { className: "modal-header text-center" },
                        React.createElement(
                            "h4",
                            { className: "modal-title" },
                            "Processing your request"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-body" },
                        React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement("i", { className: "fa fa-5x fa-cog fa-spin" })
                        )
                    )
                )
            )
        );
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

var ReferralRequestContent = React.createClass({
    displayName: 'ReferralRequestContent',
    getInitialState: function getInitialState() {
        return {
            toUser: [],
            fromUser: [],
            subjectUser: [],
            communication: [],
            readOnly: false
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
                console.log(result);
                self.setState({
                    communication: result.communication,
                    fromUser: result.fromUser,
                    toUser: result.toUser,
                    subjectUser: result.subjectUser,
                    readOnly: result.readOnly
                });
            },
            error: function error(_error3) {
                console.log(_error3);
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
                        React.createElement(ReferralRequestResult, { toUser: this.state.toUser, subjectUser: this.state.subjectUser, fromUser: this.state.fromUser, communication: this.state.communication, readOnly: this.state.readOnly })
                    )
                )
            )
        );
    }
});