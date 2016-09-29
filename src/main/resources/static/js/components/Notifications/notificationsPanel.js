var NotificationsPanel = React.createClass({
    displayName: 'NotificationsPanel',
    getInitialState: function(){
        return {
            notificationsTo: [],
            count: 0
        }
    },
    componentWillMount: function () {
        var id = $('#id').val();
        this.getNotificationsTo(id);
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("NotificationsPanel:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.count != this.state.count) {
            console.log("NotificationsPanel:componentWillReceiveProps:updatePanel");
            var id = $('#id').val();
            this.getNotificationsTo(id);
        }
    },
    getNotificationsTo: function(id) {
        var data = {
            id: id
        };
        $.ajax({
            type: "POST",
            url: "/getNotificationsTo",
            data: JSON.stringify(data, null, ' '),
            success: function(result){
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
            }.bind(this),
            error: function(error) {
                console.log(error);
                return false;
            },
            complete: function (e, xhr, settings) {
                console.log(e.status);
                if (e.status === 401) {
                    window.location.href = '/home';
                    console.log(e);
                }
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    render: function () {
        return (
            <div id="notification-panel">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <header className="panel-title">
                            <div className="text-center">
                                <strong>Notifications</strong>
                            </div>
                        </header>
                    </div>
                    <div className="panel-body">
                        <NotificationsResults data={this.state.notificationsTo} />
                    </div>
                </div>
            </div>
        );
    },
});

var NotificationsResults = React.createClass({
    getInitialState: function () {
        return {
            loading: true
        };
    },
    componentDidMount: function () {
        setTimeout(function() {
            this.setState({ loading: false });
        }.bind(this), 5000);
    },
    render:function() {
        if ($.isEmptyObject(this.props.data) && this.state.loading) {
            return (
                <div className="no-entries"><i className="fa fa-5x fa-cog fa-spin"></i></div>
            );
        } else if ($.isEmptyObject(this.props.data) && !this.state.loading) {
            return <div className="no-entries">No notifications!</div>;
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
                    messages.push(<Notification key={message.id} message={message}
                                                createdDate={displayMoment} count={count++}/>);
                }
            });
        }
        return (
            <table className="table table-condensed">
                <tbody>
                {messages}
                </tbody>
            </table>
        );
    }
});

var Notification = React.createClass({
    render: function () {
        var description = this.props.message.note;
        return (
            <tr>
                <td className="notification-time">{this.props.createdDate}</td>
                <td className="notification-message"><span dangerouslySetInnerHTML={{__html: marked(description || '')}}></span></td>
            </tr>
        );
    },
});
