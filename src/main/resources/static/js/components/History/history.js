var History = React.createClass({
    displayName: 'History',
    getInitialState: function() {
        return {
            user: []
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
    render: function () {
        return (
            <div>
                <HeaderResponsiveIn user={this.state.user} />
                <Banner />
                <div className="container">
                    <div id="main">
                        <ol className="breadcrumb">
                            <div className="row">
                                &nbsp;
                            </div>
                        </ol>
                        <div className="row profile-row" id="home-content">
                            <HistoryContent   />
                            <div className="col-lg-4">
                                <MyShortListPanel droppable={false} />
                                <NotificationsPanel />
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
    <History />,
    document.getElementById('content')
);