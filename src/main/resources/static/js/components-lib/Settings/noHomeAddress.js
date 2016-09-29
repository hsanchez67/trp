'use strict';

var backgroundWhite = {
    backgroundColor: '#ffffff'
};
var NoHomeAddressPanel = React.createClass({
    displayName: 'NoHomeAddressPanel',
    render: function render() {
        return React.createElement(
            'div',
            { className: 'panel panel-danger' },
            React.createElement(
                'div',
                { className: 'panel-heading' },
                React.createElement(
                    'header',
                    { className: 'panel-title' },
                    React.createElement(
                        'div',
                        { className: 'text-center' },
                        React.createElement('i', { className: 'fa fa-exclamation-triangle' }),
                        React.createElement(
                            'strong',
                            null,
                            ' Missing Personal Information'
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { id: 'profile-panel-body', className: 'panel-body text-left', style: backgroundWhite },
                React.createElement(
                    'strong',
                    null,
                    'Important!'
                ),
                ' Personal information is required to calculate your Latch Financial Stability score. Completing this information will also improve your Latch System Usage score! To enter your personal information please go to ',
                React.createElement(
                    'a',
                    { className: 'btn btn-link', href: '/settings#personal' },
                    'Settings'
                )
            )
        );
    }
});