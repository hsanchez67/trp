"use strict";

var HeaderMenu = React.createClass({ displayName: 'HeaderMenu',
    render: function render() {
        return React.createElement(
            "nav",
            { className: "navbar", role: "navigation" },
            React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "collapse navbar-collapse navbar-ex1-collapse" },
                    React.createElement(
                        "ul",
                        { className: "nav navbar-nav" },
                        React.createElement(
                            "li",
                            { id: "nav-home", className: "active" },
                            React.createElement(
                                "a",
                                { href: "/home" },
                                React.createElement(
                                    "div",
                                    { className: "text-center" },
                                    React.createElement("i", { className: "fa fa-home fa-3x" }),
                                    React.createElement("br", null),
                                    "Home"
                                )
                            )
                        ),
                        React.createElement(
                            "li",
                            { id: "nav-search", className: " " },
                            React.createElement(
                                "a",
                                { href: "/search" },
                                React.createElement(
                                    "div",
                                    { className: "text-center" },
                                    React.createElement("i", { className: "fa fa-search fa-3x" }),
                                    React.createElement("br", null),
                                    "Search"
                                )
                            )
                        ),
                        React.createElement(
                            "li",
                            { id: "nav-introduction", className: "dropdown" },
                            React.createElement(
                                "a",
                                { className: "dropdown-toggle", "data-toggle": "dropdown", href: "#" },
                                React.createElement(
                                    "div",
                                    { className: "text-center" },
                                    React.createElement("i", { className: "fa fa-comments fa-3x" }),
                                    React.createElement("br", null),
                                    "Communications ",
                                    React.createElement("span", { className: "caret" })
                                )
                            ),
                            React.createElement(
                                "ul",
                                { className: "dropdown-menu", role: "menu" },
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "/introduction" },
                                        React.createElement("i", { className: "fa fa-share-alt" }),
                                        " Introduction"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "/referral" },
                                        React.createElement("i", { className: "fa fa-arrow-right" }),
                                        " Referral"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "/sendMessage" },
                                        React.createElement("i", { className: "fa fa-envelope" }),
                                        " Communicate"
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "li",
                            { id: "nav-myshortlist", className: " " },
                            React.createElement(
                                "a",
                                { href: "/myShortList" },
                                React.createElement(
                                    "div",
                                    { className: "text-center" },
                                    React.createElement("i", { className: "fa fa-sitemap fa-3x" }),
                                    React.createElement("br", null),
                                    "Networks"
                                )
                            )
                        ),
                        React.createElement(
                            "li",
                            { id: "nav-messages", className: "dropdown" },
                            React.createElement(
                                "a",
                                { className: "dropdown-toggle", "data-toggle": "dropdown", href: "#" },
                                React.createElement(
                                    "div",
                                    { className: "text-center" },
                                    React.createElement("i", { className: "fa fa-envelope fa-3x" }),
                                    React.createElement("br", null),
                                    "Messages ",
                                    React.createElement("span", { className: "caret" })
                                )
                            ),
                            React.createElement(
                                "ul",
                                { className: "dropdown-menu", role: "menu" },
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "/inbox" },
                                        React.createElement("i", { className: "fa fa-inbox fa-fw" }),
                                        " Inbox"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "/archive" },
                                        React.createElement("i", { className: "fa fa-archive fa-fw" }),
                                        " Archive"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "/deleted" },
                                        React.createElement("i", { className: "fa fa-trash fa-fw" }),
                                        " Trash"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "/sent" },
                                        React.createElement("i", { className: "fa fa-paper-plane fa-fw" }),
                                        " Sent"
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "li",
                            { id: "nav-myq", className: " " },
                            React.createElement(
                                "a",
                                { href: "/myq" },
                                React.createElement(
                                    "div",
                                    { className: "text-center" },
                                    React.createElement("i", { className: "fa fa-tasks fa-3x" }),
                                    React.createElement("br", null),
                                    "My Q"
                                )
                            )
                        ),
                        React.createElement(
                            "li",
                            { id: "nav-reviews", className: " " },
                            React.createElement(
                                "a",
                                { href: "/reviews" },
                                React.createElement(
                                    "div",
                                    { className: "text-center" },
                                    React.createElement("i", { className: "fa fa-thumbs-up fa-3x" }),
                                    React.createElement("br", null),
                                    "NPS & Reviews"
                                )
                            )
                        ),
                        React.createElement(
                            "li",
                            { id: "nav-videos", className: " " },
                            React.createElement(
                                "a",
                                { href: "/videos" },
                                React.createElement(
                                    "div",
                                    { className: "text-center" },
                                    React.createElement("i", { className: "fa fa-youtube-play fa-3x" }),
                                    React.createElement("br", null),
                                    "Videos"
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});