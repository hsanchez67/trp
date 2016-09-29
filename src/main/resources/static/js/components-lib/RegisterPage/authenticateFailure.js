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
                    "Couldn't authenticate your account!"
                ),
                React.createElement(
                    "p",
                    null,
                    "Try again or please contact us"
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