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
                    "Congratulations!"
                ),
                React.createElement(
                    "p",
                    null,
                    "You account is now active"
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-primary btn-lg btn-block", onClick: this.goHome },
                    "Login now"
                )
            ),
            React.createElement(Footer, null)
        );
    },

    goHome: function goHome() {
        window.location.href = "/login";
    }
});

ReactDOM.render(React.createElement(ContentForm, null), document.getElementById('content'));