var PublicProfile = React.createClass({
    displayName: 'PublicProfile',
    getInitialState: function() {
        return {
            profileData: [],
            user: []
        };
    },
    componentWillMount: function () {
        var appId = $('#appId').val();
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5&appId="+appId;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        this.prepareComponentState();
    },
    prepareComponentState: function() {
        // Load profile data
        var profileId = $('#profileid').val();
        var data = {
            id: profileId
        };
        var formData = JSON.stringify(data, null, ' ');
        console.log('PublicProfile:prepareComponentState:formData');
        console.log(formData);
        this.serverRequest = $.ajax({
            type: "POST",
            url: "/findUserById",
            data: formData,
            success: function(result){
                if (!$.isEmptyObject(result)) {
                    console.log(result);
                    this.setState({
                        profileData: result
                    });
                }
            }.bind(this),
            error: function(request, status, error) {
                console.log(error);
            },
            dataType: "json",
            contentType : "application/json"
        });

        var userId = $('#userid').val();
        console.log(userId);
        if (userId != '') {
            var data = {
                id: userId
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log('PublicProfile:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/findUserById",
                data: formData,
                success: function(result){
                    if (!$.isEmptyObject(result)) {
                        console.log(result);
                        this.setState({
                            user: result
                        });
                    }
                }.bind(this),
                error: function(request, status, error) {
                    console.log(error);
                },
                dataType: "json",
                contentType : "application/json"
            });
        }
    },
    render: function () {
        var header;
        if ($.isEmptyObject(this.state.user)) {
            header = <ProfileHeader />;
        } else {
            header = <ProfileHeaderIn user={this.state.user} />
        }
        return (
            <div>
                {header}
                <ProfileBanner />
                <div className="container">
                    <div className="main">
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
                        <ProfileBody profile={this.state.profileData} />
                    </div>
                </div>
            </div>
        );
    },
});

ReactDOM.render(
    <PublicProfile />,
    document.getElementById('content')
);