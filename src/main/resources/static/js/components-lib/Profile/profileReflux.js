'use strict';

var MyProfile = React.createClass({
    displayName: 'MyProfile',

    mixins: [reactAsync.Mixin, Reflux.ListenerMixin],

    getInitialStateAsync: function getInitialStateAsync(cb) {
        appActions.loadProfile(this.props.profile_id);
        profileStore.listen(function (data) {
            try {
                return cb(null, {
                    profile: data
                });
            } catch (err) {}
        });
    },

    getInitialState: function getInitialState() {
        return {
            user: [],
            firstName: '',
            lastName: ''
        };
    },
    componentDidMount: function componentDidMount() {
        $.get(this.props.source, (function (result) {
            var data = result;
            if (this.isMounted()) {
                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    user: data
                });
            }
        }).bind(this));

        this.listenTo(profileStore, this.refreshProfile);
        appActions.loadProfile(this.props.profile_id);
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (typeof nextProps.profile_id !== "undefined") {
            appActions.loadProfile(nextProps.profile_id);
        }
    },

    getURI: function getURI(profile_id) {
        return '/profile/' + profile_id;
    },
    refreshProfile: function refreshProfile(data) {
        if (typeof window !== 'undefined' && this.props.profile_id != '') {
            window.location = this.getURI(data.id);
        }
        this.setState({
            profile: data
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(HeaderResponsiveIn, null),
            React.createElement(Banner, null),
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { id: 'main' },
                    React.createElement(
                        'ol',
                        { className: 'breadcrumb' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            ' '
                        )
                    ),
                    React.createElement(ProfileContent, { firstName: this.state.firstName, lastName: this.state.lastName, user: this.state.user })
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

ReactDOM.render(React.createElement(MyProfile, { source: '/api/users/12' }), document.getElementById('content'));