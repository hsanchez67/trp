var Result3 = React.createClass({
    getInitialState: function() {
        return {
            fromUser: [],
            toUser: this.props.user,
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/'+fromUserId;
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }.bind(this));
    },
    handleOpenMessage: function() {
        window.location.href = '/message/' + this.props.id;
    },
    deleteTask: function() {
        this.props.deleteTask(this.props.id);
    },
    render:function() {
        return (
            <div className={this.props.count%2===0 ? 'row resultInstant' : 'row resultInstantGrey'}>
                <div id="createdDate" className="col-lg-12 col-md-12 message-timestamp">{this.props.createdDate} {this.props.createdTime}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                    <div className='input-type-logo'>
                        <i className="fa fa-envelope"></i>
                    </div>
                    <ul className="source">
                        <Avatar id={this.state.toUser.id} username={this.state.toUser.avatar} name={this.state.toUser.firstName + ' ' + this.state.toUser.lastName} className="task-thumb" />
                    </ul>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left">
                    <span className={this.props.status == 'Pending' || this.props.status == 'Reply' ? 'on' : 'off'}>Pending message to {this.state.toUser.firstName} {this.state.toUser.lastName}</span><br />
                    {this.props.subject}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOpenMessage}>
                        <i className="fa fa-folder-open "></i>&nbsp;
                        Open
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.deleteTask}>
                        <i className="fa fa-trash"></i>&nbsp;
                        Delete
                    </button>
                </div>
            </div>);
    }
});

var retryStyle = {
    position: 'relative',
    top: '-25px',
    left: '370px'
}

var Result2 = React.createClass({
    getInitialState: function() {
        return {
            fromUser: [],
            toUser: this.props.user,
            commId: this.props.id
        };
    },
    componentWillMount: function() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/'+fromUserId;
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }.bind(this));
    },
    handleOpenReferral: function() {
        window.location.href = '/referralDraft/' + this.state.commId;
    },
    deleteTask: function() {
        this.props.deleteTask(this.state.commId);
    },
    showRetryHelp: function() {
        bootbox.dialog({
            title: "Referral Rejected",
            message: '<div class="text-left">The <strong>Referral</strong> you sent to <strong>'+ this.state.toUser.firstName + ' ' + this.state.toUser.lastName + '</strong> was refected. We created a new My Q item for you to send a new referral.</div>'
        });
    },
    render:function() {
        let displayLatchCheck = classNames({
            'pull-right hidden': this.props.attempts == 1,
            'pull-right show': this.props.attempts > 1
        });
        var subjectUser = "";
        if (!$.isEmptyObject(this.props.subjectUser)) {
            subjectUser = this.props.subjectUser.firstName + " " + this.props.subjectUser.lastName;
        } else if (this.props.profession != null && this.props.profession != "") {
            subjectUser = this.props.profession;
        }
        return (
            <div className={this.props.count%2===0 ? 'row resultInstant' : 'row resultInstantGrey'}>
                <div className="col-md-12 message-timestamp">{this.props.createdDate} {this.props.createdTime}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                    <div className='input-type-logo'>
                        <i className="fa fa-arrow-right"></i>
                    </div>
                    <ul className="source">
                        <Avatar id={this.state.toUser.id} username={this.state.toUser.avatar} name={this.state.toUser.firstName + ' ' + this.state.toUser.lastName} className="task-thumb" />
                    </ul>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left">
                    <span className={this.props.status == 'Pending' ? 'on' : 'off'}>Pending referral to {this.state.toUser.firstName} {this.state.toUser.lastName}</span><br />
                    <span className="on">Name or Profession: </span>{subjectUser}<br />
                    {this.props.note}
                    <div id="displayLatchCheck" style={retryStyle} className={displayLatchCheck}><a className="pointer" onClick={this.showRetryHelp} ><img className="latched-icon img-responsive" src="/images/LATCH-Logo-Uncheck.png" alt="Retry" /></a></div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOpenReferral}>
                        <i className="fa fa-folder-open "></i>&nbsp;
                        Open
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.deleteTask}>
                        <i className="fa fa-trash"></i>&nbsp;
                        Delete
                    </button>
                </div>
            </div>);
    }
});

var Result = React.createClass({
    getInitialState: function() {
        return {
            fromUser: [],
            toUser: this.props.user,
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/'+fromUserId;
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }.bind(this));
        var subjectUserId = this.props.subjectUserId;
        var source3 = '/api/users/'+subjectUserId;
        $.get(source3, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    subjectUser: result
                });
            }
        }.bind(this));
    },
    handleOpenIntroduction: function() {
        window.location.href = '/introductionDraft/' + this.props.id;
    },
    deleteTask: function() {
        this.props.deleteTask(this.props.id);
    },
    render:function() {
        var subjectUser = "";
        if (!$.isEmptyObject(this.props.subjectUser)) {
            subjectUser = this.props.subjectUser.firstName + " " + this.props.subjectUser.lastName;
        } else if (this.props.profession != null && this.props.profession != "") {
            subjectUser = this.props.profession;
        }
        return (
            <div className={this.props.count%2===0 ? 'row resultInstant' : 'row resultInstantGrey'}>
                <div className="col-md-12 message-timestamp">{this.props.createdDate} {this.props.createdTime}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                    <div className='input-type-logo'>
                        <i className="fa fa-share-alt"></i>
                    </div>
                    <ul className="source">
                        <Avatar id={this.state.toUser.id} username={this.state.toUser.avatar} name={this.state.toUser.firstName + ' ' + this.state.toUser.lastName} className="task-thumb" />
                    </ul>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left">
                    <span className={this.props.status == 'Pending' ? 'on' : 'off'}>Pending introduction to {this.state.toUser.firstName} {this.state.toUser.lastName}</span><br />
                    <span className="on">Name or Profession: </span>{subjectUser}<br />
                    {this.props.note}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOpenIntroduction}>
                        <i className="fa fa-folder-open"></i>&nbsp;
                        Open
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.deleteTask}>
                        <i className="fa fa-trash"></i>&nbsp;
                        Delete
                    </button>
                </div>
            </div>);
    }
});

var MyQResults = React.createClass({
    getInitialState: function () {
        return {
            loading: true
        };
    },
    componentDidUpdate: function() {
        // drag & drop
        $(".source li").draggable({
            addClasses: false,
            appendTo: "body",
            helper: "clone"
        });
    },
    componentDidMount: function () {
        setTimeout(function() {
            this.setState({ loading: false });
        }.bind(this), 5000 / 60);
    },
    deleteTask: function (id) {
        this.props.deleteTask(id);
    },
    render:function() {
        if ($.isEmptyObject(this.props.data) && this.state.loading) {
            return (
                <div className="no-entries"><i className="fa fa-5x fa-cog fa-spin"></i></div>
            );
        } else if ($.isEmptyObject(this.props.data) && !this.state.loading) {
            return <div className="no-entries">No messages!</div>;
        } else {
            var tasks = [];
            var count = 0;
            this.props.data.forEach(function (task) {
                var created = new Date(task.comm.created);
                var hours = created.getHours()
                var minutes = created.getMinutes()
                var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
                var createdTime = $.datepicker.formatTime("h:mm tt", {hour: hours, minute: minutes}, {});
                if (task.comm.transactionType == "Introduction") {
                    tasks.push(<Result key={task.comm.id} id={task.comm.id} fromUserId={task.comm.fromUserId}
                                          subjectUserId={task.comm.subjectUserId} profession={task.comm.subjectUserProfession}
                                          status={task.comm.status} note={task.comm.note} toUserId={task.comm.toUserId}
                                          transactionType={task.comm.transactionType} createdDate={createdDate} createdTime={createdTime}
                                          count={count++} user={task.user} subjectUser={task.subjectUser} deleteTask={this.deleteTask} />);
                } else if (task.comm.transactionType == "Referral") {
                    tasks.push(<Result2 key={task.comm.id} id={task.comm.id} fromUserId={task.comm.fromUserId}
                                           subjectUserId={task.comm.subjectUserId} profession={task.comm.subjectUserProfession}
                                           status={task.comm.status} note={task.comm.note} toUserId={task.comm.toUserId} attempts={task.comm.attempts}
                                           transactionType={task.comm.transactionType} createdDate={createdDate} createdTime={createdTime}
                                           count={count++} user={task.user} subjectUser={task.subjectUser} deleteTask={this.deleteTask} />);
                } else if (task.comm.transactionType == "Communication") {
                    task.push(<Result3 key={task.comm.id} id={task.comm.id} fromUserId={task.comm.fromUserId}
                                           subjectUserId={task.comm.subjectUserId}
                                           status={task.comm.status} note={task.comm.note} toUserId={task.comm.toUserId}
                                           transactionType={task.comm.transactionType} createdDate={createdDate} createdTime={createdTime}
                                           count={count++} user={task.user} deleteTask={this.deleteTask} />);
                }
            }.bind(this));
            return (
                <div><form id="message-list">{tasks}</form></div>
            );
        }
    }
});



var MyQContent = React.createClass({
    displayName: 'MyQContent',
    getInitialState: function(){
        return {
            communicationsFrom: [],
            count: 0
        }
    },
    componentWillMount: function () {
        var id = $('#id').val();
        this.getCommunicationsFrom(id);
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("MyQContent:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.count != this.state.count) {
            console.log("MyQContent:componentWillReceiveProps:updateMyQ");
            var id = $('#id').val();
            this.getCommunicationsFrom(id);
        }
    },
    getCommunicationsFrom: function(id) {
        var data = {
            id: id,
            status: 'Pending'
        };
        $.ajax({
            type: "POST",
            url: "/getPendingTasks",
            data: JSON.stringify(data, null, ' '),
            success: function(result){
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
            }.bind(this),
            error: function(error) {
                console.log(error);
                return false;
            },
            complete: function (e, xhr, settings) {
                console.log(e.status);
                if (e.status === 401) {
                    window.location.href = '/myq';
                    console.log(e);
                }
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    handleMessageClick: function (m) {
        console.log("Message: " + m);
    },
    updateCount: function() {
        this.props.updateCount();
    },
    deleteTask: function(mid) {
        console.log("Delete Task: " + mid);
        var data = {
            commId: mid
        };
        var formData = JSON.stringify(data, null, ' ')
        $.ajax({
            type: "POST",
            url: "/deletePendingMessage",
            data: formData,
            success: function(result){
                console.log(result);
                var id = $('#id').val();
                this.getCommunicationsFrom(id);
                this.updateCount();
            }.bind(this),
            error: function(error) {
                console.log(error);
                return false;
            },
            complete: function (e, xhr, settings) {
                console.log(e.status);
                if (e.status === 401) {
                    window.location.href = '/inbox';
                    console.log(e);
                }
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    render: function () {
        return (
            <div className="col-lg-8">
                <div id="inbox-content-row" className="row state-overview">
                    <div className="row" id="profile-content">
                        <div className="col-lg-12">
                            <div className="panel panel-default" id="inbox-panel">
                                <div className="panel-heading">
                                    <header className="panel-title">
                                        <div className="row">
                                            <div className="col-md-8 col-md-offset-2 text-center">
                                                <i className="fa fa-tasks"></i>&nbsp;<strong>My Q</strong>
                                            </div>
                                            <div className="col-md-2">
                                                <a className="video" title="Managing My Q" href="https://youtu.be/NP8CJBCsow4"><img className="video-icon pull-right" src="/images/youTube.png" alt="Latch channel" /></a>
                                            </div>
                                        </div>
                                    </header>
                                </div>
                                <div className="panel-body">
                                    <MyQResults data={this.state.communicationsFrom} deleteTask={this.deleteTask} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});