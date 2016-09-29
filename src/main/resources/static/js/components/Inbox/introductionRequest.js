var IntroductionRequest = React.createClass({
    displayName: 'IntroductionRequest',
    getInitialState: function() {
        return {
            user: [],
            subjectUserId: '',
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function() {
        var subjectUserId = $('#subjectUserId').val();
        this.setState({
            subjectUserId: subjectUserId
        });
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
    handleAddUserToCurrentGroup: function(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    render: function () {
        return (
            <div>
                <HeaderResponsiveIn user={this.state.user} handleAddUserToCurrentGroup={this.handleAddUserToCurrentGroup} />
                <Banner />
                <div className="container">
                    <div id="main">
                        <ol className="breadcrumb">
                            <div className="row">
                                &nbsp;
                            </div>
                        </ol>
                        <div className="row profile-row">
                            <IntroductionRequestContent  />
                            <div className="col-lg-4">
                                <MyShortListPanel droppable={false} addToCurrentGroup={this.state.addToCurrentGroup} />
                                <NavigationPanel />
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
    <IntroductionRequest />,
    document.getElementById('content')
);