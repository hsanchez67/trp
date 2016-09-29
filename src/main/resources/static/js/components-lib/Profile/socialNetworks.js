"use strict";

var SocialNetworks = React.createClass({
    displayName: "SocialNetworks",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Zillow, { user: this.props.user })
        );
    }
});