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
                    "Help is on its way!"
                ),
                React.createElement(
                    "p",
                    null,
                    "Please check your email for a link to verify your account"
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-primary btn-lg btn-block", onClick: this.goHome },
                    "Home"
                )
            ),
            React.createElement(Footer, null)
        );
    },

    goHome: function goHome() {
        window.location.href = "/";
    }
});

ReactDOM.render(React.createElement(ContentForm, null), document.getElementById('content'));