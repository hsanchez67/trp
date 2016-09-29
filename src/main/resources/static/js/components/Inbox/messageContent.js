var MessageResults = React.createClass({
    getInitialState: function () {
        return {
            toUser: this.props.toUser,
            fromUser: this.props.fromUser,
            subjectUser: this.props.subjectUser,
            loading: true,
            readOnly: this.props.readOnly,
            groupName: this.props.groupName,
            groupUsers: this.props.groupUsers
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
    componentWillReceiveProps: function(nextProps) {
        console.log("MessageResults:nextProps");
        console.log(nextProps);
        if (nextProps.toUser != this.props.toUser) {
            this.setState({
                toUser: nextProps.toUser
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
        if (nextProps.subjectUser != this.props.subjectUser) {
            this.setState({
                subjectUser: nextProps.subjectUser
            });
        }
        if (nextProps.readOnly != this.props.readOnly) {
            this.setState({
                readOnly: nextProps.readOnly
            });
        }
        if (nextProps.groupName != this.props.groupName) {
            this.setState({
                groupName: nextProps.groupName
            });
        }
        if (nextProps.groupUsers != this.props.groupUsers) {
            this.setState({
                groupUsers: nextProps.groupUsers
            });
        }
    },
    deleteMessage: function() {
        console.log('Delete Message:' + this.props.communication.id);
        var id = $('#id').val();
        var data = {
            id: id,
            commId: this.props.communication.id
        };
        $.ajax({
            type: "POST",
            url: "/deleteCommunication",
            data: JSON.stringify(data, null, ' '),
            success: function(result){
              console.log("Success deleted");
            },
            error: function(error) {
                console.log(error);
                return false;
            },
            complete: function (e, xhr, settings) {
                console.log(e.status);
                if (e.status === 401) {
                    window.location.href = '/login';
                    console.log(e);
                } else {
                    window.location.href = '/inbox';
                }
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    goToProfile: function() {
        window.location.href = '/profile/'+ this.props.subjectUser.id;
    },
    replyToMessage: function() {
        window.location.href = '/replyToMessage/'+ this.props.communication.id;
    },
    replyToGroup: function() {
        if (this.state.communication.groupId != null && this.state.groupUsers.length > 0) {
            var groupId = this.state.communication.groupId;
            var commId = this.state.communication.id;
            console.log("replyToGroup: " + groupId);
            window.location.href = '/replyMessageToGroup?group=' + groupId + '&comm=' + commId;
        } else {
            bootbox.alert("Group is empty or deleted!");
            return null;
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
    popoverContent: function() {
        if (this.state.communication.groupId != null && this.state.groupUsers.length > 0) {
            var result = "";
            bootbox.dialog({
                title: this.state.groupName,
                message: '<div class="row">' + $('#avatar-nodes').html() + '</div>'
            });
        } else {
            bootbox.alert("Group is empty or deleted!");
        }
    },
    render:function() {
        if ($.isEmptyObject(this.props.communication)) {
            return(
                <div className="panel panel-default" id="inbox-panel">
                    <div className="panel-heading">
                        <header className="panel-title">
                            <div className="text-center">
                                <strong>Message from  </strong>
                            </div>
                        </header>
                    </div>
                    <div className="panel-body">
                        <div className="no-entries"><i className="fa fa-5x fa-cog fa-spin"></i></div>
                    </div>
                </div>);
        } else if (this.state.readOnly) {
            var created = new Date(this.props.communication.created);
            var hours = created.getHours()
            var minutes = created.getMinutes()
            var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
            var createdTime = $.datepicker.formatTime("h:mm tt", {hour: hours, minute: minutes}, {});
            let isGroupMessage = classNames({
                'fa fa-users hidden': this.props.communication.groupId == null,
                'fa fa-users': this.props.communication.groupId != null
            });
            if (this.state.groupUsers != null) {
                var AvatarNodes = this.state.groupUsers.map(function (user) {
                    return (
                        <Avatar key={user.id} id={user.id} username={user.avatar} name={user.firstName + ' ' + user.lastName} className="task-thumb" />
                    );
                });
                console.log("Group Avatars");
                console.log(AvatarNodes);
            }
            return(<div className="panel panel-default" id="inbox-panel">
                <div className="panel-heading">
                    <header className="panel-title">
                        <div className="text-center">
                            <strong>Message to  {this.props.toUser.firstName} {this.props.toUser.lastName}</strong>
                        </div>
                    </header>
                </div>
                <div id="avatar-nodes" className="hidden">{AvatarNodes}</div>
                <div className="panel-body">
                    <div className="col-md-12 message-timestamp">
                        <a id="group-popover" tabindex="0" role="button" data-toggle="popover"><span className="margin-right-10"><i className={isGroupMessage}></i></span></a>
                        {createdDate} {createdTime}
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                        <div className="input-type-logo">
                            <i className="fa fa-envelope"></i>
                        </div>
                        <ul className="source">
                            <Avatar id={this.props.toUser.id} username={this.props.toUser.avatar} name={this.props.toUser.firstName + ' ' + this.props.toUser.lastName} className="task-thumb" />
                        </ul>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 text-left vert-align">
                        <span className="subject-line-label">Subject Line:</span><br />
                        {this.props.communication.subject}
                    </div>
                </div>
                <div className="panel panel-default panel-white">
                    <div className="panel-body">
                        <div id="mainHtmlText" className="col-lg-12">
                            <p className="mainText bottom10"><div dangerouslySetInnerHTML={{__html: marked(this.props.communication.htmlText)}}></div></p>
                        </div>
                    </div>
                </div>
                <div className="panel-footer text-right">
                    <button type="button" onClick={this.handleClose} className="btn btn-sm btn-default">Close</button>
                </div>
            </div>);
        } else {
            let displayDeleteButton = classNames({
                'btn btn-sm btn-primary': this.props.communication.status != 'Deleted' && this.props.communication.status != 'Archive',
                'btn btn-sm btn-primary hidden': this.props.communication.status == 'Deleted' || this.props.communication.status == 'Archive'
            });
            let displayReplyToGroupButton = classNames({
                'btn btn-sm btn-primary': this.props.communication.groupId != null || this.props.communication.groupId != "",
                'btn btn-sm btn-primary hidden': this.props.communication.groupId == null || this.props.communication.groupId == ""
            });
            let isGroupMessage = classNames({
                'fa fa-users hidden': this.props.communication.groupId == null || this.props.communication.groupId == "",
                'fa fa-users': this.props.communication.groupId != null || this.props.communication.groupId != ""
            });
            var created = new Date(this.props.communication.created);
            var hours = created.getHours()
            var minutes = created.getMinutes()
            var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
            var createdTime = $.datepicker.formatTime("h:mm tt", {hour: hours, minute: minutes}, {});
            if (this.state.groupUsers != null) {
                var AvatarNodes = this.state.groupUsers.map(function (user) {
                    return (
                        <Avatar key={user.id} id={user.id} username={user.avatar} name={user.firstName + ' ' + user.lastName} className="task-thumb" />
                    );
                });
                console.log("Group Avatars");
                console.log(AvatarNodes);
            }
            return(<div className="panel panel-default" id="inbox-panel">
                <div className="panel-heading">
                    <header className="panel-title">
                        <div className="text-center">
                            <strong>Message from  {this.props.fromUser.firstName} {this.props.fromUser.lastName}</strong>
                        </div>
                    </header>
                </div>
                <div id="avatar-nodes" className="hidden">{AvatarNodes}</div>
                <div className="panel-body">
                    <div className="col-md-12 message-timestamp">
                        <a id="group-popover" tabindex="0" role="button" onClick={this.popoverContent}><span className="margin-right-10"><i className={isGroupMessage}></i></span></a>
                        {createdDate} {createdTime}
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center thumb-up">
                        <div className="input-type-logo">
                            <i className="fa fa-envelope"></i>
                        </div>
                        <ul className="source">
                            <Avatar id={this.props.fromUser.id} username={this.props.fromUser.avatar} name={this.props.fromUser.firstName + ' ' + this.props.fromUser.lastName} className="task-thumb" />
                        </ul>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 text-left vert-align">
                        <span className="subject-line-label">Subject Line:</span><br />
                        {this.props.communication.subject}
                    </div>
                </div>
                <Attachments attachments={this.props.communication.attachedAssetIds}  />
                <div className="panel panel-default panel-white">
                    <div className="panel-body">
                        <div id="mainHtmlText" className="col-lg-12">
                            <p className="mainText bottom10"><div dangerouslySetInnerHTML={{__html: marked(this.props.communication.htmlText)}}></div></p>
                        </div>
                    </div>
                </div>
                <div className="panel-footer text-right">
                    <button type="button" className={displayDeleteButton} onClick={this.deleteMessage}>
                        <i className="fa fa-trash"></i>&nbsp;
                        Delete
                    </button>&nbsp;
                    <button type="button" onClick={this.goToProfile} className="btn btn-sm btn-primary">
                        <i className="fa fa-user"></i>&nbsp;
                        See {this.props.subjectUser.firstName}'s Full Profile
                    </button>&nbsp;
                    <button type="button" onClick={this.replyToMessage} className="btn btn-sm btn-primary">
                        <i className="fa fa-reply"></i>&nbsp;
                        Reply To Message
                    </button>&nbsp;
                    <button type="button" className={displayReplyToGroupButton} onClick={this.replyToGroup}>
                        <i className="fa fa-reply-all"></i>&nbsp;
                        Reply To Group
                    </button>&nbsp;
                    <button type="button" onClick={this.handleClose} className="btn btn-sm btn-default">Close</button>
                </div>
            </div>);
        }
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


var MessageContent = React.createClass({
    displayName: 'MessageContent',
    getInitialState: function() {
        return {
            user: this.props.user,
            toUser: [],
            fromUser: [],
            subjectUser: [],
            communication: [],
            groupName: '',
            groupUsers: []
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
                self.setState({
                    communication: result.communication,
                    fromUser: result.fromUser,
                    toUser: result.toUser,
                    subjectUser: result.subjectUser,
                    readOnly: result.readOnly,
                    groupName: result.groupName,
                    groupUsers: result.users
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
                            <MessageResults communication={this.state.communication} fromUser={this.state.fromUser} toUser={this.state.toUser} subjectUser={this.state.subjectUser} readOnly={this.state.readOnly} groupName={this.state.groupName} groupUsers={this.state.groupUsers} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});