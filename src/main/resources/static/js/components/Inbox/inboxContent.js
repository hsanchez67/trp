var Result4 = React.createClass({
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
        window.location.href = '/reviewRequest/' + this.props.reviewId;
    },
    deleteMessage: function() {
        this.props.deleteMessage(this.props.id);
    },
    render:function() {
        let typeIconStatus = classNames({
            'fa fa-thumbs-up not-read-text-primary': this.props.status == 'New',
            'fa fa-thumbs-up text-muted': this.props.status != 'New'
        });
        return (
            <div className={this.props.count%2===0 ? 'row resultInstant' : 'row resultInstantGrey'}>
                <div className="col-lg-12 col-md-12 message-timestamp">
                    {this.props.createdDate} {this.props.createdTime}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                    <div className='input-type-logo'>
                        <i className={typeIconStatus}></i>
                    </div>
                    <ul className="source">
                        <Avatar id={this.state.fromUser.id} username={this.state.fromUser.avatar} name={this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName} className="task-thumb" />
                    </ul>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left">
                    <span className={this.props.status == 'New' || this.props.status == 'Reply' ? 'on' : 'off'}>You received a review request from {this.state.fromUser.firstName} {this.state.fromUser.lastName}</span><br />
                    {this.props.subject}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOpenMessage}>
                        <i className="fa fa-folder-open "></i>&nbsp;
                        Open
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.deleteMessage}>
                        <i className="fa fa-trash"></i>&nbsp;
                        Delete
                    </button>
                </div>
            </div>);
    }
});

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
        window.location.href = '/message/' + this.props.id;
    },
    deleteMessage: function() {
        this.props.deleteMessage(this.props.id);
    },
    render:function() {
        let typeIconStatus = classNames({
            'fa fa-envelope not-read-text-primary': this.props.status == 'New',
            'fa fa-envelope text-muted': this.props.status != 'New'
        });
        let attachmentsExist = classNames({
            'fa fa-paperclip hidden': this.props.attachments == null,
            'fa fa-paperclip': this.props.attachments != null
        });
        let isGroupMessage = classNames({
            'fa fa-users hidden': this.props.groupId == null || this.props.groupId == "",
            'fa fa-users': this.props.groupId != null || this.props.groupId != ""
        });
        return (
            <div className={this.props.count%2===0 ? 'row resultInstant' : 'row resultInstantGrey'}>
                <div className="col-lg-12 col-md-12 message-timestamp">
                    <span className="margin-right-10"><i className={isGroupMessage}></i></span>
                    <span className="margin-right-10"><i className={attachmentsExist}></i></span>
                    {this.props.createdDate} {this.props.createdTime}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                    <div className='input-type-logo'>
                        <i className={typeIconStatus}></i>
                    </div>
                    <ul className="source">
                        <Avatar id={this.state.fromUser.id} username={this.state.fromUser.avatar} name={this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName} className="task-thumb" />
                    </ul>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left">
                    <span className={this.props.status == 'New' || this.props.status == 'Reply' ? 'on' : 'off'}>You received a message from {this.state.fromUser.firstName} {this.state.fromUser.lastName}</span><br />
                    {this.props.subject}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOpenMessage}>
                        <i className="fa fa-folder-open "></i>&nbsp;
                        Open
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.deleteMessage}>
                        <i className="fa fa-trash"></i>&nbsp;
                        Delete
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
        window.location.href = '/referralRequest/' + this.props.id;
    },
    deleteMessage: function() {
        this.props.deleteMessage(this.props.id);
    },
    render:function() {
        let displayLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Accepted',
            'pull-right show': this.props.status == 'Accepted'
        });
        let displayNotLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Rejected',
            'pull-right show': this.props.status == 'Rejected'
        });
        let displayArchiveButton = classNames({
            'btn btn-primary btn-sm hidden': this.props.status != 'Accepted',
            'btn btn-primary btn-sm show': this.props.status == 'Accepted'
        });
        let displayDeleteButton = classNames({
            'btn btn-primary btn-sm show': this.props.status != 'Accepted',
            'btn btn-primary btn-sm hidden': this.props.status == 'Accepted'
        });
        let typeIconStatus = classNames({
            'fa fa-arrow-right not-read-text-primary': this.props.status == 'New',
            'fa fa-arrow-right text-muted': this.props.status != 'New'
        });
        let attachmentsExist = classNames({
            'fa fa-paperclip hidden': this.props.attachments == null,
            'fa fa-paperclip': this.props.attachments != null
        });
        return (
            <div className={this.props.count%2===0 ? 'row resultInstant' : 'row resultInstantGrey'}>
                <div className="col-md-12 message-timestamp">
                    <span className="margin-right-10"><i className={attachmentsExist}></i></span>
                    {this.props.createdDate} {this.props.createdTime}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                    <div className='input-type-logo'>
                        <i className={typeIconStatus}></i>
                    </div>
                    <ul className="source">
                        <Avatar id={this.state.fromUser.id} username={this.state.fromUser.avatar} name={this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName} className="task-thumb" />
                    </ul>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left">
                    <span className={this.props.status == 'New' ? 'on' : 'off'}>You received a referral from {this.state.fromUser.firstName} {this.state.fromUser.lastName}</span><br />
                    {this.props.subject}
                    <div id="displayLatchCheck" className={displayLatchCheck}><img className="latched-icon img-responsive" src="/images/LATCH-Logo-Check.png" alt="Latched" /></div>
                    <div id="displayLatchCheck" className={displayNotLatchCheck}><img className="latched-icon img-responsive" src="/images/LATCH-Logo-Uncheck.png" alt="Not Latched" /></div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOpenReferral}>
                        <i className="fa fa-folder-open "></i>&nbsp;
                        Open
                    </button>
                    <button type="button" className={displayDeleteButton} onClick={this.deleteMessage}>
                        <i className="fa fa-trash"></i>&nbsp;
                        Delete
                    </button>
                    <button type="button" className={displayArchiveButton} onClick={this.deleteMessage}>
                        <i className="fa fa-archive"></i>&nbsp;
                        Archive
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
        window.location.href = '/introductionRequest/' + this.props.id;
    },
    deleteMessage: function() {
        this.props.deleteMessage(this.props.id);
    },
    render:function() {
        let displayLatchCheck = classNames({
            'pull-right hidden': this.props.status != 'Accepted',
            'pull-right show': this.props.status == 'Accepted'
        });
        let displayArchiveButton = classNames({
            'btn btn-primary btn-sm hidden': this.props.status != 'Accepted',
            'btn btn-primary btn-sm show': this.props.status == 'Accepted'
        });
        let displayDeleteButton = classNames({
            'btn btn-primary btn-sm show': this.props.status != 'Accepted',
            'btn btn-primary btn-sm hidden': this.props.status == 'Accepted'
        });
        let typeIconStatus = classNames({
            'fa fa-share-alt not-read-text-primary': this.props.status == 'New',
            'fa fa-share-alt text-muted': this.props.status != 'New'
        });
        let attachmentsExist = classNames({
            'fa fa-paperclip hidden': this.props.attachments == null,
            'fa fa-paperclip': this.props.attachments != null
        });
        return (
            <div className={this.props.count%2===0 ? 'row resultInstant' : 'row resultInstantGrey'}>
                <div className="col-md-12 message-timestamp">
                    <span className="margin-right-10"><i className={attachmentsExist}></i></span>
                    {this.props.createdDate} {this.props.createdTime}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                    <div className='input-type-logo'>
                        <i className={typeIconStatus}></i>
                    </div>
                    <ul className="source">
                        <Avatar id={this.state.fromUser.id} username={this.state.fromUser.avatar} name={this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName} className="task-thumb" />
                    </ul>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left">
                    <span className={this.props.status == 'New' ? 'on' : 'off'}>You received an introduction from {this.state.fromUser.firstName} {this.state.fromUser.lastName}</span><br />
                    {this.props.subject}
                    <div id="displayLatchCheck" className={displayLatchCheck}><img className="latched-icon img-responsive" src="/images/LATCH-Logo-Check.png" alt="Latched" /></div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 text-center top10">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOpenIntroduction}>
                        <i className="fa fa-folder-open"></i>&nbsp;
                        Open
                    </button>
                    <button type="button" className={displayDeleteButton} onClick={this.deleteMessage}>
                        <i className="fa fa-trash"></i>&nbsp;
                        Delete
                    </button>
                    <button type="button" className={displayArchiveButton} onClick={this.deleteMessage}>
                        <i className="fa fa-archive"></i>&nbsp;
                        Archive
                    </button>
                </div>
            </div>);
    }
});

var InboxResults = React.createClass({
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
        }.bind(this), 5000);
    },
    deleteMessage: function (id) {
        this.props.deleteMessage(id);
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
                    messages.push(<Result key={message.id} id={message.id} fromUserId={message.fromUserId} groupId={message.groupId}
                                          subjectUserId={message.subjectUserId} attachments={message.attachedAssetIds}
                                          status={message.status} subject={message.subject} toUserId={message.toUserId}
                                          transactionType={message.transactionType} createdDate={createdDate} createdTime={createdTime}
                                          count={count++} deleteMessage={this.deleteMessage} />);
                } else if (message.transactionType == "Referral") {
                    messages.push(<Result2 key={message.id} id={message.id} fromUserId={message.fromUserId} groupId={message.groupId}
                                          subjectUserId={message.subjectUserId} attachments={message.attachedAssetIds}
                                          status={message.status} subject={message.subject} toUserId={message.toUserId}
                                          transactionType={message.transactionType} createdDate={createdDate} createdTime={createdTime}
                                          count={count++} deleteMessage={this.deleteMessage} />);
                } else if (message.transactionType == "Communication" || message.transactionType == "Notification") {
                    messages.push(<Result3 key={message.id} id={message.id} fromUserId={message.fromUserId} groupId={message.groupId}
                                          subjectUserId={message.subjectUserId} attachments={message.attachedAssetIds}
                                          status={message.status} subject={message.subject} toUserId={message.toUserId}
                                          transactionType={message.transactionType} createdDate={createdDate} createdTime={createdTime}
                                          count={count++} deleteMessage={this.deleteMessage} />);
                } else if (message.transactionType == "Review") {
                    messages.push(<Result4 key={message.id} id={message.id} reviewId={message.transactionid} fromUserId={message.fromUserId} groupId={message.groupId}
                                           subjectUserId={message.subjectUserId} attachments={message.attachedAssetIds}
                                           status={message.status} subject={message.subject} toUserId={message.toUserId}
                                           transactionType={message.transactionType} createdDate={createdDate} createdTime={createdTime}
                                           count={count++} deleteMessage={this.deleteMessage} />);
                }
            }.bind(this));
            return (
                <div><form id="message-list">{messages}</form></div>
            );
        }
    }
});



var InboxContent = React.createClass({
    displayName: 'InboxContent',
    getInitialState: function(){
        return {
            communicationsTo: [],
            count: 0
        }
    },
    componentWillMount: function () {
        var id = $('#id').val();
        this.getCommunicationsTo(id);
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("InboxContent:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.count != this.state.count) {
            console.log("InboxContent:componentWillReceiveProps:updateInbox");
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
            url: "/getCommunicationsTo",
            data: JSON.stringify(data, null, ' '),
            success: function(result){
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
    handleMessageClick: function (m) {
        console.log("Message: " + m);
    },
    deleteMessage: function(mid) {
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
            success: function(result){
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
                                                <i className="fa fa-inbox"></i>&nbsp;<strong>Inbox</strong>
                                            </div>
                                            <div className="col-md-2">
                                                <a className="video" title="Managing Messages - Inbox" href="https://youtu.be/-UNRgw2MkNg"><img className="video-icon pull-right" src="/images/youTube.png" alt="Latch channel" /></a>
                                            </div>
                                        </div>
                                    </header>
                                </div>
                                <div className="panel-body">
                                    <InboxResults data={this.state.communicationsTo} deleteMessage={this.deleteMessage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});