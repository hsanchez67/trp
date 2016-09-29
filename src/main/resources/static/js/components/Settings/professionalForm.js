var ProfessionalForm = React.createClass({
    displayName: 'ProfessionalForm',
    getInitialState: function() {
        return {
            autocomplete: null
        };
    },
    componentDidMount: function() {
        var input = document.getElementById('businessAddress1');
        var options = {
            componentRestrictions: {country: 'us'}
        }
        this.state.autocomplete = new google.maps.places.Autocomplete(input, options);
        this.state.autocomplete.addListener('place_changed', this.fillInAddress);
        this.populateAddress(this.props.user);
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.user != this.props.user) {
            this.populateAddress(nextProps.user);
        }
    },
    populateAddress: function (user) {
        if (!$.isEmptyObject(user)) {
            console.log("Populate business Address:");
            console.log(user);
            this.refs.businessName.value = user.businessName;
            this.refs.businessPhone.value = user.businessPhone;
            this.refs.businessAddress1.value = user.businessAddress1;
            this.refs.businessAddress2.value = user.businessAddress2;
            this.refs.businessCity.value = user.businessCity;
            this.refs.businessCounty.value = user.businessCounty;
            this.refs.businessState.value = user.businessState;
            this.refs.businessZip.value = user.businessZip;
        }
    },
    fillInAddress: function() {
        var place = this.state.autocomplete.getPlace();
        var route = '';
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            switch(addressType) {
                case 'street_number':
                    this.refs.businessAddress1.value = place.address_components[i]['short_name'];
                    break;
                case 'route':
                    this.refs.businessAddress1.value = this.refs.businessAddress1.value + ' ' + place.address_components[i]['long_name'];
                    break;
                case 'locality':
                    this.refs.businessCity.value = place.address_components[i]['long_name'];
                    break;
                case 'administrative_area_level_2':
                    this.refs.businessCounty.value = place.address_components[i]['long_name'];
                    break;
                case 'administrative_area_level_1':
                    this.refs.businessState.value = place.address_components[i]['short_name'];
                    break;
                case 'postal_code':
                    this.refs.businessZip.value = place.address_components[i]['long_name'];
                    break;
            }
        }
        console.log(place.address_components);
    },
    handleSubmit: function (e) {
        e.preventDefault();
        if ($('#businessPhoneFromGroup').hasClass("has-error")) {
            document.getElementById("save-alert-3").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> Please fix errors above.</label></div>";
            $("#save-alert-3").alert();
            $("#save-alert-3").fadeTo(4000, 500).slideUp(500, function () {
                $("#save-alert-3").alert('close');
                document.getElementById("save-alert-3").innerHTML = "";
            });
            $('#businessPhone').focus();
        } else {
            var id = $('#id').val();
            var source = '/saveUser';
            var data = this.getFormData();
            data.id = id;
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: source,
                async: true,
                data: formData,
                success: function (result) {
                    console.log("Saved successfully!" + result);
                    document.getElementById("save-alert-3").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> Saved Successfully.</label></div>";
                    $("#save-alert-3").alert();
                    $("#save-alert-3").fadeTo(4000, 500).slideUp(500, function () {
                        $("#save-alert-3").alert('close');
                        document.getElementById("save-alert-3").innerHTML = "";
                    })
                },
                error: function (request, status, error) {
                    console.log("Error saving data: " + error.toString());
                    document.getElementById("save-alert-3").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> An error occurred!</label></div>";
                    $("#save-alert-3").alert();
                    $("#save-alert-3").fadeTo(4000, 500).slideUp(500, function () {
                        $("#save-alert-3").alert('close');
                        document.getElementById("save-alert-3").innerHTML = "";
                    });
                },
                dataType: "json",
                contentType: "application/json"
            });
        }
    },
    getFormData: function () {
        return {
            id: 0,
            businessName: this.refs.businessName.getDOMNode().value,
            businessPhone: this.refs.businessPhone.getDOMNode().value,
            businessAddress1: this.refs.businessAddress1.getDOMNode().value,
            businessAddress2: this.refs.businessAddress2.getDOMNode().value,
            businessCity: this.refs.businessCity.getDOMNode().value,
            businessState: this.refs.businessState.getDOMNode().value,
            businessCounty: this.refs.businessCounty.getDOMNode().value,
            businessZip: this.refs.businessZip.getDOMNode().value
        };
    },
    validateBusinessPhone: function() {
        var ph = this.refs.businessPhone.getDOMNode().value;
        if (ph != "") {
            var validPhoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
            if (!validPhoneRegex.test(ph)) {
                $('#businessPhoneFromGroup').addClass("has-error");
                $('#businessPhoneHelpBlock').switchClass("hidden", "show");
                $('#businessPhone').focus();
            } else {
                $('#businessPhoneFromGroup').removeClass("has-error");
                $('#businessPhoneHelpBlock').switchClass("show", "hidden");
            }
        }
    },
    render: function () {
        var rtLicenseExpiration = $.datepicker.formatDate("mm/dd/yy", new Date(this.props.user.rtLicenseExpiration));
        return (
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <header className="panel-heading">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 text-center">
                                    <strong>Professional Settings</strong>
                                </div>
                                <div className="col-md-2">
                                    <a className="video" title="Profile Settings - Professional" href="https://youtu.be/bWQEKqQqwJ8"><img className="video-icon pull-right" src="/images/youTube.png" alt="Latch channel" /></a>
                                </div>
                            </div>
                        </header>
                        <div className="panel-body">
                            <div id="alertSection">
                                <div className="alert alert-info" role="alert"><strong>Heads up!</strong> Click fields below to edit</div>
                            </div>
                            <hr />
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label for="profession" className="col-sm-3 control-label">Profession</label>
                                    <div className="col-sm-5">
                                        <a href="#" id="profession" data-type="select" className="editable editable-click" data-title="Select your profession">{this.props.user.profession}</a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="license" className="col-sm-3 control-label">License</label>
                                    <div className="col-sm-5">
                                        <a href="#" id="license" data-type="text" className="editable editable-click" data-title="Enter your license number">{this.props.user.rtLicense}</a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="licenseExpiration" className="col-sm-3 control-label">License Expiration</label>
                                    <div className="col-sm-5">
                                        <a href="#" id="licenseExpiration" data-type="combodate" data-value={this.props.user.rtLicenseExpiration} data-pk="1" data-title="Select expiration date" className="editable editable-click">{rtLicenseExpiration}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel">
                            <header className="panel-heading">
                                Business Information
                            </header>
                            <div className="panel-body">
                                <form id="professionalForm" className="form-horizontal tasi-form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label className="col-lg-3 col-sm-3 control-label">Business Name</label>
                                        <div className="col-lg-8 col-sm-8">
                                            <input id="businessName" name="businessName" ref="businessName" type="text"  placeholder="business name" className="form-control"/>
                                        </div>
                                    </div>
                                    <div id="businessPhoneFromGroup" className="form-group">
                                        <label className="col-lg-3 col-sm-3 control-label">Phone</label>
                                        <div className="col-lg-8 col-sm-8">
                                            <input id="businessPhone" name="businessPhone" ref="businessPhone" onBlur={this.validateBusinessPhone} type="text"  placeholder="business phone" className="form-control"/>
                                            <div id="businessPhoneHelpBlock" className="help-block hidden">Please enter a valid phone number</div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-3 col-sm-3 control-label">Address 1</label>
                                        <div className="col-lg-8 col-sm-8">
                                            <input id="businessAddress1" name="businessAddress1" ref="businessAddress1" type="text"  placeholder="address 1" className="form-control"/>
                                            <div className="help-block">Street address, P.O. box, c/o</div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-3 col-sm-3 control-label">Address 2</label>
                                        <div className="col-lg-8 col-sm-8">
                                            <input id="businessAddress2" name="businessAddress2" ref="businessAddress2" type="text"  placeholder="address 2" className="form-control"/>
                                            <div className="help-block">Apartment, suite , unit, building, floor, etc.</div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-3 col-sm-3 control-label">City</label>
                                        <div className="col-lg-8 col-sm-8">
                                            <input id="businessCity" name="businessCity" ref="businessCity" type="text" placeholder="city" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-3 col-sm-3 control-label">County</label>
                                        <div className="col-lg-8 col-sm-8">
                                            <input id="businessCounty" name="businessCounty" ref="businessCounty" type="text" placeholder="county" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-3 col-sm-3 control-label">State</label>
                                        <div className="col-lg-8 col-sm-8">
                                            <input id="businessState" name="businessState" ref="businessState" type="text"  placeholder="state / province / region" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-3 col-sm-3 control-label">Zip Code</label>
                                        <div className="col-lg-8 col-sm-8">
                                            <input id="businessZip" name="businessZip" ref="businessZip" type="text"  placeholder="zip or postal code" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-lg-offset-2 col-lg-10 pull-right">
                                            <button type="submit" className="btn btn-primary">Save</button>&nbsp;&nbsp;
                                            <button type="button" className="btn btn-default">Cancel</button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <div id="save-alert-3"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
});