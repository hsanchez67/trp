"use strict";

var ContentForm = React.createClass({
    displayName: 'ContentForm',
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Header, null),
            React.createElement(
                "div",
                { className: "mainContent" },
                React.createElement(
                    "h1",
                    null,
                    "Your password has been reset!"
                ),
                React.createElement(
                    "p",
                    null,
                    "Use the login process to access your account"
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-primary btn-lg btn-block", onClick: this.goToLogin },
                    "Login"
                )
            ),
            React.createElement(Footer, null)
        );
    },
    goToLogin: function goToLogin() {
        window.location.href = "/login";
    }
});

ReactDOM.render(React.createElement(ContentForm, null), document.getElementById('content'));