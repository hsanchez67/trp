'use strict';

var selectResponsive = {
    width: '95%'
};

var selectResponsive2 = {
    width: '100%'
};

var SendingModal = React.createClass({
    displayName: 'SendingModal',

    render: function render() {
        return React.createElement(
            'div',
            { id: 'sendingModal', className: 'modal fade', role: 'dialog', 'aria-labelledby': 'myModalLabel3', 'aria-hidden': 'true' },
            React.createElement(
                'div',
                { className: 'modal-dialog' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header text-center' },
                        React.createElement(
                            'h4',
                            { className: 'modal-title' },
                            'Your message is processing.'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        React.createElement(
                            'div',
                            { className: 'text-center' },
                            React.createElement('i', { className: 'fa fa-5x fa-cog fa-spin' })
                        )
                    )
                )
            )
        );
    }
});

var UploadAttachments = React.createClass({
    displayName: 'UploadAttachments',

    getInitialState: function getInitialState() {
        return {
            attachments: [],
            clear: true
        };
    },
    componentDidMount: function componentDidMount() {
        $("#input-24").fileinput({
            maxFileSize: 1500,
            minFileCount: 1,
            maxFileCount: 5,
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
                'zip': '<i class="fa fa-file-archive-o text-muted"></i>'
            },
            uploadUrl: '/uploadAttachments',
            uploadExtraData: function uploadExtraData() {
                return {
                    id: $('#id').val()
                };
            }
        }).on('filebatchuploaderror', function (event, data, previewId, index) {
            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;
        }).on('fileuploaded', (function (event, data, previewId, index) {
            console.log("UploadAttachments:componentDidMount:fileuploaded");
            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;
            console.log(data.response);
            console.log(data.response.attachedAssetIds);
            console.log(data.files);
            console.log(data.form);
            console.log(data.extra);
            this.addAttachments(data.response);
        }).bind(this)).on('filesuccessremove', function (event, id) {
            console.log("UploadAttachments:componentDidMount:filesuccessremove:id:" + id);
            $('#input-24').fileinput('clear');
            /*if (some_processing_function(id)) {
             console.log('Uploaded thumbnail successfully removed');
             } else {
             return false; // abort the thumbnail removal
             }*/
        }).on('fileclear', (function (event) {
            console.log("UploadAttachments:componentDidMount:fileclear:");
            var data = this.getFormData();
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/deleteAttachments",
                data: formData,
                success: (function (result) {
                    console.log("UploadAttachments:componentDidMount:fileclear:result");
                    console.log(result);
                    this.setState({
                        attachments: []
                    });
                    this.removeAttachments();
                }).bind(this),
                dataType: "json",
                contentType: "application/json"
            });
        }).bind(this)).on("filebatchselected", function (event, files) {
            // trigger upload method immediately after files are selected
            $("#input-24").fileinput("upload");
            console.log("UploadAttachments:componentDidMount:filebatchselected");
            console.log(files);
        }).on('filebatchuploadsuccess', (function (event, data, previewId, index) {
            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;
            console.log("UploadAttachments:componentDidMount:filebatchuploadsuccess");
            console.log(data);
            this.addAttachments(data.response);
        }).bind(this));
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log('UploadAttachments:componentWillReceiveProps:nextProps: ' + nextProps.clear);
        if (nextProps.clear == true && this.state.clear == false) {
            $('#input-24').fileinput('refresh');
            this.setState({
                clear: true
            });
        }
    },
    removeAttachments: function removeAttachments() {
        console.log('UploadAttachments:removeAttachments:');
        this.props.removeAttachments();
    },
    addAttachments: function addAttachments(object) {
        console.log('UploadAttachments:addAttachments:ids: ');
        console.log(object.toString());
        var ids = object._embedded.stringList;
        for (var i = 0; i < ids.length; i++) {
            var attachments = this.state.attachments.slice();
            attachments.push(ids[i]);
            this.setState({
                attachments: attachments,
                clear: false
            });
        }
        this.props.addAttachments(object);
    },
    getFormData: function getFormData() {
        return {
            id: $('#id').val(),
            attachedAssetIds: this.state.attachments
        };
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'col-lg-12 col-sm-12' },
            React.createElement(
                'div',
                { className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { className: 'panel-heading' },
                    React.createElement(
                        'header',
                        { className: 'panel-title text-left' },
                        'Add attachments'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-12 col-sm-12' },
                                React.createElement(
                                    'form',
                                    { action: '', method: 'post', encType: 'multipart/form-data' },
                                    React.createElement('input', { id: 'input-24', name: 'input-24[]', type: 'file', multiple: true, className: 'file-loading' })
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

var SendMessage = React.createClass({
    displayName: 'SendMessage',
    getInitialState: function getInitialState() {
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
    addAttachments: function addAttachments(object) {
        console.log('SendMessage:addAttachments:ids: ');
        console.log(object);
        var ids = object._embedded.stringList;
        for (var i = 0; i < ids.length; i++) {
            var attachments = this.state.attachments.slice();
            attachments.push(ids[i]);
            this.setState({
                attachments: attachments,
                resetAttachments: false
            });
        }
        console.log(this.state.attachments);
    },
    removeAttachments: function removeAttachments() {
        console.log('SendMessage:removeAttachments');
        this.setState({
            attachments: []
        });
    },
    componentWillMount: function componentWillMount() {
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
                success: (function (result) {
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
                }).bind(this),
                error: function error(_error) {
                    console.log("error: " + _error.toString());
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
                success: (function (result) {
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
                }).bind(this),
                error: function error(_error2) {
                    console.log("error: " + _error2.toString());
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else if (id != "") {
            var source = '/api/users/' + id;
            console.log(source);
            $.get(source, (function (result) {
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        user: result
                    });
                }
                CKEDITOR.replace('includeMessage');
            }).bind(this));
        }
    },
    componentDidMount: function componentDidMount() {
        // Drag and drop
        $(".target").droppable({
            addClasses: false,
            /*activeClass: "listActive", */
            accept: ":not(.ui-sortable-helper)",
            activate: function activate() {
                //    $(this).find(".placeholder").attr("class", "placeholderOn");
                $(this).attr("class", "contacts-region-border-on target");
            },
            deactivate: function deactivate() {
                //      $(this).find(".placeholderOn").attr("class", "placeholder");
                $(this).attr("class", "contacts-region-border target");
            },
            drop: (function (event, ui) {
                console.log("SendMessage:target1:drop");
                var avatarSrc = ui.draggable.find("img").attr("src");
                console.log("avatarSrc: " + avatarSrc);
                var userId = ui.draggable.find("img").attr("id");
                this.updateValues(avatarSrc, userId);
            }).bind(this)
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function sort() {
                $(this).removeClass("listActive");
            },
            update: function update() {
                this.updateValues();
            }
        }).on("click", ".dismiss", (function (event) {
            event.preventDefault();
            $(this).parent().remove();
            // updateValues();
        }).bind(this));

        $(".target").on("drop", function (event, ui) {
            console.log("SendMessage:target:drop2");
            $(this).find(".placeholder").attr("class", "placeholderDropped");
            $(this).attr("class", "contacts-region-border");
            var avatarSrc = ui.draggable.find("img").attr("src");
            $(this).find("img").attr("src", avatarSrc);
        });
    },
    updateValues: function updateValues(avatarSrc, userId) {
        // get data from server and populate
        var data = {
            id: userId
        };
        data = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getUserById",
            data: data,
            success: (function (result) {
                this.populateResults(result);
            }).bind(this),
            error: function error(_error3) {
                console.log(_error3);
                document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Something went wrong. Try again!</label></div>";
                return false;
            },
            complete: function complete(e, xhr, settings) {
                console.log(e.status);
                if (e.status === 401) {
                    window.location.href = "/sendMessage";
                }
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    populateResults: function populateResults(data) {
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
    checkIfExists: function checkIfExists(data) {
        var results = $.grep(this.state.contacts, function (e) {
            return e.id == data.id;
        });
        if (results.length > 0) return true;
        return false;
    },
    handleClear: function handleClear(e) {
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
    deleteAttachments: function deleteAttachments(data) {
        console.log("SendMessage:deleteAttachments");
        console.log(data);
        if (data.attachedAssetIds != null) {
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/deleteAttachments",
                data: formData,
                success: (function (result) {
                    console.log(result);
                }).bind(this),
                dataType: "json",
                contentType: "application/json"
            });
        }
    },
    getAttachmentFormData: function getAttachmentFormData() {
        return {
            id: this.refs.id.getDOMNode().value,
            attachedAssetIds: this.state.attachments
        };
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        CKEDITOR.instances.includeMessage.updateElement();
        var data = this.getFormData();
        data.htmlText = CKEDITOR.instances['includeMessage'].getData();

        // create plain text
        var html = CKEDITOR.instances.includeMessage.getSnapshot();
        var dom = document.createElement("DIV");
        dom.innerHTML = html;
        var plain_text = dom.textContent || dom.innerText;
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
                success: (function (result) {
                    console.log("Inside Success");
                    if (result.error != null) {
                        document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Please include a subject and a message!</label></div>";
                        $('#validationError').show();
                        setTimeout(function () {
                            $("#validationError").fadeOut();
                        }, 5000);
                        return null;
                    }
                    $("#sendingModal").modal('hide');
                    results = result;
                    console.log(results);
                    this.handleResults(results.users.length);
                    $("#closeButton").trigger('click');
                }).bind(this),
                error: function error(_error4) {
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
            setTimeout(function () {
                $("#content-results").fadeOut();
            }, 5000);
            return null;
        }
    },
    handleResults: function handleResults(results) {
        console.log("In handleResults");
        console.log(results);
        if (results > 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> You successfully sent message to " + results + " contact(s)!</label></div>";
            setTimeout(function () {
                $("#content-results").fadeOut();
            }, 5000);
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
    getFormData: function getFormData() {
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
    removeUser: function removeUser(id) {
        console.log("sendMessage:removeUser:id");
        console.log(id);
        console.log(this.state.contacts);
        var filterUsers = this.state.contacts.filter(function (user) {
            return user.id != id;
        });
        console.log(filterUsers);
        this.setState({
            contacts: filterUsers
        });
        console.log(this.state.contacts);
    },
    handleAddUser: function handleAddUser(id) {
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
            success: (function (result) {
                this.populateResults(result);
            }).bind(this),
            error: function error(_error5) {
                console.log(_error5);
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    handleAddUserToCurrentGroup: function handleAddUserToCurrentGroup(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    handleClose: function handleClose() {
        window.location.href = '/inbox';
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(HeaderResponsiveIn, { user: this.state.user, handleAddUserToCurrentGroup: this.handleAddUserToCurrentGroup }),
            React.createElement(Banner, null),
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { id: 'main' },
                    React.createElement(
                        'ol',
                        { className: 'breadcrumb' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            ' '
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row profile-row', id: 'inbox-content' },
                        React.createElement(
                            'div',
                            { className: 'col-lg-8' },
                            React.createElement(
                                'div',
                                { id: 'inbox-content-row', className: 'row state-overview' },
                                React.createElement(
                                    'div',
                                    { className: 'row', id: 'profile-content' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-12' },
                                        React.createElement(
                                            'div',
                                            { className: 'panel panel-default', id: 'inbox-panel' },
                                            React.createElement(
                                                'div',
                                                { className: 'panel-heading' },
                                                React.createElement(
                                                    'header',
                                                    { className: 'panel-title' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'text-center' },
                                                        React.createElement(
                                                            'strong',
                                                            null,
                                                            'Send Message'
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            { className: 'pull-right new-contact-button' },
                                                            React.createElement(
                                                                'a',
                                                                { className: 'video', title: 'Communicate with Contacts', href: 'https://youtu.be/CqT5nRG-e30' },
                                                                React.createElement('img', { className: 'video-icon margin-right-10', src: '/images/youTube.png', alt: 'Latch channel' })
                                                            ),
                                                            React.createElement(
                                                                'a',
                                                                { href: '#new-contact', role: 'button', 'data-toggle': 'collapse', 'aria-expanded': 'false', 'aria-contols': 'new-contact', className: 'btn btn-sm btn-primary' },
                                                                React.createElement('i', { className: 'fa fa-user-plus', title: 'Create New Contact', 'aria-hidden': 'true' }),
                                                                React.createElement(
                                                                    'span',
                                                                    { className: 'sr-only' },
                                                                    'Create New Contact'
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                            ),
                                            React.createElement(AddNewContact, { populateResults: this.populateResults }),
                                            React.createElement(
                                                'div',
                                                { className: 'panel-body' },
                                                React.createElement('input', { type: 'hidden', ref: 'id', name: 'id', value: this.state.user.id }),
                                                React.createElement(
                                                    'div',
                                                    { className: 'row' },
                                                    React.createElement(
                                                        'div',
                                                        { id: 'contacts-region-container', className: 'col-md-12' },
                                                        React.createElement(
                                                            'div',
                                                            { className: 'panel' },
                                                            React.createElement(
                                                                'div',
                                                                { className: 'panel-body' },
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'row margin-bottom-10' },
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'pull-right col-md-4' },
                                                                        React.createElement(AddPillName, { handleAddUser: this.handleAddUser.bind(this) })
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { id: 'contacts-region', className: 'contacts-region-border target' },
                                                                    React.createElement(PillList, { contacts: this.state.contacts, removeUser: this.removeUser.bind(this) })
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'div',
                                                        { className: 'col-md-12' },
                                                        React.createElement(
                                                            'div',
                                                            { className: 'panel' },
                                                            React.createElement(
                                                                'div',
                                                                { className: 'panel-body' },
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'row' },
                                                                    React.createElement('input', { type: 'text', className: 'form-control', id: 'messageSubject', name: 'messageSubject', ref: 'messageSubject', placeholder: 'Subject Line' })
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'div',
                                                        { className: 'col-md-12' },
                                                        React.createElement(
                                                            'div',
                                                            { className: 'panel' },
                                                            React.createElement(
                                                                'div',
                                                                { className: 'panel-body' },
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'row' },
                                                                    React.createElement('textarea', { id: 'includeMessage', name: 'includeMessage', ref: 'includeMessage', className: 'form-control', rows: '10' })
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    React.createElement(UploadAttachments, { user: this.state.user, addAttachments: this.addAttachments, removeAttachments: this.removeAttachments, clear: this.state.resetAttachments })
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'panel-footer text-right' },
                                                React.createElement(
                                                    'button',
                                                    { type: 'button', onClick: this.handleSubmit, className: 'btn btn-primary btn-space' },
                                                    React.createElement('i', { id: 'send-intro-icon', className: 'fa fa-envelope ' }),
                                                    '  Send Message'
                                                ),
                                                React.createElement(
                                                    'button',
                                                    { type: 'button', onClick: this.handleClear, className: 'btn btn-default btn-space' },
                                                    'Clear'
                                                ),
                                                React.createElement(
                                                    'button',
                                                    { type: 'button', onClick: this.handleClose, className: 'btn btn-default btn-space' },
                                                    'Close'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'row' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'col-md-12' },
                                                    React.createElement('div', { id: 'content-results' })
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement('div', { className: 'errorMessage', id: 'validationError' }),
                            React.createElement(SendingModal, null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-lg-4' },
                            React.createElement(MyShortListPanel, { droppable: true, addToCurrentGroup: this.state.addToCurrentGroup }),
                            React.createElement(NavigationPanel, null)
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

var PillList = React.createClass({
    displayName: 'PillList',

    removeUser: function removeUser(id) {
        this.props.removeUser(id);
    },
    render: function render() {
        var createContact = (function (contact) {
            console.log(contact);
            var name = contact.firstName + ' ' + contact.lastName;
            return React.createElement(
                PillName,
                { key: contact.id, id: contact.id, removeUser: this.removeUser.bind(this) },
                name
            );
        }).bind(this);
        return React.createElement(
            'ul',
            null,
            this.props.contacts.map(createContact)
        );
    }
});

var PillName = React.createClass({
    displayName: 'PillName',

    getInitialState: function getInitialState() {
        return {
            active: false,
            name: this.props.children,
            id: this.props.id
        };
    },
    removeUser: function removeUser() {
        this.props.removeUser(this.state.id);
    },
    render: function render() {
        var selectedClass = classNames({
            'pill selected': this.state.active,
            'pill': !this.state.active
        });
        return React.createElement(
            'li',
            { className: selectedClass },
            React.createElement(
                'span',
                { className: 'pill-name' },
                this.props.children
            ),
            React.createElement(
                'button',
                { type: 'button', className: 'close', 'aria-label': 'Remove', onClick: this.removeUser },
                React.createElement(
                    'span',
                    { 'aria-hidden': 'true' },
                    '×'
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(SendMessage, null), document.getElementById('content'));