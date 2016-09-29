var SendingModal = React.createClass({
    render(){
        return (
            <div id="sendingModal" className="modal fade" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title">Your message is processing.</h4>
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

var ReplyToMessage = React.createClass({
    displayName: 'ReplyToMessage',
    getInitialState: function() {
        return {
            user: [],
            profileData: [],
            contacts: [],
            addToCurrentGroup: '',
            groupId: '',
            communication: [],
            cancelUrl: ''
        };
    },
    componentDidMount: function () {
        var id = $('#id').val();
        var fromUserId = $('#fromUserId').val();
        var commId = $('#commId').val();
        var groupId = $('#groupId').val();
        if (groupId === "") {
            console.log("ReplyToMessage:componentDidMount:groupId empty");
            var data = {
                id: id,
                fromUserId: fromUserId,
                commId: commId
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/beforeReplyToMessage",
                data: formData,
                success: function (result) {
                    console.log("ReplyToMessage:componentDidMount:success:result:");
                    console.log(result);
                    if (!$.isEmptyObject(result)) {
                        this.setState({
                            user: result.user,
                            profileData: result.users[0],
                            contacts: result.users,
                            communication: result.communication,
                            cancelUrl: result.cancelUrl
                        });
                        CKEDITOR.replace('includeMessage');
                        var created = new Date(result.communication.created);
                        var hours = created.getHours()
                        var minutes = created.getMinutes()
                        var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
                        var createdTime = $.datepicker.formatTime("h:mm tt", {hour: hours, minute: minutes}, {});
                        var html = '<p></p><p>' + this.state.profileData.firstName + ' ' + this.state.profileData.lastName + ' wrote on ' + createdDate + ' ' + createdTime + '</p>';
                        html = html + this.state.communication.htmlText;
                        console.log(html);
                        CKEDITOR.instances['includeMessage'].setData(html);
                        $('#messageSubject').val(this.state.communication.subject);
                    }
                }.bind(this),
                error: function (error) {
                    console.log("error: " + error.toString());
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else if (groupId !== "") {
            console.log("ReplyToMessage:componentDidMount:groupId not empty");
            var data = {
                id: id,
                fromUserId: fromUserId,
                commId: commId,
                groupId: groupId
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/beforeReplyToGroupMessage",
                data: formData,
                success: function (result) {
                    console.log("ReplyToGroupMessage:componentDidMount:success:result:");
                    console.log(result);
                    if (!$.isEmptyObject(result)) {
                        this.setState({
                            user: result.user,
                            profileData: result.fromUser,
                            contacts: result.users,
                            communication: result.communication,
                            groupId: result.groupId,
                            cancelUrl: result.cancelUrl
                        });
                        CKEDITOR.replace('includeMessage');
                        var created = new Date(result.communication.created);
                        var hours = created.getHours()
                        var minutes = created.getMinutes()
                        var createdDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
                        var createdTime = $.datepicker.formatTime("h:mm tt", {hour: hours, minute: minutes}, {});
                        var html = '<p></p><p>' + this.state.profileData.firstName + ' ' + this.state.profileData.lastName + ' wrote on ' + createdDate + ' ' + createdTime + '</p>';
                        html = html + this.state.communication.htmlText;
                        console.log(html);
                        CKEDITOR.instances['includeMessage'].setData(html);
                        $('#messageSubject').val(this.state.communication.subject);
                    }
                }.bind(this),
                error: function (error) {
                    console.log("error: " + error.toString());
                },
                dataType: "json",
                contentType: "application/json"
            });
        }
    },
    handleCancel: function(e) {
        window.location.href = this.state.cancelUrl;
    },
    handleSubmit: function(e) {
        e.preventDefault();
        CKEDITOR.instances.includeMessage.updateElement();
        var data = this.getFormData();
        data.users = this.state.contacts;
        data.htmlText = CKEDITOR.instances['includeMessage'].getData();

        // create plain text
        var html = CKEDITOR.instances.includeMessage.getSnapshot();
        var dom=document.createElement("DIV");
        dom.innerHTML=html;
        var plain_text=(dom.textContent || dom.innerText);
        data.text = plain_text;
        data.text = data.text;
        if (data.htmlText != '' && data.subject != '') {
            $("#sendingModal").modal('show');
            var formData = JSON.stringify(data, null, ' ');
            console.log("replyToMessage:handleSubmit:formData");
            console.log(formData);
            var results = [];
            $.ajax({
                type: "POST",
                url: "/sendMessage",
                async: true,
                data: formData,
                success: function (result) {
                    if (result.error != null) {
                        document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> There was a problem!</label></div>";
                        $('#validationError').show();
                        setTimeout(function() {  $("#validationError").fadeOut(); }, 5000);
                        return null;
                    } else {
                        console.log("Inside Success");
                        $("#sendingModal").modal('hide');
                        results = result;
                        console.log(results);
                        this.handleResults(results.users.length);
                    }
                }.bind(this),
                error: function (error) {
                    alert('Create import error message');
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Please include a subject and a message!</label></div>";
            $('#validationError').show();
            setTimeout(function() {  $("#validationError").fadeOut(); }, 5000);
            return null;
        }
    },
    handleResults: function(results) {
        console.log("In handleResults");
        console.log(results);
        if (results > 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> You successfully sent message to " + results + " contact(s)!</label></div>";
            setTimeout(function() {  $("#content-results").fadeOut(); }, 5000);
            setTimeout(function() {  window.location.href = '/inbox'; }, 5000);
        } else {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> Heads up! Something went wrong, please try again!</label></div>";
        }
    },
    getFormData: function () {
        return {
            fromUserId: this.refs.id.getDOMNode().value,
            htmlText: '',
            text: '',
            subject: this.refs.messageSubject.getDOMNode().value,
            users: [],
            status: 'Reply',
            groupId: this.state.groupId
        };
    },
    handleAddUserToCurrentGroup: function(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    render: function () {
        return (
            <div>
                <HeaderResponsiveIn user={this.state.user} handleAddUserToCurrentGroup={this.handleAddUserToCurrentGroup} />
                <Banner />
                <div className="container">
                    <div id="main">
                        <ol className="breadcrumb">
                            <div className="row">
                                &nbsp;
                            </div>
                        </ol>
                        <div className="row profile-row" id="inbox-content">
                            <div className="col-lg-8">
                                <form onSubmit={this.handleSubmit}>
                                    <div id="inbox-content-row" className="row state-overview">
                                        <div className="row" id="profile-content">
                                            <div className="col-lg-12">
                                                <div className="panel panel-default" id="inbox-panel">
                                                    <div className="panel-heading">
                                                        <header className="panel-title">
                                                            <div className="text-center">
                                                                <strong>Reply To Message</strong>
                                                            </div>
                                                        </header>
                                                    </div>
                                                    <div className="panel-body">
                                                        <input type="hidden" ref="id" name="id" value={this.state.user.id} />
                                                        <div className="row">
                                                            <div id="contacts-region-container" className="col-md-12">
                                                                <div className="panel">
                                                                    <div className="panel-body">
                                                                        <div id="contacts-region">
                                                                            <PillList contacts={this.state.contacts} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="panel">
                                                                    <div className="panel-body">
                                                                        <div className="row">
                                                                            <input type="text" className="form-control" id="messageSubject" name="messageSubject" ref="messageSubject" placeholder="Subject Line" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="panel">
                                                                    <div className="panel-body">
                                                                        <div className="row">
                                                                            <textarea id="includeMessage" name="includeMessage" ref="includeMessage" className="form-control" rows="10"></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel-footer text-right">
                                                        <button type="submit" className="btn btn-primary btn-space">
                                                            <i id="send-intro-icon" className="fa fa-envelope "></i>&nbsp;
                                                            Send Message
                                                        </button>
                                                        <button type="button" onClick={this.handleCancel} className="btn btn-default btn-space">Cancel</button>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div id="content-results">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <SendingModal />
                            </div>
                            <div className="col-lg-4">
                                <MyShortListPanel droppable={true} addToCurrentGroup={this.state.addToCurrentGroup} />
                                <NavigationPanel />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
});

var PillList = React.createClass({
    render: function() {
        var createContact = function(contact) {
            console.log(contact)
            var name = contact.firstName + ' ' + contact.lastName;
            return(
                <PillName key={contact.id}>{name}</PillName>
            );
        };
        return (
            <ul>{this.props.contacts.map(createContact)}</ul>
        );
    }
});

var PillName = React.createClass({
    getInitialState: function() {
        return {
            active: false,
            name: this.props.children
        };
    },
    render: function() {
        let selectedClass = classNames({
            'pill selected': this.state.active,
            'pill': !this.state.active
        });
        return (
            <li className={selectedClass}><span className="pill-name">{this.props.children}</span></li>
        );
    }
});

ReactDOM.render(
    <ReplyToMessage />,
    document.getElementById('content')
);
