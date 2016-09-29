'use strict';

var mainDiv = {
    padding: '0px',
    margin: '0px'
};

var displayNone = {
    display: 'none'
};

var tableMain = {
    width: '550px',
    padding: '10px',
    textAlign: 'center'
};

var OauthForm = React.createClass({
    displayName: 'OauthForm',
    render: function render() {
        return React.createElement(
            'div',
            { style: mainDiv },
            React.createElement(
                'div',
                { className: 'apimissing', style: displayNone },
                React.createElement(
                    'h1',
                    { className: 'apimissingtitle' },
                    'Missing ',
                    React.createElement('span', { className: 'titleservice' }),
                    ' APP configuration'
                ),
                React.createElement(
                    'table',
                    { style: tableMain, className: 'marTop55' },
                    React.createElement(
                        'tbody',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { colSpan: '2' },
                                React.createElement(
                                    'div',
                                    { className: 'guide' },
                                    'API keys were not added for ',
                                    React.createElement('span', { className: 'titleservice' }),
                                    ', to make this service work please create an APP at ',
                                    React.createElement('span', { className: 'titleservice' }),
                                    ' by going here ',
                                    React.createElement(
                                        'a',
                                        { href: '', id: 'linkapikey', target: '_blank' },
                                        'here'
                                    ),
                                    '. Need help in configuring? please view ',
                                    React.createElement(
                                        'a',
                                        { href: '', id: 'linkscreenshot', target: '_blank' },
                                        'screenshots'
                                    ),
                                    ' on how to create API key. '
                                )
                            )
                        ),
                        React.createElement(
                            'tr',
                            { className: 'apierror' },
                            React.createElement(
                                'td',
                                { colSpan: '2' },
                                React.createElement(
                                    'div',
                                    { className: 'apierrormsg' },
                                    'Please enter API key, API secret and callback url'
                                )
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { className: 'apitd' },
                                'API key'
                            ),
                            React.createElement(
                                'td',
                                { className: 'valuetd' },
                                React.createElement('input', { type: 'text', id: 'apikey' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { className: 'apitd' },
                                'Secret key'
                            ),
                            React.createElement(
                                'td',
                                { className: 'valuetd' },
                                React.createElement('input', { type: 'text', id: 'secretkey' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { className: 'apitd' },
                                'Callback url'
                            ),
                            React.createElement(
                                'td',
                                { className: 'valuetd' },
                                React.createElement('input', { type: 'text', id: 'callbackurl' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement('td', { className: 'apitd' }),
                            React.createElement(
                                'td',
                                null,
                                React.createElement(
                                    'div',
                                    { className: 'addbtn' },
                                    'Add'
                                )
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement('td', { className: 'apitd' }),
                            React.createElement(
                                'td',
                                { className: 'apimissingnote' },
                                'Note: You can always change the configuration by ',
                                React.createElement(
                                    'a',
                                    { href: '//socialinviter.com/#!/account', target: '_blank' },
                                    'login to your account'
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'loading', id: 'loadingStatus' },
                React.createElement(
                    'span',
                    { className: 'lbl', id: 'loadingtext' },
                    'Authenticating'
                ),
                React.createElement(
                    'span',
                    null,
                    React.createElement('img', { src: '//socialinviter.com/assets/img/icons/processing.gif' })
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(OauthForm, null), document.getElementById('content'));