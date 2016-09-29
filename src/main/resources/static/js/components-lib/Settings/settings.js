'use strict';

var SettingsForm = React.createClass({
    displayName: 'SettingsForm',
    getInitialState: function getInitialState() {
        return {
            user: [],
            username: '',
            avatar: '',
            source: '',
            update: true
        };
    },
    componentDidMount: function componentDidMount() {
        var id = $('#id').val();
        var source = '/api/users/' + id;
        $.get(source, (function (result) {
            if (!$.isEmptyObject(result)) {
                console.log('SettingsForm:componentDidMount:user:');
                console.log(result);
                this.setState({
                    user: result
                });
            }
        }).bind(this));

        $("[name='private-check']").bootstrapSwitch();
        $('input[name="private-check"]').on('switchChange.bootstrapSwitch', (function (event, state) {
            var data = this.getFormData3();
            data.id = id;
            data.visible = state;
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: '/saveUser',
                async: true,
                data: formData,
                success: (function (result) {
                    console.log("Saved successfully!");
                    console.log(result.user);
                    if (result.user.visible) {
                        bootbox.alert("Your profile is now Public, you will appear in all Public searches!");
                    } else {
                        bootbox.alert("Your profile is now Private, you will not appear in any Public searches!");
                    }
                }).bind(this),
                error: function error(request, status, _error) {
                    console.log("Error saving data: " + _error.toString());
                },
                dataType: "json",
                contentType: "application/json"
            });
        }).bind(this));

        var tab = this.getUrlParameter('t');
        if (tab == 'linkedin' || tab == 'instagram') {
            $('.nav-pills a[href="#online"]').tab('show');
        }
        var type = window.location.hash.substr(1);
        console.log(type);
        if (type == "personal") {
            $('.nav-pills a[href="#personal"]').tab('show');
        }

        var $uploadCrop = $('#upload-croppie').croppie({
            enableExif: true,
            viewport: {
                width: 250,
                height: 250,
                type: 'square'
            },
            boundary: {
                width: 400,
                height: 400
            }
        });

        function readFile(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $uploadCrop.croppie('bind', {
                        url: e.target.result
                    });
                    $('.upload-croppie').addClass('ready');
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
        $('#chooser-croppie').on('change', function () {
            readFile(this);
        });
        $('.upload-result').on('click', (function (ev) {
            $uploadCrop.croppie('result', {
                type: 'canvas',
                size: 'original'
            }).then((function (resp) {
                // $('#imagebase64').val(resp);
                $('#fileinput-avatar').attr("src", resp);
                var image = resp;
                var base64ImageContent = image.replace(/^data:image\/(png|jpg);base64,/, "");
                var blob = base64ToBlob(base64ImageContent, 'image/jpeg');
                console.log(blob);
                var formData = new FormData($("#upload-file-form")[0]);
                var filename = "avatar-" + $("#id").val();
                formData.append('avatar', blob, filename);
                console.log(formData);
                $.ajax({
                    url: "/uploadAvatarFromCroppie",
                    type: "POST",
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: (function (result) {
                        // Handle upload success
                        this.setState({
                            update: false,
                            avatar: result.avatar
                        });
                        document.getElementById("save-alert").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> File successfully uploaded.</label></div>";
                        $("#save-alert").alert();
                        $("#save-alert").fadeTo(4000, 500).slideUp(500, function () {
                            $("#save-alert").alert('close');
                            document.getElementById("save-alert").innerHTML = "";
                        });
                    }).bind(this),
                    error: function error() {
                        // Handle upload error
                        document.getElementById("save-alert").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> File not uploaded. An error occurred!</label></div>";
                        $("#save-alert").alert();
                        $("#save-alert").fadeTo(4000, 500).slideUp(500, function () {
                            $("#save-alert").alert('close');
                            document.getElementById("save-alert").innerHTML = "";
                        });
                    }
                });
            }).bind(this));
        }).bind(this));

        function base64ToBlob(base64, mime) {
            mime = mime || '';
            var sliceSize = 1024;
            var byteChars = window.atob(base64);
            var byteArrays = [];

            for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
                var slice = byteChars.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            return new Blob(byteArrays, { type: mime });
        }
    },
    getUrlParameter: function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.state.update) {
            console.log("SettingsForm:componentDidUpdate:update true");
            //toggle `popup` / `inline` mode
            var id = $('#id');
            $.fn.editable.defaults.mode = 'inline';
            $.fn.editable.defaults.url = '/saveUser';
            $.fn.editable.defaults.pk = id.val();
            $.fn.editable.defaults.ajaxOptions = {
                contentType: 'application/json',
                type: "post",
                dataType: 'json'
            };
            $.fn.editable.defaults.send = 'always';
            $.fn.editable.defaults.pk = id.val();

            console.log("SettingsForm:componentDidUpdate:id: " + id.val());
            console.log(this.state.user);

            //make username editable
            $('#firstName').editable({
                type: 'text',
                pk: id.val(),
                url: '/saveUser',
                send: 'always',
                ajaxOptions: {
                    contentType: 'application/json',
                    type: 'post',
                    dataType: 'json' //assuming json response
                },
                params: function params(_params) {
                    var data = {
                        id: id.val(),
                        firstName: _params.value
                    };
                    return JSON.stringify(data);
                },
                success: function success(data) {
                    console.log("Success data below:");
                    console.log(data);
                },
                error: function error(errors) {
                    console.log(errors.responseText);
                }
            });
            $('#lastName').editable({
                type: 'text',
                pk: id.val(),
                url: '/saveUser',
                send: 'always',
                ajaxOptions: {
                    contentType: 'application/json',
                    type: 'post',
                    dataType: 'json' //assuming json response
                },
                params: function params(_params2) {
                    var data = {
                        id: id.val(),
                        lastName: _params2.value
                    };
                    return JSON.stringify(data);
                },
                success: function success(data) {
                    console.log("Success data below:");
                    console.log(data);
                },
                error: function error(errors) {
                    console.log(errors.responseText);
                }
            });
            CKEDITOR.replace('description');
            CKEDITOR.instances.description.setData(this.state.user.description);

            $('#leadParagraph').editable({
                type: 'textarea',
                pk: id.val(),
                url: '/saveUser',
                send: 'always',
                ajaxOptions: {
                    contentType: 'application/json',
                    type: 'post',
                    dataType: 'json' //assuming json response
                },
                params: function params(_params3) {
                    var data = {
                        id: id.val(),
                        leadParagraph: _params3.value
                    };
                    return JSON.stringify(data);
                },
                success: function success(data) {
                    console.log("Success data below:");
                    console.log(data);
                },
                error: function error(errors) {
                    console.log(errors.responseText);
                },
                rows: 10
            });

            $('#email').editable({
                type: 'text',
                pk: id.val(),
                url: '/saveUser',
                send: 'always',
                ajaxOptions: {
                    contentType: 'application/json',
                    type: 'post',
                    dataType: 'json' //assuming json response
                },
                validate: function validate(value) {
                    var v = valib.String.isEmailLike(value);
                    if (v == false) return 'Please enter valid email';
                },
                params: function params(_params4) {
                    var data = {
                        id: id.val(),
                        email: _params4.value
                    };
                    return JSON.stringify(data);
                },
                success: function success(data) {
                    console.log("Success data below:");
                    console.log(data);
                    window.location.href = '/logout';
                },
                error: function error(errors) {
                    console.log(errors.responseText);
                }
            });

            $('#mobilePhone').editable({
                type: 'text',
                pk: id.val(),
                url: '/saveUser',
                send: 'always',
                ajaxOptions: {
                    contentType: 'application/json',
                    type: 'post',
                    dataType: 'json' //assuming json response
                },
                validate: function validate(value) {
                    var validPhoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
                    if (!validPhoneRegex.test(value)) {
                        return 'Please insert a a valid phone number';
                    }
                },
                params: function params(_params5) {
                    var data = {
                        id: id.val(),
                        mobilePhone: _params5.value
                    };
                    return JSON.stringify(data);
                },
                success: function success(data) {
                    console.log("Success data below:");
                    console.log(data);
                },
                error: function error(errors) {
                    console.log(errors.responseText);
                }
            });

            $('#faxNumber').editable({
                type: 'text',
                pk: id.val(),
                url: '/saveUser',
                send: 'always',
                ajaxOptions: {
                    contentType: 'application/json',
                    type: 'post',
                    dataType: 'json' //assuming json response
                },
                validate: function validate(value) {
                    var validPhoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
                    if (!validPhoneRegex.test(value)) {
                        return 'Please insert a a valid phone number';
                    }
                },
                params: function params(_params6) {
                    var data = {
                        id: id.val(),
                        faxNumber: _params6.value
                    };
                    return JSON.stringify(data);
                },
                success: function success(data) {
                    console.log("Success data below:");
                    console.log(data);
                },
                error: function error(errors) {
                    console.log(errors.responseText);
                }
            });

            $('#profileName').editable({
                type: 'text',
                pk: id.val(),
                url: '/saveUser',
                send: 'always',
                ajaxOptions: {
                    contentType: 'application/json',
                    type: 'post',
                    dataType: 'json' //assuming json response
                },
                params: function params(_params7) {
                    var data = {
                        id: id.val(),
                        profileName: _params7.value
                    };
                    return JSON.stringify(data);
                },
                success: function success(data) {
                    console.log("Success data below:");
                    console.log(data);
                    if (data.error != null) {
                        //  $('#alertSection').html("<div class=\"alert alert-danger\" role=\"alert\"><strong>Oh snap!</strong> "+data.error+"</div>");
                        return data.error;
                    }
                },
                error: function error(errors) {
                    console.log(errors.responseText);
                }
            });

            $('#license').editable({
                type: 'text',
                pk: id.val(),
                url: '/saveUser',
                send: 'always',
                ajaxOptions: {
                    contentType: 'application/json',
                    type: 'post',
                    dataType: 'json' //assuming json response
                },
                params: function params(_params8) {
                    var data = {
                        id: id.val(),
                        rtLicense: _params8.value
                    };
                    return JSON.stringify(data);
                },
                success: function success(data) {
                    console.log("Success data below:");
                    console.log(data);
                },
                error: function error(errors) {
                    console.log(errors.responseText);
                }
            });
            $('#licenseExpiration').editable({
                format: 'YYYY-MM-DD',
                viewformat: 'MM-DD-YYYY',
                template: 'MMMM / D / YYYY',
                combodate: {
                    minYear: 1970,
                    maxYear: 2050,
                    minuteStep: 1
                },
                type: 'date',
                pk: id.val(),
                url: '/saveUser',
                send: 'always',
                ajaxOptions: {
                    contentType: 'application/json',
                    type: 'post',
                    dataType: 'json' //assuming json response
                },
                params: function params(_params9) {
                    var data = {
                        id: id.val(),
                        rtLicenseExpiration: _params9.value
                    };
                    return JSON.stringify(data);
                },
                success: function success(data) {
                    console.log("Success data below:");
                    console.log(data);
                },
                error: function error(errors) {
                    console.log(errors.responseText);
                }
            });

            this.getProfessionsList().done(function (result) {
                console.log("getProfessionsList:done");
                console.log(result);
                $('#profession').editable({
                    value: 2,
                    source: $.map(result._embedded.professionDTOList, function (obj) {
                        obj.value = obj.title;
                        obj.text = obj.title;
                        return obj;
                    }),
                    type: 'text',
                    pk: id.val(),
                    url: '/saveUser',
                    send: 'always',
                    ajaxOptions: {
                        contentType: 'application/json',
                        type: 'post',
                        dataType: 'json' //assuming json response
                    },
                    params: function params(_params10) {
                        var data = {
                            id: id.val(),
                            profession: _params10.value
                        };
                        return JSON.stringify(data);
                    },
                    success: function success(data) {
                        console.log("Success data below:");
                        console.log(data);
                    },
                    error: function error(errors) {
                        console.log(errors.responseText);
                    }
                });
            });
            this.setState({
                update: false
            });
        } else {
            return false;
        }
    },
    getProfessionsList: function getProfessionsList() {
        var url = "/getProfessionsList";
        return $.ajax({
            type: 'post',
            async: true,
            url: url,
            dataType: "json"
        });
    },
    handleChangePassword: function handleChangePassword(e) {
        e.preventDefault();
        var id = $('#id').val();
        var source = '/redirectToForgotPassword';
        var data = this.getFormData();
        data.id = id;
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: source,
            async: true,
            data: formData,
            success: (function (result) {
                console.log("Saved successfully!" + result);
                window.location.href = result.redirectUrl;
            }).bind(this),
            error: function error(request, status, _error2) {
                console.log("Error redirect to change password: " + _error2.toString());
                document.getElementById("password-save-alert").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> Error saving password.</label></div>";
                $("#password-save-alert").alert();
                $("#password-save-alert").fadeTo(4000, 500).slideUp(500, function () {
                    $("#password-save-alert").alert('close');
                    document.getElementById("password-save-alert").innerHTML = "";
                });
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    handleSaveDescription: function handleSaveDescription(e) {
        $('#description-save-icon').switchClass("show", "hidden");
        $('#description-saving-icon').switchClass("hidden", "show");
        e.preventDefault();
        CKEDITOR.instances.description.updateElement();
        var id = $('#id').val();
        var source = '/saveUser';
        var data = this.getFormData();
        data.id = id;
        var text = CKEDITOR.instances.description.getData();
        data.description = text;
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $.ajax({
            type: "POST",
            url: source,
            async: true,
            data: formData,
            success: (function (result) {
                console.log("Saved successfully!" + result);
                //  this.avatarChange(result.avatar);
                $('#description-saving-icon').switchClass("show", "hidden");
                $('#description-save-icon').switchClass("hidden", "show");
                document.getElementById("save-alert").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> Saved Successfully.</label></div>";
                $("#save-alert").alert();
                $("#save-alert").fadeTo(4000, 500).slideUp(500, function () {
                    $("#save-alert").alert('close');
                    document.getElementById("save-alert").innerHTML = "";
                });
            }).bind(this),
            error: function error(request, status, _error3) {
                console.log("Error saving data: " + _error3.toString());
                $('#description-saving-icon').switchClass("show", "hidden");
                $('#description-save-icon').switchClass("hidden", "show");
                document.getElementById("save-alert").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> An error occurred!</label></div>";
                $("#save-alert").alert();
                $("#save-alert").fadeTo(4000, 500).slideUp(500, function () {
                    $("#save-alert").alert('close');
                    document.getElementById("save-alert").innerHTML = "";
                });
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    avatarChange: function avatarChange(avatar) {
        this.setState({
            avatar: avatar
        });
    },
    getFormData: function getFormData() {
        return {
            id: 0,
            description: ''
        };
    },
    getFormData2: function getFormData2() {
        return {
            id: 0,
            password: ''
        };
    },
    getFormData3: function getFormData3() {
        return {
            id: 0,
            visible: false
        };
    },
    render: function render() {
        var avatarPhoto = "/api/remoteFiles/view/default";
        if (this.state.user.avatar != null && this.state.user.avatar != 'default' && this.state.user.avatar != '') {
            avatarPhoto = "/api/remoteFiles/view/" + this.state.user.avatar;
        }
        var privateSwitch = 'checked';
        return React.createElement(
            'div',
            null,
            React.createElement(HeaderResponsiveIn, { user: this.state.user, avatar: this.state.avatar }),
            React.createElement(Banner, null),
            React.createElement(
                'div',
                { id: 'settings-container', className: 'container' },
                React.createElement(
                    'div',
                    { id: 'main' },
                    React.createElement(
                        'ol',
                        { className: 'breadcrumb' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'h4',
                                { className: 'margin-top-10' },
                                'Your Profile Settings  ',
                                React.createElement(
                                    'a',
                                    { className: 'video', title: 'Profile Settings - Overview', href: 'https://youtu.be/kW7OnPE-vIg' },
                                    React.createElement('img', { className: 'video-icon', src: '/images/youTube.png', alt: 'Latch channel' })
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-lg-12' },
                            React.createElement(
                                'div',
                                { className: 'panel' },
                                React.createElement(
                                    'div',
                                    { id: 'settings-main-panel', className: 'panel-body' },
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-3' },
                                            React.createElement(
                                                'ul',
                                                { id: 'myTab', className: 'nav nav-pills nav-stacked' },
                                                React.createElement(
                                                    'li',
                                                    { className: 'active' },
                                                    React.createElement(
                                                        'a',
                                                        { href: '#home3', 'data-toggle': 'tab' },
                                                        'Your Account'
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    { className: '' },
                                                    React.createElement(
                                                        'a',
                                                        { href: '#personal', 'data-toggle': 'tab' },
                                                        'Personal'
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    { className: '' },
                                                    React.createElement(
                                                        'a',
                                                        { href: '#professional', 'data-toggle': 'tab' },
                                                        'Professional'
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    { className: '' },
                                                    React.createElement(
                                                        'a',
                                                        { href: '#online', 'data-toggle': 'tab' },
                                                        'Online / Social'
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    { className: '' },
                                                    React.createElement(
                                                        'a',
                                                        { href: '#socialinviter', 'data-toggle': 'tab' },
                                                        'Invite Your Contacts'
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-9' },
                                            React.createElement(
                                                'div',
                                                { id: 'myTabContent', className: 'tab-content' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'tab-pane fade active in', id: 'home3' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'panel panel-default' },
                                                        React.createElement(
                                                            'header',
                                                            { className: 'panel-heading' },
                                                            React.createElement(
                                                                'div',
                                                                { className: 'row' },
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'col-md-8 col-md-offset-2 text-center' },
                                                                    React.createElement(
                                                                        'strong',
                                                                        null,
                                                                        'Your Account'
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'col-md-2' },
                                                                    React.createElement(
                                                                        'a',
                                                                        { className: 'video', title: 'Profile Settings - Primary', href: 'https://youtu.be/p7nNiSBdaNU' },
                                                                        React.createElement('img', { className: 'video-icon pull-right', src: '/images/youTube.png', alt: 'Latch channel' })
                                                                    )
                                                                )
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            { className: 'panel-body' },
                                                            React.createElement(
                                                                'div',
                                                                { id: 'alertSection' },
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'alert alert-info', role: 'alert' },
                                                                    React.createElement(
                                                                        'strong',
                                                                        null,
                                                                        'Heads up!'
                                                                    ),
                                                                    ' Click fields below to edit'
                                                                )
                                                            ),
                                                            React.createElement('hr', null),
                                                            React.createElement(
                                                                'div',
                                                                { className: 'form-horizontal' },
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'visible', className: 'col-sm-3 control-label' },
                                                                        'Public Profile'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement('input', { type: 'checkbox', name: 'private-check', ref: 'private-check', checked: privateSwitch, 'data-size': 'small' })
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'firstName', className: 'col-sm-3 control-label' },
                                                                        'First Name'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement(
                                                                            'a',
                                                                            { href: '#', id: 'firstName', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Enter first name' },
                                                                            this.state.user.firstName
                                                                        )
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'lastName', className: 'col-sm-3 control-label' },
                                                                        'Last Name'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement(
                                                                            'a',
                                                                            { href: '#', id: 'lastName', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Enter last name' },
                                                                            this.state.user.lastName
                                                                        )
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'membershipType', className: 'col-sm-3 control-label' },
                                                                        'Membership Type'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement(
                                                                            'p',
                                                                            { className: 'form-control-static' },
                                                                            'Premium member  ',
                                                                            React.createElement('span', { className: 'glyphicon glyphicon-star', 'aria-hidden': 'true' })
                                                                        )
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'emailAddress', className: 'col-sm-3 control-label' },
                                                                        'Email Address'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement(
                                                                            'a',
                                                                            { href: '#', id: 'email', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Enter email' },
                                                                            this.state.user.email
                                                                        ),
                                                                        React.createElement(
                                                                            'span',
                                                                            { className: 'help-block' },
                                                                            'Warning! Your unique email is your username, if you would like to change it you will be logged out and require to login with your new username (email).'
                                                                        )
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'mobilePhone', className: 'col-sm-3 control-label' },
                                                                        'Mobile Phone'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement(
                                                                            'a',
                                                                            { href: '#', id: 'mobilePhone', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Enter mobile' },
                                                                            this.state.user.mobilePhone
                                                                        )
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'faxNumber', className: 'col-sm-3 control-label' },
                                                                        'Fax Number'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement(
                                                                            'a',
                                                                            { href: '#', id: 'faxNumber', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Enter fax' },
                                                                            this.state.user.faxNumber
                                                                        )
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'profileName', className: 'col-sm-3 control-label' },
                                                                        'Personal Page Name'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement(
                                                                            'a',
                                                                            { href: '#', id: 'profileName', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Enter personal page name' },
                                                                            this.state.user.profileName
                                                                        ),
                                                                        React.createElement(
                                                                            'span',
                                                                            { className: 'help-block' },
                                                                            'Profile URL: www.thereferralportal.com/public/',
                                                                            React.createElement(
                                                                                'span',
                                                                                { id: 'profileNameHelper' },
                                                                                this.state.user.profileName
                                                                            )
                                                                        )
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'password', className: 'col-sm-3 control-label' },
                                                                        'Password'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement(
                                                                            'button',
                                                                            { type: 'button', className: 'btn btn-primary', onClick: this.handleChangePassword },
                                                                            'Change Password'
                                                                        ),
                                                                        React.createElement(
                                                                            'span',
                                                                            { className: 'help-block' },
                                                                            'Warning! This button will redirect you to the Reset Password screen, you will need to login again with your new password.'
                                                                        )
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-12' },
                                                                        React.createElement('div', { id: 'password-save-alert' })
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'leadPagragraph', className: 'col-sm-3 control-label' },
                                                                        'Lead Paragraph'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement(
                                                                            'a',
                                                                            { href: '#', id: 'leadParagraph', ref: 'leadParagraph', 'data-type': 'textarea', className: 'editable editable-click', 'data-title': 'Enter Lead Paragraph' },
                                                                            this.state.user.leadParagraph
                                                                        )
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'description', className: 'col-sm-3 control-label' },
                                                                        'Professional Detail'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement('textarea', { name: 'description', ref: 'description', id: 'description', rows: '10', cols: '80' })
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-offset-3 col-sm-4' },
                                                                        React.createElement(
                                                                            'button',
                                                                            { type: 'button', onClick: this.handleSaveDescription, className: 'btn btn-primary' },
                                                                            React.createElement('i', { id: 'description-saving-icon', className: 'fa fa-cog fa-spin fa-2x hidden' }),
                                                                            React.createElement(
                                                                                'span',
                                                                                { id: 'description-save-icon', className: 'show' },
                                                                                'Save'
                                                                            )
                                                                        )
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { className: 'form-group' },
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-12' },
                                                                        React.createElement('div', { id: 'save-alert' })
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { id: 'profilePhoto', className: 'form-group' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'profilePhoto', className: 'col-sm-3 control-label' },
                                                                        'Profile Photo'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-3' },
                                                                        React.createElement(
                                                                            'div',
                                                                            { className: 'kv-avatar center-block' },
                                                                            React.createElement('img', { id: 'fileinput-avatar', className: 'img-circle img-user', src: avatarPhoto })
                                                                        )
                                                                    )
                                                                ),
                                                                React.createElement(
                                                                    'div',
                                                                    { id: 'profile-photo-croppie', className: 'form-group upload-croppie' },
                                                                    React.createElement(
                                                                        'label',
                                                                        { 'for': 'profilePhotoCroppie', className: 'col-sm-3 control-label' },
                                                                        'Profile Photo Upload'
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9' },
                                                                        React.createElement(
                                                                            'div',
                                                                            { className: 'profile' },
                                                                            React.createElement('div', { id: 'upload-croppie', className: 'croppie-container' })
                                                                        )
                                                                    ),
                                                                    React.createElement(
                                                                        'div',
                                                                        { className: 'col-sm-9 col-sm-offset-3' },
                                                                        React.createElement(
                                                                            'div',
                                                                            { className: 'fileinput fileinput-new', 'data-provides': 'fileinput' },
                                                                            React.createElement(
                                                                                'form',
                                                                                { id: 'upload-file-form' },
                                                                                React.createElement(
                                                                                    'span',
                                                                                    { className: 'btn btn-default btn-file' },
                                                                                    React.createElement(
                                                                                        'span',
                                                                                        null,
                                                                                        'Choose file'
                                                                                    ),
                                                                                    React.createElement('input', { type: 'file', id: 'chooser-croppie' })
                                                                                ),
                                                                                ' ',
                                                                                React.createElement(
                                                                                    'button',
                                                                                    { id: 'send-form', type: 'button', className: 'btn btn-primary upload-result' },
                                                                                    'Upload'
                                                                                ),
                                                                                React.createElement('input', { type: 'hidden', id: 'imagebase64', name: 'imagebase64' }),
                                                                                React.createElement('input', { type: 'hidden', id: 'userId-croppie', name: 'id', value: this.state.user.id })
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { className: 'tab-pane fade', id: 'personal' },
                                                    React.createElement(AddressForm, { user: this.state.user })
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { className: 'tab-pane fade', id: 'professional' },
                                                    React.createElement(ProfessionalForm, { user: this.state.user })
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { className: 'tab-pane fade', id: 'online' },
                                                    React.createElement(SocialNetworks, { user: this.state.user })
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { className: 'tab-pane fade', id: 'socialinviter' },
                                                    React.createElement(SocialInviter, { user: this.state.user })
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

var globalVar = {
    callback: function callback() {}
};

ReactDOM.render(React.createElement(SettingsForm, null), document.getElementById('content'));