var Reviews = React.createClass({
    displayName: 'Reviews',
    getInitialState: function() {
        return {
            user: [],
            count: 0
        };
    },
    componentWillMount: function() {
        var id = $('#id').val();
        var source = '/api/users/'+id;
        console.log(source);
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    user: result
                });
            }
        }.bind(this));
    },
    updateInbox: function(m) {
        console.log("Update Inbox " + m);
        this.setState({
            count: m
        });
    },
    render: function () {
        return (
            <div>
                <HeaderResponsiveIn user={this.state.user}  />
                <Banner />
                <div className="container">
                    <div id="main">
                        <ol className="breadcrumb">
                            <div className="row">
                                &nbsp;
                            </div>
                        </ol>
                        <div className="row profile-row" id="inbox-content">
                            <ReviewsContent  user={this.state.user}  />
                            <div className="col-lg-4">
                                <MyShortListPanel droppable={false} />
                                <NavigationPanel  />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <Reviews />,
    document.getElementById('content')
);