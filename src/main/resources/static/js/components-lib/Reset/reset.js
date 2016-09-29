'use strict';

var displayNone = {
    display: 'none'
};

var ResetForm = React.createClass({
    displayName: 'ResetForm',

    getInitialState: function getInitialState() {
        return {
            user: [],
            score: 0
        };
    },
    componentWillMount: function componentWillMount() {
        var id = $('#id').val();
        var source = '/api/users/' + id;
        $.get(source, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    user: result
                });
            }
        }).bind(this));
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
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        if ($("#inputPassword").val() === $("#confirmPassword").val() && this.state.score > 34) {
            var data = this.getFormData();
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/changePassword",
                data: formData,
                success: function success(result) {
                    window.location.href = "/resetSuccess";
                },
                error: function error(request, status, _error) {
                    document.getElementById("passwordConfirmError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Something went wrong. Try again!</label></div>";
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            document.getElementById("passwordConfirmError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Password is not valid. Try again!</label></div>";
            $("#passwordConfirmError").alert();
            $("#passwordConfirmError").fadeTo(4000, 500).slideUp(500, function () {
                $("#passwordConfirmError").alert('close');
                document.getElementById("passwordConfirmError").innerHTML = "";
            });
            return null;
        }
    },
    getFormData: function getFormData() {
        var data = {
            id: $('#id').val(),
            email: ReactDOM.findDOMNode(this.refs.inputEmail).value,
            password: ReactDOM.findDOMNode(this.refs.inputPassword).value
        };
        return data;
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Header, null),
            React.createElement(
                'div',
                { className: 'ResetPage' },
                React.createElement(
                    'div',
                    { className: 'ResetPage-container' },
                    React.createElement(
                        'div',
                        { className: 'container' },
                        React.createElement(
                            'form',
                            { className: 'form-signin', id: 'form-signin', onSubmit: this.handleSubmit },
                            React.createElement(
                                'h2',
                                { className: 'form-signin-heading' },
                                'Reset Password'
                            ),
                            React.createElement(
                                'div',
                                { className: 'login-wrap' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputEmail', className: 'sr-only' },
                                        'Email address'
                                    ),
                                    React.createElement('input', { type: 'email', id: 'inputEmail', ref: 'inputEmail', className: 'form-control', placeholder: 'Email address', required: 'required', autofocus: 'autofocus', value: this.state.user.email })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputPassword', className: 'sr-only' },
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
                                        { htmlFor: 'inputPassword', className: 'sr-only' },
                                        'Password'
                                    ),
                                    React.createElement('input', { type: 'password', ref: 'confirmPassword', id: 'confirmPassword', className: 'form-control', placeholder: 'Confirm Password', required: 'required' }),
                                    React.createElement('div', { id: 'globalError', className: 'alert alert-danger', style: displayNone })
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
    }
});

ReactDOM.render(React.createElement(ResetForm, {}), document.getElementById('content'));