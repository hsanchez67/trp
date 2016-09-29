"use strict";

var MyShortListContent = React.createClass({
    displayName: 'MyShortListContent',
    render: function render() {
        return React.createElement(
            "div",
            { className: "row", id: "home-content" },
            React.createElement(
                "div",
                { className: "content" },
                React.createElement(
                    "div",
                    { className: "row state-overview" },
                    React.createElement(
                        "div",
                        { className: "page-header text-center" },
                        React.createElement(
                            "h3",
                            null,
                            "Your Short List ",
                            React.createElement(
                                "sup",
                                null,
                                "™"
                            )
                        )
                    ),
                    React.createElement("div", { id: "shortList-content" })
                )
            )
        );
    }
});