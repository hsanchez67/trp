'use strict';

var LoginForm = React.createClass({
    displayName: 'LoginForm',

    getInitialState: function getInitialState() {
        return {
            value: ''
        };
    },
    componentDidMount: function componentDidMount() {
        if (window.location.href.indexOf("error") > -1) {
            $('#errorMessage').slideDown(500);
            document.getElementById("errorMessage").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\">Oh Snap!</label> Wrong e-mail or password. </div>";
            $('#errorMessage').delay(5000).slideUp(500);
        }
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Header, null),
            React.createElement(
                'div',
                { className: 'LoginPage' },
                React.createElement(
                    'div',
                    { className: 'LoginPage-container' },
                    React.createElement(
                        'div',
                        { className: 'container' },
                        React.createElement(
                            'form',
                            { ref: 'form', className: 'form-signin', action: '/login', /*onSubmit={this.handleSubmit}*/method: 'post' },
                            React.createElement(
                                'h2',
                                { className: 'form-signin-heading' },
                                'Log in now'
                            ),
                            React.createElement(
                                'div',
                                { className: 'login-wrap' },
                                React.createElement('div', { className: 'errorMessage', id: 'errorMessage' }),
                                React.createElement(
                                    'label',
                                    { 'for': 'inputEmail', className: 'sr-only' },
                                    'Email address'
                                ),
                                React.createElement('input', { type: 'email', id: 'username', name: 'username', ref: 'username', className: 'form-control', placeholder: 'Email address', required: 'required', autofocus: 'autofocus' }),
                                React.createElement(
                                    'label',
                                    { 'for': 'inputPassword', className: 'sr-only' },
                                    'Password'
                                ),
                                React.createElement('input', { type: 'password', id: 'password', name: 'password', ref: 'password', className: 'form-control', placeholder: 'Password', required: 'required' }),
                                React.createElement(
                                    'button',
                                    { className: 'btn btn-lg btn-primary btn-block', type: 'submit' },
                                    'Let me in'
                                ),
                                React.createElement(
                                    'span',
                                    { className: 'password-help pull-left' },
                                    React.createElement(
                                        'a',
                                        { href: '/forgot' },
                                        'Forgot Password?'
                                    )
                                ),
                                React.createElement(
                                    'span',
                                    { className: 'password-help pull-right' },
                                    React.createElement(
                                        'a',
                                        { href: '/verifyHelp' },
                                        'Verify Account'
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

ReactDOM.render(React.createElement(LoginForm, null), document.getElementById('content'));