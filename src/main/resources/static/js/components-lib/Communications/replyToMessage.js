"use strict";

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
                            "Your message is processing."
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

var ReplyToMessage = React.createClass({
    displayName: 'ReplyToMessage',
    getInitialState: function getInitialState() {
        return {
            user: [],
            profileData: [],
            contacts: [],
            addToCurrentGroup: '',
            groupId: '',
            communication: [],
            cancelUrl: ''
        };
    },
    componentDidMount: function componentDidMount() {
        var id = $('#id').val();
        var fromUserId = $('#fromUserId').val();
        var commId = $('#commId').val();
        var groupId = $('#groupId').val();
        if (groupId === "") {
            console.log("ReplyToMessage:componentDidMount:groupId empty");
            var data = {
                id: id,
                fromUserId: fromUserId,
                commId: commId
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/beforeReplyToMessage",
                data: formData,
                success: (function (result) {
                    console.log("ReplyToMessage:componentDidMount:success:result:");
                    console.log(result);
                    if (!$.isEmptyObject(result)) {
                        this.setState({
                            user: result.user,
                            profileData: result.users[0],
                            contacts: result.users,
                            communication: result.communication,
                            cancelUrl: result.cancelUrl
                        });
                        CKEDITOR.replace('includeMessage');
                        var created = new Date(result.communication.created);
                        var hours = created.getHours();
                        var minutes = created.getMinutes();
                        var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
                        var createdTime = $.datepicker.formatTime("h:mm tt", { hour: hours, minute: minutes }, {});
                        var html = '<p></p><p>' + this.state.profileData.firstName + ' ' + this.state.profileData.lastName + ' wrote on ' + createdDate + ' ' + createdTime + '</p>';
                        html = html + this.state.communication.htmlText;
                        console.log(html);
                        CKEDITOR.instances['includeMessage'].setData(html);
                        $('#messageSubject').val(this.state.communication.subject);
                    }
                }).bind(this),
                error: function error(_error) {
                    console.log("error: " + _error.toString());
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else if (groupId !== "") {
            console.log("ReplyToMessage:componentDidMount:groupId not empty");
            var data = {
                id: id,
                fromUserId: fromUserId,
                commId: commId,
                groupId: groupId
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/beforeReplyToGroupMessage",
                data: formData,
                success: (function (result) {
                    console.log("ReplyToGroupMessage:componentDidMount:success:result:");
                    console.log(result);
                    if (!$.isEmptyObject(result)) {
                        this.setState({
                            user: result.user,
                            profileData: result.fromUser,
                            contacts: result.users,
                            communication: result.communication,
                            groupId: result.groupId,
                            cancelUrl: result.cancelUrl
                        });
                        CKEDITOR.replace('includeMessage');
                        var created = new Date(result.communication.created);
                        var hours = created.getHours();
                        var minutes = created.getMinutes();
                        var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
                        var createdTime = $.datepicker.formatTime("h:mm tt", { hour: hours, minute: minutes }, {});
                        var html = '<p></p><p>' + this.state.profileData.firstName + ' ' + this.state.profileData.lastName + ' wrote on ' + createdDate + ' ' + createdTime + '</p>';
                        html = html + this.state.communication.htmlText;
                        console.log(html);
                        CKEDITOR.instances['includeMessage'].setData(html);
                        $('#messageSubject').val(this.state.communication.subject);
                    }
                }).bind(this),
                error: function error(_error2) {
                    console.log("error: " + _error2.toString());
                },
                dataType: "json",
                contentType: "application/json"
            });
        }
    },
    handleCancel: function handleCancel(e) {
        window.location.href = this.state.cancelUrl;
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        CKEDITOR.instances.includeMessage.updateElement();
        var data = this.getFormData();
        data.users = this.state.contacts;
        data.htmlText = CKEDITOR.instances['includeMessage'].getData();

        // create plain text
        var html = CKEDITOR.instances.includeMessage.getSnapshot();
        var dom = document.createElement("DIV");
        dom.innerHTML = html;
        var plain_text = dom.textContent || dom.innerText;
        data.text = plain_text;
        data.text = data.text;
        if (data.htmlText != '' && data.subject != '') {
            $("#sendingModal").modal('show');
            var formData = JSON.stringify(data, null, ' ');
            console.log("replyToMessage:handleSubmit:formData");
            console.log(formData);
            var results = [];
            $.ajax({
                type: "POST",
                url: "/sendMessage",
                async: true,
                data: formData,
                success: (function (result) {
                    if (result.error != null) {
                        document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> There was a problem!</label></div>";
                        $('#validationError').show();
                        setTimeout(function () {
                            $("#validationError").fadeOut();
                        }, 5000);
                        return null;
                    } else {
                        console.log("Inside Success");
                        $("#sendingModal").modal('hide');
                        results = result;
                        console.log(results);
                        this.handleResults(results.users.length);
                    }
                }).bind(this),
                error: function error(_error3) {
                    alert('Create import error message');
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Please include a subject and a message!</label></div>";
            $('#validationError').show();
            setTimeout(function () {
                $("#validationError").fadeOut();
            }, 5000);
            return null;
        }
    },
    handleResults: function handleResults(results) {
        console.log("In handleResults");
        console.log(results);
        if (results > 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> You successfully sent message to " + results + " contact(s)!</label></div>";
            setTimeout(function () {
                $("#content-results").fadeOut();
            }, 5000);
            setTimeout(function () {
                window.location.href = '/inbox';
            }, 5000);
        } else {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> Heads up! Something went wrong, please try again!</label></div>";
        }
    },
    getFormData: function getFormData() {
        return {
            fromUserId: this.refs.id.getDOMNode().value,
            htmlText: '',
            text: '',
            subject: this.refs.messageSubject.getDOMNode().value,
            users: [],
            status: 'Reply',
            groupId: this.state.groupId
        };
    },
    handleAddUserToCurrentGroup: function handleAddUserToCurrentGroup(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(HeaderResponsiveIn, { user: this.state.user, handleAddUserToCurrentGroup: this.handleAddUserToCurrentGroup }),
            React.createElement(Banner, null),
            React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { id: "main" },
                    React.createElement(
                        "ol",
                        { className: "breadcrumb" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            " "
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row profile-row", id: "inbox-content" },
                        React.createElement(
                            "div",
                            { className: "col-lg-8" },
                            React.createElement(
                                "form",
                                { onSubmit: this.handleSubmit },
                                React.createElement(
                                    "div",
                                    { id: "inbox-content-row", className: "row state-overview" },
                                    React.createElement(
                                        "div",
                                        { className: "row", id: "profile-content" },
                                        React.createElement(
                                            "div",
                                            { className: "col-lg-12" },
                                            React.createElement(
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
                                                                "Reply To Message"
                                                            )
                                                        )
                                                    )
                                                ),
                                                React.createElement(
                                                    "div",
                                                    { className: "panel-body" },
                                                    React.createElement("input", { type: "hidden", ref: "id", name: "id", value: this.state.user.id }),
                                                    React.createElement(
                                                        "div",
                                                        { className: "row" },
                                                        React.createElement(
                                                            "div",
                                                            { id: "contacts-region-container", className: "col-md-12" },
                                                            React.createElement(
                                                                "div",
                                                                { className: "panel" },
                                                                React.createElement(
                                                                    "div",
                                                                    { className: "panel-body" },
                                                                    React.createElement(
                                                                        "div",
                                                                        { id: "contacts-region" },
                                                                        React.createElement(PillList, { contacts: this.state.contacts })
                                                                    )
                                                                )
                                                            )
                                                        ),
                                                        React.createElement(
                                                            "div",
                                                            { className: "col-md-12" },
                                                            React.createElement(
                                                                "div",
                                                                { className: "panel" },
                                                                React.createElement(
                                                                    "div",
                                                                    { className: "panel-body" },
                                                                    React.createElement(
                                                                        "div",
                                                                        { className: "row" },
                                                                        React.createElement("input", { type: "text", className: "form-control", id: "messageSubject", name: "messageSubject", ref: "messageSubject", placeholder: "Subject Line" })
                                                                    )
                                                                )
                                                            )
                                                        ),
                                                        React.createElement(
                                                            "div",
                                                            { className: "col-md-12" },
                                                            React.createElement(
                                                                "div",
                                                                { className: "panel" },
                                                                React.createElement(
                                                                    "div",
                                                                    { className: "panel-body" },
                                                                    React.createElement(
                                                                        "div",
                                                                        { className: "row" },
                                                                        React.createElement("textarea", { id: "includeMessage", name: "includeMessage", ref: "includeMessage", className: "form-control", rows: "10" })
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                ),
                                                React.createElement(
                                                    "div",
                                                    { className: "panel-footer text-right" },
                                                    React.createElement(
                                                        "button",
                                                        { type: "submit", className: "btn btn-primary btn-space" },
                                                        React.createElement("i", { id: "send-intro-icon", className: "fa fa-envelope " }),
                                                        "  Send Message"
                                                    ),
                                                    React.createElement(
                                                        "button",
                                                        { type: "button", onClick: this.handleCancel, className: "btn btn-default btn-space" },
                                                        "Cancel"
                                                    )
                                                ),
                                                React.createElement(
                                                    "div",
                                                    { className: "row" },
                                                    React.createElement(
                                                        "div",
                                                        { className: "col-md-12" },
                                                        React.createElement("div", { id: "content-results" })
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(SendingModal, null)
                        ),
                        React.createElement(
                            "div",
                            { className: "col-lg-4" },
                            React.createElement(MyShortListPanel, { droppable: true, addToCurrentGroup: this.state.addToCurrentGroup }),
                            React.createElement(NavigationPanel, null)
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

var PillList = React.createClass({
    displayName: "PillList",

    render: function render() {
        var createContact = function createContact(contact) {
            console.log(contact);
            var name = contact.firstName + ' ' + contact.lastName;
            return React.createElement(
                PillName,
                { key: contact.id },
                name
            );
        };
        return React.createElement(
            "ul",
            null,
            this.props.contacts.map(createContact)
        );
    }
});

var PillName = React.createClass({
    displayName: "PillName",

    getInitialState: function getInitialState() {
        return {
            active: false,
            name: this.props.children
        };
    },
    render: function render() {
        var selectedClass = classNames({
            'pill selected': this.state.active,
            'pill': !this.state.active
        });
        return React.createElement(
            "li",
            { className: selectedClass },
            React.createElement(
                "span",
                { className: "pill-name" },
                this.props.children
            )
        );
    }
});

ReactDOM.render(React.createElement(ReplyToMessage, null), document.getElementById('content'));