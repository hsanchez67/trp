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

var backgroundWhite = {
    backgroundColor: '#ffffff'
};

var SendMessageModal = React.createClass({
    getInitialState: function() {
        return {
            contacts: this.props.contacts,
            size: this.props.contacts.length
        };
    },
    componentDidMount(){
        console.log("Inside SendMessageModal");
        console.log(this.props.user);
        var options = {
            "backdrop" : "static",
            "show" : "true"
        }
        $(ReactDOM.findDOMNode(this)).modal(options);
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
        CKEDITOR.replace('includeMessage');
        if (this.props.review) {
             var html = "Dear [First Name],<br>I appreciate you taking the time to answer a few questions and give me feedback, I look forward to reading your remarks.<br> " +
                  "<br>Here is a link to my review request form [Latch Link].<br>Sincererly,<br><br>" +
                  this.props.user.firstName + " " + this.props.user.lastName;
              CKEDITOR.instances['includeMessage'].setData(html);
            $("#messageSubject").val("A review request from " + this.props.user.firstName + " " + this.props.user.lastName);
        }
    },
    handleSubmit: function(e) {
        e.preventDefault();
        CKEDITOR.instances.includeMessage.updateElement();
        var data = this.getFormData();
        data.users = this.props.contacts;
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
            console.log(formData);
            var results = [];
            $.ajax({
                type: "POST",
                url: "/sendMessage",
                async: true,
                data: formData,
                success: function (result) {
                    console.log("Inside Success");
                    $("#sendingModal").modal('hide');
                    results = result;
                    console.log(results);
                    this.props.handleResults(results.users.length);
                    $("#closeButton").trigger('click');
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
    getFormData: function () {
        return {
            fromUserId: this.refs.id.getDOMNode().value,
            htmlText: '',
            text: '',
            subject: this.refs.messageSubject.getDOMNode().value,
            users: [],
            review: this.props.review
        }
    },
    removeUser: function(id) {
        console.log("sendMessageModal:removeUser:id");
        console.log(id);
        console.log(this.state.contacts);
        var filterUsers = this.state.contacts.filter(function(user) {
            return user.id != id;
        });
        console.log(filterUsers);
        this.setState({
            contacts: filterUsers,
            size: filterUsers.length
        });
        console.log(this.state.contacts);
    },
    render(){
        return (
            <div className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleHideModal}><span aria-hidden="true">&times;</span></button>
                                <h5 className="modal-title"><strong>You selected {this.state.size} contacts.</strong></h5>
                            </div>
                            <div id="send-message-modal-body" className="modal-body">
                                <input type="hidden" ref="id" name="id" value={this.props.user.id} />
                                <div className="row">
                                    <div id="contacts-region-container" className="col-md-12">
                                        <div className="panel">
                                            <div className="panel-body" style={backgroundWhite}>
                                                <div id="contacts-region">
                                                    <PillList contacts={this.state.contacts}  removeUser={this.removeUser.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="panel">
                                            <div className="panel-body" style={backgroundWhite}>
                                                <div className="row">
                                                    <input type="text" className="form-control" id="messageSubject" name="messageSubject" ref="messageSubject" placeholder="Subject Line" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="panel">
                                            <div className="panel-body" style={backgroundWhite}>
                                                <div className="row">
                                                    <textarea id="includeMessage" name="includeMessage" ref="includeMessage" className="form-control" rows="10"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="errorMessage" id="validationError"></div>
                                <SendingModal />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">
                                    <i id="send-intro-icon" className="fa fa-envelope "></i>&nbsp;
                                    Send Message
                                </button>
                                <button id="closeButton" type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.handleHideModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    },
    propTypes:{
        handleHideModal: React.PropTypes.func.isRequired
    }
});

var PillList = React.createClass({
    removeUser: function(id) {
        this.props.removeUser(id);
    },
    render: function() {
        var createContact = function(contact) {
            console.log(contact)
            var name = contact.firstName + ' ' + contact.lastName;
            return(
                <PillName key={contact.id} id={contact.id} removeUser={this.removeUser.bind(this)}>{name}</PillName>
            );
        }.bind(this);
        return (
            <ul>{this.props.contacts.map(createContact)}</ul>
        );
    }
});

var PillName = React.createClass({
    getInitialState: function() {
        return {
            active: false,
            name: this.props.children,
            id: this.props.id
        };
    },
    handleClick: function(elem){

    },
    removeUser: function() {
        this.props.removeUser(this.state.id);
    },
    render: function() {
        let selectedClass = classNames({
            'pill selected': this.state.active,
            'pill': !this.state.active
        });
        return (
            <li className={selectedClass}>
                <span className="pill-name">{this.props.children}</span>
                <button type="button" className="close" aria-label="Remove" onClick={this.removeUser}><span aria-hidden="true">&times;</span></button>
            </li>
        );
    }
});
