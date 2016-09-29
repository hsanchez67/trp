var Result3 = React.createClass({
    getInitialState: function() {
        return {
            fromUser: [],
            toUser: [],
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
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/'+toUserId;
        $.get(source2, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }.bind(this));
    },
    handleOpenMessage: function() {
        window.location.href = '/messageSent/' + this.props.id;
    },
    render:function() {
        return (
            <div className={this.props.count%2===0 ? 'row resultInstant' : 'row resultInstantGrey'}>
                <div className="col-lg-12 col-md-12 message-timestamp">{this.props.createdDate} {this.props.createdTime}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                    <div className='input-type-logo'>
                        <i className="fa fa-envelope"></i>
                    </div>
                    <ul className="source">
                        <Avatar id={this.state.toUser.id} username={this.state.toUser.avatar} name={this.state.toUser.firstName + ' ' + this.state.toUser.lastName} className="task-thumb" />
                    </ul>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left">
                    <span className="off">You sent a message to {this.state.toUser.firstName} {this.state.toUser.lastName}</span><br />
                    {this.props.subject}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOpenMessage}>
                        <i className="fa fa-folder-open "></i>&nbsp;
                        Open
                    </button>
                </div>
            </div>);
    }
});

var Result2 = React.createClass({
    getInitialState: function() {
        return {
            fromUser: [],
            toUser: [],
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
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/'+toUserId;
        $.get(source2, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
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
    handleOpenReferral: function() {
        window.location.href = '/referralRequestSent/' + this.props.id;
    },
    render:function() {
        let displayLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Accepted' && this.props.status != 'Archived',
            'pull-right show': this.props.status == 'Accepted' || this.props.status == 'Archived'
        });
        let displayNotLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Rejected' && this.props.status != 'Dejected',
            'pull-right show': this.props.status == 'Rejected' || this.props.status == 'Dejected'
        });
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
                    <span className="off">You sent a referral to {this.state.toUser.firstName} {this.state.toUser.lastName}</span><br />
                    {this.props.subject}
                    <div id="displayLatchCheck" className={displayLatchCheck}><img className="latched-icon img-responsive" src="/images/LATCH-Logo-Check.png" alt="Latched" /></div>
                    <div id="displayNotLatchCheck" className={displayNotLatchCheck}><img className="latched-icon img-responsive" src="/images/LATCH-Logo-Uncheck.png" alt="Not Latched" /></div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOpenReferral}>
                        <i className="fa fa-folder-open "></i>&nbsp;
                        Open
                    </button>
                </div>
            </div>);
    }
});

var Result = React.createClass({
    getInitialState: function() {
        return {
            fromUser: [],
            toUser: [],
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
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/'+toUserId;
        $.get(source2, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
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
        window.location.href = '/introductionRequestSent/' + this.props.id;
    },
    render:function() {
        let displayLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Accepted',
            'pull-right show': this.props.status == 'Accepted'
        });
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
                    <span className="off">You introduced {this.state.toUser.firstName} {this.state.toUser.lastName} to {this.state.subjectUser.firstName} {this.state.subjectUser.lastName}</span><br />
                    {this.props.subject}
                    <div id="displayLatchCheck" className={displayLatchCheck}><img className="latched-icon img-responsive" src="/images/LATCH-Logo-Check.png" alt="Latched" /></div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOpenIntroduction}>
                        <i className="fa fa-folder-open"></i>&nbsp;
                        Open
                    </button>
                </div>
            </div>);
    }
});

var SentResults = React.createClass({
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
    render:function() {
        if ($.isEmptyObject(this.props.data) && this.state.loading) {
            return (
                <div className="no-entries"><i className="fa fa-5x fa-cog fa-spin"></i></div>
            );
        } else if ($.isEmptyObject(this.props.data) && !this.state.loading) {
            return <div className="no-entries">No messages!</div>;
        } else {
            var messages = [];
            var count = 0;
            this.props.data.forEach(function (message) {
                var created = new Date(message.created);
                var hours = created.getHours()
                var minutes = created.getMinutes()
                var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
                var createdTime = $.datepicker.formatTime("h:mm tt", {hour: hours, minute: minutes}, {});
                if (message.transactionType == "Introduction") {
                    messages.push(<Result key={message.id} id={message.id} fromUserId={message.fromUserId}
                                          subjectUserId={message.subjectUserId}
                                          status={message.status} subject={message.subject} toUserId={message.toUserId}
                                          transactionType={message.transactionType} createdDate={createdDate} createdTime={createdTime}
                                          count={count++}/>);
                } else if (message.transactionType == "Referral") {
                    messages.push(<Result2 key={message.id} id={message.id} fromUserId={message.fromUserId}
                                           subjectUserId={message.subjectUserId}
                                           status={message.status} subject={message.subject} toUserId={message.toUserId}
                                           transactionType={message.transactionType} createdDate={createdDate} createdTime={createdTime}
                                           count={count++}/>);
                } else if (message.transactionType == "Communication") {
                    messages.push(<Result3 key={message.id} id={message.id} fromUserId={message.fromUserId}
                                           subjectUserId={message.subjectUserId}
                                           status={message.status} subject={message.subject} toUserId={message.toUserId}
                                           transactionType={message.transactionType} createdDate={createdDate} createdTime={createdTime}
                                           count={count++} />);
                }
            }.bind(this));
            return (
                <div><form id="message-list">{messages}</form></div>
            );
        }
    }
});



var SentContent = React.createClass({
    displayName: 'ArchiveContent',
    getInitialState: function(){
        return {
            communicationsFrom: [],
            count: 0
        }
    },
    componentWillMount: function () {
        var id = $('#id').val();
        this.getCommunicationsTo(id);
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("SentContent:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.count != this.state.count) {
            console.log("SentContent:componentWillReceiveProps:updateInbox");
            var id = $('#id').val();
            this.getCommunicationsTo(id);
        }
    },
    getCommunicationsTo: function(id) {
        var data = {
            id: id
        };
        $.ajax({
            type: "POST",
            url: "/getSentCommunicationsFrom",
            data: JSON.stringify(data, null, ' '),
            success: function(result){
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
                                                <i className="fa fa-paper-plane"></i>&nbsp;<strong>Sent</strong>
                                            </div>
                                            <div className="col-md-2">
                                                <a className="video" title="Managing Messages - Sent Folder" href="https://youtu.be/lr8nV6rIPo8"><img className="video-icon pull-right" src="/images/youTube.png" alt="Latch channel" /></a>
                                            </div>
                                        </div>
                                    </header>
                                </div>
                                <div className="panel-body">
                                    <SentResults data={this.state.communicationsFrom} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});