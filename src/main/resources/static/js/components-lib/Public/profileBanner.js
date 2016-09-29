"use strict";

var ProfileBanner = React.createClass({ displayName: 'ProfileBanner',
    render: function render() {
        return React.createElement(
            "div",
            { id: "header" },
            React.createElement("div", { className: "overlay" })
        );
    }

});