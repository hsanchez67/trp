'use strict';

var ContentForm = React.createClass({ displayName: 'ContentForm',
    getInitialState: function getInitialState() {
        return {
            value: '',
            passwordMatch: false
        };
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Header, null),
            React.createElement(
                'div',
                { className: 'RegisterPage' },
                React.createElement(
                    'div',
                    { className: 'RegisterPage-container' },
                    React.createElement(
                        'div',
                        { className: 'container' },
                        React.createElement(
                            'form',
                            { className: 'form-signin', onSubmit: this.handleSubmit },
                            React.createElement(
                                'h2',
                                { 'class': 'form-signin-heading' },
                                'Please register'
                            ),
                            React.createElement(
                                'label',
                                { 'for': 'inputEmail', className: 'sr-only' },
                                'Email address'
                            ),
                            React.createElement('input', { type: 'email', id: 'inputEmail', ref: 'inputEmail', className: 'form-control', placeholder: 'Email address', required: 'required', autofocus: 'autofocus' }),
                            React.createElement(
                                'label',
                                { 'for': 'inputFirstName', className: 'sr-only' },
                                'First name'
                            ),
                            React.createElement('input', { type: 'text', id: 'inputFirstName', ref: 'inputFirstName', className: 'form-control', placeholder: 'First name', required: 'required' }),
                            React.createElement(
                                'label',
                                { 'for': 'inputLastName', className: 'sr-only' },
                                'Email address'
                            ),
                            React.createElement('input', { type: 'text', id: 'inputLastName', ref: 'inputLastName', className: 'form-control', placeholder: 'Last Name', required: 'required' }),
                            React.createElement(
                                'label',
                                { 'for': 'inputPassword', className: 'sr-only' },
                                'Password'
                            ),
                            React.createElement('input', { type: 'password', id: 'inputPassword', ref: 'inputPassword', className: 'form-control', placeholder: 'Password', required: 'required' }),
                            React.createElement(Input, {
                                type: 'password',
                                ref: 'confirmPass',
                                value: this.state.value,
                                bsStyle: this.validationState(),
                                hasFeedback: true,
                                placeholder: 'Confirm Password',
                                groupClassName: 'group-class',
                                onChange: this.handleChange,
                                onBlur: this.handleBlur,
                                required: true
                            }),
                            React.createElement(
                                'div',
                                { className: 'checkbox' },
                                React.createElement(
                                    'label',
                                    null,
                                    React.createElement('input', { type: 'checkbox', value: 'remember-me', ref: 'inputTaCs', required: 'required' }),
                                    ' I have read and understood the ',
                                    React.createElement(
                                        'a',
                                        { href: '' },
                                        'Terms of Use'
                                    )
                                )
                            ),
                            React.createElement(
                                'button',
                                { className: 'btn btn-lg btn-primary btn-block', type: 'submit' },
                                'Sign in'
                            ),
                            React.createElement('div', { className: 'errorMessage', id: 'passwordConfirmError' })
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    },

    validationState: function validationState() {
        /*var length = this.state.value.length
         if (length > 10) return 'success';
         else if (length > 5) return 'warning';
         else if (length > 0) return 'error';
         */
        var length = this.state.value.length;
        var value = this.state.value;
        if (length > 0 && value != this.refs.inputPassword.getDOMNode().value) {
            return 'error';
        } else if (length > 0 && value == this.refs.inputPassword.getDOMNode().value) {
            return 'success';
        } else {
            return '';
        }
    },

    handleChange: function handleChange(e) {
        // This could also be done using ReactLink:
        // http://facebook.github.io/react/docs/two-way-binding-helpers.html
        this.setState({
            value: e.target.value
        });
    },

    handleBlur: function handleBlur(e) {
        if (this.refs.inputPassword.getDOMNode().value !== this.state.value) {
            // e.target.value = ''; // clear confirm password
            this.refs.inputPassword.getDOMNode().value = '';
            this.refs.inputPassword.getDOMNode().focus();
            this.setState({ value: '', passwordMatch: false });
            document.getElementById("passwordConfirmError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Passwords don't match. Try again!</label></div>";
        } else {
            this.setState({ value: this.state.value, passwordMatch: true });
            document.getElementById("passwordConfirmError").innerHTML = "";
        }
        return null;
    },

    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        if (this.state.passwordMatch && this.refs.inputTaCs.getDOMNode().checked) {
            var data = this.getFormData();
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/registerUser",
                async: true,
                data: formData,
                success: function success(result) {
                    window.location.href = "/registerSuccess";
                },
                error: function error(request, status, _error) {
                    alert('Create registration error page');
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            return null;
        }
    },

    getFormData: function getFormData() {
        var data = {
            email: this.refs.inputEmail.getDOMNode().value,
            firstName: this.refs.inputFirstName.getDOMNode().value,
            lastName: this.refs.inputLastName.getDOMNode().value,
            password: this.refs.inputPassword.getDOMNode().value,
            acceptTerms: this.refs.inputTaCs.getDOMNode().checked
        };
        return data;
    }
});

ReactDOM.render(React.createElement(ContentForm, {}), document.getElementById('content'));