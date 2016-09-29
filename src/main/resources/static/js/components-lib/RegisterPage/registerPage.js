'use strict';

var displayNone = {
    display: 'none'
};

var ContentForm = React.createClass({ displayName: 'ContentForm',
    getInitialState: function getInitialState() {
        return {
            value: '',
            passwordMatch: false,
            score: 0
        };
    },
    componentDidMount: function componentDidMount() {
        $("#confirmPassword").keyup(function () {
            if ($("#inputPassword").val() !== $("#confirmPassword").val()) {
                $("#globalError").show().html("Password does not match!");
            } else {
                $("#globalError").html("").hide();
            }
        });

        var thisElem = this;

        var options = {
            common: {
                minChar: 8,
                onKeyUp: function onKeyUp(evt, data) {
                    thisElem.setState({
                        score: data.score
                    });
                }
            },
            usernameField: "#inputEmail",
            ui: {
                bootstrap3: true,
                showVerdictsInsideProgressBar: true,
                progressBarEmptyPercentage: 0,
                progressBarMinPercentage: 10,
                scores: [14, 26, 38, 50],
                showErrors: true,
                showStatus: true,
                errorMessages: {
                    wordLength: "Password must be at least 8 characters",
                    wordNotEmail: "Do not use your email as your password",
                    wordSequences: "Your password contains sequences",
                    wordLowercase: "Use lower case characters",
                    wordUppercase: "Require at least one upper case character",
                    wordOneNumber: "Require at least 1 number",
                    wordOneSpecialChar: "Require at least one special character"
                }
            }
        };
        $('#inputPassword').pwstrength(options);

        $('#confirmPassword').on("focus", function () {
            $("#globalError").html("").hide();
        });

        $('#inputPassword').on("focus", function () {
            $("#confirmPassword").val("");
            $("#globalError").html("").hide();
        });
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
                            { className: 'form-signin', id: 'form-signin', onSubmit: this.handleSubmit },
                            React.createElement(
                                'h2',
                                { className: 'form-signin-heading' },
                                'Please register now'
                            ),
                            React.createElement(
                                'div',
                                { className: 'login-wrap' },
                                React.createElement(
                                    'p',
                                    null,
                                    'Enter your personal details below'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { 'for': 'inputEmail', className: 'sr-only' },
                                        'Email address'
                                    ),
                                    React.createElement('input', { type: 'email', id: 'inputEmail', ref: 'inputEmail', className: 'form-control', placeholder: 'Email address', required: 'required', autofocus: 'autofocus' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { 'for': 'inputFirstName', className: 'sr-only' },
                                        'First name'
                                    ),
                                    React.createElement('input', { type: 'text', id: 'inputFirstName', ref: 'inputFirstName', className: 'form-control', placeholder: 'First name', required: 'required', onBlur: this.handleUppercase })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { 'for': 'inputLastName', className: 'sr-only' },
                                        'Email address'
                                    ),
                                    React.createElement('input', { type: 'text', id: 'inputLastName', ref: 'inputLastName', className: 'form-control', placeholder: 'Last Name', required: 'required', onBlur: this.handleUppercase })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { 'for': 'inputPassword', className: 'sr-only' },
                                        'Password'
                                    ),
                                    React.createElement('input', { type: 'password', id: 'inputPassword', ref: 'inputPassword', className: 'form-control', placeholder: 'Password', required: 'required' }),
                                    React.createElement('div', { id: 'passwordError', className: 'alert alert-danger', style: displayNone })
                                ),
                                React.createElement(
                                    'div',
                                    { id: 'confirmPasswordValidation', className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { 'for': 'inputPassword', className: 'sr-only' },
                                        'Password'
                                    ),
                                    React.createElement('input', { type: 'password', ref: 'confirmPassword', id: 'confirmPassword', className: 'form-control', placeholder: 'Confirm Password', required: 'required' }),
                                    React.createElement('div', { id: 'globalError', className: 'alert alert-danger', style: displayNone })
                                ),
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
                                    'Submit'
                                ),
                                React.createElement('div', { className: 'errorMessage', id: 'passwordConfirmError' })
                            )
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    },
    handleChange: function handleChange(e) {
        // This could also be done using ReactLink:
        // http://facebook.github.io/react/docs/two-way-binding-helpers.html
        this.setState({
            value: e.target.value
        });
    },
    handleUppercase: function handleUppercase(e) {
        if (e.target.value != "") {
            if (e.target.value[0] != e.target.value[0].toUpperCase()) {
                e.target.value = e.target.value[0].toUpperCase() + e.target.value.substring(1);
            }
        }
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var checked = ReactDOM.findDOMNode(this.refs.inputTaCs).checked;
        if ($("#inputPassword").val() === $("#confirmPassword").val() && this.state.score > 34 && checked) {
            var data = this.getFormData();
            console.log(data);
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            document.getElementById("passwordConfirmError").innerHTML = "<div class=\"alert alert-success\" role=\"alert\"><i class=\"fa fa-1x fa-cog fa-spin\"></i> <strong>Well done!</strong> Processing your request!</i></div>";
            $("#passwordConfirmError").show();
            $.ajax({
                type: "POST",
                url: "/registerUser",
                data: formData,
                success: function success(result) {
                    if (result.score != -1) {
                        document.getElementById("passwordConfirmError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\">User already exists. Try again or <a className=\"pointer\" href=\"\\login\"}>Log in</a></label></div>";
                    } else {
                        window.location.href = "/registerSuccess";
                    }
                },
                error: function error(request, status, _error) {
                    document.getElementById("passwordConfirmError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Something went wrong. Try again!</label></div>";
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else if (($("#inputPassword").val() !== $("#confirmPassword").val() || this.state.score <= 34) && checked) {
            document.getElementById("passwordConfirmError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Password is not valid. Try again!</label></div>";
            $("#passwordConfirmError").show();
            $("#passwordConfirmError").fadeTo(4000, 500).slideUp(500, function () {
                $("#passwordConfirmError").hide();
                document.getElementById("passwordConfirmError").innerHTML = "";
            });
            ReactDOM.findDOMNode(this.refs.inputPassword).value = "";
            ReactDOM.findDOMNode(this.refs.confirmPassword).value = "";
            ReactDOM.findDOMNode(this.refs.confirmPassword).focus();
            return null;
        } else if ($("#inputPassword").val() === $("#confirmPassword").val() && this.state.score > 34 && !checked) {
            document.getElementById("passwordConfirmError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> You must agree to the Terms of Use.</label></div>";
            $("#passwordConfirmError").show();
            $("#passwordConfirmError").fadeTo(4000, 500).slideUp(500, function () {
                $("#passwordConfirmError").hide();
                document.getElementById("passwordConfirmError").innerHTML = "";
            });
            return null;
        } else if ($("#inputPassword").val() !== $("#confirmPassword").val() && this.state.score <= 34 && !checked) {
            document.getElementById("passwordConfirmError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Please complete all fields.</label></div>";
            $("#passwordConfirmError").show();
            $("#passwordConfirmError").fadeTo(4000, 500).slideUp(500, function () {
                $("#passwordConfirmError").hide();
                document.getElementById("passwordConfirmError").innerHTML = "";
            });
            return null;
        }
    },

    getFormData: function getFormData() {
        var data = {
            email: ReactDOM.findDOMNode(this.refs.inputEmail).value,
            firstName: ReactDOM.findDOMNode(this.refs.inputFirstName).value,
            lastName: ReactDOM.findDOMNode(this.refs.inputLastName).value,
            password: ReactDOM.findDOMNode(this.refs.inputPassword).value,
            acceptTerms: ReactDOM.findDOMNode(this.refs.inputTaCs).checked
        };
        return data;
    }
});

ReactDOM.render(React.createElement(ContentForm, {}), document.getElementById('content'));