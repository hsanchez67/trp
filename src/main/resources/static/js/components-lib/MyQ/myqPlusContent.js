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
                            'Saving to My Q.'
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

var ReasonNote = React.createClass({
    displayName: 'ReasonNote',

    onReasonChange: function onReasonChange() {
        var note = this.refs.reasonNote.value;
        this.props.onReasonChange(note);
    },
    render: function render() {
        return React.createElement(
            'div',
            { id: 'subject-line', className: 'col-lg-12 col-sm-12' },
            React.createElement(
                'div',
                { className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { className: 'panel-heading' },
                    React.createElement(
                        'header',
                        { className: 'panel-title text-left' },
                        'Reason for Referral / Introduction '
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
                                { className: 'col-lg-12 text-left' },
                                React.createElement('input', { type: 'text', id: 'reasonNote', name: 'reasonNote', ref: 'reasonNote', onBlur: this.onReasonChange, className: 'form-control' }),
                                React.createElement(
                                    'span',
                                    { className: 'help-block' },
                                    'e.g. 1234 Main Street project landscape designer referall'
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

var MyQPlusContent = React.createClass({
    displayName: 'MyQPlusContent',
    getInitialState: function getInitialState() {
        return {
            user: this.props.user,
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
            reason: '',
            profession: '',
            transactionType: 'Referral',
            confirmationProfession: false
        };
    },
    handleReasonChange: function handleReasonChange(text) {
        this.setState({
            reason: text
        });
    },
    componentWillMount: function componentWillMount() {
        console.log("MyQPlusContent:componentWillMount:");
        this.prepareComponentState(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("MyQPlusContent:componentWillReceiveProps:");
        this.prepareComponentState(nextProps);
    },
    prepareComponentState: function prepareComponentState(props) {
        console.log("MyQPlusContent:prepareComponentState:");
        console.log(props);
        if (!$.isEmptyObject(props.user) && $.isEmptyObject(this.state.user)) {
            this.setState({
                user: props.user
            });
        }
    },
    getInitials: function getInitials(name) {
        var initials = name.match(/\b\w/g);
        initials = (initials.shift() + initials.pop()).toUpperCase();
        return initials;
    },
    componentDidMount: function componentDidMount() {
        var self = this;
        $(document).on('change', 'input:radio[id^="introduceTypeButton"]', function (event) {
            if ($(this).prop('checked') == true) {
                self.setState({
                    transactionType: "Introduction"
                });
            }
            console.log(self.state.transactionType);
            $("#introduce-left").removeClass("hidden");
            $("#refer-left").addClass("hidden");
            $("#introduce-right").removeClass("hidden");
            $("#refer-right").addClass("hidden");
        });

        $(document).on('change', 'input:radio[id^="referTypeButton"]', function (event) {
            if ($(this).prop('checked') == true) {
                self.setState({
                    transactionType: "Referral"
                });
            }
            console.log(self.state.transactionType);
            $("#introduce-left").addClass("hidden");
            $("#refer-left").removeClass("hidden");
            $("#introduce-right").addClass("hidden");
            $("#refer-right").removeClass("hidden");
        });

        // introScript.js
        /* drag and drop */
        $(".source li").draggable({
            addClasses: false,
            appendTo: "body",
            helper: "clone"
        });

        $(".target1").droppable({
            addClasses: false,
            /*activeClass: "listActive", */
            accept: ":not(.ui-sortable-helper)",
            activate: function activate() {
                //    $(this).find(".placeholder").attr("class", "placeholderOn");
                $(this).attr("class", "panel-body panel-body-border-on target1");
            },
            deactivate: function deactivate() {
                //      $(this).find(".placeholderOn").attr("class", "placeholder");
                $(this).attr("class", "panel-body panel-body-border target1");
            },
            drop: (function (event, ui) {
                var avatarSrc = ui.draggable.find("img").attr("src");
                var avatar = "avatar1";
                console.log("avatar: " + avatar);
                console.log("avatarSrc: " + avatarSrc);
                var userId = ui.draggable.find("img").attr("id");
                this.updateValues(avatar, avatarSrc, userId);
                $("#searchProfessionSelect2").select2("val", "");
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

        $(".target1").on("drop", function (event, ui) {
            $(this).find(".placeholder").attr("class", "placeholderDropped");
            $(this).attr("class", "panel-body panel-body-border");
            var avatarSrc = ui.draggable.find("img").attr("src");
            $(this).find("img").attr("src", avatarSrc);
        });

        $(".target2").droppable({
            addClasses: false,
            /*activeClass: "listActive", */
            accept: ":not(.ui-sortable-helper)",
            activate: function activate() {
                //    $(this).find(".placeholder").attr("class", "placeholderOn");
                $(this).attr("class", "panel-body panel-body-border-on target2");
            },
            deactivate: function deactivate() {
                //      $(this).find(".placeholderOn").attr("class", "placeholder");
                $(this).attr("class", "panel-body panel-body-border target2");
            },
            drop: (function (event, ui) {
                var avatarSrc = ui.draggable.find("img").attr("src");
                var avatar = "avatar2";
                var userId = ui.draggable.find("img").attr("id");
                this.updateValues(avatar, avatarSrc, userId);
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

        $(".target2").on("drop", function (event, ui) {
            $(this).find(".placeholder").attr("class", "placeholderDropped");
            $(this).attr("class", "panel-body panel-body-border");
            var avatarSrc = ui.draggable.find("img").attr("src");
            $(this).find("img").attr("src", avatarSrc);
        });

        /* drag and drop end */

        $(".js-example-placeholder-multiple").select2({
            placeholder: "Enter a name or Email address"
        });

        function formatAjaxResponse(data) {
            if (data.loading) return data.text;
            var score = "";
            if (data.score != null) score = data.score;
            var name = data.firstName + " " + data.lastName;
            var initials = name.match(/\b\w/g);
            initials = (initials.shift() + initials.pop()).toUpperCase();
            var markup = '';
            if (data.avatar == 'default' && initials != '') {
                markup = '<div class="clearfix">' + '<div class="col-sm-2">' + '<div id="' + data.id + '" class="avatar-circle-small"><img class="hidden" id="' + data.id + '"/><span class="initials-small">' + initials + '</span></div>' + '</div>' + '<div class="col-sm-10">' + '<div class="clearfix">' + '<div>' + data.firstName + ' ' + data.lastName + '</div>' + '<div><i class="fa fa-star"></i> ' + score + '</div>' + '</div>';
            } else {
                markup = '<div class="clearfix">' + '<div class="col-sm-2">' + '<img id="' + data.id + '" class="img-circle" src="/api/remoteFiles/view/' + data.avatar + '" style="max-width: 40px; border-radius: 50%;" />' + '</div>' + '<div class="col-sm-10">' + '<div class="clearfix">' + '<div>' + data.firstName + ' ' + data.lastName + '</div>' + '<div><i class="fa fa-star"></i> ' + score + '</div>' + '</div>';
            }
            /*if (repo.description) {
             markup += '<div>' + repo.description + '</div>';
             }*/

            markup += '</div></div>';

            console.log(markup);
            return markup;
        }

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
                contentType: "application/json",
                delay: 250,
                data: function data(params) {
                    return {
                        search: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function processResults(data) {
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
            templateResult: formatAjaxResponse,
            templateSelection: this.formatAjaxSelection,
            escapeMarkup: function escapeMarkup(t) {
                return t;
            }
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
                contentType: "application/json",
                delay: 250,
                data: function data(params) {
                    return {
                        search: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function processResults(data) {
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
            templateResult: formatAjaxResponse,
            templateSelection: this.formatAjaxSelection2,
            escapeMarkup: function escapeMarkup(t) {
                return t;
            }
        });

        $(function () {
            $("#searchclear").click(function () {
                $("#selectContact1").select2('val', 'All');
                $("#selectContact2").select2('val', 'All');
            });
        });

        // Select Profession
        $("#searchProfessionSelect2").select2({
            minimumInputLength: 3,
            ajax: {
                url: "/searchProfession",
                method: 'POST',
                dataType: 'json',
                contentType: "application/json",
                delay: 250,
                data: function data(params) {
                    return {
                        search: params.term // search term
                    };
                },
                processResults: function processResults(data, params) {
                    if (!$.isEmptyObject(data) && data != undefined) {
                        var select2Data = $.map(data._embedded.professionDTOList, function (obj) {
                            //    obj.id = obj.text;
                            obj.text = obj.title;
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
            escapeMarkup: function escapeMarkup(t) {
                return t;
            }, // let our custom formatter work
            templateResult: formatAjaxResponse2, // omitted for brevity, see the source of this page
            templateSelection: formatAjaxSelection2 // omitted for brevity, see the source of this page
        });

        $("#searchProfessionSelect2").on("select2-selecting", function (e) {
            console.log("select2-selecting" + e);
            this.ResetContact1();
        });

        function formatAjaxResponse2(data) {
            var markup = '<div class="clearfix">' + '<div class="col-sm-12 cursor text-left">' + '<div id="' + data.text + '">' + data.title + '</div>' + '</div>';
            return markup;
        }
        function formatAjaxSelection2(data) {
            $("#searchProfession").val(data.title);
            return data.title || data.text;
        }

        $('.advanceSearch').tooltip();
    },
    formatAjaxSelection: function formatAjaxSelection(data) {
        var avatar1 = $('#avatar1');
        /*  avatar1.attr('src', '/api/remoteFiles/view/'+data.avatar);
          avatar1.attr('class', 'contact-img img-circle');*/
        avatar1.parents('li').attr('class', 'placeholderDropped');
        this.refs.contactid1.value = data.id;
        this.refs.contact1.value = data.email;
        this.refs.contactAvatar1.value = data.avatar;
        // $("#confirmationAvatar1").attr('src', '/api/remoteFiles/view/'+data.avatar);
        $('#contact1SelectedName').text(data.firstName + ' ' + data.lastName);
        $('#contact1SelectedProfession').text(data.profession);
        $('#selectContact1Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
        $('#selectContact1Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
        $("#searchProfessionSelect2").select2("val", "");
        var initials = this.getInitials(data.firstName + " " + data.lastName);
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
    formatAjaxSelection2: function formatAjaxSelection2(data) {
        var avatar2 = $('#avatar2');
        /*   avatar2.attr('src', '/api/remoteFiles/view/'+data.avatar);
           avatar2.attr('class', 'contact-img img-circle');*/
        avatar2.parents('li').attr('class', 'placeholderDropped');
        this.refs.contactid2.value = data.id;
        this.refs.contact2.value = data.email;
        this.refs.contactAvatar2.value = data.avatar;
        // $("#confirmationAvatar2").attr('src', '/api/remoteFiles/view/'+data.avatar);
        $('#contact2SelectedName').text(data.firstName + ' ' + data.lastName);
        $('#contact2SelectedProfession').text(data.profession);
        $('#selectContact2Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
        $('#selectContact2Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
        var initials = this.getInitials(data.firstName + " " + data.lastName);
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
    updateValues: function updateValues(avatar, avatarSrc, userId) {
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
                this.populateResults(avatar, result);
            }).bind(this),
            error: function error(_error) {
                document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Something went wrong. Try again!</label></div>";
                return false;
            },
            complete: function complete(e, xhr, settings) {
                if (e.status === 401) {
                    window.location.href = "/referral";
                }
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    populateResults: function populateResults(avatar, data) {
        if (avatar == "avatar1") {
            console.log("MyQContent:populateResults:avatar1: ");
            // var data = [{ id: 0, email: 'jdoe@gmail.com', text: 'John Doe', firstName: 'John', lastName: 'Doe',  avatar: 'avatar-1'}];
            this.refs.contactid1.value = data.id;
            this.refs.contact1.value = data.email;
            this.refs.contactAvatar1.value = data.avatar;
            //    $("#confirmationAvatar1").attr('src', '/api/remoteFiles/view/'+data.avatar);
            $('#contact1SelectedName').text(data.firstName + ' ' + data.lastName);
            $('#contact1SelectedProfession').text(data.profession);
            $('#selectContact1Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
            $('#selectContact1Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
            var initials = this.getInitials(data.firstName + " " + data.lastName);
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
            //var data = [{ id: 0,  email: 'jdoe@gmail.com', text: 'John Doe', firstName: 'John', lastName: 'Doe',  avatar: 'avatar-1'}];
            this.refs.contactid2.value = data.id;
            this.refs.contact2.value = data.email;
            this.refs.contactAvatar2.value = data.avatar;
            //     $("#confirmationAvatar2").attr('src', '/api/remoteFiles/view/'+data.avatar);
            $('#contact2SelectedName').text(data.firstName + ' ' + data.lastName);
            $('#contact2SelectedProfession').text(data.profession);
            $('#selectContact2Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
            $('#selectContact2Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
            var initials = this.getInitials(data.firstName + " " + data.lastName);
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
    populateNewContactResults: function populateNewContactResults(data) {
        console.log("myq:populateNewContactResults");
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
        $('#newContactConsumerButton').prop('checked', true);
        $('#newContactProfessionalButton').prop('checked', false);
        $('.btn-group #labelNewContactProfessionalButton').removeClass('active');
        $('.btn-group #labelNewContactConsumerButton').addClass('active');
        $('#new-contact').collapse("toggle");
        var initials = this.getInitials(data.firstName + " " + data.lastName);
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
    loadUser: function loadUser(id) {
        var source = '/api/users/' + id;
        $.get(source, (function (result) {
            var avatarSrc = result.avatar;
            var avatar = "avatar1";
            var userId = result.id;
            this.updateValues(avatar, avatarSrc, userId);
        }).bind(this));
    },
    reloadPage: function reloadPage() {
        window.location.href = '/myqplus';
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'col-lg-8' },
            React.createElement(
                'div',
                { name: 'introductionForm' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'h2',
                        { className: 'page-header text-left' },
                        'New My Q entry'
                    ),
                    React.createElement('input', { type: 'hidden', id: 'paramAvatar', value: this.props.avatar }),
                    React.createElement(
                        'div',
                        { className: 'row', id: 'shortList-content' },
                        React.createElement(
                            'div',
                            { className: 'col-lg-6 col-sm-6' },
                            React.createElement(
                                'div',
                                { id: 'contact1Panel', className: 'panel' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-heading' },
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { id: 'introduce-right', className: 'col-sm-3 text-left hidden' },
                                            React.createElement('i', { className: 'fa fa-2x fa-envelope fa-envelope-top' }),
                                            ' ',
                                            React.createElement('i', { className: 'fa fa-arrow-right fa-arrow-right-top' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { id: 'refer-left', className: 'col-sm-3 text-left' },
                                            React.createElement(
                                                'i',
                                                { className: 'fa fa-vcard fa-vcard-bordered' },
                                                ' '
                                            ),
                                            ' ',
                                            React.createElement('i', { className: 'fa fa-arrow-right fa-arrow-right-top' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-sm-7 text-left' },
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'btn-group btn-group-sm', 'data-toggle': 'buttons' },
                                                    React.createElement(
                                                        'label',
                                                        { id: 'labelReferButton', className: 'btn btn-primary active' },
                                                        React.createElement(
                                                            'input',
                                                            { type: 'radio', name: 'transactionType', ref: 'referType', id: 'referTypeButton', autoComplete: 'off' },
                                                            'Referral'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'label',
                                                        { id: 'labelIntroductionButton', className: 'btn btn-primary' },
                                                        React.createElement(
                                                            'input',
                                                            { type: 'radio', name: 'transactionType', ref: 'introduceType', id: 'introduceTypeButton', autoComplete: 'off' },
                                                            'Introduction'
                                                        )
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-sm-2' },
                                            React.createElement(
                                                'button',
                                                { type: 'button', role: 'button', 'data-toggle': 'collapse', 'aria-expanded': 'false', href: '#advance-search', 'aria-controls': 'advance-search', title: 'Advance Search', 'data-placement': 'top', className: 'btn btn-xs btn-primary advanceSearch' },
                                                React.createElement('i', { className: 'fa fa-search ' }),
                                                ' ',
                                                React.createElement('i', { className: 'fa fa-plus fa-0x-plus' })
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'panel-body panel-body-border target1' },
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-lg-2 col-md-4 col-sm-4 col-xs-2' },
                                            React.createElement(
                                                'ol',
                                                null,
                                                React.createElement(
                                                    'li',
                                                    { id: 'avatar1li', className: 'placeholder' },
                                                    React.createElement(Avatar1Pic, { id: this.state.contactid1, username: this.state.contactAvatar1, initials: this.state.contactInitials1 })
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { id: 'selectContact1Edit', className: 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30' },
                                            React.createElement('select', { id: 'selectContact1', className: 'js-example-placeholder-multiple', style: selectResponsive })
                                        ),
                                        React.createElement(
                                            'div',
                                            { id: 'selectContact1Selected', className: 'col-lg-10 col-md-8 col-sm-8 col-xs-8 hidden' },
                                            React.createElement(
                                                'button',
                                                { type: 'button', className: 'close', 'aria-label': 'Close', onClick: this.ResetContact1 },
                                                React.createElement(
                                                    'span',
                                                    { 'aria-hidden': 'true' },
                                                    '×'
                                                )
                                            ),
                                            React.createElement('h4', { id: 'contact1SelectedName' }),
                                            React.createElement('p', { id: 'contact1SelectedProfession' })
                                        ),
                                        React.createElement('input', { type: 'hidden', ref: 'contact1', id: 'contact1', name: 'contact1', value: '' }),
                                        React.createElement('input', { type: 'hidden', ref: 'contactAvatar1', id: 'contactAvatar1', name: 'contactAvatar1', value: '' }),
                                        React.createElement('input', { type: 'hidden', ref: 'contactid1', id: 'contactid1', name: 'contactid1', value: '' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'panel-body' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-bottom-20' },
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            React.createElement(
                                                'strong',
                                                null,
                                                'OR'
                                            ),
                                            ' select a profession.'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12' },
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            React.createElement(
                                                'select',
                                                { id: 'searchProfessionSelect2', className: 'form-control js-example-placeholder-single', 'class': 'searchProfession', ref: 'searchProfession' },
                                                React.createElement(
                                                    'option',
                                                    { value: '', selected: 'selected' },
                                                    'Profession'
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-lg-6 col-sm-6' },
                            React.createElement(
                                'div',
                                { id: 'contact2Panel', className: 'panel' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-heading' },
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { id: 'introduce-left', className: 'col-sm-5 text-left hidden' },
                                            React.createElement('i', { className: 'fa fa-arrow-left fa-arrow-right-top' }),
                                            ' ',
                                            React.createElement('i', { className: 'fa fa-2x fa-envelope fa-envelope-top' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { id: 'refer-right', className: 'col-sm-5 text-left' },
                                            React.createElement('i', { className: 'fa fa-2x fa-envelope fa-envelope-top' }),
                                            ' ',
                                            React.createElement('i', { className: 'fa fa-arrow-right fa-arrow-right-top' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { id: 'new-contact-label', className: 'col-sm-6 pull-right' },
                                            React.createElement(
                                                'a',
                                                { href: '#new-contact', role: 'button', 'data-toggle': 'collapse', 'aria-expanded': 'false', 'aria-contols': 'new-contact', className: 'btn btn-link' },
                                                'Create a new contact ',
                                                React.createElement('span', { className: 'caret' })
                                            )
                                        )
                                    ),
                                    React.createElement(AddNewContact, { populateResults: this.populateNewContactResults })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'panel-body panel-body-border target2' },
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-lg-2 col-md-4 col-sm-4 col-xs-2' },
                                            React.createElement(
                                                'ol',
                                                null,
                                                React.createElement(
                                                    'li',
                                                    { id: 'avatar2li', className: 'placeholder' },
                                                    React.createElement(Avatar2Pic, { id: this.state.contactid2, username: this.state.contactAvatar2, initials: this.state.contactInitials2 })
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { id: 'selectContact2Edit', className: 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30' },
                                            React.createElement('select', { id: 'selectContact2', className: 'js-example-placeholder-multiple', style: selectResponsive2 })
                                        ),
                                        React.createElement(
                                            'div',
                                            { id: 'selectContact2Selected', className: 'col-lg-10 col-md-8 col-sm-8 col-xs-8 hidden' },
                                            React.createElement(
                                                'button',
                                                { type: 'button', className: 'close', 'aria-label': 'Close', onClick: this.ResetContact2 },
                                                React.createElement(
                                                    'span',
                                                    { 'aria-hidden': 'true' },
                                                    '×'
                                                )
                                            ),
                                            React.createElement('h4', { id: 'contact2SelectedName' }),
                                            React.createElement('p', { id: 'contact2SelectedProfession' })
                                        ),
                                        React.createElement('input', { type: 'hidden', ref: 'contact2', id: 'contact2', name: 'contact2', value: '' }),
                                        React.createElement('input', { type: 'hidden', ref: 'contactAvatar2', id: 'contactAvatar2', name: 'contactAvatar2', value: '' }),
                                        React.createElement('input', { type: 'hidden', ref: 'contactid2', id: 'contactid2', name: 'contactid2', value: '' })
                                    )
                                )
                            )
                        ),
                        React.createElement(AdvanceSearchModal, { reloadPage: this.reloadPage, action: "Select", handleClick: this.loadUser }),
                        React.createElement(ReasonNote, { onReasonChange: this.handleReasonChange }),
                        React.createElement(
                            'div',
                            { className: 'col-lg-12 col-sm-12' },
                            React.createElement(
                                'div',
                                { className: 'panel' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-footer text-right' },
                                    React.createElement(
                                        'button',
                                        { type: 'button', onClick: this.handleSubmit, className: 'btn btn-primary btn-space' },
                                        'Save to My Q'
                                    ),
                                    React.createElement(
                                        'button',
                                        { type: 'button', onClick: this.ResetMyQForm, className: 'btn btn-default btn-space' },
                                        'Reset'
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement('div', { className: 'errorMessage', id: 'validationError' })
            ),
            React.createElement(ConfirmationModal, { handleHideModal: this.handleHideModal, profession: this.state.confirmationProfession, title: 'My Q entry has been saved.', type: this.state.transactionType, username1: this.state.confirmationUsername1, username2: this.state.confirmationUsername2, initials1: this.state.confirmationInitials1, initials2: this.state.confirmationInitials2 }),
            React.createElement(SendingModal, null)
        );
    },
    ResetContact1: function ResetContact1() {
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
            contactInitials1: '',
            confirmationUsername1: '',
            confirmationInitials1: ''
        });
    },
    ResetContact2: function ResetContact2() {
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
            contactInitials2: '',
            confirmationUsername2: '',
            confirmationInitials2: ''
        });
    },
    updateCount: function updateCount() {
        this.props.updateCount();
    },
    ResetMyQForm: function ResetMyQForm() {
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
        $('#reasonNote').val("");
        $("#searchProfessionSelect2").select2("val", "");
        $('#referTypeButton').prop('checked', true);
        $('#introduceTypeButton').prop('checked', false);
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
            reason: '',
            profession: ''
        });
    },
    handleHideModal: function handleHideModal() {
        console.log('MyQPlusContent:handleHideModal:');
        this.setState({
            confirmationProfession: ''
        });
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var contact1 = this.state.contact1;
        var contact2 = this.state.contact2;
        var note = this.state.reason;
        var profession = $("#searchProfessionSelect2 :selected").text();
        if (profession == "Profession") profession = "";
        if (profession != "") {
            this.setState({
                confirmationProfession: profession
            });
        }
        //  var transactionType = $("#referTypeButton").prop('checked') == true ? "Referral" : "Introduction";
        if (contact2 != "" && note != "" && (contact1 != "" || profession != "")) {
            $("#sendingModal").modal('show');
            var data = this.getFormData();
            data.subjectUserProfession = profession;
            //     data.transactionType = transactionType;
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            // Save to My Q
            $.ajax({
                type: "POST",
                url: "/savePendingMessage",
                data: formData,
                success: (function (result) {
                    console.log(result);
                    $("#sendingModal").modal('hide');
                    $("#confirmationModal").modal('show');
                    this.ResetMyQForm();
                    document.getElementById("formValidationError").innerHTML = "";
                    this.updateCount();
                }).bind(this),
                error: function error(request, status, _error2) {
                    $('#validationError').slideDown(500);
                    document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\">Something went wrong. Try again!</label></div>";
                    setTimeout(function () {
                        $("#validationError").fadeOut();
                    }, 5000);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Please select contacts or profession and include a reason!</label></div>";
            $('#validationError').show();
            setTimeout(function () {
                $("#validationError").fadeOut();
            }, 5000);
            return null;
        }
    },

    getFormData: function getFormData() {
        return {
            subjectUserId: this.state.contactid1,
            fromUserId: $('#id').val(),
            toUserId: this.state.contactid2,
            note: this.state.reason,
            subjectUserProfession: '',
            transactionType: this.state.transactionType
        };
    }

});

var Avatar1Pic = React.createClass({
    displayName: 'Avatar1Pic',

    render: function render() {
        var image;
        if (this.props.username == '') {
            image = React.createElement('img', { id: 'avatar1', src: '../images/120px-blank.png', className: 'contact-img img-circle' });
        } else if (this.props.username == 'default' && this.props.initials != '') {
            image = React.createElement(
                'div',
                { id: 'avatar1', className: 'avatar-circle' },
                React.createElement('img', { className: 'hidden', id: this.props.id }),
                React.createElement(
                    'span',
                    { className: 'initials' },
                    this.props.initials
                )
            );
        } else {
            image = React.createElement('img', { id: 'avatar1', src: '/api/remoteFiles/view/' + this.props.username, className: 'contact-img img-circle' });
        }
        return React.createElement(
            'span',
            null,
            image
        );
    }
});

var Avatar2Pic = React.createClass({
    displayName: 'Avatar2Pic',

    render: function render() {
        var image;
        if (this.props.username == '') {
            image = React.createElement('img', { id: 'avatar2', src: '../images/120px-blank.png', className: 'contact-img img-circle' });
        } else if (this.props.username == 'default' && this.props.initials != '') {
            image = React.createElement(
                'div',
                { id: 'avatar2', className: 'avatar-circle' },
                React.createElement('img', { className: 'hidden', id: this.props.id }),
                React.createElement(
                    'span',
                    { className: 'initials' },
                    this.props.initials
                )
            );
        } else {
            image = React.createElement('img', { id: 'avatar2', src: '/api/remoteFiles/view/' + this.props.username, className: 'contact-img img-circle' });
        }
        return React.createElement(
            'span',
            null,
            image
        );
    }
});