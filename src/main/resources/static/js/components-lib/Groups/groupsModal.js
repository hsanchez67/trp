"use strict";

var GroupsModal = React.createClass({
    displayName: "GroupsModal",

    getInitialState: function getInitialState() {
        return {
            groups: []
        };
    },
    componentDidMount: function componentDidMount() {
        console.log("Inside GroupsModal");
        var options = {
            "backdrop": "static",
            "show": "true"
        };
        $(ReactDOM.findDOMNode(this)).modal(options);
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
    },
    render: function render() {
        return React.createElement(
            "div",
            { id: "groupsModal", className: "modal fade" },
            React.createElement(
                "div",
                { className: "modal-dialog" },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "div",
                        { className: "modal-header" },
                        React.createElement(
                            "button",
                            { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close", onClick: this.props.handleHideModal },
                            React.createElement(
                                "span",
                                { "aria-hidden": "true" },
                                "×"
                            )
                        ),
                        React.createElement(
                            "h5",
                            { className: "modal-title" },
                            React.createElement(
                                "strong",
                                null,
                                "Select or Create a Group"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-body" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement("div", { className: "col-md-12" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-footer" },
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-default", "data-dismiss": "modal", onClick: this.props.handleHideModal },
                            "Close"
                        )
                    )
                )
            )
        );
    }
});