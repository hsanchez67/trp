"use strict";

var NewContactsModal = React.createClass({
    displayName: "NewContactsModal",

    getInitialState: function getInitialState() {
        return {
            contacts: this.props.contacts,
            size: this.props.contacts.length
        };
    },
    componentDidMount: function componentDidMount() {
        console.log("Inside NewContactsModal");
        console.log(this.props.user);
        var options = {
            "backdrop": "static",
            "show": "true"
        };
        $(ReactDOM.findDOMNode(this)).modal(options);
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
        CKEDITOR.replace('includeMessage', {
            removePlugins: 'toolbar',
            allowedContent: 'p h1 h2 strong em; a[!href]; img[!src,width,height];'
        });

        var html = "<div style='width:100%; margin:0 auto;'><img src='/api/remoteFiles/view/b101469c-885b-4139-bace-0b815bfc02db'></div>Congratulations! You've been invited by " + this.props.user.firstName + " " + this.props.user.lastName + "  to join " + "the premier network of real estate and home services professionals.<br><br>Click here to activate your free membership: " + "[Activation Link]";
        CKEDITOR.instances['includeMessage'].setData(html);
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var data = this.getFormData();
        data.contacts = this.props.contacts;
        data.message = CKEDITOR.instances['includeMessage'].getData();
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        var results = [];
        $.ajax({
            type: "POST",
            url: "/importContacts",
            async: true,
            data: formData,
            success: (function (result) {
                console.log("Inside Success");
                results = result;
                console.log(results);
                this.props.handleResults(results.contacts.length);
                $("#closeButton").trigger('click');
            }).bind(this),
            error: function error(_error) {
                alert('Create import error message');
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    getFormData: function getFormData() {
        return {
            id: this.refs.id.getDOMNode().value,
            message: '',
            contacts: []
        };
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
                            { className: "modal-body" },
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
                                                React.createElement("textarea", { id: "includeMessage", name: "includeMessage", ref: "includeMessage", className: "form-control", rows: "10" })
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-footer" },
                            React.createElement(
                                "button",
                                { type: "submit", className: "btn btn-primary" },
                                "Submit"
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

    render: function render() {
        var createContact = function createContact(contact) {
            console.log(contact);
            return React.createElement(
                PillName,
                null,
                contact.firstName
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
    handleClick: function handleClick(elem) {
        /*   $('#contacts-region li.pill').each(function() {
               $(this).removeClass('selected');
           });
           if (this.state.active) {
               this.setState({active: false});
           } else {
               this.setState({active: true});
           }
           */
    },
    handleRemove: function handleRemove() {
        console.log(this.props.children);
    },
    render: function render() {
        var selectedClass = classNames({
            'pill selected': this.state.active,
            'pill': !this.state.active
        });
        return(
            /*<li className={selectedClass} onClick={this.handleClick.bind(this)}><span className="pill-name">{this.props.children}</span><RemoveContactButton clickHandler={this.handleRemove} /></li> */
            React.createElement(
                "li",
                { className: selectedClass, onClick: this.handleClick.bind(this) },
                React.createElement(
                    "span",
                    { className: "pill-name" },
                    this.props.children
                )
            )
        );
    }
});

var RemoveContactButton = React.createClass({
    displayName: "RemoveContactButton",

    render: function render() {
        return React.createElement(
            "button",
            { type: "button", className: "close", "aria-label": "Remove", onClick: this.props.clickHandler },
            React.createElement(
                "span",
                { "aria-hidden": "true" },
                "×"
            )
        );
    }
});