var Facebook = React.createClass({
    getInitialState: function() {
        return {
            pageUrl: ''
        };
    },
    componentWillReceiveProps: function (nextProps) {
        console.log('Facebook:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - "+ this.props.profile.id);
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
            console.log('Facebook:prepareComponentState:formData');
            console.log(formData);

            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getFacebookSettings",
                data: formData,
                success: function (result) {
                    console.log(result);
                    this.setState({
                        pageUrl: result.facebookPageUrl
                    });
                }.bind(this),
                error: function (request, status, error) {
                    console.log(error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('Facebook:prepareComponentState: No user');
        }
    },
    render() {
        var pageUrl = this.state.pageUrl;
        var facebookInOrOut;
        if (pageUrl != '') {
            facebookInOrOut = <div className="panel-body panel-light img-rounded">
                <div className="row">
                    <div className="col-md-12">
                        <div className="fb-page" data-href={pageUrl} data-tabs="timeline,events,messages" data-width="500" data-height="1800" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"></div>
                    </div>
                </div>
            </div>;
        } else {
            facebookInOrOut = <div className="panel-body panel-light img-rounded">
                <div className="row">
                    <div className="col-md-12">
                    </div>
                </div>
            </div>;
        }
        return (
            <div>
                {facebookInOrOut}
            </div>
        );
    }
});