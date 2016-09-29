'use strict';

var Result3 = React.createClass({
    displayName: 'Result3',

    getInitialState: function getInitialState() {
        return {
            fromUser: [],
            toUser: [],
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function componentWillMount() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/' + fromUserId;
        $.get(source, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }).bind(this));
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/' + toUserId;
        $.get(source2, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }).bind(this));
    },
    handleOpenMessage: function handleOpenMessage() {
        window.location.href = '/messageSent/' + this.props.id;
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: this.props.count % 2 === 0 ? 'row resultInstant' : 'row resultInstantGrey' },
            React.createElement(
                'div',
                { className: 'col-lg-12 col-md-12 message-timestamp' },
                this.props.createdDate,
                ' ',
                this.props.createdTime
            ),
            React.createElement(
                'div',
                { className: 'col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up' },
                React.createElement(
                    'div',
                    { className: 'input-type-logo' },
                    React.createElement('i', { className: 'fa fa-envelope' })
                ),
                React.createElement(
                    'ul',
                    { className: 'source' },
                    React.createElement(Avatar, { id: this.state.toUser.id, username: this.state.toUser.avatar, name: this.state.toUser.firstName + ' ' + this.state.toUser.lastName, className: 'task-thumb' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left' },
                React.createElement(
                    'span',
                    { className: 'off' },
                    'You sent a message to ',
                    this.state.toUser.firstName,
                    ' ',
                    this.state.toUser.lastName
                ),
                React.createElement('br', null),
                this.props.subject
            ),
            React.createElement(
                'div',
                { className: 'col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10' },
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-primary btn-sm', onClick: this.handleOpenMessage },
                    React.createElement('i', { className: 'fa fa-folder-open ' }),
                    '  Open'
                )
            )
        );
    }
});

var Result2 = React.createClass({
    displayName: 'Result2',

    getInitialState: function getInitialState() {
        return {
            fromUser: [],
            toUser: [],
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function componentWillMount() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/' + fromUserId;
        $.get(source, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }).bind(this));
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/' + toUserId;
        $.get(source2, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }).bind(this));
        var subjectUserId = this.props.subjectUserId;
        var source3 = '/api/users/' + subjectUserId;
        $.get(source3, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    subjectUser: result
                });
            }
        }).bind(this));
    },
    handleOpenReferral: function handleOpenReferral() {
        window.location.href = '/referralRequestSent/' + this.props.id;
    },
    render: function render() {
        var displayLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Accepted' && this.props.status != 'Archived',
            'pull-right show': this.props.status == 'Accepted' || this.props.status == 'Archived'
        });
        var displayNotLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Rejected' && this.props.status != 'Dejected',
            'pull-right show': this.props.status == 'Rejected' || this.props.status == 'Dejected'
        });
        return React.createElement(
            'div',
            { className: this.props.count % 2 === 0 ? 'row resultInstant' : 'row resultInstantGrey' },
            React.createElement(
                'div',
                { className: 'col-md-12 message-timestamp' },
                this.props.createdDate,
                ' ',
                this.props.createdTime
            ),
            React.createElement(
                'div',
                { className: 'col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up' },
                React.createElement(
                    'div',
                    { className: 'input-type-logo' },
                    React.createElement('i', { className: 'fa fa-arrow-right' })
                ),
                React.createElement(
                    'ul',
                    { className: 'source' },
                    React.createElement(Avatar, { id: this.state.toUser.id, username: this.state.toUser.avatar, name: this.state.toUser.firstName + ' ' + this.state.toUser.lastName, className: 'task-thumb' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left' },
                React.createElement(
                    'span',
                    { className: 'off' },
                    'You sent a referral to ',
                    this.state.toUser.firstName,
                    ' ',
                    this.state.toUser.lastName
                ),
                React.createElement('br', null),
                this.props.subject,
                React.createElement(
                    'div',
                    { id: 'displayLatchCheck', className: displayLatchCheck },
                    React.createElement('img', { className: 'latched-icon img-responsive', src: '/images/LATCH-Logo-Check.png', alt: 'Latched' })
                ),
                React.createElement(
                    'div',
                    { id: 'displayNotLatchCheck', className: displayNotLatchCheck },
                    React.createElement('img', { className: 'latched-icon img-responsive', src: '/images/LATCH-Logo-Uncheck.png', alt: 'Not Latched' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10' },
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-primary btn-sm', onClick: this.handleOpenReferral },
                    React.createElement('i', { className: 'fa fa-folder-open ' }),
                    '  Open'
                )
            )
        );
    }
});

var Result = React.createClass({
    displayName: 'Result',

    getInitialState: function getInitialState() {
        return {
            fromUser: [],
            toUser: [],
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function componentWillMount() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/' + fromUserId;
        $.get(source, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }).bind(this));
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/' + toUserId;
        $.get(source2, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }).bind(this));
        var subjectUserId = this.props.subjectUserId;
        var source3 = '/api/users/' + subjectUserId;
        $.get(source3, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    subjectUser: result
                });
            }
        }).bind(this));
    },
    handleOpenIntroduction: function handleOpenIntroduction() {
        window.location.href = '/introductionRequestSent/' + this.props.id;
    },
    render: function render() {
        var displayLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Accepted',
            'pull-right show': this.props.status == 'Accepted'
        });
        return React.createElement(
            'div',
            { className: this.props.count % 2 === 0 ? 'row resultInstant' : 'row resultInstantGrey' },
            React.createElement(
                'div',
                { className: 'col-md-12 message-timestamp' },
                this.props.createdDate,
                ' ',
                this.props.createdTime
            ),
            React.createElement(
                'div',
                { className: 'col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up' },
                React.createElement(
                    'div',
                    { className: 'input-type-logo' },
                    React.createElement('i', { className: 'fa fa-share-alt' })
                ),
                React.createElement(
                    'ul',
                    { className: 'source' },
                    React.createElement(Avatar, { id: this.state.toUser.id, username: this.state.toUser.avatar, name: this.state.toUser.firstName + ' ' + this.state.toUser.lastName, className: 'task-thumb' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left' },
                React.createElement(
                    'span',
                    { className: 'off' },
                    'You introduced ',
                    this.state.toUser.firstName,
                    ' ',
                    this.state.toUser.lastName,
                    ' to ',
                    this.state.subjectUser.firstName,
                    ' ',
                    this.state.subjectUser.lastName
                ),
                React.createElement('br', null),
                this.props.subject,
                React.createElement(
                    'div',
                    { id: 'displayLatchCheck', className: displayLatchCheck },
                    React.createElement('img', { className: 'latched-icon img-responsive', src: '/images/LATCH-Logo-Check.png', alt: 'Latched' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10' },
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-primary btn-sm', onClick: this.handleOpenIntroduction },
                    React.createElement('i', { className: 'fa fa-folder-open' }),
                    '  Open'
                )
            )
        );
    }
});

var SentResults = React.createClass({
    displayName: 'SentResults',

    getInitialState: function getInitialState() {
        return {
            loading: true
        };
    },
    componentDidUpdate: function componentDidUpdate() {
        // drag & drop
        $(".source li").draggable({
            addClasses: false,
            appendTo: "body",
            helper: "clone"
        });
    },
    componentDidMount: function componentDidMount() {
        setTimeout((function () {
            this.setState({ loading: false });
        }).bind(this), 5000 / 60);
    },
    render: function render() {
        if ($.isEmptyObject(this.props.data) && this.state.loading) {
            return React.createElement(
                'div',
                { className: 'no-entries' },
                React.createElement('i', { className: 'fa fa-5x fa-cog fa-spin' })
            );
        } else if ($.isEmptyObject(this.props.data) && !this.state.loading) {
            return React.createElement(
                'div',
                { className: 'no-entries' },
                'No messages!'
            );
        } else {
            var messages = [];
            var count = 0;
            this.props.data.forEach((function (message) {
                var created = new Date(message.created);
                var hours = created.getHours();
                var minutes = created.getMinutes();
                var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
                var createdTime = $.datepicker.formatTime("h:mm tt", { hour: hours, minute: minutes }, {});
                if (message.transactionType == "Introduction") {
                    messages.push(React.createElement(Result, { key: message.id, id: message.id, fromUserId: message.fromUserId,
                        subjectUserId: message.subjectUserId,
                        status: message.status, subject: message.subject, toUserId: message.toUserId,
                        transactionType: message.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++ }));
                } else if (message.transactionType == "Referral") {
                    messages.push(React.createElement(Result2, { key: message.id, id: message.id, fromUserId: message.fromUserId,
                        subjectUserId: message.subjectUserId,
                        status: message.status, subject: message.subject, toUserId: message.toUserId,
                        transactionType: message.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++ }));
                } else if (message.transactionType == "Communication") {
                    messages.push(React.createElement(Result3, { key: message.id, id: message.id, fromUserId: message.fromUserId,
                        subjectUserId: message.subjectUserId,
                        status: message.status, subject: message.subject, toUserId: message.toUserId,
                        transactionType: message.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++ }));
                }
            }).bind(this));
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { id: 'message-list' },
                    messages
                )
            );
        }
    }
});

var SentContent = React.createClass({
    displayName: 'ArchiveContent',
    getInitialState: function getInitialState() {
        return {
            communicationsFrom: [],
            count: 0
        };
    },
    componentWillMount: function componentWillMount() {
        var id = $('#id').val();
        this.getCommunicationsTo(id);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("SentContent:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.count != this.state.count) {
            console.log("SentContent:componentWillReceiveProps:updateInbox");
            var id = $('#id').val();
            this.getCommunicationsTo(id);
        }
    },
    getCommunicationsTo: function getCommunicationsTo(id) {
        var data = {
            id: id
        };
        $.ajax({
            type: "POST",
            url: "/getSentCommunicationsFrom",
            data: JSON.stringify(data, null, ' '),
            success: (function (result) {
                console.log(result);
                if (result.page.totalElements == 0) {
                    this.setState({
                        count: 0,
                        communicationsFrom: []
                    });
                    return null;
                } else {
                    this.setState({
                        count: result.page.totalElements,
                        communicationsFrom: result._embedded.communicationDTOList
                    });
                }
            }).bind(this),
            error: function error(_error) {
                console.log(_error);
                return false;
            },
            complete: function complete(e, xhr, settings) {
                console.log(e.status);
                if (e.status === 401) {
                    window.location.href = '/inbox';
                    console.log(e);
                }
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'col-lg-8' },
            React.createElement(
                'div',
                { id: 'inbox-content-row', className: 'row state-overview' },
                React.createElement(
                    'div',
                    { className: 'row', id: 'profile-content' },
                    React.createElement(
                        'div',
                        { className: 'col-lg-12' },
                        React.createElement(
                            'div',
                            { className: 'panel panel-default', id: 'inbox-panel' },
                            React.createElement(
                                'div',
                                { className: 'panel-heading' },
                                React.createElement(
                                    'header',
                                    { className: 'panel-title' },
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-8 col-md-offset-2 text-center' },
                                            React.createElement('i', { className: 'fa fa-paper-plane' }),
                                            ' ',
                                            React.createElement(
                                                'strong',
                                                null,
                                                'Sent'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-2' },
                                            React.createElement(
                                                'a',
                                                { className: 'video', title: 'Managing Messages - Sent Folder', href: 'https://youtu.be/lr8nV6rIPo8' },
                                                React.createElement('img', { className: 'video-icon pull-right', src: '/images/youTube.png', alt: 'Latch channel' })
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'panel-body' },
                                React.createElement(SentResults, { data: this.state.communicationsFrom })
                            )
                        )
                    )
                )
            )
        );
    }
});