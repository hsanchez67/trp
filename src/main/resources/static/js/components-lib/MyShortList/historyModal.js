"use strict";

var HistoryModal = React.createClass({
    displayName: "HistoryModal",

    getInitialState: function getInitialState() {
        return {
            user: [],
            history: [],
            id: this.props.id
        };
    },
    componentDidMount: function componentDidMount() {
        if (this.state.id != 0) {
            var data = {
                id: this.state.id
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/getHistory",
                data: formData,
                success: (function success(result) {
                    if ($.isEmptyObject(result)) {
                        console.log("No results");
                        this.setState({
                            user: [],
                            history: []
                        });
                        return null;
                    }
                    this.setState({
                        user: result.user,
                        history: result.history
                    });
                }).bind(this),
                error: function error(_error) {
                    console.log('Error: ' + _error);
                    return false;
                },
                dataType: "json",
                contentType: "application/json"
            });
            $(ReactDOM.findDOMNode(this)).modal('show');
            $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideHistoryModal);
        }
    },
    printHistory: function printHistory(id) {
        console.log("Print History for " + id);
    },
    render: function render() {
        var borderClass = classNames({
            'btn btn-primary btn-circle btn-circle-green': this.state.score >= 7.5,
            'btn btn-primary btn-circle btn-circle-blue': this.state.score >= 5 && this.state.score < 7.5,
            'btn btn-primary btn-circle btn-circle-yellow': this.state.score >= 2.5 && this.state.score < 5,
            'btn btn-primary btn-circle btn-circle-red': this.state.score < 2.5
        });
        return React.createElement(
            "div",
            { className: "modal fade" },
            React.createElement(
                "div",
                { className: "modal-dialog modal-lg" },
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
                            "h4",
                            { className: "modal-title" },
                            "Relationship History with ",
                            React.createElement(
                                "strong",
                                null,
                                this.state.user.firstName
                            ),
                            " ",
                            this.state.user.lastName,
                            React.createElement(
                                "strong",
                                null,
                                "."
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-body" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col-md-12" },
                                "History"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-footer" },
                        React.createElement(
                            "div",
                            { className: "compliance-button" },
                            React.createElement(
                                "a",
                                { onClick: this.printHistory.bind(this, this.props.id), "data-dismiss": "modal", className: "btn btx-xs btn-primary pointer" },
                                React.createElement(
                                    "span",
                                    null,
                                    React.createElement("i", { className: "fa fa-print" }),
                                    " Print"
                                )
                            )
                        ),
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-default", "data-dismiss": "modal", onClick: this.props.handleHideModal },
                            "Close"
                        )
                    )
                )
            )
        );
    },
    propTypes: {
        handleHideHistoryModal: React.PropTypes.func.isRequired
    }
});