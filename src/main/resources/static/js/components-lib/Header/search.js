'use strict';

var NavSearch = React.createClass({
    displayName: 'NavSearch',

    getInitialState: function getInitialState() {
        return {
            search: '',
            showResults: false,
            data: []
        };
    },
    render: function render() {
        return React.createElement(
            'span',
            null,
            React.createElement('input', { ref: 'search', type: 'text', className: 'form-control input-sm search', placeholder: 'Search', value: this.props.search, onKeyDown: this.handleKeyDown, onChange: this.onSearchChanged }),
            this.state.showResults ? React.createElement(Results, { data: this.state.data, handleBlur: this.handleBlur, handleAddUserToCurrentGroup: this.handleAddUserToCurrentGroup.bind(this), label: this.props.label }) : null
        );
    },
    handleBlur: function handleBlur() {
        this.setState({
            search: '',
            showResults: false
        });
        ReactDOM.findDOMNode(this.refs.search).value = '';
    },
    handleAddUserToCurrentGroup: function handleAddUserToCurrentGroup(id) {
        this.setState({
            search: '',
            showResults: false
        });
        ReactDOM.findDOMNode(this.refs.search).value = '';
        this.props.handleAddUserToCurrentGroup(id);
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
    displayName: 'Results',

    handleAddUserToCurrentGroup: function handleAddUserToCurrentGroup(id) {
        this.props.handleAddUserToCurrentGroup(id);
    },
    getInitials: function getInitials(name) {
        var initials = name.match(/\b\w/g);
        initials = (initials.shift() + initials.pop()).toUpperCase();
        return initials;
    },
    render: function render() {
        return React.createElement(
            'div',
            { id: 'results', className: 'search-results' },
            React.createElement(
                'ul',
                null,
                this.props.data.map((function (obj) {
                    var initials = this.getInitials(obj.firstName + " " + obj.lastName);
                    return React.createElement(ResultObj, { key: obj.id, data: obj, initials: initials, firstName: obj.firstName, lastName: obj.lastName, handleBlur: this.props.handleBlur, handleAddUserToCurrentGroup: this.handleAddUserToCurrentGroup.bind(this, obj.id), label: this.props.label });
                }).bind(this))
            )
        );
    }
});

var imgMaxWidth = {
    width: '60px',
    height: '60px',
    position: 'relative',
    top: '0',
    marginBottom: '10px'
};

var ResultObj = React.createClass({
    displayName: 'ResultObj',

    handleAddUserToCurrentGroup: function handleAddUserToCurrentGroup() {
        this.props.handleAddUserToCurrentGroup(this.props.data.id);
    },
    render: function render() {
        var buttonLabel = "Add To Group";
        if (this.props.label != null && this.props.label != '') {
            buttonLabel = this.props.label;
        }
        return React.createElement(
            'li',
            { className: 'divider margin-bottom-10', key: this.props.key },
            React.createElement(
                'div',
                { className: 'clearfix' },
                React.createElement(
                    'div',
                    { className: 'col-sm-2' },
                    React.createElement(AvatarPic, { username: this.props.data.avatar, initials: this.props.initials })
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-10' },
                    React.createElement(
                        'div',
                        { className: 'clearfix' },
                        React.createElement(
                            'div',
                            { className: 'full-name' },
                            this.props.firstName + ' ' + this.props.lastName
                        ),
                        React.createElement(
                            'div',
                            { className: 'user-score' },
                            React.createElement('i', { className: 'fa fa-star' }),
                            ' ',
                            this.props.data.score
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'a',
                                { type: 'button', href: '/profile/' + this.props.data.id, onClick: this.props.handleBlur, className: 'btn btn-xs btn-primary' },
                                'Profile'
                            ),
                            ' ',
                            React.createElement(
                                'button',
                                { type: 'button', onClick: this.handleAddUserToCurrentGroup, className: 'btn btn-xs btn-primary' },
                                buttonLabel
                            )
                        )
                    )
                )
            )
        );
    }
});

var AvatarPic = React.createClass({
    displayName: 'AvatarPic',

    render: function render() {
        var image;
        if (this.props.username == '') {
            image = React.createElement('img', { src: '../images/120px-blank.png', className: 'img-circle', style: imgMaxWidth });
        } else if (this.props.username == 'default' && this.props.initials != '') {
            image = React.createElement(
                'div',
                { className: 'avatar-circle' },
                React.createElement('img', { className: 'hidden', id: this.props.id }),
                React.createElement(
                    'span',
                    { className: 'initials' },
                    this.props.initials
                )
            );
        } else {
            image = React.createElement('img', { src: '/api/remoteFiles/view/' + this.props.username, className: 'img-circle', style: imgMaxWidth });
        }
        return React.createElement(
            'span',
            null,
            image
        );
    }
});