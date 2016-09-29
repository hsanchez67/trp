'use strict';

var MyProfile = React.createClass({
    displayName: 'MyProfile',
    getInitialState: function getInitialState() {
        return {
            profileData: [],
            user: [],
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function componentWillMount() {
        // var appId = 138763887098;  // I did it
        var appId = $('#appId').val();
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);js.id = id;
            js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5&appId=" + appId;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
        this.prepareComponentState(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.prepareComponentState(nextProps);
    },
    prepareComponentState: function prepareComponentState(props) {
        // Load profile data
        var profileid = $('#profileid').val();
        var profileSource = '/api/users/' + profileid;
        $.get(profileSource, (function (result) {
            console.log("MyProfile:componentWillMount:profileData: ");
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    profileData: result
                });
            }
        }).bind(this));
        // Load User
        var id = $('#id').val();
        var source = '/api/users/' + id;
        console.log(source);
        $.get(source, (function (result) {
            console.log("MyProfile:componentWillMount:user: ");
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    user: result
                });
            }
        }).bind(this));
    },
    handleAddUserToCurrentGroup: function handleAddUserToCurrentGroup(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(HeaderResponsiveIn, { user: this.state.user, handleAddUserToCurrentGroup: this.handleAddUserToCurrentGroup }),
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
                            React.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                React.createElement(
                                    'div',
                                    { className: 'breadcrumbs-div' },
                                    React.createElement(
                                        'ol',
                                        { className: 'breadcrumbs' },
                                        React.createElement(
                                            'li',
                                            null,
                                            this.state.profileData.firstName,
                                            ' ',
                                            this.state.profileData.lastName
                                        ),
                                        React.createElement(
                                            'li',
                                            null,
                                            this.state.profileData.profession
                                        ),
                                        React.createElement(
                                            'li',
                                            null,
                                            this.state.profileData.businessCity,
                                            ' ',
                                            this.state.profileData.businessState
                                        )
                                    )
                                )
                            ),
                            ' '
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row profile-row', id: 'home-content' },
                        React.createElement(ProfileContent, { profile: this.state.profileData }),
                        React.createElement(
                            'div',
                            { className: 'col-lg-4' },
                            React.createElement(MyShortListPanel, { shortlist: this.state.shortlist, droppable: true, addToCurrentGroup: this.state.addToCurrentGroup }),
                            React.createElement(NotificationsPanel, null)
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

ReactDOM.render(React.createElement(MyProfile, null), document.getElementById('content'));