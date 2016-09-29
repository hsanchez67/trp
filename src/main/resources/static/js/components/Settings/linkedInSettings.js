var LinkedInSettings = React.createClass({
    displayName: 'LinkedInSettings',
    getInitialState: function() {
        return {
            user: [],
            accessToken: '',
            expiresIn: ''
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
            console.log('LinkedInSettings:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getLinkedInToken",
                data: formData,
                success: function (result) {
                    console.log(result.access_token);
                    this.setState({
                        accessToken: result.access_token,
                        expiresIn: this.getExpireDate(result.expires_in)
                    });
                }.bind(this),
                error: function (request, status, error) {
                    console.log(error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('LinkedInSettings:prepareComponentState: No user');
        }
    },
    getExpireDate: function(seconds) {
        return moment().add(seconds, 'seconds').format('dddd, MMM Do, H:mm:ss A');
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    handleAuthorize: function () {
        window.location.href = '/authorization/linkedin';
    },
    render: function () {
        return (
            <div className="row">
                <section className="panel">
                    <div className="panel-body panel-margin-top">
                        <form>
                            <input type="hidden" name="id" ref="id" value={this.props.user.id} />
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label for="inputAccessToken" className="col-sm-2 control-label">Access Token</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control input-medium" id="inputAccessToken" placeholder="Access Token" value={this.state.accessToken} disabled="true" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="inputExpiresIn" className="col-sm-2 control-label">Expires On</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control input-medium" id="inputExpiresIn" placeholder="Expires In" value={this.state.expiresIn} disabled="true"  />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group pull-left margin-top-20">
                                <div className="col-md-12">
                                    <a onClick={this.handleAuthorize} className="btn btn-block btn-social btn-linkedin">
                                        <i className="fa fa-linkedin"></i>
                                        Authorize Access to LinkedIn
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
});