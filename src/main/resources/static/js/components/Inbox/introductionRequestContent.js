var IntroductionRequestResult = React.createClass({
    displayName: 'IntroductionRequestResult',
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
        console.log("IntroductionRequestResult:nextProps");
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
    addToMyNetwork: function() {
        var data = {
            toUserId: this.state.toUser.id,
            users: [this.state.subjectUser],
            commId: this.state.communication.id
        };
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $.ajax({
            type: "POST",
            url: "/addToMyNetwork",
            data: formData,
            success: function(result){
                console.log("IntroductionRequestResult:addToMyNetwork:success:result:");
                console.log(result);
                var status = result.communication.status;
                if (status == "Accepted") {
                    $('#addToMyNetwork').addClass('disabled');
                    $('#displayLatchedLogo').removeClass('hidden');
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
            var status = this.props.communication.status;
            var latched = false;
            if (status == "Accepted" || status == "Archived") {
                latched = true;
            }
            let displayLatchedLogo = classNames({
                'pull-right hidden': latched == false,
                'pull-right show': latched == true
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
                                <strong>{this.props.toUser.firstName} {this.props.toUser.lastName} to {this.props.subjectUser.firstName} {this.props.subjectUser.lastName}</strong>
                                <div id="displayLatchedLogo" className={displayLatchedLogo}><img className="latched-icon img-responsive" src="/images/LATCHED-Logo.png" alt="Latched" /></div>
                            </div>
                        </header>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-12 message-timestamp">{createdDate} {createdTime}</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                                <div className='input-type-logo'>
                                    <i className="fa fa-share-alt"></i>
                                </div>
                                <ul className="source">
                                    <Avatar id={this.props.fromUser.id} username={this.props.fromUser.avatar} name={this.props.fromUser.firstName + ' ' + this.props.fromUser.lastName} className="task-thumb" />
                                </ul>
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 text-left">
                                <div className="subject-text-div"><span className="headerSubjectText">{this.props.fromUser.firstName} {this.props.fromUser.lastName} wrote:</span> <span className="subjectText">{this.props.communication.subject}</span></div>
                                <div className="mainText"><div dangerouslySetInnerHTML={{__html: marked(this.props.communication.htmlText)}}></div></div>
                            </div>
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
            var status = this.props.communication.status;
            var latched = false;
            if (status == "Accepted" || status == "Archived") {
                latched = true;
            }
            let latchedClass = classNames({
                'btn btn-sm btn-primary btn-space': latched == false,
                'btn btn-sm btn-primary btn-space disabled': latched == true
            });
            let displayLatchedLogo = classNames({
                'pull-right hidden': latched == false,
                'pull-right show': latched == true
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
                                <strong>{this.props.toUser.firstName} meet {this.props.subjectUser.firstName}</strong>
                                <div id="displayLatchedLogo" className={displayLatchedLogo}><img className="latched-icon img-responsive" src="/images/LATCHED-Logo.png" alt="Latched" /></div>
                            </div>
                        </header>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-12 message-timestamp">{createdDate} {createdTime}</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                                <div className='input-type-logo'>
                                    <i className="fa fa-share-alt"></i>
                                </div>
                                <ul className="source">
                                    <Avatar id={this.props.fromUser.id} username={this.props.fromUser.avatar} className="task-thumb" />
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
                    <Attachments attachments={this.props.communication.attachedAssetIds}  />
                    <input type="hidden" ref="userId" id="userId" name="userId" value={this.props.toUser.id} />
                    <div className="panel-footer text-right">
                        <button id="addToMyNetwork" type="button" onClick={this.addToMyNetwork} className={latchedClass}>Add {this.props.subjectUser.firstName} to my network</button>
                        <button type="button" onClick={this.replyToMessage} className="btn btn-sm btn-primary btn-space">
                            <i className="fa fa-reply"></i>&nbsp;
                            Reply To {this.props.fromUser.firstName}
                        </button>
                        <button type="button" onClick={this.sendMessage} className="btn btn-sm btn-primary btn-space">
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

var IntroductionRequestContent = React.createClass({
    displayName: 'IntroductionRequestContent',
    getInitialState: function() {
        return {
            toUser: [],
            fromUser: [],
            subjectUser: [],
            communication: [],
            user: [],
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
                            <IntroductionRequestResult toUser={this.state.toUser} subjectUser={this.state.subjectUser} fromUser={this.state.fromUser} communication={this.state.communication} readOnly={this.state.readOnly} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});