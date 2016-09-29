var AddNewContact = React.createClass({
    displayName: ' AddNewContact',
    componentDidMount: function() {
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

        $("#inputProfession").select2({
            minimumInputLength: 3,
            ajax: {
                url: "/searchProfession",
                method: 'POST',
                dataType: 'json',
                contentType : "application/json",
                delay: 250,
                data: function (params) {
                    return {
                        search: params.term // search term
                    };
                },
                processResults: function (data, params) {
                    if (!$.isEmptyObject(data) && data != undefined ) {
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
            escapeMarkup:function(t) { return t; }, // let our custom formatter work
            templateResult: formatAjaxResponseProfession, // omitted for brevity, see the source of this page
            templateSelection: formatAjaxSelectionProfession // omitted for brevity, see the source of this page
        });
        function formatAjaxResponseProfession (data){
            var markup = '<div class="clearfix">' +
                '<div class="col-sm-12 cursor text-left">' +
                '<div id="'+data.text+'">' + data.title +
                '</div>' +
                '</div>';
            return markup;
        }
        function formatAjaxSelectionProfession (data) {
            return data.title || data.text;
        }

        $("[name='invite-check']").bootstrapSwitch();
        $('input[name="invite-check"]').on('switchChange.bootstrapSwitch', function(event, state) {

        });
    },
    handleUppercase: function (e) {
        if (e.target.value[0] != e.target.value[0].toUpperCase()) {
            e.target.value = e.target.value[0].toUpperCase() + e.target.value.substring(1);
        }
    },
    getFormData: function () {
        var data = $('#inputProfession').select2('data')[0];
        var contacts = [];
        var contact = {
            email: $('#inputEmail').val(),
            firstName: $('#inputFirstName').val(),
            lastName: $('#inputLastName').val(),
            profession: data.text,
            invitation: $('input[name="invite-check"]').bootstrapSwitch('state')
        }
        contacts.push(contact);
        var data = {
            id: $('#id').val(),
            contacts: contacts,
            service: 'Add New Contact'
        }
        return data;
    },
    handleNewContactSubmit: function (e) {
        e.preventDefault()
        var profession = $('#inputProfession').select2('data')[0];
        console.log("addNewContact:handleNewContactSubmit:");
        console.log($('#inputProfession').select2('data'));
        console.log(profession.text);
        console.log($("#newContactProfessionalButton").prop('checked'));
        console.log($('input[name="invite-check"]').bootstrapSwitch('state'));
        if ($('#inputEmail').val() != '' && $('#inputFirstName').val() != '' && $('#inputLastName').val() != '') {
            if ($("#newContactProfessionalButton").prop('checked') == true && (profession.text == '' || profession.text == null)) {
                $('#formValidationError').slideDown(500);
                document.getElementById("formValidationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\">Missing fields!</label></div>";
                $('#formValidationError').delay(5000).slideUp(500);
                return null;
            }
            var data = this.getFormData();
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $('#formValidationError').slideDown(500);
            document.getElementById("formValidationError").innerHTML = "<div class=\"alert alert-warning\" role=\"alert\"><label className=\"error\">Creating new contact  <i class=\"fa fa-cog fa-spin fa-fw\"></i></label></div>";
            $.ajax({
                type: "POST",
                url: "/createNewContact",
                data: formData,
                success: function(result){
                    var data = result;
                    this.props.populateResults(data);
                    this.handleNewContactReset();
                    this.handleNewContactClose();
                }.bind(this),
                error: function(request, status, error) {
                    $('#formValidationError').slideDown(500);
                    document.getElementById("formValidationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\">Something went wrong. Try again!</label></div>";
                    $('#formValidationError').delay(5000).slideUp(500);
                },
                complete: function(){
                    $('#formValidationError').slideUp(500);
                },
                dataType: "json",
                contentType : "application/json"
            });
            // this.populateNewContact(data);
        } else {
            $('#formValidationError').slideDown(500);
            document.getElementById("formValidationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\">Missing fields!</label></div>";
            $('#formValidationError').delay(5000).slideUp(500);
            return null;
        }
    },
    handleNewContactReset: function() {
        $('#inputEmail').val('');
        $('#inputFirstName').val('');
        $('#inputLastName').val('');
        $("#inputProfession").val('').trigger('change');
        $('#newContactConsumerButton').prop('checked', true);
        $('#newContactProfessionalButton').prop('checked', false);
        $('input[name="invite-check"]').bootstrapSwitch('state', true, true);
        $('.btn-group #labelNewContactProfessionalButton').removeClass('active');
        $('.btn-group #labelNewContactConsumerButton').addClass('active');
        $('#inputProfessionDiv').hide();
    },
    handleNewContactClose: function() {
        $('#new-contact').collapse("toggle");
    },
    render() {
        let privateSwitch = 'checked';
        return (
            <div id="new-contact" className="collapse">
                <div className="well">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h3 className="panel-title">Create New Contact</h3></div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <div className="btn-group btn-group-sm" data-toggle="buttons">
                                        <label id="labelNewContactConsumerButton" className="btn btn-primary active">
                                            <input type="radio" name="consumerType" ref="newContactConsumer" id="newContactConsumerButton" onChange="" autoComplete="off" checked="checked">Consumer</input>
                                        </label>
                                        <label id="labelNewContactProfessionalButton" className="btn btn-primary">
                                            <input type="radio" name="consumerType" ref="newContactProfessional" id="newContactProfessionalButton" autoComplete="off">Professional</input>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="inputEmail" className="sr-only">Email address</label>
                                    <input type="email" id="inputEmail" ref="inputEmail" className="form-control" placeholder="Email address" required="required" autofocus="autofocus" />
                                </div>
                                <div className="form-group">
                                    <label for="inputFirstName" className="sr-only">First name</label>
                                    <input type="text" id="inputFirstName" ref="inputFirstName" className="form-control" placeholder="First name" required="required" onBlur={this.handleUppercase} />
                                </div>
                                <div className="form-group">
                                    <label for="inputLastName" className="sr-only">Last Name</label>
                                    <input type="text" id="inputLastName" ref="inputLastName" className="form-control" placeholder="Last Name" required="required" onBlur={this.handleUppercase}  />
                                </div>
                                <div className="form-group" id="inputProfessionDiv">
                                    <select id="inputProfession" ref="inputProfession" className="js-example-placeholder-single form-control"  style={selectResponsive2}>
                                        <option value="">Profession</option>
                                    </select>
                                </div>
                                <div className="form-group text-left" id="sendInviteDiv">
                                    <label for="visible" className="control-label margin-right-10">Send Invite</label>
                                    <input type="checkbox" name="invite-check" ref="invite-check" checked={privateSwitch} data-size="small" />
                                </div>
                                <button className="btn btn-small btn-primary btn-space" onClick={this.handleNewContactSubmit} type="button">Submit</button>
                                <button className="btn btn-small btn-default btn-space" onClick={this.handleNewContactReset} type="button">Reset</button>
                                <button className="btn btn-small btn-default btn-space" onClick={this.handleNewContactClose} type="button">Close</button>
                            </div>
                        </div>
                        <div className="errorMessage" id="formValidationError"></div>
                    </div>
                </div>
            </div>
        )
    }
});