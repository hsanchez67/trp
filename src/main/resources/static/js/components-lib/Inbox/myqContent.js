'use strict';

var Result3 = React.createClass({
    displayName: 'Result3',

    getInitialState: function getInitialState() {
        return {
            fromUser: [],
            toUser: this.props.user,
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
    },
    handleOpenMessage: function handleOpenMessage() {
        window.location.href = '/message/' + this.props.id;
    },
    deleteTask: function deleteTask() {
        this.props.deleteTask(this.props.id);
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: this.props.count % 2 === 0 ? 'row resultInstant' : 'row resultInstantGrey' },
            React.createElement(
                'div',
                { id: 'createdDate', className: 'col-lg-12 col-md-12 message-timestamp' },
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
                    { className: this.props.status == 'Pending' || this.props.status == 'Reply' ? 'on' : 'off' },
                    'Pending message to ',
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
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-primary btn-sm', onClick: this.deleteTask },
                    React.createElement('i', { className: 'fa fa-trash' }),
                    '  Delete'
                )
            )
        );
    }
});

var retryStyle = {
    position: 'relative',
    top: '-25px',
    left: '370px'
};

var Result2 = React.createClass({
    displayName: 'Result2',

    getInitialState: function getInitialState() {
        return {
            fromUser: [],
            toUser: this.props.user,
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
    },
    handleOpenReferral: function handleOpenReferral() {
        window.location.href = '/referralDraft/' + this.state.commId;
    },
    deleteTask: function deleteTask() {
        this.props.deleteTask(this.state.commId);
    },
    showRetryHelp: function showRetryHelp() {
        bootbox.dialog({
            title: "Referral Rejected",
            message: '<div class="text-left">The <strong>Referral</strong> you sent to <strong>' + this.state.toUser.firstName + ' ' + this.state.toUser.lastName + '</strong> was refected. We created a new My Q item for you to send a new referral.</div>'
        });
    },
    render: function render() {
        var displayLatchCheck = classNames({
            'pull-right hidden': this.props.attempts == 1,
            'pull-right show': this.props.attempts > 1
        });
        var subjectUser = "";
        if (!$.isEmptyObject(this.props.subjectUser)) {
            subjectUser = this.props.subjectUser.firstName + " " + this.props.subjectUser.lastName;
        } else if (this.props.profession != null && this.props.profession != "") {
            subjectUser = this.props.profession;
        }
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
                    { className: this.props.status == 'Pending' ? 'on' : 'off' },
                    'Pending referral to ',
                    this.state.toUser.firstName,
                    ' ',
                    this.state.toUser.lastName
                ),
                React.createElement('br', null),
                React.createElement(
                    'span',
                    { className: 'on' },
                    'Name or Profession: '
                ),
                subjectUser,
                React.createElement('br', null),
                this.props.note,
                React.createElement(
                    'div',
                    { id: 'displayLatchCheck', style: retryStyle, className: displayLatchCheck },
                    React.createElement(
                        'a',
                        { className: 'pointer', onClick: this.showRetryHelp },
                        React.createElement('img', { className: 'latched-icon img-responsive', src: '/images/LATCH-Logo-Uncheck.png', alt: 'Retry' })
                    )
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
                    { type: 'button', className: 'btn btn-primary btn-sm', onClick: this.deleteTask },
                    React.createElement('i', { className: 'fa fa-trash' }),
                    '  Delete'
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
            toUser: this.props.user,
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
        window.location.href = '/introductionDraft/' + this.props.id;
    },
    deleteTask: function deleteTask() {
        this.props.deleteTask(this.props.id);
    },
    render: function render() {
        var subjectUser = "";
        if (!$.isEmptyObject(this.props.subjectUser)) {
            subjectUser = this.props.subjectUser.firstName + " " + this.props.subjectUser.lastName;
        } else if (this.props.profession != null && this.props.profession != "") {
            subjectUser = this.props.profession;
        }
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
                    { className: this.props.status == 'Pending' ? 'on' : 'off' },
                    'Pending introduction to ',
                    this.state.toUser.firstName,
                    ' ',
                    this.state.toUser.lastName
                ),
                React.createElement('br', null),
                React.createElement(
                    'span',
                    { className: 'on' },
                    'Name or Profession: '
                ),
                subjectUser,
                React.createElement('br', null),
                this.props.note
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
                    { type: 'button', className: 'btn btn-primary btn-sm', onClick: this.deleteTask },
                    React.createElement('i', { className: 'fa fa-trash' }),
                    '  Delete'
                )
            )
        );
    }
});

var MyQResults = React.createClass({
    displayName: 'MyQResults',

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
    deleteTask: function deleteTask(id) {
        this.props.deleteTask(id);
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
            var tasks = [];
            var count = 0;
            this.props.data.forEach((function (task) {
                var created = new Date(task.comm.created);
                var hours = created.getHours();
                var minutes = created.getMinutes();
                var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
                var createdTime = $.datepicker.formatTime("h:mm tt", { hour: hours, minute: minutes }, {});
                if (task.comm.transactionType == "Introduction") {
                    tasks.push(React.createElement(Result, { key: task.comm.id, id: task.comm.id, fromUserId: task.comm.fromUserId,
                        subjectUserId: task.comm.subjectUserId, profession: task.comm.subjectUserProfession,
                        status: task.comm.status, note: task.comm.note, toUserId: task.comm.toUserId,
                        transactionType: task.comm.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++, user: task.user, subjectUser: task.subjectUser, deleteTask: this.deleteTask }));
                } else if (task.comm.transactionType == "Referral") {
                    tasks.push(React.createElement(Result2, { key: task.comm.id, id: task.comm.id, fromUserId: task.comm.fromUserId,
                        subjectUserId: task.comm.subjectUserId, profession: task.comm.subjectUserProfession,
                        status: task.comm.status, note: task.comm.note, toUserId: task.comm.toUserId, attempts: task.comm.attempts,
                        transactionType: task.comm.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++, user: task.user, subjectUser: task.subjectUser, deleteTask: this.deleteTask }));
                } else if (task.comm.transactionType == "Communication") {
                    task.push(React.createElement(Result3, { key: task.comm.id, id: task.comm.id, fromUserId: task.comm.fromUserId,
                        subjectUserId: task.comm.subjectUserId,
                        status: task.comm.status, note: task.comm.note, toUserId: task.comm.toUserId,
                        transactionType: task.comm.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++, user: task.user, deleteTask: this.deleteTask }));
                }
            }).bind(this));
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { id: 'message-list' },
                    tasks
                )
            );
        }
    }
});

var MyQContent = React.createClass({
    displayName: 'MyQContent',
    getInitialState: function getInitialState() {
        return {
            communicationsFrom: [],
            count: 0
        };
    },
    componentWillMount: function componentWillMount() {
        var id = $('#id').val();
        this.getCommunicationsFrom(id);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("MyQContent:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.count != this.state.count) {
            console.log("MyQContent:componentWillReceiveProps:updateMyQ");
            var id = $('#id').val();
            this.getCommunicationsFrom(id);
        }
    },
    getCommunicationsFrom: function getCommunicationsFrom(id) {
        var data = {
            id: id,
            status: 'Pending'
        };
        $.ajax({
            type: "POST",
            url: "/getPendingTasks",
            data: JSON.stringify(data, null, ' '),
            success: (function (result) {
                console.log(result);
                if (result.tasks == null) {
                    this.setState({
                        count: 0,
                        communicationsFrom: []
                    });
                    return null;
                } else {
                    this.setState({
                        count: result.tasks.length,
                        communicationsFrom: result.tasks
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
                    window.location.href = '/myq';
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
    updateCount: function updateCount() {
        this.props.updateCount();
    },
    deleteTask: function deleteTask(mid) {
        console.log("Delete Task: " + mid);
        var data = {
            commId: mid
        };
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/deletePendingMessage",
            data: formData,
            success: (function (result) {
                console.log(result);
                var id = $('#id').val();
                this.getCommunicationsFrom(id);
                this.updateCount();
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
                                            React.createElement('i', { className: 'fa fa-tasks' }),
                                            ' ',
                                            React.createElement(
                                                'strong',
                                                null,
                                                'My Q'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-2' },
                                            React.createElement(
                                                'a',
                                                { className: 'video', title: 'Managing My Q', href: 'https://youtu.be/NP8CJBCsow4' },
                                                React.createElement('img', { className: 'video-icon pull-right', src: '/images/youTube.png', alt: 'Latch channel' })
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'panel-body' },
                                React.createElement(MyQResults, { data: this.state.communicationsFrom, deleteTask: this.deleteTask })
                            )
                        )
                    )
                )
            )
        );
    }
});