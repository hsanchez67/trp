"use strict";

var Footer = React.createClass({ displayName: 'Footer',

    render: function render() {
        return React.createElement(
            "div",
            { className: "Footer" },
            React.createElement(
                "div",
                { className: "Footer-container" },
                React.createElement(
                    "span",
                    { className: "Footer-text" },
                    "© Latch"
                ),
                React.createElement(
                    "span",
                    { className: "Footer-spacer" },
                    "·"
                ),
                React.createElement(
                    "a",
                    { className: "Footer-link", href: "/" },
                    "Home"
                ),
                React.createElement(
                    "span",
                    { className: "Footer-spacer" },
                    "·"
                ),
                React.createElement(
                    "a",
                    { className: "Footer-link", href: "/privacy" },
                    "Privacy"
                ),
                React.createElement(
                    "span",
                    { className: "Footer-spacer" },
                    " | "
                ),
                React.createElement(
                    "span",
                    { ref: "viewport", className: "Footer-viewport Footer-text Footer-text--muted" },
                    "Viewport: ",
                    React.createElement(WindowDimensions, null)
                )
            )
        );
    }
});

var WindowDimensions = React.createClass({
    displayName: "WindowDimensions",

    render: function render() {
        return React.createElement(
            "span",
            null,
            this.state.width,
            " x ",
            this.state.height
        );
    },
    updateDimensions: function updateDimensions() {
        this.setState({ width: $(window).width(), height: $(window).height() });
    },
    componentWillMount: function componentWillMount() {
        this.updateDimensions();
    },
    componentDidMount: function componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
});