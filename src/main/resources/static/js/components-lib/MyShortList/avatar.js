'use strict';

var Avatar = React.createClass({
    displayName: 'Avatar',

    getInitialState: function getInitialState() {
        return {
            view: { showModal: false },
            username: this.props.username,
            avatar: this.props.avatar,
            id: this.props.id,
            name: this.props.name,
            initials: ''
        };
    },
    handleHideModal: function handleHideModal() {
        this.setState({ view: { showModal: false } });
    },
    handleShowModal: function handleShowModal() {
        this.setState({ view: { showModal: true } });
    },
    componentWillMount: function componentWillMount() {
        var name = this.props.name;
        if (name != null) {
            var initials = name.match(/\b\w/g);
            initials = (initials.shift() + initials.pop()).toUpperCase();
            this.setState({ initials: initials });
        }
    },
    getHistory: function getHistory() {
        console.log("Inside getHistory");
        window.location.href = '/history/' + this.props.id;
    },
    componentDidMount: function componentDidMount() {
        $('.tastk-thumb').tooltip();
    },
    render: function render() {
        return React.createElement(
            'li',
            { className: 'pull-left' },
            React.createElement(
                'a',
                { href: 'javascript: void(0)', onClick: this.handleShowModal, className: 'task-thumb', title: this.props.name },
                React.createElement(ProfilePicWithName, { id: this.props.id, username: this.props.username, initials: this.state.initials, score: this.props.score, firstName: this.props.firstName })
            ),
            this.state.view.showModal ? React.createElement(MyModal, { id: this.props.id, username: this.props.username, initials: this.state.initials, name: this.props.name, handleHideModal: this.handleHideModal, getHistory: this.getHistory }) : null
        );
    }
});

var ProfilePic = React.createClass({
    displayName: 'ProfilePic',

    render: function render() {
        var borderClass = 'img-circle';
        var noPhotoClass = 'avatar-circle';
        console.log(this.props.score);
        if (this.props.score != null) {
            borderClass = classNames({
                'border-circle-green img-circle': this.props.score >= 7.5,
                'border-circle-blue img-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow img-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red img-circle': this.props.score < 2.5
            });
            noPhotoClass = classNames({
                'border-circle-green avatar-circle': this.props.score >= 7.5,
                'border-circle-blue avatar-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow avatar-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red avatar-circle': this.props.score < 2.5
            });
        }
        var image;
        if (this.props.username == 'default' && this.props.initials != '') {
            image = React.createElement(
                'div',
                { className: noPhotoClass },
                React.createElement('img', { className: 'hidden', id: this.props.id }),
                React.createElement(
                    'span',
                    { className: 'initials' },
                    this.props.initials
                )
            );
        } else {
            image = React.createElement('img', { id: this.props.id, src: '/api/remoteFiles/view/' + this.props.username, className: borderClass });
        }
        return React.createElement(
            'span',
            null,
            image
        );
    }
});

var ProfilePicWithName = React.createClass({
    displayName: 'ProfilePicWithName',

    render: function render() {
        var borderClass = 'img-circle';
        var noPhotoClass = 'avatar-circle';
        if (this.props.score != null) {
            borderClass = classNames({
                'border-circle-green img-circle': this.props.score >= 7.5,
                'border-circle-blue img-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow img-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red img-circle': this.props.score < 2.5
            });
            noPhotoClass = classNames({
                'border-circle-green avatar-circle': this.props.score >= 7.5,
                'border-circle-blue avatar-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow avatar-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red avatar-circle': this.props.score < 2.5
            });
        }
        var image;
        if (this.props.username == 'default' && this.props.initials != '') {
            image = React.createElement(
                'div',
                { className: 'avatar' },
                React.createElement(
                    'div',
                    { className: 'avatar-image' },
                    React.createElement(
                        'div',
                        { className: noPhotoClass },
                        React.createElement('img', { className: 'hidden', id: this.props.id }),
                        React.createElement(
                            'span',
                            { className: 'initials' },
                            this.props.initials
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'avatar-name' },
                    this.props.firstName
                )
            );
        } else {
            image = React.createElement(
                'div',
                { className: 'avatar' },
                React.createElement(
                    'div',
                    { className: 'avatar-image' },
                    React.createElement('img', { id: this.props.id, src: '/api/remoteFiles/view/' + this.props.username, className: borderClass })
                ),
                React.createElement(
                    'div',
                    { className: 'avatar-name' },
                    this.props.firstName
                )
            );
        }
        return React.createElement(
            'span',
            null,
            image
        );
    }
});

var ProfilePicPlus = React.createClass({
    displayName: 'ProfilePicPlus',

    render: function render() {
        var borderClass = 'img-circle';
        var noPhotoClass = 'avatar-circle';
        console.log(this.props.score);
        if (this.props.score != null) {
            borderClass = classNames({
                'border-circle-green img-circle': this.props.score >= 7.5,
                'border-circle-blue img-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow img-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red img-circle': this.props.score < 2.5
            });
            noPhotoClass = classNames({
                'border-circle-green avatar-circle': this.props.score >= 7.5,
                'border-circle-blue avatar-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow avatar-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red avatar-circle': this.props.score < 2.5
            });
        }
        console.log(borderClass);
        var image;
        if (this.props.username == 'default' && this.props.initials != '') {
            image = React.createElement(
                'div',
                { className: 'entry' },
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement('div', { className: 'button entypo-chat' }),
                    React.createElement(
                        'div',
                        { className: 'name' },
                        this.props.name,
                        React.createElement(
                            'span',
                            { className: 'small' },
                            'Profession'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'photo' },
                        React.createElement(
                            'div',
                            { className: noPhotoClass },
                            React.createElement('img', { className: 'hidden', id: this.props.id }),
                            React.createElement(
                                'span',
                                { className: 'initials' },
                                this.props.initials
                            )
                        )
                    )
                )
            );
        } else {
            image = React.createElement(
                'div',
                { className: 'entry' },
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement('div', { className: 'button entypo-chat' }),
                    React.createElement(
                        'div',
                        { className: 'name' },
                        this.props.name,
                        React.createElement(
                            'span',
                            { className: 'small' },
                            'Profession'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'photo' },
                        React.createElement('img', { id: this.props.id, src: '/api/remoteFiles/view/' + this.props.username, className: borderClass })
                    )
                )
            );
        }
        return React.createElement(
            'span',
            null,
            image
        );
    }
});

var ProfileLink = React.createClass({
    displayName: 'ProfileLink',

    render: function render() {
        return React.createElement(
            'a',
            { href: '/' + this.props.username },
            this.props.username
        );
    }
});