"use strict";

var ProfileHeaderIn = React.createClass({ displayName: 'ProfileHeaderIn',
    handleLogoClick: function handleLogoClick() {
        window.location.href = "/";
    },
    render: function render() {
        return React.createElement(
            "div",
            { id: "wrapper" },
            React.createElement(
                "div",
                { className: "header-top" },
                React.createElement(
                    "nav",
                    { className: "navbar navbar-inverse navbar-fixed-top", role: "navigation" },
                    React.createElement(
                        "div",
                        { className: "container" },
                        React.createElement(
                            "div",
                            { className: "navbar-header" },
                            React.createElement(
                                "button",
                                { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", "aria-expanded": "false", "aria-controls": "navbar" },
                                React.createElement(
                                    "span",
                                    { className: "sr-only" },
                                    "Toggle navigation"
                                ),
                                React.createElement("span", { className: "icon-bar" }),
                                React.createElement("span", { className: "icon-bar" }),
                                React.createElement("span", { className: "icon-bar" })
                            ),
                            React.createElement(
                                "a",
                                { className: "navbar-brand", onClick: this.handleLogoClick },
                                React.createElement(Logo, null)
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "collapse navbar-collapse", id: "navbar-collapse-1" },
                            React.createElement(
                                "ul",
                                { className: "nav navbar-nav navbar-right top-menu hidden-xs" },
                                React.createElement(
                                    "li",
                                    { className: "hidden-xs" },
                                    React.createElement(NavSearch, null)
                                ),
                                React.createElement(
                                    "li",
                                    { className: "hidden-xs" },
                                    React.createElement("span", { className: "glyphicon glyphicon-search search marginRight50", "aria-hidden": "true" })
                                ),
                                React.createElement(
                                    "li",
                                    { className: "hidden-xs" },
                                    React.createElement(
                                        "span",
                                        { className: "label" },
                                        this.props.user.firstName,
                                        " ",
                                        this.props.user.lastName
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    { className: "hidden-xs" },
                                    React.createElement(
                                        "a",
                                        { className: "pointer", onClick: this.gotoProfile },
                                        React.createElement("img", { alt: "", className: "img-circle", src: '/api/remoteFiles/view/' + this.props.user.avatar })
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});