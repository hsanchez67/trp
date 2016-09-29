var Introduction = React.createClass({
    displayName: 'Introduction',
    getInitialState: function() {
        return {
            profileData: [],
            user: [],
            username: '',
            id: 0,
            profileid: 0,
            source: '',
            source2: '',
            score: 0,
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function() {
        var profileid = $('#profileid').val();
        var source = '/api/users/'+profileid;
        if (profileid != null && profileid != '') {
            $.get(source, function (result) {
                if (result != null) {
                    this.setState({
                        profile: result
                    });
                }
            }.bind(this));
        }
        var id = $('#id').val();
        console.log("Introduction:componentWillMount:id");
        console.log(id);
        var source2 = '/api/users/'+id;
        $.get(source2, function (result) {
            console.log("Introduction:componentWillMount:user");
            console.log(result);
            this.setState({
                user: result
            });
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
                        <div className="row" id="introduction-content">
                            <IntroductionContent  profile={this.state.profile} user={this.state.user}  />
                            <div className="col-lg-4">
                                <MyShortListPanel droppable={true} addToCurrentGroup={this.state.addToCurrentGroup} />
                                <NavigationPanel />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    },
});

ReactDOM.render(
    <Introduction />,
    document.getElementById('content')
);