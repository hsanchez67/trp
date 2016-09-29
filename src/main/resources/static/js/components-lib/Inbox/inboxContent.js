'use strict';

var Result4 = React.createClass({
    displayName: 'Result4',

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
        window.location.href = '/reviewRequest/' + this.props.reviewId;
    },
    deleteMessage: function deleteMessage() {
        this.props.deleteMessage(this.props.id);
    },
    render: function render() {
        var typeIconStatus = classNames({
            'fa fa-thumbs-up not-read-text-primary': this.props.status == 'New',
            'fa fa-thumbs-up text-muted': this.props.status != 'New'
        });
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
                    React.createElement('i', { className: typeIconStatus })
                ),
                React.createElement(
                    'ul',
                    { className: 'source' },
                    React.createElement(Avatar, { id: this.state.fromUser.id, username: this.state.fromUser.avatar, name: this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName, className: 'task-thumb' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left' },
                React.createElement(
                    'span',
                    { className: this.props.status == 'New' || this.props.status == 'Reply' ? 'on' : 'off' },
                    'You received a review request from ',
                    this.state.fromUser.firstName,
                    ' ',
                    this.state.fromUser.lastName
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
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-primary btn-sm', onClick: this.deleteMessage },
                    React.createElement('i', { className: 'fa fa-trash' }),
                    '  Delete'
                )
            )
        );
    }
});

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
        window.location.href = '/message/' + this.props.id;
    },
    deleteMessage: function deleteMessage() {
        this.props.deleteMessage(this.props.id);
    },
    render: function render() {
        var typeIconStatus = classNames({
            'fa fa-envelope not-read-text-primary': this.props.status == 'New',
            'fa fa-envelope text-muted': this.props.status != 'New'
        });
        var attachmentsExist = classNames({
            'fa fa-paperclip hidden': this.props.attachments == null,
            'fa fa-paperclip': this.props.attachments != null
        });
        var isGroupMessage = classNames({
            'fa fa-users hidden': this.props.groupId == null || this.props.groupId == "",
            'fa fa-users': this.props.groupId != null || this.props.groupId != ""
        });
        return React.createElement(
            'div',
            { className: this.props.count % 2 === 0 ? 'row resultInstant' : 'row resultInstantGrey' },
            React.createElement(
                'div',
                { className: 'col-lg-12 col-md-12 message-timestamp' },
                React.createElement(
                    'span',
                    { className: 'margin-right-10' },
                    React.createElement('i', { className: isGroupMessage })
                ),
                React.createElement(
                    'span',
                    { className: 'margin-right-10' },
                    React.createElement('i', { className: attachmentsExist })
                ),
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
                    React.createElement('i', { className: typeIconStatus })
                ),
                React.createElement(
                    'ul',
                    { className: 'source' },
                    React.createElement(Avatar, { id: this.state.fromUser.id, username: this.state.fromUser.avatar, name: this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName, className: 'task-thumb' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left' },
                React.createElement(
                    'span',
                    { className: this.props.status == 'New' || this.props.status == 'Reply' ? 'on' : 'off' },
                    'You received a message from ',
                    this.state.fromUser.firstName,
                    ' ',
                    this.state.fromUser.lastName
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
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-primary btn-sm', onClick: this.deleteMessage },
                    React.createElement('i', { className: 'fa fa-trash' }),
                    '  Delete'
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
        window.location.href = '/referralRequest/' + this.props.id;
    },
    deleteMessage: function deleteMessage() {
        this.props.deleteMessage(this.props.id);
    },
    render: function render() {
        var displayLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Accepted',
            'pull-right show': this.props.status == 'Accepted'
        });
        var displayNotLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Rejected',
            'pull-right show': this.props.status == 'Rejected'
        });
        var displayArchiveButton = classNames({
            'btn btn-primary btn-sm hidden': this.props.status != 'Accepted',
            'btn btn-primary btn-sm show': this.props.status == 'Accepted'
        });
        var displayDeleteButton = classNames({
            'btn btn-primary btn-sm show': this.props.status != 'Accepted',
            'btn btn-primary btn-sm hidden': this.props.status == 'Accepted'
        });
        var typeIconStatus = classNames({
            'fa fa-arrow-right not-read-text-primary': this.props.status == 'New',
            'fa fa-arrow-right text-muted': this.props.status != 'New'
        });
        var attachmentsExist = classNames({
            'fa fa-paperclip hidden': this.props.attachments == null,
            'fa fa-paperclip': this.props.attachments != null
        });
        return React.createElement(
            'div',
            { className: this.props.count % 2 === 0 ? 'row resultInstant' : 'row resultInstantGrey' },
            React.createElement(
                'div',
                { className: 'col-md-12 message-timestamp' },
                React.createElement(
                    'span',
                    { className: 'margin-right-10' },
                    React.createElement('i', { className: attachmentsExist })
                ),
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
                    React.createElement('i', { className: typeIconStatus })
                ),
                React.createElement(
                    'ul',
                    { className: 'source' },
                    React.createElement(Avatar, { id: this.state.fromUser.id, username: this.state.fromUser.avatar, name: this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName, className: 'task-thumb' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left' },
                React.createElement(
                    'span',
                    { className: this.props.status == 'New' ? 'on' : 'off' },
                    'You received a referral from ',
                    this.state.fromUser.firstName,
                    ' ',
                    this.state.fromUser.lastName
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
                    { id: 'displayLatchCheck', className: displayNotLatchCheck },
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
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: displayDeleteButton, onClick: this.deleteMessage },
                    React.createElement('i', { className: 'fa fa-trash' }),
                    '  Delete'
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: displayArchiveButton, onClick: this.deleteMessage },
                    React.createElement('i', { className: 'fa fa-archive' }),
                    '  Archive'
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
        window.location.href = '/introductionRequest/' + this.props.id;
    },
    deleteMessage: function deleteMessage() {
        this.props.deleteMessage(this.props.id);
    },
    render: function render() {
        var displayLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Accepted',
            'pull-right show': this.props.status == 'Accepted'
        });
        var displayArchiveButton = classNames({
            'btn btn-primary btn-sm hidden': this.props.status != 'Accepted',
            'btn btn-primary btn-sm show': this.props.status == 'Accepted'
        });
        var displayDeleteButton = classNames({
            'btn btn-primary btn-sm show': this.props.status != 'Accepted',
            'btn btn-primary btn-sm hidden': this.props.status == 'Accepted'
        });
        var typeIconStatus = classNames({
            'fa fa-share-alt not-read-text-primary': this.props.status == 'New',
            'fa fa-share-alt text-muted': this.props.status != 'New'
        });
        var attachmentsExist = classNames({
            'fa fa-paperclip hidden': this.props.attachments == null,
            'fa fa-paperclip': this.props.attachments != null
        });
        return React.createElement(
            'div',
            { className: this.props.count % 2 === 0 ? 'row resultInstant' : 'row resultInstantGrey' },
            React.createElement(
                'div',
                { className: 'col-md-12 message-timestamp' },
                React.createElement(
                    'span',
                    { className: 'margin-right-10' },
                    React.createElement('i', { className: attachmentsExist })
                ),
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
                    React.createElement('i', { className: typeIconStatus })
                ),
                React.createElement(
                    'ul',
                    { className: 'source' },
                    React.createElement(Avatar, { id: this.state.fromUser.id, username: this.state.fromUser.avatar, name: this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName, className: 'task-thumb' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left' },
                React.createElement(
                    'span',
                    { className: this.props.status == 'New' ? 'on' : 'off' },
                    'You received an introduction from ',
                    this.state.fromUser.firstName,
                    ' ',
                    this.state.fromUser.lastName
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
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: displayDeleteButton, onClick: this.deleteMessage },
                    React.createElement('i', { className: 'fa fa-trash' }),
                    '  Delete'
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: displayArchiveButton, onClick: this.deleteMessage },
                    React.createElement('i', { className: 'fa fa-archive' }),
                    '  Archive'
                )
            )
        );
    }
});

var InboxResults = React.createClass({
    displayName: 'InboxResults',

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
        }).bind(this), 5000);
    },
    deleteMessage: function deleteMessage(id) {
        this.props.deleteMessage(id);
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
                    messages.push(React.createElement(Result, { key: message.id, id: message.id, fromUserId: message.fromUserId, groupId: message.groupId,
                        subjectUserId: message.subjectUserId, attachments: message.attachedAssetIds,
                        status: message.status, subject: message.subject, toUserId: message.toUserId,
                        transactionType: message.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++, deleteMessage: this.deleteMessage }));
                } else if (message.transactionType == "Referral") {
                    messages.push(React.createElement(Result2, { key: message.id, id: message.id, fromUserId: message.fromUserId, groupId: message.groupId,
                        subjectUserId: message.subjectUserId, attachments: message.attachedAssetIds,
                        status: message.status, subject: message.subject, toUserId: message.toUserId,
                        transactionType: message.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++, deleteMessage: this.deleteMessage }));
                } else if (message.transactionType == "Communication" || message.transactionType == "Notification") {
                    messages.push(React.createElement(Result3, { key: message.id, id: message.id, fromUserId: message.fromUserId, groupId: message.groupId,
                        subjectUserId: message.subjectUserId, attachments: message.attachedAssetIds,
                        status: message.status, subject: message.subject, toUserId: message.toUserId,
                        transactionType: message.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++, deleteMessage: this.deleteMessage }));
                } else if (message.transactionType == "Review") {
                    messages.push(React.createElement(Result4, { key: message.id, id: message.id, reviewId: message.transactionid, fromUserId: message.fromUserId, groupId: message.groupId,
                        subjectUserId: message.subjectUserId, attachments: message.attachedAssetIds,
                        status: message.status, subject: message.subject, toUserId: message.toUserId,
                        transactionType: message.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++, deleteMessage: this.deleteMessage }));
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

var InboxContent = React.createClass({
    displayName: 'InboxContent',
    getInitialState: function getInitialState() {
        return {
            communicationsTo: [],
            count: 0
        };
    },
    componentWillMount: function componentWillMount() {
        var id = $('#id').val();
        this.getCommunicationsTo(id);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("InboxContent:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.count != this.state.count) {
            console.log("InboxContent:componentWillReceiveProps:updateInbox");
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
            url: "/getCommunicationsTo",
            data: JSON.stringify(data, null, ' '),
            success: (function (result) {
                console.log(result);
                if (result.page.totalElements == 0) {
                    this.setState({
                        count: 0,
                        communicationsTo: []
                    });
                    return null;
                } else {
                    this.setState({
                        count: result.page.totalElements,
                        communicationsTo: result._embedded.communicationDTOList
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
    handleMessageClick: function handleMessageClick(m) {
        console.log("Message: " + m);
    },
    deleteMessage: function deleteMessage(mid) {
        console.log("Delete Message: " + mid);
        var id = $('#id').val();
        var data = {
            id: id,
            commId: mid
        };
        $.ajax({
            type: "POST",
            url: "/deleteCommunication",
            data: JSON.stringify(data, null, ' '),
            success: (function (result) {
                console.log(result);
                if (result.page.totalElements == 0) {
                    this.setState({
                        count: 0,
                        communicationsTo: []
                    });
                    return null;
                } else {
                    this.setState({
                        count: result.page.totalElements,
                        communicationsTo: result._embedded.communicationDTOList
                    });
                }
            }).bind(this),
            error: function error(_error2) {
                console.log(_error2);
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
                                            React.createElement('i', { className: 'fa fa-inbox' }),
                                            ' ',
                                            React.createElement(
                                                'strong',
                                                null,
                                                'Inbox'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-2' },
                                            React.createElement(
                                                'a',
                                                { className: 'video', title: 'Managing Messages - Inbox', href: 'https://youtu.be/-UNRgw2MkNg' },
                                                React.createElement('img', { className: 'video-icon pull-right', src: '/images/youTube.png', alt: 'Latch channel' })
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'panel-body' },
                                React.createElement(InboxResults, { data: this.state.communicationsTo, deleteMessage: this.deleteMessage })
                            )
                        )
                    )
                )
            )
        );
    }
});