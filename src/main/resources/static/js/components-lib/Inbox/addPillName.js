"use strict";

var AddPillName = React.createClass({
    displayName: "AddPillName",

    getInitialState: function getInitialState() {
        return {
            search: '',
            showResults: false,
            data: []
        };
    },
    render: function render() {
        return React.createElement(
            "span",
            null,
            React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "span",
                    { className: "input-group-addon" },
                    React.createElement("span", { className: "glyphicon glyphicon-plus-sign", "aria-hidden": "true" })
                ),
                React.createElement("input", { ref: "search", className: "form-control input-sm search", type: "text", placeholder: "Type Name or Email", value: this.props.search, onKeyDown: this.handleKeyDown, onChange: this.onSearchChanged }),
                this.state.showResults ? React.createElement(Results, { data: this.state.data, handleAddUser: this.handleAddUser.bind(this) }) : null
            )
        );
    },
    handleAddUser: function handleAddUser(id) {
        this.setState({
            search: '',
            showResults: false
        });
        ReactDOM.findDOMNode(this.refs.search).value = '';
        this.props.handleAddUser(id);
    },
    handleBlur: function handleBlur() {
        this.setState({
            search: '',
            showResults: false
        });
        ReactDOM.findDOMNode(this.refs.search).value = '';
    },
    handleKeyDown: function handleKeyDown(e) {
        console.log(e.keyCode);
        var ESC = 27;
        if (e.keyCode == ESC) {
            this.setState({
                search: '',
                showResults: false
            });
            ReactDOM.findDOMNode(this.refs.search).value = '';
        }
    },
    onSearchChanged: function onSearchChanged() {
        if (this.promise) {
            clearInterval(this.promise);
        }
        this.setState({
            search: ReactDOM.findDOMNode(this.refs.search).value,
            showResults: true
        });
        this.promise = setTimeout((function () {
            console.log('Search term: ' + ReactDOM.findDOMNode(this.refs.search).value);
            var query = ReactDOM.findDOMNode(this.refs.search).value;
            if (query.length > 1) {
                $.ajax({
                    url: '/userSearch',
                    dataType: 'json',
                    type: 'POST',
                    data: 'search=' + query,
                    success: (function (data) {
                        console.log(data);
                        if ($.isEmptyObject(data)) {
                            this.onClearSearch();
                        } else {
                            console.log(data._embedded.userDTOList);
                            this.setState({ data: data._embedded.userDTOList });
                        }
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }).bind(this)
                });
            } else {
                this.onClearSearch();
            }
            //  console.log("After timeout: "+ this.state.search);
        }).bind(this), 200);
    },
    onClearSearch: function onClearSearch() {
        this.setState({
            search: '',
            showResults: false
        });
        console.log(this.state.search);
    }
});

var Results = React.createClass({
    displayName: "Results",

    handleAddUser: function handleAddUser(id) {
        this.props.handleAddUser(id);
    },
    render: function render() {
        return React.createElement(
            "div",
            { id: "results", className: "search-results" },
            React.createElement(
                "ul",
                null,
                this.props.data.map((function (obj) {
                    return React.createElement(ResultObj, { key: obj.id, data: obj, firstName: obj.firstName, lastName: obj.lastName, profession: obj.profession, handleAddUser: this.handleAddUser.bind(this, obj.id) });
                }).bind(this))
            )
        );
    }
});

var imgMaxWidth = {
    width: '40px',
    height: '40px',
    position: 'relative',
    top: '0'
};

var ResultObj = React.createClass({
    displayName: "ResultObj",

    getInitialState: function getInitialState() {
        return {
            id: this.props.id
        };
    },
    handleAddUser: function handleAddUser() {
        this.props.handleAddUser(this.state.id);
    },
    render: function render() {
        return React.createElement(
            "li",
            { className: "divider margin-bottom-10", key: this.props.key },
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-sm-12" },
                    React.createElement(
                        "div",
                        { className: "col-sm-2" },
                        React.createElement("img", { className: "img-circle", src: '/api/remoteFiles/view/' + this.props.data.avatar, style: imgMaxWidth })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-8" },
                        React.createElement(
                            "div",
                            { className: "clearfix text-left" },
                            React.createElement(
                                "div",
                                { className: "font-500" },
                                this.props.firstName + ' ' + this.props.lastName
                            ),
                            React.createElement(
                                "div",
                                null,
                                this.props.profession
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-2" },
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "button",
                                { type: "button", onClick: this.handleAddUser, className: "btn btn-xs btn-primary" },
                                "Add"
                            )
                        )
                    )
                )
            )
        );
    }
});