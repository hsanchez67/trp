"use strict";

var NavigationPanel = React.createClass({
    displayName: 'NavigationPanel',
    render: function render() {
        return React.createElement(
            "div",
            { id: "navigation-panel" },
            React.createElement(
                "div",
                { className: "panel panel-default" },
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
                                "Shortcuts"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "a",
                        { href: "/search" },
                        React.createElement(
                            "div",
                            { className: "panel-row" },
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-md-3 col-xs-3" },
                                    React.createElement(
                                        "div",
                                        { className: "navigation-symbol blue" },
                                        React.createElement("i", { className: "fa fa-search" })
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-md-9 col-xs-9" },
                                    React.createElement(
                                        "div",
                                        { className: "navigation-text" },
                                        "Search for a Professional"
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "a",
                        { href: "/introduction" },
                        React.createElement(
                            "div",
                            { className: "panel-row" },
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-md-3 col-xs-3" },
                                    React.createElement(
                                        "div",
                                        { className: "navigation-symbol green" },
                                        React.createElement("i", { className: "fa fa-share-alt" })
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-md-9 col-xs-9" },
                                    React.createElement(
                                        "div",
                                        { className: "navigation-text" },
                                        "Make an Introduction"
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "a",
                        { href: "/referral" },
                        React.createElement(
                            "div",
                            { className: "panel-row" },
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-md-3 col-xs-3" },
                                    React.createElement(
                                        "div",
                                        { className: "navigation-symbol purple" },
                                        React.createElement("i", { className: "fa fa-arrow-right" })
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-md-9 col-xs-9" },
                                    React.createElement(
                                        "div",
                                        { className: "navigation-text" },
                                        "Send a Referral"
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "a",
                        { href: "/reviews" },
                        React.createElement(
                            "div",
                            { className: "panel-row" },
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-md-3 col-xs-3" },
                                    React.createElement(
                                        "div",
                                        { className: "navigation-symbol yellow" },
                                        React.createElement("i", { className: "fa fa-thumbs-up" })
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-md-9 col-xs-9" },
                                    React.createElement(
                                        "div",
                                        { className: "navigation-text" },
                                        "NPS & Reviews"
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "a",
                        { href: "/inbox" },
                        React.createElement(
                            "div",
                            { className: "panel-row" },
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-md-3 col-xs-3" },
                                    React.createElement(
                                        "div",
                                        { className: "navigation-symbol red" },
                                        React.createElement("i", { className: "fa fa-inbox" })
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-md-9 col-xs-9" },
                                    React.createElement(
                                        "div",
                                        { className: "navigation-text" },
                                        "Go to your Inbox"
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