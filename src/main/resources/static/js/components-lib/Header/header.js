"use strict";

var Header = React.createClass({ displayName: 'Header',
    render: function render() {
        return React.createElement(
            "div",
            { className: "Header" },
            React.createElement(
                "div",
                { className: "Header-container" },
                React.createElement(
                    "a",
                    { className: "Header-brand", href: "/home", onClick: "" },
                    React.createElement(Logo, null)
                ),
                React.createElement(Navigation, null)
            )
        );
    }

});