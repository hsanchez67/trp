var LinkedIn = React.createClass({
    getInitialState: function() {
        return {
            proInfo: [],
        };
    },
    componentWillReceiveProps: function (nextProps) {
        console.log('LinkedIn:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - "+ this.props.profile.id);
        if (nextProps.profile.id != this.props.profile.id) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function(props) {
        if (!$.isEmptyObject(props.profile)) {
            var data = {
                id: props.profile.id
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log('LinkedIn:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getLinkedInProfile",
                data: formData,
                success: function (result) {
                    if (result != null) {
                        console.log(result);
                        this.setState({
                            proInfo: result
                        });
                    }
                }.bind(this),
                error: function (request, status, error) {
                    console.log(error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('LinkedIn:prepareComponentState: No user');
        }
    },
    render() {
        var linkedInOrOut;
        if (!$.isEmptyObject(this.state.proInfo) && this.state.proInfo.publicProfileUrl != null) {
            linkedInOrOut = <div id="external-media-panel" className="panel panel-default">
                <div className="panel-body panel-dark img-rounded">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-2">
                                <img className="img-rounded" src={this.state.proInfo.pictureUrl}/>
                            </div>
                            <div className="col-md-6 profile-bits">
                                <div className="linked-in-name"> {this.state.proInfo.formattedName}</div>
                                <div><i className="fa fa-black-tie"></i> {this.state.proInfo.headline}</div>
                                <div><i className="fa fa-map-pin"></i> {this.state.proInfo.loc}</div>
                                <div><i className="fa fa-linkedin"></i> <a
                                    href={this.state.proInfo.publicProfileUrl} target="_blank">See full profile</a>
                                </div>
                            </div>
                            <div className="col-md-3 linked-in-connections">
                                <div className="full-circle">
                                    {this.state.proInfo.numConnections}
                                    <div className="inner-circle-label">Connections</div>
                                </div>
                            </div>
                            <div className="col-md-1 media-logo">
                                <img src="/images/In-2C-41px-TM.png"/>
                            </div>
                        </div>
                        <div className="col-md-12 linked-in-summary">
                            <div className="pull-left">
                                {this.state.proInfo.summary}
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        } else {
            linkedInOrOut = <div className="panel-body panel-light img-rounded">
                <div className="row">
                    <div className="col-md-12">
                    </div>
                </div>
            </div>;
        }
        return (
            <div>
                {linkedInOrOut}
            </div>
        );
    }
});