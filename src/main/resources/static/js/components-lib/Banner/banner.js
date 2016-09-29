"use strict";

var Banner = React.createClass({ displayName: 'Banner',
    render: function render() {
        return React.createElement(
            "div",
            { id: "header" },
            React.createElement(
                "div",
                { className: "overlay" },
                React.createElement(HeaderMenu, null)
            )
        );
    }

});