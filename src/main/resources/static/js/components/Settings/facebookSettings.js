var FacebookSettings = React.createClass({
    displayName: 'FacebookSettings',
    getInitialState: function() {
        return {
            user: [],
            url: '',
            appId: ''
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
            console.log('FacebookSettings:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getFacebookSettings",
                data: formData,
                success: function (result) {
                    console.log(result.access_token);
                    this.setState({
                        url: result.facebookPageUrl,
                        appId: result.facebookAppId
                    });
                }.bind(this),
                error: function (request, status, error) {
                    console.log(error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('FacebookSettings:prepareComponentState: No user');
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
            url: '/saveFacebookSettings',
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
            facebookPageUrl: this.refs.pageUrl.getDOMNode().value,
            facebookAppId: this.reffs.appId.getDOMNode().value
        };
    },
    onChangeUrl(e) {
        this.setState({
            url: e.target.value
        });
    },
    onChangeAppId(e) {
        this.setState({
            appId: e.target.value
        });
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
                                    <label for="pageUrl" className="col-sm-2 control-label">Page Url</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control input-medium" id="pageUrl" onChange={this.onChangeUrl} placeholder="Page Url" value={this.state.url} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="appId" className="col-sm-2 control-label">App Id</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control input-medium" id="appId" placeholder="App Id" onChange={this.onChangeAppId} value={this.state.appId} />
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