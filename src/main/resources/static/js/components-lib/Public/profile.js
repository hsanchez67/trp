'use strict';

var PublicProfile = React.createClass({
    displayName: 'PublicProfile',
    getInitialState: function getInitialState() {
        return {
            profileData: [],
            user: []
        };
    },
    componentWillMount: function componentWillMount() {
        var appId = $('#appId').val();
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);js.id = id;
            js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5&appId=" + appId;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
        this.prepareComponentState();
    },
    prepareComponentState: function prepareComponentState() {
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
            success: (function (result) {
                if (!$.isEmptyObject(result)) {
                    console.log(result);
                    this.setState({
                        profileData: result
                    });
                }
            }).bind(this),
            error: function error(request, status, _error) {
                console.log(_error);
            },
            dataType: "json",
            contentType: "application/json"
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
                success: (function (result) {
                    if (!$.isEmptyObject(result)) {
                        console.log(result);
                        this.setState({
                            user: result
                        });
                    }
                }).bind(this),
                error: function error(request, status, _error2) {
                    console.log(_error2);
                },
                dataType: "json",
                contentType: "application/json"
            });
        }
    },
    render: function render() {
        var header;
        if ($.isEmptyObject(this.state.user)) {
            header = React.createElement(ProfileHeader, null);
        } else {
            header = React.createElement(ProfileHeaderIn, { user: this.state.user });
        }
        return React.createElement(
            'div',
            null,
            header,
            React.createElement(ProfileBanner, null),
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'main' },
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
                    React.createElement(ProfileBody, { profile: this.state.profileData })
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(PublicProfile, null), document.getElementById('content'));