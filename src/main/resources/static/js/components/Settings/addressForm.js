var AddressForm = React.createClass({
    displayName: 'AddressForm',
    getInitialState: function() {
        return {
            autocomplete: null,
            user: []
        };
    },
    componentDidMount: function() {
        var id = $('#id').val();
        var source = '/api/users/'+id;
        console.log(source);
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    user: result
                });
                this.populateAddress(result);
            }
        }.bind(this));

        var input = document.getElementById('address1');
        var options = {
            componentRestrictions: {country: 'us'}
        };
        this.state.autocomplete = new google.maps.places.Autocomplete(input, options);
        this.state.autocomplete.addListener('place_changed', this.fillInAddress);
    },
    populateAddress: function (user) {
        console.log("Populate Address:");
        console.log(user);
        this.refs.address1.value = user.address1;
        this.refs.address2.value = user.address2;
        this.refs.city.value = user.city;
        this.refs.county.value = user.county;
        this.refs.region.value = user.state;
        this.refs.postal_code.value = user.zip;
    },
    fillInAddress: function() {
        var place = this.state.autocomplete.getPlace();
        var route = '';
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            switch(addressType) {
                case 'street_number':
                    this.refs.address1.value = place.address_components[i]['short_name'];
                    break;
                case 'route':
                    this.refs.address1.value = this.refs.address1.value + ' ' + place.address_components[i]['long_name'];
                    break;
                case 'locality':
                    this.refs.city.value = place.address_components[i]['long_name'];
                    break;
                case 'administrative_area_level_2':
                    this.refs.county.value = place.address_components[i]['long_name'];
                    break;
                case 'administrative_area_level_1':
                    this.refs.region.value = place.address_components[i]['short_name'];
                    break;
                case 'postal_code':
                    this.refs.postal_code.value = place.address_components[i]['long_name'];
                    break;
            }
        }
        console.log(place.address_components);
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var id = $('#id').val();
        var source = '/saveUser';
        var data = this.getFormData();
        data.id = id;
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $.ajax({
            type: "POST",
            url: source,
            async:   true,
            data: formData,
            success: function(result){
                console.log("Saved successfully!" + result);
                document.getElementById("save-alert-2").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> Saved Successfully.</label></div>";
                $("#save-alert-2").alert();
                $("#save-alert-2").fadeTo(4000, 500).slideUp(500, function(){
                    $("#save-alert-2").alert('close');
                    document.getElementById("save-alert-2").innerHTML = "";
                })
            },
            error: function(request, status, error) {
                console.log("Error saving data: " + error.toString());
                document.getElementById("save-alert-2").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> An error occurred!</label></div>";
                $("#save-alert-2").alert();
                $("#save-alert-2").fadeTo(4000, 500).slideUp(500, function(){
                    $("#save-alert-2").alert('close');
                    document.getElementById("save-alert-2").innerHTML = "";
                });
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    getFormData: function () {
        return {
            id: 0,
            address1: this.refs.address1.getDOMNode().value,
            address2: this.refs.address2.getDOMNode().value,
            city: this.refs.city.getDOMNode().value,
            state: this.refs.region.getDOMNode().value,
            county: this.refs.county.getDOMNode().value,
            zip: this.refs.postal_code.getDOMNode().value
        };
    },
    render: function () {
        return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <header className="panel-heading">
                                <div className="row">
                                    <div className="col-md-8 col-md-offset-2 text-center">
                                        <strong>Home Address</strong>
                                    </div>
                                    <div className="col-md-2">
                                        <a className="video" title="Profile Settings - Personal" href="https://youtu.be/523AABWBAA4"><img className="video-icon pull-right" src="/images/youTube.png" alt="Latch channel" /></a>
                                    </div>
                                </div>
                            </header>
                            <div className="panel-body">
                                <div id="alertSection">
                                    <div className="alert alert-warning" role="alert"><strong>Important!</strong> This personal information is required to calculate your Latch Financial Stability score. Completing this information will also improve your Latch System Usage score!</div>
                                </div>
                                <hr />
                                <form className="form-horizontal tasi-form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label className="col-lg-2 col-sm-2 control-label">Address 1</label>
                                        <div className="col-sm-9">
                                            <input id="address1" name="address1" ref="address1" type="text" placeholder="address 1"  className="form-control"/>
                                            <div className="help-block">Street address, P.O. box, company name, c/o</div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 col-sm-2 control-label">Address 2</label>
                                        <div className="col-sm-9">
                                            <input id="address2" name="address2" ref="address2" type="text" placeholder="address 2"  className="form-control"/>
                                            <div className="help-block">Apartment, suite , unit, building, floor, etc.</div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-sm-2 control-label">City</label>
                                        <div className="col-sm-9">
                                            <input id="city" name="city" ref="city" type="text" placeholder="city"  className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-sm-2 control-label">State</label>
                                        <div className="col-sm-9">
                                            <input id="region" name="region" ref="region" type="text" placeholder="state / province / region"  className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-sm-2 control-label">County</label>
                                        <div className="col-sm-9">
                                            <input id="county" name="county" ref="county" type="text" placeholder="county"  className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-sm-2 control-label">Zip Code</label>
                                        <div className="col-sm-9">
                                            <input id="postal_code" name="postal_code" ref="postal_code" type="text" placeholder="zip or postal code"  className="form-control"/>
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
                                            <div id="save-alert-2"></div>
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