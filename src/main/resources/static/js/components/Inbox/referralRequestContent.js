var ReferralRequestResult = React.createClass({
    displayName: 'ReferralRequestResult',
    getInitialState: function() {
        return {
            toUser: this.props.toUser,
            fromUser: this.props.fromUser,
            subjectUser: this.props.subjectUser,
            communication: this.props.communication,
            readOnly: this.props.readOnly
        };
    },
    componentDidMount: function () {
        // drag & drop
        $(".source li").draggable({
            addClasses: false,
            appendTo: "body",
            helper: "clone"
        });
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("ReferralRequestResult:nextProps");
        console.log(nextProps);
        if (nextProps.toUser != this.props.toUser) {
            this.setState({
                toUser: nextProps.toUser
            });
        }
        if (nextProps.subjectUser != this.props.subjectUser) {
            this.setState({
                subjectUser: nextProps.subjectUser
            });
        }
        if (nextProps.communication != this.props.communication) {
            this.setState({
                communication: nextProps.communication
            });
        }
        if (nextProps.fromUser != this.props.fromUser) {
            this.setState({
                fromUser: nextProps.fromUser
            });
        }
        if (nextProps.readOnly != this.props.readOnly) {
            this.setState({
                readOnly: nextProps.readOnly
            });
        }
    },
    handleClose: function() {
        var closeUrl = $('#closeUrl').val();
        if (this.state.communication.status == 'Archived') {
            window.location.href = '/archive';
        } else if (this.state.communication.status == 'Deleted' || this.state.communication.status == 'Dejected') {
            window.location.href = '/deleted';
        } else if (this.state.communication.status == 'Accepted' || this.state.communication.status == 'Rejected') {
            window.location.href = '/inbox';
        } else if (closeUrl == "sent") {
            window.location.href = '/sent';
        } else {
            window.location.href = '/inbox';
        }
    },
    replyToMessage: function() {
        window.location.href = '/replyToMessage/'+ this.props.communication.id;
    },
    acceptReferral: function() {
        var data = {
            toUserId: this.state.toUser.id,
            users: [this.state.subjectUser],
            commId: this.state.communication.id
        };
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $("#sendingModal").modal('show');
        $.ajax({
            type: "POST",
            url: "/acceptReferral",
            data: formData,
            success: function(result){
                console.log("ReferralRequestResult:acceptReferral:success:result:");
                console.log(result);
                if (result.communication.status == "Accepted") {
                    $('#acceptReferral').addClass('disabled');
                    $('#rejectReferral').addClass('disabled');
                    $('#sendMessageTo').removeClass('hidden');
                    $('#displayLatchedLogo').removeClass('hidden');
                    $("#sendingModal").modal('hide');
                }
            },
            error: function(error) {
                console.log("error: " + error.toString());
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    rejectReferral: function() {
        var data = {
            toUserId: this.state.toUser.id,
            users: [this.state.subjectUser],
            commId: this.state.communication.id
        };
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $("#sendingModal").modal('show');
        $.ajax({
            type: "POST",
            url: "/rejectReferral",
            data: formData,
            success: function(result){
                console.log("ReferralRequestResult:rejectReferral:success:result:");
                console.log(result);
                if (result.communication.status == "Rejected") {
                    $('#rejectReferral').addClass('disabled');
                    $('#acceptReferral').addClass('disabled');
                    $('#displayNotLatchedLogo').removeClass('hidden');
                    $("#sendingModal").modal('hide');
                }
            },
            error: function(error) {
                console.log("error: " + error.toString());
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    sendMessage: function() {
        window.location.href = '/sendMessage/'+ this.props.subjectUser.id;
    },
    render: function () {
        if ($.isEmptyObject(this.props.communication)) {
            return (
                <div className="no-entries"><i className="fa fa-5x fa-cog fa-spin"></i></div>
            );
        } else if (this.state.readOnly) {
            let displayLatchedLogo = classNames({
                'pull-right hidden': this.props.communication.status != 'Accepted' && this.props.communication.status != 'Archived',
                'pull-right': this.props.communication.status == 'Accepted' || this.props.communication.status == 'Archived'
            });
            let displayNotLatchedLogo = classNames({
                'pull-right hidden': this.props.communication.status != 'Rejected' && this.props.communication.status != 'Dejected',
                'pull-right': this.props.communication.status == 'Rejected' || this.props.communication.status == 'Dejected'
            });
            let displayReasonNote = classNames({
                'text-left col-md-12 hidden': this.props.communication.noteSwitch == false || this.props.communication.noteSwitch == null,
                'text-left col-md-12': this.props.communication.noteSwitch == true || this.props.communication.noteSwitch != null
            });
            var created = new Date(this.props.communication.created);
            var hours = created.getHours()
            var minutes = created.getMinutes()
            var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
            var createdTime = $.datepicker.formatTime("h:mm tt", {hour: hours, minute: minutes}, {});
            return (
                <div className="panel panel-default" id="inbox-panel">
                    <div className="panel-heading">
                        <header className="panel-title">
                            <div className="text-center">
                                <strong>A referral from {this.props.fromUser.firstName} {this.props.fromUser.lastName} to {this.props.toUser.firstName} {this.props.toUser.lastName}</strong>
                                <div id="displayLatchedLogo" className={displayLatchedLogo}><img className="latched-icon img-responsive" src="/images/LATCHED-Logo.png" alt="Latched" /></div>
                                <div id="displayNotLatchedLogo" className={displayNotLatchedLogo}><img className="latched-icon img-responsive" src="/images/LATCHED-X-Logo_updated.png" alt="Latched" /></div>
                            </div>
                        </header>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-12 message-timestamp">{createdDate} {createdTime}</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                                <div className='input-type-logo'>
                                    <i className="fa fa-arrow-right"></i>
                                </div>
                                <ul className="source">
                                    <Avatar id={this.props.fromUser.id} username={this.props.fromUser.avatar} name={this.props.fromUser.firstName + ' ' + this.props.fromUser.lastName} className="task-thumb" />
                                </ul>
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left">
                                <div className="subject-text-div"><span className="headerSubjectText">{this.props.fromUser.firstName} {this.props.fromUser.lastName} wrote:</span> <span className="subjectText">{this.props.communication.subject}</span></div>
                                <div className="mainText"><div dangerouslySetInnerHTML={{__html: marked(this.props.communication.htmlText)}}></div></div>
                            </div>
                            <div id="reason-note" className={displayReasonNote}><strong>Re: </strong>{this.props.communication.note}</div>
                        </div>
                        <ProfileIntro profile={this.props.subjectUser} />
                    </div>
                    <input type="hidden" ref="userId" id="userId" name="userId" value={this.props.toUser.id} />
                    <div className="panel-footer text-right">
                        <button type="button" onClick={this.handleClose} className="btn btn-sm btn-default btn-space">Close</button>
                    </div>
                </div>
            );

        } else {
            let latchedClass = classNames({
                'btn btn-sm btn-primary btn-space': this.props.communication.status != 'Accepted' && this.props.communication.status != 'Rejected',
                'btn btn-sm btn-primary btn-space disabled': this.props.communication.status == 'Accepted' || this.props.communication.status == 'Rejected'
            });
            let displayLatchedLogo = classNames({
                'pull-right hidden': this.props.communication.status != 'Accepted' && this.props.communication.status != 'Archived',
                'pull-right': this.props.communication.status == 'Accepted' || this.props.communication.status == 'Archived'
            });
            let displaySendMessageButton = classNames({
                'btn btn-sm btn-primary btn-space hidden': this.props.communication.status != 'Accepted',
                'btn btn-sm btn-primary btn-space': this.props.communication.status == 'Accepted'
            });
            let displayNotLatchedLogo = classNames({
                'pull-right hidden': this.props.communication.status != 'Rejected' && this.props.communication.status != 'Dejected',
                'pull-right': this.props.communication.status == 'Rejected' || this.props.communication.status == 'Dejected'
            });
            let displayReasonNote = classNames({
                'text-left col-md-12 hidden': this.props.communication.noteSwitch == false || this.props.communication.noteSwitch == null,
                'text-left col-md-12': this.props.communication.noteSwitch == true || this.props.communication.noteSwitch != null
            });
            var created = new Date(this.props.communication.created);
            var hours = created.getHours()
            var minutes = created.getMinutes()
            var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
            var createdTime = $.datepicker.formatTime("h:mm tt", {hour: hours, minute: minutes}, {});
            return (
                <div className="panel panel-default" id="inbox-panel">
                    <div className="panel-heading">
                        <header className="panel-title">
                            <div className="text-center">
                                <strong>A referral from {this.props.fromUser.firstName} {this.props.fromUser.lastName}</strong>
                                <div id="displayLatchedLogo" className={displayLatchedLogo}><img className="latched-icon img-responsive" src="/images/LATCHED-Logo.png" alt="Latched" /></div>
                                <div id="displayNotLatchedLogo" className={displayNotLatchedLogo}><img className="latched-icon img-responsive" src="/images/LATCHED-X-Logo_updated.png" alt="Latched" /></div>
                            </div>
                        </header>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-12 message-timestamp">{createdDate} {createdTime}</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                                <div className='input-type-logo'>
                                    <i className="fa fa-arrow-right"></i>
                                </div>
                                <ul className="source">
                                    <Avatar id={this.props.fromUser.id} username={this.props.fromUser.avatar} className="task-thumb" />
                                </ul>
                            </div>
                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 text-left">
                                <div className="subject-text-div"><span className="headerSubjectText">{this.props.fromUser.firstName} {this.props.fromUser.lastName} wrote:</span> <span className="subjectText">{this.props.communication.subject}</span></div>
                                <div className="mainText"><div dangerouslySetInnerHTML={{__html: marked(this.props.communication.htmlText)}}></div></div>
                            </div>
                            <div id="reason-note" className={displayReasonNote}><strong>Re: </strong>{this.props.communication.note}</div>
                        </div>
                        <ProfileIntro profile={this.props.subjectUser} />
                    </div>
                    <Attachments attachments={this.props.communication.attachedAssetIds}  />
                    <input type="hidden" ref="userId" id="userId" name="userId" value={this.props.toUser.id} />
                    <div className="panel-footer text-right">
                        <button id="acceptReferral" type="button" onClick={this.acceptReferral} className={latchedClass}>Accept Referral</button>
                        <button id="rejectReferral" type="button" onClick={this.rejectReferral} className={latchedClass}>Reject Referral</button>
                        <button type="button" onClick={this.replyToMessage} className="btn btn-sm btn-primary btn-space">
                            <i className="fa fa-reply"></i>&nbsp;
                            Reply To {this.props.fromUser.firstName}
                        </button>
                        <button id="sendMessageTo" type="button" onClick={this.sendMessage} className={displaySendMessageButton}>
                            <i className="fa fa-envelope"></i>&nbsp;
                            Send Message To {this.props.subjectUser.firstName}
                        </button>
                        <button type="button" onClick={this.handleClose} className="btn btn-sm btn-default btn-space">Close</button>
                    </div>
                </div>
            );
        }
        return (
            <div></div>
        )
    }
});

var SendingModal = React.createClass({
    render(){
        return (
            <div id="sendingModal" className="modal fade" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title">Processing your request</h4>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                <i className="fa fa-5x fa-cog fa-spin"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var Result = React.createClass({
    render () {
        return (
            <div className="attachment-icon pull-left">
                <a href={'/downloadFile/' + this.props.id} className="btn btn-default">
                    <i className="fa fa-cloud-download" title="Download" aria-hidden="true"></i>
                    <span className="sr-only">Download from cloud</span>
                </a>
            </div>
        );
    }
});

var Attachments = React.createClass({
    displayName: 'Attachments',
    getInitialState: function() {
        return {
            attachments: this.props.attachments
        };
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("Attachments:nextProps");
        console.log(nextProps);
        if (nextProps.attachments != this.props.attachments) {
            this.setState({attachments: nextProps.attachments});
        }
    },
    render() {
        if ($.isEmptyObject(this.state.attachments)) {
            return <div className="hidden"></div>;
        } else {
            var attachments = [];
            var count = 0;
            this.state.attachments.forEach(function (record) {
                attachments.push(<Result key={record} id={record} count={count++} />)
            }.bind(this));
            return (
                <div className="panel">
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12">
                                {attachments}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
});

var ReferralRequestContent = React.createClass({
    displayName: 'ReferralRequestContent',
    getInitialState: function() {
        return {
            toUser: [],
            fromUser: [],
            subjectUser: [],
            communication: [],
            readOnly: false
        };
    },
    loadCommunication: function (commId, readOnly) {
        var self = this;
        var data = {
            commId: commId,
            readOnly: readOnly
        };
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/getMessageById",
            data: data,
            success: function(result){
                console.log(result);
                self.setState({
                    communication: result.communication,
                    fromUser: result.fromUser,
                    toUser: result.toUser,
                    subjectUser: result.subjectUser,
                    readOnly: result.readOnly
                });
            },
            error: function(error) {
                console.log(error);
                return false;
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    componentWillMount: function() {
        var commId = $('#commId').val();
        console.log(commId);
        var readOnly = $('#readOnly').val();
        this.loadCommunication(commId, readOnly);
    },
    render: function () {
        return (
            <div className="col-lg-8">
                <div id="inbox-content-row" className="row state-overview">
                    <div className="row" id="profile-content">
                        <div className="col-lg-12">
                            <ReferralRequestResult toUser={this.state.toUser} subjectUser={this.state.subjectUser} fromUser={this.state.fromUser} communication={this.state.communication} readOnly={this.state.readOnly} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});