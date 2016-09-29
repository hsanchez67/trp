'use strict';

var ProfileHeader = React.createClass({ displayName: 'ProfileHeader',
    handleLogoClick: function handleLogoClick() {
        window.location.href = "/home";
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var data = this.getFormData();
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/login",
            data: formData,
            success: function success(result) {
                console.log(result);
                // var goto = result.id;
                // window.location.href = "/profile/"+goto;
            },
            error: function error(request, status, _error) {
                console.log(_error);
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    getFormData: function getFormData() {
        var data = {
            email: ReactDOM.findDOMNode(this.refs.email).value,
            password: ReactDOM.findDOMNode(this.refs.password).value
        };
        return data;
    },
    render: function render() {
        return React.createElement(
            'div',
            { id: 'wrapper' },
            React.createElement(
                'nav',
                { className: 'navbar navbar-inverse navbar-fixed-top', role: 'navigation' },
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'navbar-header' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar', 'aria-expanded': 'false', 'aria-controls': 'navbar' },
                            React.createElement(
                                'span',
                                { className: 'sr-only' },
                                'Toggle navigation'
                            ),
                            React.createElement('span', { className: 'icon-bar' }),
                            React.createElement('span', { className: 'icon-bar' }),
                            React.createElement('span', { className: 'icon-bar' })
                        ),
                        React.createElement(
                            'a',
                            { className: 'navbar-brand pointer', onClick: this.handleLogoClick },
                            React.createElement(Logo, null)
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'navigation', className: 'Header-nav navbar-collapse collapse', role: 'navigation' },
                        React.createElement(
                            'a',
                            { className: 'Navigation-link', href: '/#team', onClick: '' },
                            'About'
                        ),
                        React.createElement(
                            'a',
                            { className: 'Navigation-link', href: '/#footer', onClick: '' },
                            'Contact'
                        ),
                        React.createElement(
                            'span',
                            { className: 'Navigation-spacer' },
                            ' | '
                        ),
                        React.createElement(
                            'a',
                            { className: 'Navigation-link', href: '/login' },
                            'Log in'
                        ),
                        React.createElement(
                            'span',
                            { className: 'Navigation-spacer' },
                            'or'
                        ),
                        React.createElement(
                            'a',
                            { className: 'Navigation-link Navigation-link--highlight', href: '/register', onClick: '' },
                            'Sign up'
                        )
                    )
                )
            )
        );
    }
});