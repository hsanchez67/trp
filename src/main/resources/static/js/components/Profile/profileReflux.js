var MyProfile = React.createClass({
    displayName: 'MyProfile',

    mixins: [reactAsync.Mixin, Reflux.ListenerMixin],

    getInitialStateAsync: function(cb) {
        appActions.loadProfile(this.props.profile_id)
        profileStore.listen(function(data) {
            try {
                return cb(null, {
                    profile: data
                })
            } catch(err) { }
        })
    },

    getInitialState: function() {
        return {
        	user: [],
            firstName: '',
            lastName: ''
        };
    },
    componentDidMount: function () {
        $.get(this.props.source, function(result) {
            var data = result;
            if (this.isMounted()) {
                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    user: data
                });
            }
        }.bind(this));

        this.listenTo(profileStore, this.refreshProfile)
        appActions.loadProfile(this.props.profile_id)

    },

    componentWillReceiveProps: function(nextProps) {
        if(typeof(nextProps.profile_id) !== "undefined") {
            appActions.loadProfile(nextProps.profile_id)
        }
    },

    getURI: function(profile_id) {
        return '/profile/' + profile_id
    },
    refreshProfile: function(data) {
        if(typeof(window) !== 'undefined' && this.props.profile_id != '') {
            window.location = this.getURI(data.id)
        }
        this.setState({
            profile: data
        })
    },

    render: function () {
        return (
            <div>
                <HeaderResponsiveIn />
                <Banner />
                <div className="container">
                    <div id="main">
                        <ol className="breadcrumb">
                            <div className="row">
                                &nbsp;
                            </div>
                        </ol>
                        <ProfileContent firstName={this.state.firstName} lastName={this.state.lastName} user={this.state.user} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    },
});

ReactDOM.render(
    <MyProfile source="/api/users/12" />,
    document.getElementById('content')
);