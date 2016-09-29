'use strict';

var NotificationsPanel = React.createClass({
    displayName: 'NotificationsPanel',
    getInitialState: function getInitialState() {
        return {
            notificationsTo: [],
            count: 0
        };
    },
    componentWillMount: function componentWillMount() {
        var id = $('#id').val();
        this.getNotificationsTo(id);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("NotificationsPanel:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.count != this.state.count) {
            console.log("NotificationsPanel:componentWillReceiveProps:updatePanel");
            var id = $('#id').val();
            this.getNotificationsTo(id);
        }
    },
    getNotificationsTo: function getNotificationsTo(id) {
        var data = {
            id: id
        };
        $.ajax({
            type: "POST",
            url: "/getNotificationsTo",
            data: JSON.stringify(data, null, ' '),
            success: (function (result) {
                console.log(result);
                if (result.page.totalElements == 0) {
                    this.setState({
                        count: 0,
                        notificationsTo: []
                    });
                    return null;
                } else {
                    this.setState({
                        count: result.page.totalElements,
                        notificationsTo: result._embedded.communicationDTOList
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
                    window.location.href = '/home';
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
            { id: 'notification-panel' },
            React.createElement(
                'div',
                { className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { className: 'panel-heading' },
                    React.createElement(
                        'header',
                        { className: 'panel-title' },
                        React.createElement(
                            'div',
                            { className: 'text-center' },
                            React.createElement(
                                'strong',
                                null,
                                'Notifications'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body' },
                    React.createElement(NotificationsResults, { data: this.state.notificationsTo })
                )
            )
        );
    }
});

var NotificationsResults = React.createClass({
    displayName: 'NotificationsResults',

    getInitialState: function getInitialState() {
        return {
            loading: true
        };
    },
    componentDidMount: function componentDidMount() {
        setTimeout((function () {
            this.setState({ loading: false });
        }).bind(this), 5000);
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
                'No notifications!'
            );
        } else {
            var messages = [];
            var count = 0;
            this.props.data.forEach(function (message) {
                if (message.note) {
                    var endOfDay = moment().endOf('day');
                    var week = moment().startOf('week');
                    var displayMoment;
                    var momentCreated = moment(new Date(message.created));
                    if (endOfDay.diff(momentCreated.endOf('day'), 'hours') == 24) {
                        displayMoment = "Yesterday";
                    } else if (endOfDay.diff(momentCreated.endOf('day'), 'hours') > 24) {
                        if (week.diff(momentCreated, 'days') > 7) {
                            displayMoment = moment(new Date(message.created)).format("MMM D YYYY");
                        } else {
                            displayMoment = moment(new Date(message.created)).format("ddd, h:mm A");
                        }
                    } else {
                        displayMoment = moment(new Date(message.created)).format("h:mm A");
                    }
                    messages.push(React.createElement(Notification, { key: message.id, message: message,
                        createdDate: displayMoment, count: count++ }));
                }
            });
        }
        return React.createElement(
            'table',
            { className: 'table table-condensed' },
            React.createElement(
                'tbody',
                null,
                messages
            )
        );
    }
});

var Notification = React.createClass({
    displayName: 'Notification',

    render: function render() {
        var description = this.props.message.note;
        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                { className: 'notification-time' },
                this.props.createdDate
            ),
            React.createElement(
                'td',
                { className: 'notification-message' },
                React.createElement('span', { dangerouslySetInnerHTML: { __html: marked(description || '') } })
            )
        );
    }
});