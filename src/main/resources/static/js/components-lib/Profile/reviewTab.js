"use strict";

var ProfileReviewTab = React.createClass({
    displayName: 'ProfileReviewTab',
    render: function render() {
        return React.createElement(
            "div",
            { id: "reviewsTab", className: "row" },
            React.createElement(
                "div",
                { className: "col-lg-12" },
                React.createElement(
                    "div",
                    { className: "panel" },
                    React.createElement(
                        "div",
                        { className: "panel-body" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col-md-5" },
                                React.createElement(
                                    "ul",
                                    { id: "myReviewTab", className: "nav nav-pills nav-stacked" },
                                    React.createElement(
                                        "li",
                                        { className: "active text-left" },
                                        React.createElement(
                                            "a",
                                            { href: "#professional", "data-toggle": "tab" },
                                            "From Professionals ",
                                            React.createElement(
                                                "span",
                                                { className: "margin-left-10" },
                                                "4.5 ",
                                                React.createElement("span", { className: "glyphicon glyphicon-star", "aria-hidden": "true" })
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "li",
                                        { className: "" },
                                        React.createElement(
                                            "a",
                                            { href: "#consumers", "data-toggle": "tab" },
                                            "From Consumers"
                                        )
                                    ),
                                    React.createElement(
                                        "li",
                                        { className: "" },
                                        React.createElement(
                                            "a",
                                            { href: "#zillow", "data-toggle": "tab" },
                                            "From Zillow"
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-7" },
                                React.createElement(
                                    "div",
                                    { id: "myReviewTabContent", className: "tab-content" },
                                    React.createElement(
                                        "div",
                                        { className: "tab-pane fade active in", id: "professional" },
                                        React.createElement(
                                            "p",
                                            null,
                                            "Professionals"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "tab-pane fade", id: "consumers" },
                                        React.createElement(
                                            "p",
                                            null,
                                            "Consumers"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "tab-pane fade", id: "zillow" },
                                        React.createElement(
                                            "p",
                                            null,
                                            "Zillow"
                                        )
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