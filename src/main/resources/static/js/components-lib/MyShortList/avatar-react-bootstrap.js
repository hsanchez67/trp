"use strict";

var Avatar = React.createClass({
    displayName: "Avatar",

    render: function render() {
        return React.createElement(
            ReactBootstrap.OverlayTrigger,
            { container: this, trigger: "hover", placement: "top", overlay: React.createElement(
                    ReactBootstrap.Popover,
                    { id: "popover", title: "Popover top" },
                    React.createElement(
                        "strong",
                        null,
                        "Holy guacamole!"
                    ),
                    " Check this info."
                ) },
            React.createElement(
                "a",
                { href: "javascript: void(0)", className: "task-thumb" },
                React.createElement(ProfilePic, { username: this.props.username })
            )
        );
    }
});

var ProfilePic = React.createClass({
    displayName: "ProfilePic",

    render: function render() {
        return React.createElement("img", { src: '/api/remoteFiles/view/' + this.props.avatar, className: "img-circle" });
    }
});

var ProfileLink = React.createClass({
    displayName: "ProfileLink",

    render: function render() {
        return React.createElement(
            "a",
            { href: '/' + this.props.username },
            this.props.username
        );
    }
});