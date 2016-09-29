'use strict';

var displayAlert = {
    display: 'none'
};

var ImportEntry = React.createClass({
    displayName: 'ImportEntry',

    handleExtraInfoToggle: function handleExtraInfoToggle(id) {
        if ($('#btn-caret-' + id).hasClass('fa-caret-down')) {
            $('#btn-caret-' + id).removeClass('fa-caret-down').addClass('fa-caret-up');
        } else {
            $('#btn-caret-' + id).removeClass('fa-caret-up').addClass('fa-caret-down');
        }
    },
    handleInvitationButton: function handleInvitationButton(id) {
        console.log('You clicked invitation icon');
        console.log(id);
        if ($('#invitationInput-' + id).val() == "true") {
            $('#invitationInput-' + id).val("false");
            $('#fa-ban-' + id).show();
        } else {
            $('#invitationInput-' + id).val("true");
            $('#fa-ban-' + id).hide();
        }
    },
    handleInputChange: function handleInputChange(e) {
        console.log(e);
    },
    componentDidMount: function componentDidMount() {
        $('import' + this.props.id).prop("checked", this.props.checked);
    },
    render: function render() {
        return React.createElement(
            'li',
            { id: 'li-' + this.props.id },
            React.createElement(
                'form',
                { name: 'form' + this.props.id, className: 'form-inline' },
                React.createElement(
                    'div',
                    { className: 'form-group checkbox' },
                    React.createElement(
                        'label',
                        null,
                        React.createElement('input', { className: 'check', type: 'checkbox', id: 'import' + this.props.id, name: 'import' + this.props.id, value: '' })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group ' + this.props.emailsSuccess + ' has-feedback' },
                    React.createElement(
                        'label',
                        { className: 'sr-only', 'for': 'exampleInputEmail3' },
                        'Email address'
                    ),
                    React.createElement(
                        'div',
                        { className: 'input-group' },
                        React.createElement(
                            'span',
                            { className: 'input-group-addon' },
                            '@'
                        ),
                        React.createElement('input', { type: 'text', className: 'form-control email-input', name: 'email' + this.props.id, placeholder: 'Email', defaultValue: this.props.email }),
                        React.createElement('input', { type: 'hidden', id: 'invitationInput-' + this.props.id, className: 'invitation-input', name: 'invitationInput-' + this.props.id, value: this.props.invite })
                    ),
                    React.createElement('span', { className: 'glyphicon ' + this.props.glyphicon + ' form-control-feedback', 'aria-hidden': 'true' }),
                    React.createElement(
                        'span',
                        { id: 'inputGroupSuccess3Status', className: 'sr-only' },
                        '(success)'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'sr-only', 'for': 'exampleInputFirstName3' },
                        'First Name'
                    ),
                    React.createElement('input', { type: 'text', className: 'form-control first-name-input', id: 'first-name-' + this.props.id, name: 'first-name' + this.props.id, placeholder: 'FirstName', defaultValue: this.props.fname })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group checkbox' },
                    React.createElement(
                        'label',
                        { className: 'sr-only', 'for': 'exampleInputLastName3' },
                        'Last Name'
                    ),
                    React.createElement('input', { type: 'text', className: 'form-control last-name-input', id: 'last-name-' + this.props.id, name: 'last-name' + this.props.id, placeholder: 'Last Name', defaultValue: this.props.lname })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'a',
                        { className: 'btn btn-default btn-xs pointer', onClick: this.handleInvitationButton.bind(this, this.props.id) },
                        React.createElement(
                            'span',
                            { id: 'invitation-' + this.props.id, className: 'pointer', className: 'fa-stack' },
                            React.createElement('i', { className: 'fa fa-envelope fa-stack-1x' }),
                            React.createElement('i', { id: 'fa-ban-' + this.props.id, className: 'fa fa-ban fa-stack-2x text-danger' })
                        )
                    ),
                    React.createElement('input', { type: 'hidden', id: 'invitationInput-' + this.props.id, className: 'invitation-input', name: 'invitationInput-' + this.props.id, value: this.props.invite })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'a',
                        { className: 'btn btn-primary btn-xs', 'data-toggle': 'collapse', onClick: this.handleExtraInfoToggle.bind(this, this.props.id), href: '#collapse-' + this.props.id },
                        React.createElement('span', { id: 'btn-caret-' + this.props.id, className: 'fa fa-caret-down' })
                    )
                ),
                React.createElement('input', { type: 'hidden', id: 'name-' + this.props.id, name: 'name' + this.props.id, value: this.props.name }),
                React.createElement(
                    'div',
                    { id: 'collapse-' + this.props.id, className: 'panel-collapse collapse' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'sr-only', 'for': 'exampleInputProfession' },
                                'Profession'
                            ),
                            React.createElement('input', { type: 'text', className: 'form-control profession-input', id: 'profession-' + this.props.id, name: 'profession' + this.props.id, placeholder: 'Job Title', defaultValue: this.props.profession })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'sr-only', 'for': 'exampleInputBusiness' },
                                'Business Name'
                            ),
                            React.createElement('input', { type: 'text', className: 'form-control business-name-input', id: 'business-' + this.props.id, name: 'business' + this.props.id, placeholder: 'Company', defaultValue: this.props.business })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'sr-only', 'for': 'exampleInputAddress1' },
                                'Address 1'
                            ),
                            React.createElement('input', { type: 'text', className: 'form-control address1-input', id: 'address1-' + this.props.id, name: 'address1' + this.props.id, placeholder: 'Business Address 1', defaultValue: this.props.address1 })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'sr-only', 'for': 'exampleInputAddress2' },
                                'Address 2'
                            ),
                            React.createElement('input', { type: 'text', className: 'form-control address2-input', id: 'address2-' + this.props.id, name: 'address2' + this.props.id, placeholder: 'Business Address 2', defaultValue: this.props.address2 })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'sr-only', 'for': 'exampleInputCity3' },
                                'City'
                            ),
                            React.createElement('input', { type: 'text', className: 'form-control city-input', id: 'city-' + this.props.id, name: 'city' + this.props.id, placeholder: 'Business City', defaultValue: this.props.city })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'sr-only', 'for': 'exampleInputState3' },
                                'State'
                            ),
                            React.createElement('input', { type: 'text', className: 'form-control state-input', id: 'state-' + this.props.id, name: 'state' + this.props.id, placeholder: 'Business State', defaultValue: this.props.state })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'sr-only', 'for': 'exampleInputZip3' },
                                'Zip'
                            ),
                            React.createElement('input', { type: 'text', className: 'form-control zip-input', id: 'zip-' + this.props.id, name: 'zip' + this.props.id, placeholder: 'Business Postal Code', defaultValue: this.props.zip })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'sr-only', 'for': 'exampleInputPhone3' },
                                'Phone'
                            ),
                            React.createElement('input', { type: 'text', className: 'form-control phone-input', id: 'phone-' + this.props.id, name: 'phone' + this.props.id, placeholder: 'Mobile Phone', defaultValue: this.props.phone })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'sr-only', 'for': 'exampleInputFax3' },
                                'Fax'
                            ),
                            React.createElement('input', { type: 'text', className: 'form-control fax-input', id: 'fax-' + this.props.id, name: 'fax' + this.props.id, placeholder: 'Business Fax', defaultValue: this.props.fax })
                        )
                    )
                )
            )
        );
    }
});

var SocialInviter = React.createClass({
    displayName: 'SocialInviter',
    getInitialState: function getInitialState() {
        return {
            user: this.props.user,
            imports: []
        };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        ReactDOM.findDOMNode(this.refs.socialinviter).setAttribute('exclude', 'xing,mailru,mailchimp,eventbrite,skyrock,aol,email,csv');
        ReactDOM.findDOMNode(this.refs.socialinviter).setAttribute('alignment', 'horizontal');
        $("#content-results-container").hide();
        $("#csvimport-browse").hide();

        $(document).on('change', ':file', function () {
            var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);
        });

        $(':file').on('fileselect', (function (event, numFiles, label) {
            console.log("File Select", event, numFiles, label);
            var input = $('#file-selected'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;
            if (input.length) {
                input.val(log);
                $('#loading-file').show();
            } else {
                if (log) console.log(log);
            }
            console.log("Before handleCSVImport");
            console.log(log);
            this.handleCSVImport();
        }).bind(this));

        $("#checkAll").click(function () {
            $("#content-results .check").prop('checked', $(this).prop('checked'));
        });

        globalVar.callback = function (data) {
            _this.setState({ imports: data });
        };
    },
    handleInviteAll: function handleInviteAll() {
        if ($('#fa-ban-all').css('display') == 'none') {
            $('#fa-ban-all').show();
            $("i[id^='fa-ban-']").show();
            $("input[id^='invitationInput-']").val('false');
        } else {
            $('#fa-ban-all').hide();
            $("i[id^='fa-ban-']").hide();
            $("input[id^='invitationInput-']").val('true');
        }
    },
    showCSVImportBrowse: function showCSVImportBrowse() {
        console.log("showCSVImportBrowse");
        $("#csvimport-browse").show();
    },
    handleFilterUpdate: function handleFilterUpdate(filterValue) {
        console.log('Filter Value: ' + filterValue);
        var container = $('#content-results'),
            scrollTo = $('#li-' + filterValue),
            hightlightFName = $('#first-name-' + filterValue),
            hightlightLName = $('#last-name-' + filterValue);
        console.log(scrollTo);
        container.animate({
            scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
        });
        hightlightFName.addClass('highlighted');
        hightlightLName.addClass('highlighted');
        setTimeout(function () {
            hightlightFName.removeClass('highlighted');
            hightlightLName.removeClass('highlighted');
        }, 3000);
    },
    handleCSVImport: function handleCSVImport() {
        $('input[type=file]').parse({
            config: {
                // base config to use for each file
                delimiter: "", // auto-detect
                newline: "", // auto-detect
                header: true,
                dynamicTyping: false,
                preview: 0,
                encoding: "",
                worker: false,
                comments: false,
                step: undefined,
                complete: (function (results, file) {
                    console.log("Parsing complete:", results, file);
                    var contacts = [];
                    var imports = [];
                    var count = 0;
                    var glyphicon = 'glyphicon-ok';
                    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                    $.each(results.data, function () {
                        if (this["E-mail Address"] != "") {
                            var fname = this["First Name"];
                            var lname = this["Last Name"];
                            var name = "";
                            if (this["First Name"] == null || this["Last Name"] == null) {
                                if (this["First Name"] != null) {
                                    name = name.concat(this["First Name"] + ' ');
                                }
                                if (this["Last Name"] != null) {
                                    name = name.concat(this["Last Name"]);
                                }
                            } else {
                                name = this["First Name"] + ' ' + this["Last Name"];
                            }
                            var email = this["E-mail Address"];
                            var business = this["Company"];
                            var profession = this["Job Title"];
                            var address1 = this["Business Address 1"];
                            var address2 = this["Business Address 2"];
                            var city = this["Business City"];
                            var state = this["Business State"];
                            var zip = this["Business Postal Code"];
                            var phone = this["Mobile Phone"];
                            var fax = this["Business Fax"];
                            var emailsSuccess = 'has-success';
                            var checked = "checked";
                            var invite = "false";
                            if (!pattern.test(email)) {
                                emailsSuccess = 'has-error';
                                glyphicon = 'glyphicon-remove';
                                checked = "";
                            }
                            count++;
                            var contact = {
                                'key': count,
                                'name': name,
                                'fname': fname,
                                'lname': lname,
                                'id': count,
                                'emails': email,
                                'emailsSuccess': emailsSuccess,
                                'glyphicon': glyphicon,
                                'checked': checked,
                                'invite': invite,
                                'business': business,
                                'profession': profession,
                                'address1': address1,
                                'address2': address2,
                                'city': city,
                                'state': state,
                                'zip': zip,
                                'phone': phone,
                                'fax': fax
                            };
                            imports.push(contact);
                        }
                    });
                    console.log("Updating state");
                    this.setState({ imports: imports });
                    console.log(this.state.imports);
                    $('#loading-file').hide();
                    $("#service-type").val("Imported via CSV");
                    $("#content-results-container").show();
                    $(".check").prop('checked', 'checked');
                    $('#importing-contacts').fadeOut('slow');
                }).bind(this),
                error: function error(_error, file) {
                    console.log("Parsing error:", _error, file);
                },
                download: false,
                skipEmptyLines: false,
                chunk: undefined,
                fastMode: undefined,
                beforeFirstChunk: undefined,
                withCredentials: undefined
            },
            before: function before(file, inputElem) {
                // executed before parsing each file begins;
                // what you return here controls the flow
            },
            error: function error(err, file, inputElem, reason) {
                // executed if an error occurs while loading the file,
                // or if before callback aborted for some reason
            },
            complete: function complete() {
                // executed after all files are complete
            }
        });
    },
    isValidEmailFormat: function isValidEmailFormat(email) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(email);
    },
    handleCancelImports: function handleCancelImports() {
        $("#content-results-container").hide();
        $('#file-selected').val('');
        $('#file-hidden').val('');
        $("#csvimport-browse").hide();
        $("#service-type").val("");
        this.setState({ imports: [] });
    },
    handleSaveImports: function handleSaveImports() {
        $.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
        var thisElem = this;
        var contacts = [];
        var dataList = [];
        var $entries = $("#import-list").find('form');
        $entries.each(function (i, entry) {
            //            console.log($(entry).find(':input:checkbox').prop('checked'));
            $(entry).find(':input:checkbox').each(function () {
                if ($(this).prop('checked') == true) {
                    dataList.push(JSON.stringify($(entry).serializeObject()));

                    if (thisElem.isValidEmailFormat($(entry).find('.email-input').val()) && $(entry).find('.first-name-input').val() != "" && $(entry).find('.last-name-input').val() != "") {
                        var contact = {
                            'email': $(entry).find('.email-input').val(),
                            'firstName': $(entry).find('.first-name-input').val(),
                            'lastName': $(entry).find('.last-name-input').val(),
                            'profession': $(entry).find('.profession-input').val(),
                            'businessName': $(entry).find('.business-name-input').val(),
                            'businessAddress1': $(entry).find('.address1-input').val(),
                            'businessAddress2': $(entry).find('.address2-input').val(),
                            'businessCity': $(entry).find('.city-input').val(),
                            'businessState': $(entry).find('.state-input').val(),
                            'businessZip': $(entry).find('.zip-input').val(),
                            'mobilePhone': $(entry).find('.phone-input').val(),
                            'faxNumber': $(entry).find('.fax-input').val(),
                            'invitation': $(entry).find('.invitation-input').val()
                        };
                        contacts.push(contact);
                    }
                }
            });
        });
        console.log(contacts);
        var data = {
            id: $('#id').val(),
            contacts: contacts,
            service: $("#service-type").val()
        };
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $('#importing-contacts').fadeIn('slow');
        $.ajax({
            type: "POST",
            url: "/importContacts2",
            async: true,
            data: formData,
            dataType: "json",
            contentType: "application/json"
        });
        window.setTimeout((function () {
            $('#importing-contacts').fadeOut('slow');
            this.setState({ imports: [] });
            bootbox.alert("<strong>Congratulations!</strong> Your contacts are being processed, we will let you know if a problem occurs.", function () {
                console.log("Inside Success");
            });
        }).bind(this), 10000);
        $("#content-results-container").hide();
        $("#csvimport-browse").hide();
        $('#file-selected').val('');
        $('#file-hidden').val('');
        $("#service-type").val("");
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {},
    onChildToggle: function onChildToggle(selected) {},
    render: function render() {
        var contacts = [];
        if (!$.isEmptyObject(this.state.imports)) {
            this.state.imports.forEach(function (contact) {
                contacts.push(React.createElement(ImportEntry, { key: contact.id, id: contact.id, name: contact.name, fname: contact.fname,
                    lname: contact.lname, email: contact.emails, emailsSuccess: contact.emailsSuccess,
                    glyphicon: contact.glyphicon, checked: contact.checked, invite: contact.invite,
                    profession: contact.profession, business: contact.business, address1: contact.address1,
                    address2: contact.address2, city: contact.city, state: contact.state, zip: contact.zip,
                    phone: contact.phone, fax: contact.fax }));
            });
        }
        return React.createElement(
            'div',
            { className: 'col-lg-12 col-md-12 col-xs-12' },
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
                                'Invite your Contacts'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-2' },
                            React.createElement(
                                'a',
                                { className: 'video', title: 'Profile Settings - Invite Contacts', href: 'https://youtu.be/5z5f3mgoVUo' },
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
                        { className: 'text-left' },
                        React.createElement(
                            'div',
                            { id: 'importing-contacts', className: 'alert alert-warning', role: 'alert', style: displayAlert },
                            React.createElement('i', { className: 'fa fa-1x fa-cog fa-spin' }),
                            ' ',
                            React.createElement(
                                'strong',
                                null,
                                'Heads Up!'
                            ),
                            ' Importing your new contacts! ',
                            React.createElement('i', { className: 'fa fa-spinner fa-spin fa-2x fa-fw' })
                        ),
                        React.createElement(
                            'div',
                            { id: 'loading-contacts', className: 'alert alert-warning', role: 'alert', style: displayAlert },
                            React.createElement(
                                'strong',
                                null,
                                'Heads Up!'
                            ),
                            ' Loading your contacts! ',
                            React.createElement('i', { className: 'fa fa-cog fa-spin fa-2x fa-fw' })
                        ),
                        React.createElement(
                            'div',
                            { id: 'importing-contacts-error', className: 'alert alert-danger', role: 'alert', style: displayAlert },
                            ' ',
                            React.createElement(
                                'strong',
                                null,
                                'Oh Snap!'
                            ),
                            ' One of your contacts has no name or an invalid email! '
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-horizontal' },
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4 col-md-offset-1' },
                                    React.createElement('div', { ref: 'socialinviter', id: 'socialinviter', className: 'socialinviter', exclude: 'google+,xing,mailru,mailchimp,eventbrite,skyrock,aol,email,csv', alignment: 'horizontal',
                                        type: 'contactimporter' }),
                                    React.createElement(
                                        'div',
                                        { ref: 'csvimport', id: 'csvimport' },
                                        React.createElement(
                                            'ul',
                                            { className: 'CI-SI-ul' },
                                            React.createElement(
                                                'li',
                                                { className: 'CI-SI-ul-li nodock pdtcontactimporter', onClick: this.showCSVImportBrowse },
                                                React.createElement(
                                                    'div',
                                                    { className: 'CI-SI-services  CI-SI-shape-rounded  CI-SI-csv CI-SI-horiz CI-SI-horiz-full' },
                                                    React.createElement('i', { className: 'CI-SI-i-csv CI-SI-i' }),
                                                    React.createElement(
                                                        'div',
                                                        { className: 'CI-SI-text CI-SI-text-lines' },
                                                        React.createElement(
                                                            'div',
                                                            { className: 'CI-SI-text-line1' },
                                                            'CSV'
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            { className: 'CI-SI-text-line2' },
                                                            'Import your contacts'
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
                                { id: 'csvimport-browse', className: 'form-group' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-10 col-md-offset-1' },
                                    React.createElement(
                                        'h5',
                                        null,
                                        'Select the csv file to import:'
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        React.createElement(
                                            'label',
                                            { className: 'input-group-btn' },
                                            React.createElement(
                                                'span',
                                                { className: 'btn btn-primary' },
                                                React.createElement(
                                                    'span',
                                                    { id: 'loading-file', style: displayAlert },
                                                    React.createElement('i', { className: 'fa fa-cog fa-spin fa-fw' })
                                                ),
                                                ' Browse… ',
                                                React.createElement('input', { id: 'file-hidden', type: 'file', className: 'hidden', multiple: true })
                                            )
                                        ),
                                        React.createElement('input', { id: 'file-selected', type: 'text', className: 'form-control', readOnly: true })
                                    ),
                                    React.createElement(
                                        'span',
                                        { className: 'help-block' },
                                        'Make sure your import file includes a header row with: First Name, Last Name, E-mail Address, Job Title, Company, Business Address 1, Business Address 2, Business City, Business State, Business Postal Code, Mobile Phone, Business Fax.'
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'content-results-container', className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'div',
                            { id: 'import-alert', className: 'alert alert-warning margin-10-right-left', role: 'alert' },
                            React.createElement(
                                'strong',
                                null,
                                'Heads Up!'
                            ),
                            ' Please verify that the Name and E-mail of contacts are correct before proceeding.',
                            React.createElement('br', null),
                            React.createElement(
                                'strong',
                                null,
                                'Important!'
                            ),
                            ' An invitation email will not be sent unless you choose to by clicking on the ',
                            React.createElement(
                                'span',
                                { className: 'fa-stack' },
                                React.createElement('i', { className: 'fa fa-envelope fa-stack-1x' }),
                                React.createElement('i', { className: 'fa fa-ban fa-stack-2x text-danger' })
                            ),
                            ' icon or selecting to send invitations to all at the top.'
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { id: 'check-all-container', className: 'col-md-3' },
                                React.createElement(
                                    'label',
                                    null,
                                    React.createElement('input', { className: 'check', id: 'checkAll', value: 'Check All', type: 'checkbox' }),
                                    ' Select All'
                                )
                            ),
                            React.createElement(
                                'div',
                                { id: 'invite-all-container', className: 'col-md-3' },
                                React.createElement(
                                    'label',
                                    null,
                                    React.createElement(
                                        'a',
                                        { className: 'btn btn-default btn-xs pointer', onClick: this.handleInviteAll },
                                        React.createElement(
                                            'span',
                                            { className: 'fa-stack' },
                                            React.createElement('i', { className: 'fa fa-envelope fa-stack-1x' }),
                                            React.createElement('i', { id: 'fa-ban-all', className: 'fa fa-ban fa-stack-2x text-danger' })
                                        )
                                    ),
                                    ' Send Invite to All'
                                )
                            ),
                            React.createElement(
                                'div',
                                { id: 'search-box-container', className: 'col-md-6' },
                                React.createElement(ImportsSearch, { key: 1, imports: this.state.imports, updateFilter: this.handleFilterUpdate })
                            )
                        ),
                        React.createElement(
                            'div',
                            { id: 'content-results', className: 'col-md-12' },
                            React.createElement(
                                'ul',
                                { id: 'import-list' },
                                contacts
                            )
                        ),
                        React.createElement('input', { type: 'hidden', id: 'service-type', value: '' }),
                        React.createElement(
                            'div',
                            { id: 'import-buttons', className: 'form-group col-md-12 margin-bottom-10' },
                            React.createElement(
                                'div',
                                { clasName: 'col-sm-12' },
                                React.createElement(
                                    'button',
                                    { type: 'button', onClick: this.handleCancelImports, className: 'btn btn-default' },
                                    'Cancel'
                                ),
                                ' ',
                                React.createElement(
                                    'button',
                                    { type: 'button', onClick: this.handleSaveImports, className: 'btn btn-primary' },
                                    'Save Imports'
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});