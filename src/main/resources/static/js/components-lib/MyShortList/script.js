"use strict";

var Popover = ReactBootstrap.Popover;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Button = ReactBootstrap.Button;

var App = React.createClass({
    displayName: "App",

    getInitialState: function getInitialState() {
        return {
            value: false
        };
    },

    render: function render() {
        var children = React.createElement(
            Popover,
            { title: "Something" },
            "Test"
        );

        return React.createElement(
            OverlayTrigger,
            { trigger: "click", rootClose: true, overlay: children },
            React.createElement(
                Button,
                null,
                "Options"
            )
        );
    }

});