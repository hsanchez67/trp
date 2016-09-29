'use strict';

var wellSmallNoBottomPadding = {
    marginBottom: '0'
};

var MyModal = React.createClass({
    displayName: 'MyModal',

    getInitialState: function getInitialState() {
        return {
            user: [],
            id: this.props.id,
            username: '',
            avatar: this.props.username,
            name: '',
            source: '/api/users/' + this.props.id,
            score: 0,
            initials: this.props.initials,
            contactNotes: ''
        };
    },
    componentDidMount: function componentDidMount() {
        if (this.state.id != 0 && this.state.source != '') {
            $.get(this.state.source, (function (result) {
                var data = result;
                console.log(data);
                if ($.type(data) === "string") {
                    if (data.indexOf('loginPage.js') != -1) {
                        window.location.href = '/login';
                    }
                }
                if (this.isMounted() && !$.isEmptyObject(result)) {
                    var name = data.firstName + " " + data.lastName;
                    var initials = name.match(/\b\w/g);
                    initials = (initials.shift() + initials.pop()).toUpperCase();
                    this.setState({
                        user: data,
                        username: data.firstName.toLowerCase() + '.' + data.lastName.toLowerCase(),
                        name: data.firstName + ' ' + data.lastName,
                        score: data.score == null ? 0 : data.score,
                        initials: initials
                    });
                    $(ReactDOM.findDOMNode(this)).modal('show');
                    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
                }
            }).bind(this));
            this.getContactNotes();
            $("#myModalContactNotes").on("shown", function (element, test) {
                $(test.input.$input[0]).attr("cols", "50");
            });
        }
    },
    getContactNotes: function getContactNotes() {
        // Get contact notes
        console.log("MyModal:getContactNotes:");
        var data = {
            ownerUserId: $('#id').val(),
            targetUserId: this.props.id
        };
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getContactNotes",
            async: true,
            data: formData,
            success: (function (result) {
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        contactNotes: result.content
                    });
                }
                this.initializeContactNotes();
            }).bind(this),
            dataType: "json",
            contentType: "application/json"
        });
    },
    initializeContactNotes: function initializeContactNotes() {
        var id = $('#id').val();
        var id2 = this.props.id;
        console.log("MyModal:componentDidUpdate:id:");
        console.log(id);

        $('#myModalContactNotes').editable({
            type: 'textarea',
            pk: id,
            url: '/saveContactNotes',
            mode: 'inline',
            send: 'always',
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            params: function params(_params) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    content: _params.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            },
            rows: 10
        });
    },
    render: function render() {
        var borderClass = classNames({
            'btn btn-primary btn-circle btn-circle-green': this.state.score >= 7.5,
            'btn btn-primary btn-circle btn-circle-blue': this.state.score >= 5 && this.state.score < 7.5,
            'btn btn-primary btn-circle btn-circle-yellow': this.state.score >= 2.5 && this.state.score < 5,
            'btn btn-primary btn-circle btn-circle-red': this.state.score < 2.5
        });
        return React.createElement(
            'div',
            { id: 'avatarProfile', className: 'modal fade' },
            React.createElement(
                'div',
                { className: 'modal-dialog' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close', onClick: this.props.handleHideModal },
                            React.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '×'
                            )
                        ),
                        React.createElement(
                            'h4',
                            { className: 'modal-title' },
                            React.createElement(
                                'strong',
                                null,
                                this.state.user.firstName
                            ),
                            ' ',
                            this.state.user.lastName,
                            React.createElement(
                                'strong',
                                null,
                                '.'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-4' },
                                React.createElement(
                                    'div',
                                    { className: 'text-center margin-bottom-20', id: 'user' },
                                    React.createElement(ProfilePic2, { username: this.state.avatar, initials: this.state.initials }),
                                    React.createElement(
                                        'span',
                                        { className: 'score score-as-badge' },
                                        React.createElement(
                                            'span',
                                            { ref: 'btn-circle', className: borderClass },
                                            this.state.score
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'buttons' },
                                        React.createElement(
                                            'a',
                                            { href: '/introduction/' + this.state.user.id, role: 'button', className: 'btn btn-xs btn-primary' },
                                            React.createElement('i', { className: 'fa fa-share-alt', title: 'Introduce ' + this.state.user.firstName, 'aria-hidden': 'true' }),
                                            React.createElement(
                                                'span',
                                                { className: 'sr-only' },
                                                'Introduce ',
                                                this.state.user.firstName
                                            )
                                        ),
                                        React.createElement(
                                            'a',
                                            { href: '/referral/' + this.state.user.id, role: 'button', className: 'btn btn-xs btn-primary' },
                                            React.createElement('i', { className: 'fa fa-arrow-right', title: 'Refer ' + this.state.user.firstName, 'aria-hidden': 'true' }),
                                            React.createElement(
                                                'span',
                                                { className: 'sr-only' },
                                                'Refer ',
                                                this.state.user.firstName
                                            )
                                        ),
                                        React.createElement(
                                            'a',
                                            { href: '/profile/' + this.state.user.id, role: 'button', className: 'btn btn-xs btn-primary' },
                                            React.createElement('i', { className: 'fa fa-user', title: 'View ' + this.state.user.firstName + ' profile', 'aria-hidden': 'true' }),
                                            React.createElement(
                                                'span',
                                                { className: 'sr-only' },
                                                'View ',
                                                this.state.user.firstName,
                                                '\'s profile'
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-8' },
                                React.createElement(
                                    'div',
                                    { className: 'text-center margin-bottom-20', id: 'userDetails' },
                                    React.createElement(ProfileBits2, { profile: this.state.user })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'div',
                                    { className: 'well well-sm clearfix margin-top-20', style: wellSmallNoBottomPadding },
                                    React.createElement(
                                        'div',
                                        { className: 'form-group text-left' },
                                        React.createElement(
                                            'label',
                                            { 'for': 'myModalContactNotes', className: 'col-sm-12 control-label' },
                                            'Notes'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-sm-12' },
                                            React.createElement(
                                                'a',
                                                { href: '#', id: 'myModalContactNotes', ref: 'myModalContactNotes', 'data-type': 'textarea', className: 'editable editable-click', 'data-title': 'Personal notes for this Contact' },
                                                this.state.contactNotes
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'div',
                            { className: 'compliance-button' },
                            React.createElement(
                                'a',
                                { onClick: this.props.getHistory, className: 'btn btx-xs btn-primary pointer' },
                                React.createElement(
                                    'span',
                                    null,
                                    React.createElement('i', { className: 'fa fa-list' }),
                                    React.createElement('i', { className: 'fa fa-check fa-0x-check' })
                                )
                            )
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal', onClick: this.props.handleHideModal },
                            'Close'
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

var ProfilePic2 = React.createClass({
    displayName: 'ProfilePic2',

    render: function render() {
        var image;
        if (this.props.username == 'default' && this.props.initials != '') {
            image = React.createElement(
                'div',
                { className: 'avatar-circle' },
                React.createElement(
                    'span',
                    { className: 'initials' },
                    this.props.initials
                )
            );
        } else {
            image = React.createElement('img', { src: '/api/remoteFiles/view/' + this.props.username, className: 'img-circle' });
        }
        return React.createElement(
            'span',
            null,
            image
        );
    }
});