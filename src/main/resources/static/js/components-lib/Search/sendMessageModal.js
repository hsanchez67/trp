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

var backgroundWhite = {
    backgroundColor: '#ffffff'
};

var SendMessageModal = React.createClass({
    displayName: "SendMessageModal",

    getInitialState: function getInitialState() {
        return {
            contacts: this.props.contacts,
            size: this.props.contacts.length
        };
    },
    componentDidMount: function componentDidMount() {
        console.log("Inside SendMessageModal");
        console.log(this.props.user);
        var options = {
            "backdrop": "static",
            "show": "true"
        };
        $(ReactDOM.findDOMNode(this)).modal(options);
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
        CKEDITOR.replace('includeMessage');
        if (this.props.review) {
            var html = "Dear [First Name],<br>I appreciate you taking the time to answer a few questions and give me feedback, I look forward to reading your remarks.<br> " + "<br>Here is a link to my review request form [Latch Link].<br>Sincererly,<br><br>" + this.props.user.firstName + " " + this.props.user.lastName;
            CKEDITOR.instances['includeMessage'].setData(html);
            $("#messageSubject").val("A review request from " + this.props.user.firstName + " " + this.props.user.lastName);
        }
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        CKEDITOR.instances.includeMessage.updateElement();
        var data = this.getFormData();
        data.users = this.props.contacts;
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
            console.log(formData);
            var results = [];
            $.ajax({
                type: "POST",
                url: "/sendMessage",
                async: true,
                data: formData,
                success: (function (result) {
                    console.log("Inside Success");
                    $("#sendingModal").modal('hide');
                    results = result;
                    console.log(results);
                    this.props.handleResults(results.users.length);
                    $("#closeButton").trigger('click');
                }).bind(this),
                error: function error(_error) {
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
    getFormData: function getFormData() {
        return {
            fromUserId: this.refs.id.getDOMNode().value,
            htmlText: '',
            text: '',
            subject: this.refs.messageSubject.getDOMNode().value,
            users: [],
            review: this.props.review
        };
    },
    removeUser: function removeUser(id) {
        console.log("sendMessageModal:removeUser:id");
        console.log(id);
        console.log(this.state.contacts);
        var filterUsers = this.state.contacts.filter(function (user) {
            return user.id != id;
        });
        console.log(filterUsers);
        this.setState({
            contacts: filterUsers,
            size: filterUsers.length
        });
        console.log(this.state.contacts);
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "modal fade" },
            React.createElement(
                "div",
                { className: "modal-dialog modal-lg" },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "form",
                        { onSubmit: this.handleSubmit },
                        React.createElement(
                            "div",
                            { className: "modal-header" },
                            React.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close", onClick: this.props.handleHideModal },
                                React.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "×"
                                )
                            ),
                            React.createElement(
                                "h5",
                                { className: "modal-title" },
                                React.createElement(
                                    "strong",
                                    null,
                                    "You selected ",
                                    this.state.size,
                                    " contacts."
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { id: "send-message-modal-body", className: "modal-body" },
                            React.createElement("input", { type: "hidden", ref: "id", name: "id", value: this.props.user.id }),
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
                                            { className: "panel-body", style: backgroundWhite },
                                            React.createElement(
                                                "div",
                                                { id: "contacts-region" },
                                                React.createElement(PillList, { contacts: this.state.contacts, removeUser: this.removeUser.bind(this) })
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
                                            { className: "panel-body", style: backgroundWhite },
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
                                            { className: "panel-body", style: backgroundWhite },
                                            React.createElement(
                                                "div",
                                                { className: "row" },
                                                React.createElement("textarea", { id: "includeMessage", name: "includeMessage", ref: "includeMessage", className: "form-control", rows: "10" })
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement("div", { className: "errorMessage", id: "validationError" }),
                            React.createElement(SendingModal, null)
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-footer" },
                            React.createElement(
                                "button",
                                { type: "submit", className: "btn btn-primary" },
                                React.createElement("i", { id: "send-intro-icon", className: "fa fa-envelope " }),
                                "  Send Message"
                            ),
                            React.createElement(
                                "button",
                                { id: "closeButton", type: "button", className: "btn btn-default", "data-dismiss": "modal", onClick: this.props.handleHideModal },
                                "Cancel"
                            )
                        )
                    )
                )
            )
        );
    },
    propTypes: {
        handleHideModal: React.PropTypes.func.isRequired
    }
});

var PillList = React.createClass({
    displayName: "PillList",

    removeUser: function removeUser(id) {
        this.props.removeUser(id);
    },
    render: function render() {
        var createContact = (function (contact) {
            console.log(contact);
            var name = contact.firstName + ' ' + contact.lastName;
            return React.createElement(
                PillName,
                { key: contact.id, id: contact.id, removeUser: this.removeUser.bind(this) },
                name
            );
        }).bind(this);
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
            name: this.props.children,
            id: this.props.id
        };
    },
    handleClick: function handleClick(elem) {},
    removeUser: function removeUser() {
        this.props.removeUser(this.state.id);
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
            ),
            React.createElement(
                "button",
                { type: "button", className: "close", "aria-label": "Remove", onClick: this.removeUser },
                React.createElement(
                    "span",
                    { "aria-hidden": "true" },
                    "×"
                )
            )
        );
    }
});