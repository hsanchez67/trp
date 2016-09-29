"use strict";

var SocialConnect = React.createClass({
    displayName: 'SocialConnect',
    render: function render() {
        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "section",
                { className: "panel" },
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "div",
                        { className: "form-horizontal" },
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-md-6 col-md-offset-3" },
                                React.createElement(
                                    "a",
                                    { className: "btn btn-block btn-social btn-facebook" },
                                    React.createElement("i", { className: "fa fa-facebook" }),
                                    "Sign in with Facebook"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-md-6 col-md-offset-3" },
                                React.createElement(
                                    "a",
                                    { className: "btn btn-block btn-social btn-linkedin" },
                                    React.createElement("i", { className: "fa fa-linkedin" }),
                                    "Sign in with LinkedIn"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-md-6 col-md-offset-3" },
                                React.createElement(
                                    "a",
                                    { className: "btn btn-block btn-social btn-pinterest" },
                                    React.createElement("i", { className: "fa fa-pinterest" }),
                                    "Sign in with Pinterest"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-md-6 col-md-offset-3" },
                                React.createElement(
                                    "a",
                                    { className: "btn btn-block btn-social btn-twitter" },
                                    React.createElement("i", { className: "fa fa-twitter" }),
                                    "Sign in with Twitter"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-md-6 col-md-offset-3" },
                                React.createElement(
                                    "a",
                                    { className: "btn btn-block btn-social btn-zillow" },
                                    React.createElement("i", { className: "fa icon-zillow" }),
                                    "Sign in with Zillow"
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});