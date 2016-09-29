var GooglePlusSettings = React.createClass({
    displayName: 'GooglePlusSettings',
    getInitialState: function() {
        return {
            googlePlusID: ''
        };
    },
    componentWillMount: function () {
        this.prepareComponentState(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
        this.prepareComponentState(nextProps);
    },
    prepareComponentState: function(props) {
        if (!$.isEmptyObject(props.user)) {
            var data = {
                id: props.user.id
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log('GooglePlusSettings:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getGooglePlusSettings",
                data: formData,
                success: function (result) {
                    console.log(result);
                    this.setState({
                        googlePlusID: result.googlePlusUserId
                    });
                }.bind(this),
                error: function (request, status, error) {
                    console.log(error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('GooglePlusSettings:prepareComponentState: No user');
        }
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var id = $('#id').val();
        var data = this.getFormData();
        data.id = id;
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $.ajax({
            type: "POST",
            url: '/saveGooglePlusId',
            async:   true,
            data: formData,
            success: function(result){
                console.log("Saved successfully!" + result);
                this.props.handleMessageResult(true);
            }.bind(this),
            error: function(request, status, error) {
                console.log("Error saving data: " + error.toString());
                this.props.handleMessageResult(false);
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    getFormData: function () {
        return {
            id: '',
            googlePlusId: this.refs.googlePlusID.getDOMNode().value
        };
    },
    onChange(e) {
        this.setState({ googlePlusID: e.target.value });
    },
    render: function () {
        return (
            <div className="row">
                <section className="panel">
                    <div className="panel-body panel-margin-top">
                        <form onSubmit={this.handleSubmit}>
                            <input type="hidden" name="id" ref="id" value={this.props.user.id} />
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label for="googlePlusID" className="col-sm-2 control-label">Google+ ID</label>
                                    <div className="col-sm-10">
                                        <input type="text" ref="googlePlusID" className="form-control" id="googlePlusID" value={this.state.googlePlusID} onChange={this.onChange} placeholder="Google Plus ID" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group pull-left">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
});