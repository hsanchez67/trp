'use strict';

var ProfileIntro = React.createClass({
    displayName: 'ProfileIntro',
    getInitialState: function getInitialState() {
        return {
            view: { showModal: false }
        };
    },
    openFacebook: function openFacebook() {
        window.open('https://www.facebook.com/i-did-it-143881716081/', '_blank');
    },
    openScoreDetails: function openScoreDetails() {
        this.setState({ view: { showModal: true } });
    },
    handleHideModal: function handleHideModal() {
        this.setState({ view: { showModal: false } });
    },
    goToProfile: function goToProfile() {
        window.open('/profile/' + this.props.profile.id, '_blank');
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'col-lg-12 col-md-12 col-xs-12' },
            React.createElement(
                'div',
                { className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { className: 'panel-heading' },
                    React.createElement(
                        'header',
                        { className: 'panel-title' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-9' },
                                    React.createElement(
                                        'div',
                                        { className: 'breadcrumbs-profileIntro-div' },
                                        React.createElement(
                                            'ol',
                                            { className: 'breadcrumbs' },
                                            React.createElement(
                                                'li',
                                                null,
                                                this.props.profile.firstName,
                                                ' ',
                                                this.props.profile.lastName
                                            ),
                                            React.createElement(
                                                'li',
                                                null,
                                                this.props.profile.profession
                                            ),
                                            React.createElement(
                                                'li',
                                                null,
                                                this.props.profile.city,
                                                ' ',
                                                this.props.profile.state
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-3 text-right' },
                                    React.createElement(
                                        'div',
                                        { className: 'btn-group' },
                                        React.createElement(
                                            'button',
                                            { type: 'button', onClick: this.goToProfile, className: 'btn btn-sm btn-primary' },
                                            'See Full Profile'
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(ProfileContentBody, { profile: this.props.profile })
            )
        );
    }
});