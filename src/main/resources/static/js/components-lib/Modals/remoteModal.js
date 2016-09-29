"use strict";

var RemoteModal = React.createClass({
    displayName: "RemoteModal",

    componentDidMount: function componentDidMount() {
        console.log("Inside RemoteModal");
        var modalSize = this.props.size;
        $('#modalDiv').addClass(modalSize);
        var options = {
            "backdrop": "true",
            "show": "true"
        };
        $(ReactDOM.findDOMNode(this)).modal(options);
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
        //     $(ReactDOM.findDOMNode(this)).on('shown.bs.modal', function () { $(ReactDOM.findDOMNode(this)).find('.modal-body').load('https://www.facebook.com/i-did-it-143881716081'); });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "modal fade" },
            React.createElement(
                "div",
                { id: "modalDiv", className: "modal-dialog" },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "form",
                        { onSubmit: this.handleSubmit },
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
                                    this.props.title
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-body" },
                            this.props.children
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-footer" },
                            React.createElement(
                                "button",
                                { id: "closeButton", type: "button", className: "btn btn-default", "data-dismiss": "modal", onClick: this.props.handleHideModal },
                                "Close"
                            )
                        )
                    )
                )
            )
        );
    },
    propTypes: {
        handleHideModal: React.PropTypes.func.isRequired
    }
});