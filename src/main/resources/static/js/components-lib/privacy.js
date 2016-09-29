'use strict';

var divStyle = {
    width: '600px',
    margin: '0 auto',
    paddingBottom: '50px',
    color: '#ffffff',
    paddingTop: '30px'

};

var h1Style = {
    color: '#ffffff',
    fontFamily: '"Roboto", sans-serif',
    textAlign: 'center'
};

var h2Style = {
    display: 'block',
    fontSize: '1.5em',
    WebkitMarginBefore: '0.83em',
    WebkitMarginAfter: '0.83em',
    WebkitMarginStart: '0px',
    WebkitMarginEnd: '0px',
    fontWeight: 'bold',
    textAlign: 'left'
};

var aLink = {
    color: '#5ec2a5',
    borderBottom: '1px dotted #5ec2a5',
    textDecoration: 'none'
};

var liStyle = {
    display: 'list-item',
    textAlign: '-webkit-match-parent',
    listStyleType: 'decimal'
};

var olStyle = {
    display: 'block',
    listStyleType: 'decimal',
    WebkitMarginBefore: '1em',
    WebkitMarginAfter: '1em',
    WebkitMarginStart: '0px',
    WebkitMarginEnd: '0px',
    WebkitPaddingStart: '40px',
    textAlign: 'left',
    fontSize: '12px;'
};

var pStyle = {
    lineHeight: '1.5em',
    textAlign: 'left',
    fontSize: '12px',
    display: 'block',
    WebkitMarginBefore: '1em',
    WebkitMarginAfter: '1em',
    WebkitMarginStart: '0px',
    WebkitMarginEnd: '0px',
    paddingBottom: '0'
};

var alignCenter = {
    textAlign: 'center'
};
var mainDiv = {
    background: '#333333',
    background: '-moz-linear-gradient(top, #333333 0%, #000000 100%)',
    background: '-webkit-linear-gradient(top, #333333 0%,#000000 100%)',
    background: 'linear-gradient(to bottom, #333333 0%,#000000 100%)',
    filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#333333\', endColorstr=\'#000000\',GradientType=0 )'
};
var ContentForm = React.createClass({
    displayName: 'ContentForm',
    render: function render() {
        return React.createElement(
            'div',
            { style: mainDiv },
            React.createElement(Header, null),
            React.createElement(
                'div',
                { className: 'mainPage' },
                React.createElement(
                    'div',
                    { className: 'mainContentDarker' },
                    React.createElement(
                        'div',
                        { style: divStyle },
                        React.createElement(
                            'h1',
                            { style: h1Style },
                            'LATCH - dba - The Referral Portal'
                        ),
                        React.createElement(
                            'p',
                            { style: pStyle },
                            'This privacy policy discloses the privacy practices for www.thereferralportal.com. This privacy policy applies solely to information collected by this web site. It will notify you of the following:'
                        ),
                        React.createElement(
                            'ol',
                            { style: olStyle },
                            React.createElement(
                                'li',
                                { style: liStyle },
                                'What personally identifiable information is collected from you through the web site, how it is used and with whom it may be shared.'
                            ),
                            React.createElement(
                                'li',
                                { style: liStyle },
                                'What choices are available to you regarding the use of your data.'
                            ),
                            React.createElement(
                                'li',
                                { style: liStyle },
                                'The security procedures in place to protect the misuse of your information.'
                            ),
                            React.createElement(
                                'li',
                                { style: liStyle },
                                'How you can correct any inaccuracies in the information.'
                            )
                        ),
                        React.createElement(
                            'h2',
                            { style: h2Style },
                            'Information Collection, Use, and Sharing'
                        ),
                        React.createElement(
                            'p',
                            { style: pStyle },
                            'We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.'
                        ),
                        React.createElement(
                            'p',
                            { style: pStyle },
                            'We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.'
                        ),
                        React.createElement(
                            'p',
                            { style: pStyle },
                            'Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.'
                        ),
                        React.createElement(
                            'h2',
                            { style: h2Style },
                            'Your Access to and Control Over Information'
                        ),
                        React.createElement(
                            'p',
                            { style: pStyle },
                            'You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:'
                        ),
                        React.createElement(
                            'ol',
                            { style: olStyle },
                            React.createElement(
                                'li',
                                { style: liStyle },
                                'See what data we have about you, if any.'
                            ),
                            React.createElement(
                                'li',
                                { style: liStyle },
                                'Change/correct any data we have about you.'
                            ),
                            React.createElement(
                                'li',
                                { style: liStyle },
                                'Have us delete any data we have about you.'
                            ),
                            React.createElement(
                                'li',
                                { style: liStyle },
                                'Express any concern you have about our use of your data.'
                            )
                        ),
                        React.createElement(
                            'h2',
                            { style: h2Style },
                            'Security'
                        ),
                        React.createElement(
                            'p',
                            { style: pStyle },
                            'We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.'
                        ),
                        React.createElement(
                            'p',
                            { style: pStyle },
                            'Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a closed lock icon at the bottom of your web browser, or looking for "https" at the beginning of the address of the web page.'
                        ),
                        React.createElement(
                            'p',
                            { style: pStyle },
                            'While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.'
                        ),
                        React.createElement(
                            'h2',
                            { style: h2Style },
                            'Updates'
                        ),
                        React.createElement(
                            'p',
                            { style: pStyle },
                            'Our Privacy Policy may change from time to time and all updates will be posted on this page.'
                        ),
                        React.createElement(
                            'p',
                            { style: pStyle },
                            'If you feel that we are not abiding by this privacy policy, you should contact us immediately via telephone at 916-317-0097 or ',
                            React.createElement(
                                'a',
                                { style: aLink, href: 'mailto:info@thereferralportal.com' },
                                'info@thereferralportal.com'
                            ),
                            '.'
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

ReactDOM.render(React.createElement(ContentForm, null), document.getElementById('content'));