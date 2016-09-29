var ZillowSettings = React.createClass({
    displayName: 'ZillowSettings',
    getInitialState: function() {
        return {
            screenName: ''
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
            console.log('ZillowSettings:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getZillowScreenName",
                data: formData,
                success: function (result) {
                    console.log(result);
                    this.setState({
                        screenName: result.screenName
                    });
                }.bind(this),
                error: function (request, status, error) {
                    console.log(error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('ZillowSettings:prepareComponentState: No user');
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
            url: '/saveZillowScreenName',
            async:   true,
            data: formData,
            success: function(result){
                console.log("Saved successfully!" + result);
            },
            error: function(request, status, error) {
                console.log("Error saving data: " + error.toString());
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    getFormData: function () {
        return {
            id: '',
            zillowScreenName: this.refs.inputScreenName.getDOMNode().value
        };
    },
    onChange(e) {
        this.setState({ screenName: e.target.value });
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
                                    <label for="inputScreenName" className="col-sm-2 control-label">Screen Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" ref="inputScreenName" className="form-control" id="inputScreenName" value={this.state.screenName} onChange={this.onChange} placeholder="Screen Name" />
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