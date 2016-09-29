var MyProfile = React.createClass({
    displayName: 'MyProfile',
    getInitialState: function() {
        return {
            profileData: [],
            user: [],
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function () {
        // var appId = 138763887098;  // I did it
        var appId = $('#appId').val();
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5&appId="+appId;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        this.prepareComponentState(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
        this.prepareComponentState(nextProps);
    },
    prepareComponentState: function(props) {
        // Load profile data
        var profileid = $('#profileid').val();
        var profileSource = '/api/users/'+profileid;
        $.get(profileSource, function(result) {
            console.log("MyProfile:componentWillMount:profileData: ");
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    profileData: result
                });
            }
        }.bind(this));
        // Load User
        var id = $('#id').val();
        var source = '/api/users/'+id;
        console.log(source);
        $.get(source, function(result) {
            console.log("MyProfile:componentWillMount:user: ");
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
                                <div className="col-lg-12">
                                    <div className="breadcrumbs-div">
                                        <ol className="breadcrumbs">
                                            <li>{this.state.profileData.firstName} {this.state.profileData.lastName}</li>
                                            <li>{this.state.profileData.profession}</li>
                                            <li>{this.state.profileData.businessCity} {this.state.profileData.businessState}</li>
                                        </ol>
                                    </div>
                                </div>&nbsp;
                            </div>
                        </ol>
                        <div className="row profile-row" id="home-content">
                            <ProfileContent  profile={this.state.profileData} />
                            <div className="col-lg-4">
                                <MyShortListPanel shortlist={this.state.shortlist} droppable={true} addToCurrentGroup={this.state.addToCurrentGroup} />
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
    <MyProfile />,
    document.getElementById('content')
);