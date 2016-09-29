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

var PreviewModal = React.createClass({
    render(){
        let reasonSwitch = classNames({
            'hidden': this.props.reasonSwitch == false,
            ' ': this.props.reasonSwitch == true
        });
        return (
            <div id="previewModal" className="modal fade" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleHideModal}><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Introduction Preview.</h4>
                        </div>
                        <div className="modal-body">
                            <div id="message-body" className="col-lg-12 col-sm-12">
                                <div className="panel panel-default">
                                    <div  className="panel-heading panel-heading-dark">
                                        <header><img src='/images/LATCH-Logo-White.png' className="pull-left" /> <h5 className="pull-right">Latch Professional Introduction</h5></header>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-lg-12 text-left">
                                                <p className="header">
                                                    <span id="p1fn">{this.props.p1.firstName}</span>&nbsp;and&nbsp;
                                                    <span id="p1fn">{this.props.p2.firstName}</span><br />
                                                    I would like to Introduce you
                                                </p>
                                                <div className={reasonSwitch} id="reason-text"><strong>Re: </strong><span id="reason-text-content">{this.props.reason}</span></div>
                                                <div id="callout-primary">
                                                    <div className="primary">
                                                        <div className="row">
                                                            <div className="col-sm-4 text-center"><img src={'/api/remoteFiles/view/'+this.props.p1.avatar} className="thumbnail img-responsive center-block" /></div>
                                                            <div className="col-sm-4 text-center"><img src="../images/lightbulb.png" className="arrow img-responsive center-block" /></div>
                                                            <div className="col-sm-4 text-center"><img src={'/api/remoteFiles/view/'+this.props.p2.avatar} className="thumbnail img-responsive center-block" /></div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-4 text-center">
                                                                <p className="text-center"><span className="meet">{this.props.p2.firstName}</span> meet <span className="meet">{this.props.p1.firstName}</span></p>
                                                                <p className="text-center"><a className="links" href="#">{this.props.p1.firstName}'s full profile</a></p>
                                                            </div>
                                                            <div className="col-sm-4 text-center">&nbsp;</div>
                                                            <div className="col-sm-4 text-center">
                                                                <p className="text-center"><span className="meet">{this.props.p1.firstName}</span> meet <span className="meet">{this.props.p2.firstName}</span></p>
                                                                <p className="text-center"><a className="links" href="#">{this.props.p2.firstName}'s full profile</a></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="previewMessage"></div>
                                                <div>{this.props.user.firstName} {this.props.user.lastName}</div>
                                                <div id="callout-secondary">
                                                    <div className="secondary">
                                                        <p>{this.props.user.firstName} {this.props.user.lastName}</p>
                                                        <p><i className="fa fa-phone"></i>&nbsp;{this.props.user.phone}</p>
                                                        <p><i className="fa fa-envelope"></i>&nbsp;<a href="mailto:{this.state.user.email}">{this.props.user.email}</a></p>
                                                    </div>
                                                </div>
                                                <div className="disclaimer">
                                                    Latch, Inc.<br />
                                                    2998 Douglas Blvd #350, Roseville, CA 95661, United States<br />
                                                    @2016 Latch, Inc. All Rights Reserved<br />
                                                    <br />
                                                    <strong><a className="bold" href="http://www.thereferralportal.com">Latch.com</a> | <a href="http://www.thereferralportal.com/about/privacy.html">Privacy Policy</a></strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.handleHideModal}>Close</button>
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
            showRemove: true,
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
        console.log('UploadAttachments:addAttachments:ids: ' + object.toString());
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

var ReasonNote = React.createClass({
    onReasonChange: function() {
        var note = this.refs.reasonNote.value;
        this.props.onReasonChange(note);
    },
    componentDidMount: function() {
        $("[name='reason-check']").bootstrapSwitch();

        $('input[name="reason-check"]').on('switchChange.bootstrapSwitch', function(event, state) {
            this.props.onReasonSwitchChange(state);
        }.bind(this));
    },
    render() {
        var reasonSwitch = 'checked';
        if (this.props.reasonSwitch == false) reasonSwitch = '';
        return (
            <div id="subject-line" className="col-lg-12 col-sm-12">
                <div className="panel panel-default">
                    <div  className="panel-heading">
                        <header className="panel-title text-left">Reason for Introduction <span className="pull-right"><small>Show in message</small>&nbsp;<input type="checkbox" name="reason-check" ref="reason-check" checked={reasonSwitch} data-size="mini" /></span></header>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="form-group">
                                <div className="col-lg-12 text-left">
                                    <input type="text" id="reasonNote" name="reasonNote" ref="reasonNote" onBlur={this.onReasonChange} className="form-control"></input>
                                    <span className="help-block">e.g. 1234 Main Street project landscape designer referall</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var SubjectLine = React.createClass({
    getInitialState: function() {
        return {
            user: this.props.user,
            p1: this.props.p1,
            p2: this.props.p2
        }
    },
    onValueChange: function() {
        console.log("Three: " + this.refs.messageSubject.value);
        var subject = this.refs.messageSubject.value;
       this.props.onValueChange(this.refs.messageSubject.value);
        this.refs.messageSubject.value = subject;
        console.log("Four: " + this.refs.messageSubject.value);
    },
    componentDidMount: function() {var p1FirstName = "";
        if (!$.isEmptyObject(this.state.p1)) p1FirstName = this.state.p1.firstName;
        var p2FirstName = "";
        if (!$.isEmptyObject(this.state.p2)) p2FirstName = this.state.p2.firstName;
        var userName = "";
        if (!$.isEmptyObject(this.state.user)) userName = this.state.user.firstName + " " + this.state.user.lastName;
        var data = [
            { id: 0, text: "I would like to introduce..." },
            { id: 1, text:  p1FirstName + ", meet " +  p2FirstName + ". "  + p2FirstName + " meet " +  p1FirstName },
            { id: 2, text: p1FirstName + "... meet " + p2FirstName + ". "  + p2FirstName + "... meet " + p1FirstName},
            { id: 3, text: userName + " sent you a message." },
            { id: 4, text: "The contact you requested from " + userName }
        ];
        var messageSubjectSelect = $("#messageSubjectSelect");
        $(messageSubjectSelect).select2({
            placeholder: "Subject Line",
            allowClear: true,
            data: data,
            minimumResultsForSearch: Infinity
        }).on('change', function() {
            var data = $('#messageSubjectSelect').select2('data')[0];
            console.log("SubjectLine:componentDidMount:select2:onChange");
            if (!$.isEmptyObject(data)) {
                this.refs.messageSubject.value = data.text;
                console.log("One: " + this.refs.messageSubject.value);
                this.props.onValueChange(this.refs.messageSubject.value);
                console.log("Two: " + this.refs.messageSubject.value);
                $('#messageSubjectSelect').select2("val", "");

            }
        }.bind(this));

    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.p1 != this.props.p1 || nextProps.p2 != this.props.p2 || nextProps.user != this.props.user) {
            console.log("SubjectLine:componentWillReceiveProps:nextProps");
            console.log(nextProps);
            console.log(this.props);
            this.setState({
                user: nextProps.user,
                p1: nextProps.p1,
                p2: nextProps.p2
            })
            this.handleChange(nextProps.user, nextProps.p1, nextProps.p2);
        }
    },
    handleClear: function() {
        var $select = $("#messageSubjectSelect");
        $select.html('');
    },
    handleChange: function(user, p1, p2) {
        var $select = $("#messageSubjectSelect");

        var data = $select.data('select2').options.options.data;
        console.log(data);
        console.log($select.html());
        var p1FirstName = "";
        if (!$.isEmptyObject(p1)) p1FirstName = p1.firstName;
        var p2FirstName = "";
        if (!$.isEmptyObject(p2)) p2FirstName = p2.firstName;
        var userName = "";
        if (!$.isEmptyObject(user)) userName = user.firstName + " " + user.lastName;
        console.log("p1FirstName: " + p1FirstName + " p2FirstName: " + p2FirstName + " userName: " + userName);
        var newData = [
            { id: 0, text: "I would like to introduce..." },
            { id: 1, text:  p1FirstName + ", meet " +  p2FirstName + ". "  + p2FirstName + " meet " +  p1FirstName },
            { id: 2, text: p1FirstName + "... meet " + p2FirstName + ". "  + p2FirstName + "... meet " + p1FirstName},
            { id: 3, text: userName + " sent you a message." },
            { id: 4, text: "The contact you requested from " + userName }
        ];
        $select.data('select2').options.options.data = newData;

        $select.html('');
        for (var i=0; i < newData.length; i++) {
            $select.append("<option value=\"" + newData[i].id + 1 + "\">" + newData[i].text + "</option>");
        }
        console.log($select.data('select2').options.options.data);
        console.log($select.html());
        $select.select2("val", "");
        this.refs.messageSubject.value = "";
        this.onValueChange("");
    },
    render() {
        return (
            <div id="subject-line" className="col-lg-12 col-sm-12">
                <div className="panel panel-default">
                    <div  className="panel-heading">
                        <header className="panel-title text-left">Subject Line <small className="pull-right">Select a subject from the drop-down or type your own.</small></header>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="form-group">
                                <div className="col-lg-12 text-left">
                                    <select id="messageSubjectSelect" className="form-control"  ref="messageSubjectSelect">
                                    </select>
                                    <input type="text" id="messageSubject" name="messageSubject" ref="messageSubject" onBlur={this.onValueChange} className="form-control"></input>
                                    <span className="help-block"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var MessageBody = React.createClass({
    getInitialState: function() {
        return {
            user: this.props.user
        }
    },
    componentDidMount: function () {
        // Turn off automatic editor creation first.
        CKEDITOR.disableAutoInline = true;
        var ck = CKEDITOR.inline( 'includeMessage' );
        ck.on( 'instanceReady', function( ev ) {
            var editor = ev.editor;
            editor.setReadOnly( false );
        });
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.user != null) {
            console.log('MessageBody:componentWillReceiveProps:ids: ' + nextProps.user.id + " - " + this.props.user.id);
            this.setState({
                user: nextProps.user
            });
        }
    },
    render() {
        let reasonSwitch = classNames({
            'hidden': this.props.reasonSwitch == false,
            ' ': this.props.reasonSwitch == true
        });
        return (
            <div id="message-body" className="col-lg-12 col-sm-12">
                <div className="panel panel-default">
                    <div  className="panel-heading">
                        <header className="panel-title text-left">Message Body <small className="pull-right">Click on the dotted box below to edit</small></header>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-lg-12 text-left">
                                <p className="header">
                                    <span id="p1fn">{this.props.p1.firstName}</span>&nbsp;and&nbsp;
                                    <span id="p1fn">{this.props.p2.firstName}</span><br />
                                    I would like to Introduce you
                                </p>
                                <div className={reasonSwitch} id="reason-text"><strong>Re: </strong><span id="reason-text-content">{this.props.reason}</span></div>
                                <div id="callout-primary">
                                    <div className="primary">
                                        <div className="row">
                                            <div className="col-sm-4 text-center"><img src={'/api/remoteFiles/view/'+this.props.p1.avatar} className="thumbnail img-responsive center-block" /></div>
                                            <div className="col-sm-4 text-center"><img src="../images/lightbulb.png" className="arrow img-responsive center-block" /></div>
                                            <div className="col-sm-4 text-center"><img src={'/api/remoteFiles/view/'+this.props.p2.avatar} className="thumbnail img-responsive center-block" /></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 text-center">
                                                <p className="text-center"><span className="meet">{this.props.p2.firstName}</span> meet <span className="meet">{this.props.p1.firstName}</span></p>
                                                <p className="text-center"><a className="links" href="#">{this.props.p1.firstName}'s full profile</a></p>
                                            </div>
                                            <div className="col-sm-4 text-center">&nbsp;</div>
                                            <div className="col-sm-4 text-center">
                                                <p className="text-center"><span className="meet">{this.props.p1.firstName}</span> meet <span className="meet">{this.props.p2.firstName}</span></p>
                                                <p className="text-center"><a className="links" href="#">{this.props.p2.firstName}'s full profile</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="includeMessage" className="editable" contentEditable="true">
                                    <p className="body">I hope you have a chance to connect and I am confident that you will enjoy working together</p>
                                    <p className="body">Please let me know how I can support you both in the future.</p>
                                    <p className="body">Best Regards,</p>
                                </div>
                                <div>{this.state.user.firstName} {this.state.user.lastName}</div>
                                <div id="callout-secondary">
                                    <div className="secondary">
                                        <p>{this.state.user.firstName} {this.state.user.lastName}</p>
                                        <p><i className="fa fa-phone"></i>&nbsp;{this.state.user.phone}</p>
                                        <p><i className="fa fa-envelope"></i>&nbsp;<a href="mailto:{this.state.user.email}">{this.state.user.email}</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var IntroductionContent = React.createClass({
    displayName: 'IntroductionContent',
    getInitialState: function(){
        return {
        	user: this.props.user,
            profile: this.props.profile,
            p1: [],
            p2: [],
            attachments: [],
            contactid1: '',
            contact1: '',
            contactAvatar1: '',
            contactInitials1: '',
            contactid2: '',
            contact2: '',
            contactAvatar2: '',
            contactInitials2: '',
            subject: '',
            resetAttachments: true,
            reason: '',
            reasonSwitch: true,
            communication: this.props.communication,
        }
    },
    reloadPage: function() {
        window.location.href = '/introduction/' +  this.state.communication.id;
    },
    addAttachments: function (object) {
        console.log('IntroductionContent:addAttachments:ids: ' + object.toString());
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
        console.log('IntroductionContent:removeAttachments');
        this.setState({
            attachments: []
        });
    },
    handleSubjectChange: function(text) {
        this.setState({
            subject: text
        });
    },
    handleReasonChange: function(text) {
        this.setState({
            reason: text
        });
    },
    handleReasonSwitchChange: function(state) {
        this.setState({
            reasonSwitch: state
        });
    },
    componentWillMount: function () {
        console.log("IntroductionContent:componentWillMount:");
        this.prepareComponentState(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
        console.log("IntroductionContent:componentWillReceiveProps:");
        this.prepareComponentState(nextProps);
    },
    prepareComponentState: function(props) {
        console.log("IntroductionContent:prepareComponentState:");
        console.log(props);
        if (!$.isEmptyObject(props.profile) && $.isEmptyObject(this.state.profile)) {
            this.setState({
                profile: props.profile
            });
            this.loadProfile(props.profile);
        }
        if (!$.isEmptyObject(props.user) && $.isEmptyObject(this.state.user)) {
            this.setState({
                user: props.user
            });
        }
    },
    loadUser: function (id) {
        var source = '/api/users/'+id;
        $.get(source, function (result) {
            this.setState({
                subjectUser: result
            });
            this.loadProfile(result);
        }.bind(this));
    },
    getInitials: function(name) {
        var initials = name.match(/\b\w/g);
        initials = (initials.shift() + initials.pop()).toUpperCase();
        return initials;
    },
    loadProfile: function(data) {
        var initials = this.getInitials(data.firstName+" "+data.lastName);
        this.setState({
            p1: data,
            contactid1: data.id,
            contact1: data.email,
            contactAvatar1: data.avatar,
            contactInitials1: initials,
            confirmationUsername1: data.avatar,
            confirmationInitials1: initials
        });
        var avatar1 = $('#avatar1');
    /*    avatar1.attr('src', '/api/remoteFiles/view/'+data.avatar);
        avatar1.attr('class', 'contact-img img-circle'); */
        avatar1.parents('li').attr('class', 'placeholderDropped');
        $('#contactid1').val(data.id);
        $('#contact1').val(data.email);
        $('#contactAvatar1').val(data.avatar);
      //  $("#confirmationAvatar1").attr('src', '/api/remoteFiles/view/' + data.avatar);
        $('#contact1SelectedName').text(data.firstName + ' ' + data.lastName);
        $('#contact1SelectedProfession').text(data.profession);
        $('#selectContact1Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
        $('#selectContact1Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
    },
    componentDidMount: function () {
        $('#inputProfessionDiv').hide();
        $(document).on('change', 'input:radio[id^="newContactConsumerButton"]', function (event) {
            if ($(this).prop('checked') == true) {
                $('#inputProfessionDiv').hide();
            }
        });
        $(document).on('change', 'input:radio[id^="newContactProfessionalButton"]', function (event) {
            if ($(this).prop('checked') == true) {
                $('#inputProfessionDiv').show();
            }
        });

        $(".target1").droppable({
            addClasses: false,
            /*activeClass: "listActive", */
            accept: ":not(.ui-sortable-helper)",
            activate: function() {
                //    $(this).find(".placeholder").attr("class", "placeholderOn");
                $(this).attr("class", "panel-body panel-body-border-on target1");
            },
            deactivate: function() {
                //      $(this).find(".placeholderOn").attr("class", "placeholder");
                $(this).attr("class", "panel-body panel-body-border target1");
            },
            drop: function(event, ui) {
                console.log("IntroductionContent:target1:drop");
                var avatarSrc = ui.draggable.find("img").attr("src");
                var avatar = "avatar1";
                var userId = ui.draggable.find("img").attr("id");
                console.log("avatar: " + avatar);
                console.log("avatarSrc: " + avatarSrc);
                this.updateValues(avatar, avatarSrc, userId);
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

        $(".target1").on("drop", function(event, ui) {
            console.log("IntroductionContent:target1:drop2");
            $(this).find(".placeholder").attr("class", "placeholderDropped");
            $(this).attr("class", "panel-body panel-body-border");
            var avatarSrc = ui.draggable.find("img").attr("src");
            $(this).find("img").attr("src", avatarSrc);
        });

        $(".target2").droppable({
            addClasses: false,
            /*activeClass: "listActive", */
            accept: ":not(.ui-sortable-helper)",
            activate: function() {
                //    $(this).find(".placeholder").attr("class", "placeholderOn");
                $(this).attr("class", "panel-body panel-body-border-on target2");
            },
            deactivate: function() {
                //      $(this).find(".placeholderOn").attr("class", "placeholder");
                $(this).attr("class", "panel-body panel-body-border target2");
            },
            drop: function(event, ui) {
                var avatarSrc = ui.draggable.find("img").attr("src");
                var avatar = "avatar2";
                console.log("avatar: " + avatar);
                console.log("avatarSrc: " + avatarSrc);
                var userId = ui.draggable.find("img").attr("id");
                this.updateValues(avatar, avatarSrc, userId);
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

        $(".target2").on("drop", function(event, ui) {
            $(this).find(".placeholder").attr("class", "placeholderDropped");
            $(this).attr("class", "panel-body panel-body-border");
            var avatarSrc = ui.draggable.find("img").attr("src");
            $(this).find("img").attr("src", avatarSrc);
        });

        /* drag and drop end */

        $(".js-example-placeholder-multiple").select2({
            placeholder: "Enter a name or Email address"
        });

        $('#selectContact1').select2({
            /*   placeholder: {
             id: "-1",
             placeholder: "Enter a name or Email address"
             },
             allowClear: true, */
            minimumInputLength: 2,
            ajax: {
                url: "/userSearch",
                method: 'POST',
                dataType: 'json',
                contentType : "application/json",
                delay: 250,
                data: function (params) {
                    return {
                        search: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data) {
                    console.log(data);
                    if (!$.isEmptyObject(data)) {
                        var select2Data = $.map(data._embedded.userDTOList, function (obj) {
                            //   obj.id = obj.email;
                            obj.text = obj.firstName + ' ' + obj.lastName;
                            return obj;
                        });
                        return {
                            results: select2Data
                        };
                    } else {
                        return false;
                    }
                }
            },
            templateResult: this.formatAjaxResponse,
            templateSelection: this.formatAjaxSelection,
            escapeMarkup:function(t) { return t; }
        });

        $('#selectContact2').select2({
            /*    placeholder: {
             id: "-1",
             placeholder: "Enter a name or Email address"
             },
             allowClear: true, */
            minimumInputLength: 2,
            ajax: {
                url: "/userSearch",
                method: 'POST',
                dataType: 'json',
                contentType : "application/json",
                delay: 250,
                data: function (params) {
                    return {
                        search: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data) {
                    console.log(data);
                    if (!$.isEmptyObject(data)) {
                        var select2Data = $.map(data._embedded.userDTOList, function (obj) {
                            //  obj.id = obj.email;
                            obj.text = obj.firstName + ' ' + obj.lastName;
                            return obj;
                        });
                        return {
                            results: select2Data
                        };
                    } else {
                        return false;
                    }
                }
            },
            templateResult: this.formatAjaxResponse,
            templateSelection: this.formatAjaxSelection2,
            escapeMarkup:function(t) { return t; }
        });

        $(function(){
            $("#searchclear").click(function(){
                $("#selectContact1").select2('val', 'All');
                $("#selectContact2").select2('val', 'All');
            });
        });
    },
    populateNewContactResults: function(data) {
        console.log("introduction:populateNewContactResults");
        console.log(data);
        var avatar2 = $('#avatar2');
        /*avatar2.attr('src', '/api/remoteFiles/view/'+data.avatar);
        avatar2.attr('class', 'contact-img img-circle'); */
        avatar2.parents('li').attr('class', 'placeholderDropped');
        this.refs.contactid2.value = data.id;
        this.refs.contact2.value = data.email;
        this.refs.contactAvatar2.value = data.avatar;
     //   $("#confirmationAvatar2").attr('src', '/api/remoteFiles/view/'+data.avatar);
        $('#contact2SelectedName').text(data.firstName + ' ' + data.lastName);
        $('#contact2SelectedProfession').text(data.profession);
        $('#selectContact2Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
        $('#selectContact2Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
        document.getElementById("formValidationError").innerHTML = "";
        $('#inputEmail').val('');
        $('#inputFirstName').val('');
        $('#inputLastName').val('');
        $("#inputProfession").val('').trigger('change');
        $('#newContactConsumerButton').prop('checked', true);
        $('#newContactProfessionalButton').prop('checked', false);
        $('.btn-group #labelNewContactProfessionalButton').removeClass('active');
        $('.btn-group #labelNewContactConsumerButton').addClass('active');
        $('#inputProfessionDiv').hide();
        $('#new-contact').collapse("toggle");
        var initials = this.getInitials(data.firstName+" "+data.lastName);
        this.setState({
            p2: data,
            contactid2: data.id,
            contact2: data.email,
            contactAvatar2: data.avatar,
            contactInitials2: initials,
            confirmationUsername2: data.avatar,
            confirmationInitials2: initials
        });
    },
    formatAjaxResponse: function(data){
        if(data.loading) return data.text;
        var score = "";
        if(data.score != null) score = data.score;
        var name = data.firstName+" "+data.lastName
        var initials = name.match(/\b\w/g);
        initials = (initials.shift() + initials.pop()).toUpperCase();
        var markup = '';
        if (data.avatar == 'default' && initials != '') {
            markup = '<div class="clearfix">' +
                '<div class="col-sm-2">' +
                '<div id="' + data.id + '" class="avatar-circle-small"><img class="hidden" id="' + data.id + '"/><span class="initials-small">'+ initials +'</span></div>' +
                '</div>' +
                '<div class="col-sm-10">' +
                '<div class="clearfix">' +
                '<div>' + data.firstName + ' ' + data.lastName + '</div>' +
                '<div><i class="fa fa-star"></i> ' + score + '</div>' +
                '</div>';
        } else {
            markup = '<div class="clearfix">' +
                '<div class="col-sm-2">' +
                '<img id="' + data.id + '" class="img-circle" src="/api/remoteFiles/view/' + data.avatar + '" style="max-width: 40px; border-radius: 50%;" />' +
                '</div>' +
                '<div class="col-sm-10">' +
                '<div class="clearfix">' +
                '<div>' + data.firstName + ' ' + data.lastName + '</div>' +
                '<div><i class="fa fa-star"></i> ' + score + '</div>' +
                '</div>';
        }
        /*if (repo.description) {
         markup += '<div>' + repo.description + '</div>';
         }*/

        markup += '</div></div>';

        console.log(markup);
        return markup;
    },
    formatAjaxSelection: function(data) {
        var avatar1 = $('#avatar1');
  /*      avatar1.attr('src', '/api/remoteFiles/view/'+data.avatar);
        avatar1.attr('class', 'contact-img img-circle'); */
        avatar1.parents('li').attr('class', 'placeholderDropped');
        this.refs.contactid1.value = data.id;
        this.refs.contact1.value = data.email;
        this.refs.contactAvatar1.value = data.avatar;
     //   $("#confirmationAvatar1").attr('src', '/api/remoteFiles/view/'+data.avatar);
        $('#contact1SelectedName').text(data.firstName + ' ' + data.lastName);
        $('#contact1SelectedProfession').text(data.profession);
        $('#selectContact1Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
        $('#selectContact1Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
        var initials = this.getInitials(data.firstName+" "+data.lastName);
        this.setState({
            p1: data,
            contactid1: data.id,
            contact1: data.email,
            contactAvatar1: data.avatar,
            contactInitials1: initials,
            confirmationUsername1: data.avatar,
            confirmationInitials1: initials
        });
        return data.firstName + ' ' + data.lastName || data.text;
    },
    formatAjaxSelection2: function(data) {
        var avatar2 = $('#avatar2');
       /* avatar2.attr('src', '/api/remoteFiles/view/'+data.avatar);
        avatar2.attr('class', 'contact-img img-circle'); */
        avatar2.parents('li').attr('class', 'placeholderDropped');
        this.refs.contactid2.value = data.id;
        this.refs.contact2.value = data.email;
        this.refs.contactAvatar2.value = data.avatar;
     //   $("#confirmationAvatar2").attr('src', '/api/remoteFiles/view/'+data.avatar);
        $('#contact2SelectedName').text(data.firstName + ' ' + data.lastName);
        $('#contact2SelectedProfession').text(data.profession);
        $('#selectContact2Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
        $('#selectContact2Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
        var initials = this.getInitials(data.firstName+" "+data.lastName);
        this.setState({
            p2: data,
            contactid2: data.id,
            contact2: data.email,
            contactAvatar2: data.avatar,
            contactInitials2: initials,
            confirmationUsername2: data.avatar,
            confirmationInitials2: initials
        });
        return data.firstName + ' ' + data.lastName || data.text;
    },
    updateValues: function (avatar, avatarSrc, userId) {
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
                    this.populateResults(avatar, result);
                }.bind(this),
                error: function(error) {
                    console.log(error);
                    document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Something went wrong. Try again!</label></div>";
                    return false;
                },
                complete: function (e, xhr, settings) {
                    console.log(e.status);
                    if (e.status === 401) {
                        window.location.href = "/introduction";
                    }
                },
                dataType: "json",
                contentType : "application/json"
            });
    },
    populateResults: function (avatar, data) {
        console.log("IntroductionContent:populateResults:avatar:data: ");
        console.log(data);
        console.log(avatar);
        if (avatar == "avatar1") {
            console.log("IntroductionContent:populateResults:avatar1: ");
            // var data = [{ id: 0, email: 'jdoe@gmail.com', text: 'John Doe', firstName: 'John', lastName: 'Doe',  avatar: 'avatar-1'}];
            this.refs.contactid1.value = data.id;
            this.refs.contact1.value = data.email;
            this.refs.contactAvatar1.value = data.avatar;
       //     $("#confirmationAvatar1").attr('src', '/api/remoteFiles/view/'+data.avatar);
            $('#contact1SelectedName').text(data.firstName + ' ' + data.lastName);
            $('#contact1SelectedProfession').text(data.profession);
            $('#selectContact1Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
            $('#selectContact1Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
            var initials = this.getInitials(data.firstName+" "+data.lastName);
            this.setState({
                p1: data,
                contactid1: data.id,
                contact1: data.email,
                contactAvatar1: data.avatar,
                contactInitials1: initials,
                confirmationUsername1: data.avatar,
                confirmationInitials1: initials
            });
        } else {
            console.log("IntroductionContent:populateResults:avatar2: ");
            //var data = [{ id: 0,  email: 'jdoe@gmail.com', text: 'John Doe', firstName: 'John', lastName: 'Doe',  avatar: 'avatar-1'}];
            this.refs.contactid2.value = data.id;
            this.refs.contact2.value = data.email;
            this.refs.contactAvatar2.value = data.avatar;
            $("#confirmationAvatar2").attr('src', '/api/remoteFiles/view/'+data.avatar);
            $('#contact2SelectedName').text(data.firstName + ' ' + data.lastName);
            $('#contact2SelectedProfession').text(data.profession);
            $('#selectContact2Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
            $('#selectContact2Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
            var initials = this.getInitials(data.firstName+" "+data.lastName);
            this.setState({
                p2: data,
                contactid2: data.id,
                contact2: data.email,
                contactAvatar2: data.avatar,
                contactInitials2: initials,
                confirmationUsername2: data.avatar,
                confirmationInitials2: initials
            });
        }
    },
    render: function () {
        return (
            <div className="col-lg-8">
                <div name="introductionForm">
                    <div className="form-group">
                        <h2 className="page-header text-left">Make an Introduction <a className="video" title="Introduce Contacts" href="https://youtu.be/xFG1ddNZczE"><img className="video-icon" src="/images/youTube.png" alt="Latch channel" /></a></h2>
                        <input type="hidden" id="paramAvatar" value={this.props.avatar} />
                        <div className="row" id="shortList-content">
                            <div className="col-lg-6 col-sm-6">
                                <div id="contact1Panel" className="panel">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-sm-3 text-left">
                                                <h2 className="panel-title text-left">Introduce</h2>
                                            </div>
                                            <div className="col-sm-3 text-left">
                                                <i className="fa fa-2x fa-envelope fa-envelope-top"></i>&nbsp;
                                                <i className="fa fa-arrow-right fa-arrow-right-top"></i>
                                            </div>
                                            <div className="col-sm-6">
                                                <button type="button" role="button" data-toggle="collapse" aria-expanded="false" href="#advance-search" aria-controls="advance-search" className="btn btn-sm btn-primary">
                                                    <i id="send-intro-icon" className="fa fa-search "></i>&nbsp;
                                                    Advanced Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-body panel-body-border target1">
                                        <div className="row">
                                            <div className="col-lg-2 col-md-4 col-sm-4 col-xs-2">
                                                <ol>
                                                    <li id="avatar1li" className="placeholder">
                                                        <Avatar1Pic id={this.state.contactid1} username={this.state.contactAvatar1} initials={this.state.contactInitials1} />
                                                    </li>
                                                </ol>
                                            </div>
                                            <div id="selectContact1Edit" className="col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30">
                                                <select id="selectContact1" className="js-example-placeholder-multiple" style={selectResponsive}></select>
                                            </div>
                                            <div id="selectContact1Selected" className="col-lg-10 col-md-8 col-sm-8 col-xs-8 hidden">
                                                <button type="button" className="close" aria-label="Close" onClick={this.ResetContact1}><span aria-hidden="true">&times;</span></button>
                                                <h4 id="contact1SelectedName"></h4>
                                                <p id="contact1SelectedProfession"></p>
                                            </div>
                                            <input type="hidden" ref="contact1" id="contact1" name="contact1" value="" />
                                            <input type="hidden" ref="contactAvatar1" id="contactAvatar1" name="contactAvatar1" value=""  />
                                            <input type="hidden" ref="contactid1" id="contactid1" name="contactid1" value=""  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6">
                                <div id="contact2Panel" className="panel">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-sm-3 text-left">
                                                <h2 className="panel-title text-left">Introduce</h2>
                                            </div>
                                            <div className="col-sm-3 text-left">
                                                <i className="fa fa-arrow-left fa-arrow-right-top"></i>&nbsp;
                                                <i className="fa fa-2x fa-envelope fa-envelope-top"></i>
                                            </div>
                                            <div id="new-contact-label" className="col-sm-6 pull-right">
                                                <a href="#new-contact" role="button" data-toggle="collapse" aria-expanded="false" aria-contols="new-contact" className="btn btn-link">Create a new contact <span className="caret"></span></a>
                                            </div>
                                        </div>
                                        <AddNewContact populateResults={this.populateNewContactResults} />
                                    </div>
                                    <div className="panel-body panel-body-border target2">
                                        <div className="row">
                                            <div className="col-lg-2 col-md-4 col-sm-4 col-xs-2">
                                                <ol>
                                                    <li id="avatar2li" className="placeholder">
                                                        <Avatar2Pic id={this.state.contactid2} username={this.state.contactAvatar2} initials={this.state.contactInitials2} />
                                                    </li>
                                                </ol>
                                            </div>
                                            <div id="selectContact2Edit" className="col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30">
                                                <select id="selectContact2" className="js-example-placeholder-multiple" style={selectResponsive2}></select>
                                            </div>
                                            <div id="selectContact2Selected" className="col-lg-10 col-md-8 col-sm-8 col-xs-8 hidden">
                                                <button type="button" className="close" aria-label="Close" onClick={this.ResetContact2}><span aria-hidden="true">&times;</span></button>
                                                <h4 id="contact2SelectedName"></h4>
                                                <p id="contact2SelectedProfession"></p>
                                            </div>
                                            <input type="hidden" ref="contact2" id="contact2" name="contact2" value="" />
                                            <input type="hidden" ref="contactAvatar2" id="contactAvatar2" name="contactAvatar2" value="" />
                                            <input type="hidden" ref="contactid2" id="contactid2" name="contactid2" value=""  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AdvanceSearchModal reloadPage={this.reloadPage} action={"Introduce"} handleClick={this.loadUser} />
                            <ReasonNote onReasonChange={this.handleReasonChange} onReasonSwitchChange={this.handleReasonSwitchChange} />
                            <SubjectLine p1={this.state.p1} p2={this.state.p2} user={this.state.user} onValueChange={this.handleSubjectChange} />
                            <MessageBody p1={this.state.p1} p2={this.state.p2} user={this.state.user} reason={this.state.reason} reasonSwitch={this.state.reasonSwitch} />
                            <UploadAttachments user={this.state.user} addAttachments={this.addAttachments} removeAttachments={this.removeAttachments} clear={this.state.resetAttachments} />
                            <div className="col-lg-12 col-sm-12">
                                <div className="panel">
                                    <div className="panel-footer text-right">
                                        <button type="button" onClick={this.handlePreview} className="btn btn-defautl btn-space">Preview Introduction</button>
                                        <button type="button" onClick={this.handleSubmit} className="btn btn-primary btn-space">
                                            <i id="send-intro-icon" className="fa fa-envelope "></i>&nbsp;
                                            Send Introduction
                                        </button>
                                        <button type="button" onClick={this.handleClear} className="btn btn-default btn-space">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="errorMessage" id="validationError"></div>
                </div>
                <ConfirmationModal title={'Your message has been sent.'} type={'Introduction'} username1={this.state.confirmationUsername1} username2={this.state.confirmationUsername2} initials1={this.state.confirmationInitials1} initials2={this.state.confirmationInitials2} />
                <PreviewModal p1={this.state.p1} p2={this.state.p2} user={this.state.user} reason={this.state.reason} reasonSwitch={this.state.reasonSwitch} />
                <SendingModal />
            </div>

        );
    },
    ResetContact1: function() {
        $("#selectContact1").select2("val", "");
        $('#avatar1').attr('src', '../images/120px-blank.png');
        $('#selectContact1Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30');
        $('#selectContact1Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 hidden');
        $('#avatar1li').attr('class', 'placeholder');
        $('#contact1SelectedName').text("");
        $('#contact1SelectedProfession').text("");
        this.setState({
            p1: [],
            contactid1: '',
            contact1: '',
            contactAvatar1: '',
            contactInitials1: ''
        });
    },
    ResetContact2: function() {
        $("#selectContact2").select2("val", "");
        $('#avatar2').attr('src', '../images/120px-blank.png');
        $('#selectContact2Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30');
        $('#selectContact2Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 hidden');
        $('#avatar2li').attr('class', 'placeholder');
        $('#contact2SelectedName').text("");
        $('#contact2SelectedProfession').text("");
        this.setState({
            p2: [],
            contactid2: '',
            contact2: '',
            contactAvatar2: '',
            contactInitials2: ''
        });
    },
    ResetIntroForm: function() {
        $("#selectContact1").select2("val", "");
        $('#avatar1').attr('src', '../images/120px-blank.png');
        $('#selectContact1Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30');
        $('#selectContact1Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 hidden');
        $('#avatar1li').attr('class', 'placeholder');
        $('#contact1SelectedName').text("");
        $('#contact1SelectedProfession').text("");

        $("#selectContact2").select2("val", "");
        $('#avatar2').attr('src', '../images/120px-blank.png');
        $('#selectContact2Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30');
        $('#selectContact2Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 hidden');
        $('#avatar2li').attr('class', 'placeholder');
        $('#contact2SelectedName').text("");

        $('#contactid1').val("");
        $('#contactid2').val("");
        $('#contact1').val("");
        $('#contact2').val("");
        $('#contactAvatar1').val("");
        $('#contactAvatar2').val("");
        $('#includeMessage').val("");
        $('#messageSubject').val("");
        $('#reasonNote').val("");
        var html = "<p className=\"body\">I hope you have a chance to connect and I am confident that you will enjoy working together</p><p className=\"body>Please let me know how I can support you both in the future.</p><p className=\"body\">Best Regards,</p>";
        CKEDITOR.instances.includeMessage.setData(html);
        this.setState({
            p1: [],
            p2: [],
            contactid1: '',
            contact1: '',
            contactAvatar1: '',
            contactInitials1: '',
            contactid2: '',
            contact2: '',
            contactAvatar2: '',
            contactInitials2: '',
            subject: '',
            reason: '',
            attachments: [],
            resetAttachments: true
        });
    },
    handleClear: function() {
        var data = this.getAttachmentFormData();
        $("#selectContact1").select2("val", "");
        $('#avatar1').attr('src', '../images/120px-blank.png');
        $('#selectContact1Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30');
        $('#selectContact1Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 hidden');
        $('#avatar1li').attr('class', 'placeholder');
        $('#contact1SelectedName').text("");
        $('#contact1SelectedProfession').text("");

        $("#selectContact2").select2("val", "");
        $('#avatar2').attr('src', '../images/120px-blank.png');
        $('#selectContact2Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30');
        $('#selectContact2Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 hidden');
        $('#avatar2li').attr('class', 'placeholder');
        $('#contact2SelectedName').text("");

        $('#contactid1').val("");
        $('#contactid2').val("");
        $('#contact1').val("");
        $('#contact2').val("");
        $('#contactAvatar1').val("");
        $('#contactAvatar2').val("");
        $('#includeMessage').val("");
        $('#messageSubject').val("");
        $('#reasonNote').val("");
        var html = "<p className=\"body\">I hope you have a chance to connect and I am confident that you will enjoy working together</p><p className=\"body>Please let me know how I can support you both in the future.</p><p className=\"body\">Best Regards,</p>";
        CKEDITOR.instances.includeMessage.setData(html);
        this.setState({
            p1: [],
            p2: [],
            contactid1: '',
            contact1: '',
            contactAvatar1: '',
            contactInitials1: '',
            contactid2: '',
            contact2: '',
            contactAvatar2: '',
            contactInitials2: '',
            subject: '',
            reason: '',
            attachments: [],
            resetAttachments: true
        });
        this.deleteAttachments(data);
    },
    deleteAttachments: function(data) {
        console.log("introductionContent:deleteAttachments");
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
            id:  $('#id').val(),
            attachedAssetIds: this.state.attachments
        };
    },
    handlePreview: function() {
        CKEDITOR.instances.includeMessage.updateElement();
        $('#previewMessage').html(CKEDITOR.instances.includeMessage.getData());
        $("#previewModal").modal('show');
    },
    handleSubmit: function(e) {
        e.preventDefault();
        CKEDITOR.instances.includeMessage.updateElement();
        var contact1 = this.state.contact1;
        var contact2 = this.state.contact2;
        var subject = this.state.subject;
        var message = CKEDITOR.instances.includeMessage.getData();
        console.log(contact1+' '+contact2+' '+subject);
        console.log(message);
        if (contact1 != "" && contact2 != "" && subject != "" && message != "") {
            $("#sendingModal").modal('show');
            var data = this.getFormData();
            data.htmlText = $('#includeMessage').val();
            // create plain text
            var html = CKEDITOR.instances.includeMessage.getSnapshot();
            var dom=document.createElement("DIV");
            dom.innerHTML=html;
            var plain_text=(dom.textContent || dom.innerText);
            data.text = plain_text;

            data.htmlText =  message;
            data.text = data.text;

            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            // Send Message
          $.ajax({
                type: "POST",
                url: "/sendIntroduction",
                data: formData,
                success: function(result){
                    console.log(result);
               //     $('#confirmationMessage').html(CKEDITOR.instances.includeMessage.getData());
                    $("#sendingModal").modal('hide');
                    $("#confirmationModal").modal('show');
                    this.ResetIntroForm();
                    document.getElementById("formValidationError").innerHTML = "";
                }.bind(this),
                error: function(request, status, error) {
                    $('#validationError').slideDown(500);
                    document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\">Something went wrong. Try again!</label></div>";
                    setTimeout(function() {  $("#validationError").fadeOut(); }, 5000);
                },
                dataType: "json",
                contentType : "application/json"
            });

        } else {
            document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Please select both contacts and include a subject and a message!</label></div>";
            $('#validationError').show();
            setTimeout(function() {  $("#validationError").fadeOut(); }, 5000);
            return null;
        }
    },

    getFormData: function () {
        return {
            subjectUserId: this.state.contactid1,
            fromUserId: $('#id').val(),
            toUserId: this.state.contactid2,
            subject: this.state.subject,
            note: this.state.reason,
            noteSwitch: this.state.reasonSwitch,
            contact1: this.state.contact1,
            contact2: this.state.contact2,
            avatar1: this.state.contactAvatar1,
            avatar2: this.state.contactAvatar2,
            htmlText: '',
            text: '',
            attachedAssetIds: this.state.attachments
        };
    }

});

var Avatar1Pic = React.createClass({
    render: function() {
        var image;
        if (this.props.username=='') {
            image = <img id="avatar1"  src="../images/120px-blank.png" className="contact-img img-circle" />
        }else if (this.props.username == 'default' && this.props.initials != '') {
            image = <div id="avatar1" className="avatar-circle"><img className="hidden" id={this.props.id} /><span className="initials">{this.props.initials}</span></div>;
        } else {
            image = <img id="avatar1" src={'/api/remoteFiles/view/' + this.props.username} className="contact-img img-circle" />;
        }
        return (
            <span>{image}</span>
        );
    }
});

var Avatar2Pic = React.createClass({
    render: function() {
        var image;
        if (this.props.username=='') {
            image = <img id="avatar2"  src="../images/120px-blank.png" className="contact-img img-circle" />
        }else if (this.props.username == 'default' && this.props.initials != '') {
            image = <div id="avatar2" className="avatar-circle"><img className="hidden" id={this.props.id} /><span className="initials">{this.props.initials}</span></div>;
        } else {
            image = <img id="avatar2" src={'/api/remoteFiles/view/' + this.props.username} className="contact-img img-circle" />;
        }
        return (
            <span>{image}</span>
        );
    }
});

