var selectResponsive = {
    width: '95%'
};

var selectResponsive2 = {
    width: '100%'
};

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

var UploadAttachments = React.createClass({
    getInitialState: function() {
        return {
            attachments: [],
            clear: true
        }
    },
    componentDidMount: function () {
        $("#input-24").fileinput({
            maxFileSize: 1500,
            minFileCount:1,
            maxFileCount:5,
            showRemove: false,
            showUpload: false,
            uploadAsync: false,
            dropZoneEnabled: false,
            previewFileIcon: '<i class="fa fa-file"></i>',
            allowedPreviewTypes: ['image', 'text'], // allow only preview of image & text files
            previewFileIconSettings: {
                'docx': '<i class="fa fa-file-word-o text-primary"></i>',
                'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
                'pptx': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
                'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
                'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
            },
            uploadUrl: '/uploadAttachments',
            uploadExtraData: function() {
                return {
                    id: $('#id').val()
                };
            }
        }).on('filebatchuploaderror', function(event, data, previewId, index) {
            var form = data.form, files = data.files, extra = data.extra,
                response = data.response, reader = data.reader;

        }).on('fileuploaded', function(event, data, previewId, index) {
            console.log("UploadAttachments:componentDidMount:fileuploaded");
            var form = data.form, files = data.files, extra = data.extra,
                response = data.response, reader = data.reader;
            console.log(data.response);
            console.log(data.response.attachedAssetIds);
            console.log(data.files);
            console.log(data.form);
            console.log(data.extra);
            this.addAttachments(data.response);
        }.bind(this)).on('filesuccessremove', function(event, id) {
            console.log("UploadAttachments:componentDidMount:filesuccessremove:id:" + id);
            $('#input-24').fileinput('clear');
            /*if (some_processing_function(id)) {
             console.log('Uploaded thumbnail successfully removed');
             } else {
             return false; // abort the thumbnail removal
             }*/
        }).on('fileclear', function(event) {
            console.log("UploadAttachments:componentDidMount:fileclear:");
            var data = this.getFormData();
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/deleteAttachments",
                data: formData,
                success: function(result){
                    console.log("UploadAttachments:componentDidMount:fileclear:result")
                    console.log(result);
                    this.setState({
                        attachments: []
                    });
                    this.removeAttachments();
                }.bind(this),
                dataType: "json",
                contentType : "application/json"
            });
        }.bind(this)).on("filebatchselected", function(event, files) {
            // trigger upload method immediately after files are selected
            $("#input-24").fileinput("upload");
            console.log("UploadAttachments:componentDidMount:filebatchselected");
            console.log(files);
        }).on('filebatchuploadsuccess', function(event, data, previewId, index) {
            var form = data.form, files = data.files, extra = data.extra,
                response = data.response, reader = data.reader;
            console.log("UploadAttachments:componentDidMount:filebatchuploadsuccess");
            console.log(data);
            this.addAttachments(data.response);
        }.bind(this));
    },
    componentWillReceiveProps: function(nextProps){
        console.log('UploadAttachments:componentWillReceiveProps:nextProps: ' + nextProps.clear);
        if (nextProps.clear == true && this.state.clear == false) {
            $('#input-24').fileinput('refresh');
            this.setState({
                clear: true
            });
        }
    },
    removeAttachments: function() {
        console.log('UploadAttachments:removeAttachments:');
        this.props.removeAttachments();
    },
    addAttachments: function (object) {
        console.log('UploadAttachments:addAttachments:ids: ');
        console.log(object.toString())
        var ids = object._embedded.stringList;
        for (var i= 0; i < ids.length; i++) {
            var attachments = this.state.attachments.slice();
            attachments.push(ids[i]);
            this.setState({
                attachments: attachments,
                clear: false
            });
        }
        this.props.addAttachments(object);
    },
    getFormData: function () {
        return {
            id: $('#id').val(),
            attachedAssetIds: this.state.attachments
        };
    },
    render() {
        return (
            <div className="col-lg-12 col-sm-12">
                <div className="panel panel-default">
                    <div  className="panel-heading">
                        <header className="panel-title text-left">Add attachments</header>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="form-group">
                                <div className="col-lg-12 col-sm-12">
                                    <form action="" method="post" encType="multipart/form-data">
                                        <input id="input-24" name="input-24[]" type="file" multiple className="file-loading" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var SendMessage = React.createClass({
    displayName: 'SendMessage',
    getInitialState: function() {
        return {
            user: [],
            profileData: [],
            contacts: [],
            attachments: [],
            resetAttachments: true,
            addToCurrentGroup: '',
            groupId: ''
        };
    },
    addAttachments: function (object) {
        console.log('SendMessage:addAttachments:ids: ');
        console.log(object)
        var ids = object._embedded.stringList;
        for (var i= 0; i < ids.length; i++) {
            var attachments = this.state.attachments.slice();
            attachments.push(ids[i]);
            this.setState({
                attachments: attachments,
                resetAttachments: false
            });
        }
        console.log(this.state.attachments);
    },
    removeAttachments: function() {
        console.log('SendMessage:removeAttachments');
        this.setState({
            attachments: []
        });
    },
    componentWillMount: function () {
        var id = $('#id').val();
        var groupId = $('#groupId').val();
        var profileid = $('#profileid').val();
        console.log("Group Id:");
        console.log(groupId);
        if (profileid != "") {
            var data = {
                id: id,
                introId: profileid
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/beforeSendMessage",
                data: formData,
                success: function (result) {
                    console.log("SendMessage:componentDidMount:success:result:");
                    console.log(result);
                    if (!$.isEmptyObject(result)) {
                        this.setState({
                            user: result.user,
                            profileData: result.users[0],
                            contacts: result.users
                        });
                        CKEDITOR.replace('includeMessage');
                    }
                }.bind(this),
                error: function (error) {
                    console.log("error: " + error.toString());
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else if (id != "" && groupId != "") {
            var data = {
                id: id,
                groupId: groupId
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log("SendMessage:componentDidMount:ToGroup:formData:");
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/beforeSendMessageToGroup",
                data: formData,
                success: function (result) {
                    console.log("SendMessage:componentDidMount:ToGroup:success:result:");
                    console.log(result);
                    if (!$.isEmptyObject(result)) {
                        this.setState({
                            user: result.user,
                            contacts: result.users,
                            groupId: groupId
                        });
                        CKEDITOR.replace('includeMessage');
                    }
                }.bind(this),
                error: function (error) {
                    console.log("error: " + error.toString());
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else if (id != "") {
            var source = '/api/users/'+id;
            console.log(source);
            $.get(source, function(result) {
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        user: result
                    });
                }
                CKEDITOR.replace('includeMessage');
            }.bind(this));
        }
    },
    componentDidMount: function () {
        // Drag and drop
        $(".target").droppable({
            addClasses: false,
            /*activeClass: "listActive", */
            accept: ":not(.ui-sortable-helper)",
            activate: function() {
                //    $(this).find(".placeholder").attr("class", "placeholderOn");
                $(this).attr("class", "contacts-region-border-on target");
            },
            deactivate: function() {
                //      $(this).find(".placeholderOn").attr("class", "placeholder");
                $(this).attr("class", "contacts-region-border target");
            },
            drop: function(event, ui) {
                console.log("SendMessage:target1:drop");
                var avatarSrc = ui.draggable.find("img").attr("src");
                console.log("avatarSrc: " + avatarSrc);
                var userId = ui.draggable.find("img").attr("id");
                this.updateValues(avatarSrc, userId);
            }.bind(this)
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function() {
                $(this).removeClass("listActive");
            },
            update: function() {
                this.updateValues();
            }
        }).on("click", ".dismiss", function(event) {
            event.preventDefault();
            $(this).parent().remove();
            // updateValues();
        }.bind(this));

        $(".target").on("drop", function(event, ui) {
            console.log("SendMessage:target:drop2");
            $(this).find(".placeholder").attr("class", "placeholderDropped");
            $(this).attr("class", "contacts-region-border");
            var avatarSrc = ui.draggable.find("img").attr("src");
            $(this).find("img").attr("src", avatarSrc);
        });
    },
    updateValues: function (avatarSrc, userId) {
        // get data from server and populate
        var data = {
            id: userId
        };
        data = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getUserById",
            data: data,
            success: function(result){
                this.populateResults(result);
            }.bind(this),
            error: function(error) {
                console.log(error);
                document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Something went wrong. Try again!</label></div>";
                return false;
            },
            complete: function (e, xhr, settings) {
                console.log(e.status);
                if (e.status === 401) {
                    window.location.href = "/sendMessage";
                }
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    populateResults: function (data) {
        console.log("sendMessage:populateResults:avatar:data: ");
        console.log(data);
        if (!this.checkIfExists(data)) {
            // var data = [{ id: 0, email: 'jdoe@gmail.com', text: 'John Doe', firstName: 'John', lastName: 'Doe',  avatar: 'avatar-1'}];
            var contacts = this.state.contacts;
            contacts.push(data);
            this.setState({
                contacts: contacts
            });
        } else {
            console.log("Already in list");
            return false;
        }
    },
    checkIfExists: function (data) {
          var results = $.grep(this.state.contacts, function(e) {
              return e.id == data.id;
          });
        if (results.length > 0) return true;
        return false;
    },
    handleClear: function(e) {
        var data = this.getAttachmentFormData();
        this.setState({
            contacts: [],
            attachments: [],
            resetAttachments: true
        });
        $('#messageSubject').val('');
        CKEDITOR.instances['includeMessage'].setData('');
        this.deleteAttachments(data);
    },
    deleteAttachments: function(data) {
        console.log("SendMessage:deleteAttachments");
        console.log(data);
        if (data.attachedAssetIds != null) {
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/deleteAttachments",
                data: formData,
                success: function(result){
                    console.log(result);
                }.bind(this),
                dataType: "json",
                contentType : "application/json"
            });
        }
    },
    getAttachmentFormData: function () {
        return {
            id: this.refs.id.getDOMNode().value,
            attachedAssetIds: this.state.attachments
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        CKEDITOR.instances.includeMessage.updateElement();
        var data = this.getFormData();
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
                    if (result.error != null) {
                        document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Please include a subject and a message!</label></div>";
                        $('#validationError').show();
                        setTimeout(function() {  $("#validationError").fadeOut(); }, 5000);
                        return null;
                    }
                    $("#sendingModal").modal('hide');
                    results = result;
                    console.log(results);
                    this.handleResults(results.users.length);
                    $("#closeButton").trigger('click');
                }.bind(this),
                error: function (error) {
                    document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Please include a subject and a message!</label></div>";
                    $('#validationError').show();
                    setTimeout(function () {
                        $("#validationError").fadeOut();
                    }, 5000);
                    return null;
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Please include a subject and a message!</label></div>";
            $('#content-results').show();
            setTimeout(function() {  $("#content-results").fadeOut(); }, 5000);
            return null;
        }
    },
    handleResults: function(results) {
        console.log("In handleResults");
        console.log(results);
        if (results > 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> You successfully sent message to " + results + " contact(s)!</label></div>";
            setTimeout(function() {  $("#content-results").fadeOut(); }, 5000);
       //     setTimeout(function() {  window.location.href = '/inbox'; }, 5000);
            // clear form
            this.setState({
                contacts: [],
                attachments: [],
                resetAttachments: true
            });
            $('#messageSubject').val('');
            CKEDITOR.instances['includeMessage'].setData('');
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
            users: this.state.contacts,
            attachedAssetIds: this.state.attachments,
            groupId: this.state.groupId
        };
    },
    removeUser: function(id) {
        console.log("sendMessage:removeUser:id");
        console.log(id);
        console.log(this.state.contacts);
        var filterUsers = this.state.contacts.filter(function(user) {
            return user.id != id;
        });
        console.log(filterUsers);
        this.setState({
            contacts: filterUsers
        });
        console.log(this.state.contacts);
    },
    handleAddUser:function(id) {
        console.log("sendMessage:addUser:id");
        console.log(id);
        var data = {
            id: id
        };
        data = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getUserById",
            data: data,
            success: function(result){
                this.populateResults(result);
            }.bind(this),
            error: function(error) {
                console.log(error);
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    handleAddUserToCurrentGroup: function(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    handleClose: function() {
        window.location.href = '/inbox';
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
                                    <div id="inbox-content-row" className="row state-overview">
                                        <div className="row" id="profile-content">
                                            <div className="col-lg-12">
                                                <div className="panel panel-default" id="inbox-panel">
                                                    <div className="panel-heading">
                                                        <header className="panel-title">
                                                            <div className="text-center">
                                                                <strong>Send Message</strong>
                                                                <div className="pull-right new-contact-button">
                                                                    <a className="video" title="Communicate with Contacts" href="https://youtu.be/CqT5nRG-e30"><img className="video-icon margin-right-10" src="/images/youTube.png" alt="Latch channel" /></a>
                                                                    <a href="#new-contact" role="button" data-toggle="collapse" aria-expanded="false" aria-contols="new-contact" className="btn btn-sm btn-primary">
                                                                        <i className="fa fa-user-plus" title="Create New Contact" aria-hidden="true"></i>
                                                                        <span className="sr-only">Create New Contact</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </header>
                                                    </div>
                                                    <AddNewContact populateResults={this.populateResults} />
                                                    <div className="panel-body">
                                                        <input type="hidden" ref="id" name="id" value={this.state.user.id} />
                                                        <div className="row">
                                                            <div id="contacts-region-container" className="col-md-12">
                                                                <div className="panel">
                                                                    <div className="panel-body">
                                                                        <div className="row margin-bottom-10">
                                                                            <div className="pull-right col-md-4">
                                                                                <AddPillName handleAddUser={this.handleAddUser.bind(this)} />
                                                                            </div>
                                                                        </div>
                                                                        <div id="contacts-region" className="contacts-region-border target">
                                                                            <PillList contacts={this.state.contacts} removeUser={this.removeUser.bind(this)} />
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
                                                            <UploadAttachments user={this.state.user} addAttachments={this.addAttachments} removeAttachments={this.removeAttachments} clear={this.state.resetAttachments} />
                                                        </div>
                                                    </div>
                                                    <div className="panel-footer text-right">
                                                        <button type="button" onClick={this.handleSubmit} className="btn btn-primary btn-space">
                                                            <i id="send-intro-icon" className="fa fa-envelope "></i>&nbsp;
                                                            Send Message
                                                        </button>
                                                        <button type="button" onClick={this.handleClear} className="btn btn-default btn-space">Clear</button>
                                                        <button type="button" onClick={this.handleClose} className="btn btn-default btn-space">Close</button>
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
                                <div className="errorMessage" id="validationError"></div>
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

ReactDOM.render(
    <SendMessage />,
    document.getElementById('content')
);
