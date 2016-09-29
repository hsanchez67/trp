"use strict";

var ConfirmationModal = React.createClass({
    displayName: "ConfirmationModal",

    render: function render() {
        var image1;
        if (this.props.username1 == '') {
            image1 = React.createElement("img", { id: "confirmationAvatar1", src: "../images/120px-blank.png", className: "contact-img img-circle" });
        } else if (this.props.username1 == 'default' && this.props.initials1 != '') {
            image1 = React.createElement(
                "div",
                { id: "confirmationAvatar1", className: "avatar-circle initials-confirmation-circle" },
                React.createElement("img", { className: "hidden", id: this.props.id }),
                React.createElement(
                    "span",
                    { className: "initials" },
                    this.props.initials1
                )
            );
        } else {
            image1 = React.createElement("img", { id: "confirmationAvatar1", src: '/api/remoteFiles/view/' + this.props.username1, className: "contact-img img-circle" });
        }
        var image2;
        if (this.props.username2 == '') {
            image2 = React.createElement("img", { id: "confirmationAvatar2", src: "../images/120px-blank.png", className: "contact-img img-circle" });
        } else if (this.props.username2 == 'default' && this.props.initials2 != '') {
            image2 = React.createElement(
                "div",
                { id: "confirmationAvatar2", className: "avatar-circle initials-confirmation-circle" },
                React.createElement("img", { className: "hidden", id: this.props.id }),
                React.createElement(
                    "span",
                    { className: "initials" },
                    this.props.initials2
                )
            );
        } else {
            image2 = React.createElement("img", { id: "confirmationAvatar2", src: '/api/remoteFiles/view/' + this.props.username2, className: "contact-img img-circle" });
        }
        var arrow1 = "";
        if (this.props.type == 'Introduction') {
            arrow1 = React.createElement(
                "span",
                { id: "arrow", "aria-hidden": "true" },
                React.createElement("i", { className: "fa fa-arrow-left" })
            );
        }
        var profession = "";
        if (this.props.profession != '') {
            image1 = "";
            profession = React.createElement(
                "h4",
                null,
                this.props.profession
            );
        }
        return React.createElement(
            "div",
            { id: "confirmationModal", className: "modal fade", role: "dialog", "aria-labelledby": "myModalLabel3", "aria-hidden": "true" },
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
                            "button",
                            { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close", onClick: this.props.handleHideModal },
                            React.createElement(
                                "span",
                                { "aria-hidden": "true" },
                                "×"
                            )
                        ),
                        React.createElement(
                            "h4",
                            { className: "modal-title" },
                            this.props.title
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-body" },
                        React.createElement(
                            "div",
                            { className: "text-center" },
                            image1,
                            profession,
                            arrow1,
                            React.createElement(
                                "span",
                                { id: "arrow", "aria-hidden": "true" },
                                React.createElement("i", { className: "fa fa-envelope" })
                            ),
                            React.createElement(
                                "span",
                                { id: "arrow", "aria-hidden": "true" },
                                React.createElement("i", { className: "fa fa-arrow-right" })
                            ),
                            image2
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-footer" },
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-default", "data-dismiss": "modal", onClick: this.props.handleHideModal },
                            "Close"
                        )
                    )
                )
            )
        );
    }
});