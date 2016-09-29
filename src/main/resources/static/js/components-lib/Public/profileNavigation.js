"use strict";

var ProfileNavigation = React.createClass({
    displayName: "ProfileNavigation",

    render: function render() {
        return React.createElement(
            "div",
            { id: "navigation", className: "Header-nav", role: "navigation" },
            React.createElement(
                "a",
                { className: "Navigation-link", href: "/#team", onClick: "" },
                "About"
            ),
            React.createElement(
                "a",
                { className: "Navigation-link", href: "/#footer", onClick: "" },
                "Contact"
            ),
            React.createElement(
                "span",
                { className: "Navigation-spacer" },
                " | "
            ),
            React.createElement(
                "a",
                { className: "Navigation-link", href: "/login" },
                "Log in"
            ),
            React.createElement(
                "span",
                { className: "Navigation-spacer" },
                "or"
            ),
            React.createElement(
                "a",
                { className: "Navigation-link Navigation-link--highlight", href: "/register", onClick: "" },
                "Sign up"
            )
        );
    }

});