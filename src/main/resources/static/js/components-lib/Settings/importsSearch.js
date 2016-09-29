'use strict';

var ImportsSearch = React.createClass({
    displayName: 'ImportsSearch',

    getInitialState: function getInitialState() {
        return {
            search: '',
            showResults: false,
            data: []
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {},
    handleFilterUpdate: function handleFilterUpdate(filteredValue) {
        this.props.updateFilter(filteredValue);
        this.onClearSearch();
        ReactDOM.findDOMNode(this.refs.search).value = '';
    },
    render: function render() {
        return React.createElement(
            'div',
            { id: 'search-box', className: 'navbar-form' },
            React.createElement(
                'div',
                { className: 'ui-widget' },
                React.createElement(
                    'div',
                    { className: 'input-group' },
                    React.createElement('input', { className: 'form-control', type: 'text', ref: 'search', placeholder: 'Search', id: 'search', value: this.props.search, onKeyDown: this.handleKeyDown, onChange: this.onSearchChanged }),
                    React.createElement(
                        'div',
                        { className: 'input-group-addon' },
                        React.createElement('span', { className: 'glyphicon glyphicon-search' })
                    ),
                    this.state.showResults ? React.createElement(ImportResults, { updateFilter: this.handleFilterUpdate, data: this.state.data }) : null
                )
            )
        );
    },
    handleKeyDown: function handleKeyDown(e) {
        console.log(e.keyCode);
        var ESC = 27;
        if (e.keyCode == ESC) {
            this.onClearSearch();
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
            console.log("Right before search");
            console.log(this.props.imports);
            var options = this.props.imports;
            if (query.length > 1) {
                var data = $.grep(options, function (n) {
                    return n.name.indexOf(query) == 0;
                });
                console.log(data);
                this.setState({ data: data });
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

var ImportResults = React.createClass({
    displayName: 'ImportResults',

    handleFilterUpdate: function handleFilterUpdate(id) {
        console.log(id);
        this.props.updateFilter(id);
    },
    render: function render() {
        var content;
        if (this.props.data.length > 0) {
            var items = this.props.data.map((function (item) {
                return React.createElement(
                    'li',
                    { className: 'divider', id: item.id },
                    React.createElement(
                        'a',
                        { onClick: this.handleFilterUpdate.bind(this, item.id) },
                        React.createElement(
                            'div',
                            { className: 'clearfix' },
                            React.createElement(
                                'div',
                                { className: 'col-sm-12' },
                                React.createElement(
                                    'div',
                                    { className: 'clearfix' },
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            'p',
                                            null,
                                            item.name
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            }).bind(this));
            content = React.createElement(
                'ul',
                null,
                items
            );
        } else {
            content = React.createElement(
                'p',
                null,
                'No results found'
            );
        }
        return React.createElement(
            'div',
            { id: 'results', className: 'import-search-results' },
            content
        );
    }
});