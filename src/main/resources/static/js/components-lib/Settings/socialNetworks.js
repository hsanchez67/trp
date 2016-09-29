'use strict';

var SocialNetworks = React.createClass({
    displayName: 'SocialNetworks',
    componentDidMount: function componentDidMount() {
        var tab = this.getUrlParameter('t');
        if (tab == 'linkedin') {
            $('.nav-tabs a[href="#linkedin"]').tab('show');
        } else if (tab == 'instagram') {
            $('.nav-tabs a[href="#instagram"]').tab('show');
        }
    },
    getUrlParameter: function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    },
    handleMessageResult: function handleMessageResult(success) {
        if (success) {
            document.getElementById("messageDiv").innerHTML = "<div class=\"alert alert-success\" role=\"alert\"><label className=\"error\">Well done!</label> Settings saved.</div>";
        } else {
            document.getElementById("messageDiv").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"Oh snap!</label> Something went wrong.</div>";
        }
        $('#messageDiv').slideDown(500);
        $('#messageDiv').delay(5000).slideUp(500);
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'col-lg-12 col-md-12 col-xs-12' },
            React.createElement(
                'div',
                { className: 'panel panel-default' },
                React.createElement(
                    'header',
                    { className: 'panel-heading' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-8 col-md-offset-2 text-center' },
                            React.createElement(
                                'strong',
                                null,
                                'Online/Social Settings'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-2' },
                            React.createElement(
                                'a',
                                { className: 'video', title: 'Profile Settings - Online/Social', href: 'https://youtu.be/ZpsTwCluTzM' },
                                React.createElement('img', { className: 'video-icon pull-right', src: '/images/youTube.png', alt: 'Latch channel' })
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body' },
                    React.createElement(
                        'ul',
                        { id: 'myInsideTab', className: 'nav nav-tabs' },
                        React.createElement(
                            'li',
                            { className: 'active' },
                            React.createElement(
                                'a',
                                { href: '#facebook', 'data-toggle': 'tab' },
                                React.createElement('i', { className: 'fa fa-facebook' }),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    null,
                                    'Facebook'
                                )
                            )
                        ),
                        React.createElement(
                            'li',
                            { className: '' },
                            React.createElement(
                                'a',
                                { href: '#zillow', 'data-toggle': 'tab' },
                                React.createElement('i', { className: 'fa icon-zillow' }),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    null,
                                    'Zillow'
                                )
                            )
                        ),
                        React.createElement(
                            'li',
                            { className: '' },
                            React.createElement(
                                'a',
                                { href: '#linkedin', 'data-toggle': 'tab' },
                                React.createElement('i', { className: 'fa fa-linkedin' }),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    null,
                                    'Linked In'
                                )
                            )
                        ),
                        React.createElement(
                            'li',
                            { className: '' },
                            React.createElement(
                                'a',
                                { href: '#googleplus', 'data-toggle': 'tab' },
                                React.createElement(
                                    'i',
                                    { className: 'fa fa-google-plus' },
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    'Google Plus'
                                )
                            )
                        ),
                        React.createElement(
                            'li',
                            { className: '' },
                            React.createElement(
                                'a',
                                { href: '#instagram', 'data-toggle': 'tab' },
                                React.createElement(
                                    'i',
                                    { className: 'fa fa-instagram' },
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    'Instagram'
                                )
                            )
                        ),
                        React.createElement(
                            'li',
                            { className: '' },
                            React.createElement(
                                'a',
                                { href: '#socialconnect', 'data-toggle': 'tab' },
                                React.createElement(
                                    'i',
                                    { className: 'fa fa-sign-in' },
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    'Log-in As'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'myInsideTabContent', className: 'tab-content' },
                        React.createElement(
                            'div',
                            { className: 'tab-pane fade active in', id: 'facebook' },
                            React.createElement(FacebookSettings, { user: this.props.user })
                        ),
                        React.createElement(
                            'div',
                            { className: 'tab-pane fade', id: 'zillow' },
                            React.createElement(ZillowSettings, { user: this.props.user })
                        ),
                        React.createElement(
                            'div',
                            { className: 'tab-pane fade', id: 'linkedin' },
                            React.createElement(LinkedInSettings, { user: this.props.user })
                        ),
                        React.createElement(
                            'div',
                            { className: 'tab-pane fade', id: 'googleplus' },
                            React.createElement(GooglePlusSettings, { user: this.props.user, handleMessageResult: this.handleMessageResult })
                        ),
                        React.createElement(
                            'div',
                            { className: 'tab-pane fade', id: 'instagram' },
                            React.createElement(InstagramSettings, { user: this.props.user })
                        ),
                        React.createElement(
                            'div',
                            { className: 'tab-pane fade', id: 'socialconnect' },
                            React.createElement(SocialConnect, { user: this.props.user })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement('div', { id: 'messageDiv' })
                        )
                    )
                )
            )
        );
    }
});