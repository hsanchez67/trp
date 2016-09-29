'use strict';

var pStyle = {
    color: '#fff',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '300',
    fontSize: '20px',
    letterSpacing: '1px'
};

var divStyle = {
    width: '300px',
    margin: '0 auto'
};

var tableWidth = {
    width: '300px'
};

var tdWidth = {
    width: '100px'
};

var aDims = {
    width: '61px',
    height: '61px'
};

var ContentForm = React.createClass({
    displayName: 'ContentForm',
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Header, null),
            React.createElement(
                'div',
                { className: 'mainPage' },
                React.createElement(
                    'div',
                    { className: 'mainContentDark' },
                    React.createElement(
                        'div',
                        { className: 'splash-image' },
                        React.createElement('img', { src: '/images/latch-2-coming-soon.png', alt: 'Latch 2.0 Coming Soon!' })
                    ),
                    React.createElement(
                        'p',
                        { style: pStyle },
                        'Follow our progress!'
                    ),
                    React.createElement(
                        'div',
                        { style: divStyle },
                        React.createElement(
                            'table',
                            { style: tableWidth },
                            React.createElement(
                                'tbody',
                                null,
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'td',
                                        { style: tdWidth },
                                        React.createElement(
                                            'a',
                                            { style: aDims, href: 'https://www.facebook.com/LatchInc' },
                                            React.createElement('img', { src: '/images/icon-facebook.png', style: aDims })
                                        )
                                    ),
                                    React.createElement(
                                        'td',
                                        { style: tdWidth },
                                        React.createElement(
                                            'a',
                                            { href: 'https://twitter.com/latchinc' },
                                            React.createElement('img', { src: '/images/icon-twitter.png', style: aDims })
                                        )
                                    ),
                                    React.createElement(
                                        'td',
                                        { style: tdWidth },
                                        React.createElement(
                                            'a',
                                            { href: 'mailto:info@thereferralportal.com' },
                                            React.createElement('img', { src: '/images/icon-email.png', style: aDims })
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

ReactDOM.render(React.createElement(ContentForm, null), document.getElementById('content'));