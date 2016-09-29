'use strict';

var ForgotForm = React.createClass({
    displayName: 'Forgot Form',
    getInitialState: function getInitialState() {
        return {
            value: ''
        };
    },
    componentDidMount: function componentDidMount() {
        $('#inputEmail').on("focus", function () {
            document.getElementById("errorMessage").innerHTML = "";
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Header, null),
            React.createElement(
                'div',
                { className: 'Forgot' },
                React.createElement(
                    'div',
                    { className: 'Forgot-container' },
                    React.createElement(
                        'div',
                        { className: 'container' },
                        React.createElement(
                            'form',
                            { ref: 'form', className: 'form-forgot', action: '/forgot', onSubmit: this.checkEmail, method: 'post' },
                            React.createElement(
                                'h2',
                                { className: 'form-forgot-heading' },
                                'Forgot Password'
                            ),
                            React.createElement(
                                'div',
                                { className: 'forgot-wrap' },
                                React.createElement(
                                    'label',
                                    { 'for': 'inputEmail', className: 'sr-only' },
                                    'Email address'
                                ),
                                React.createElement('input', { type: 'email', id: 'inputEmail', name: 'inputEmail', ref: 'inputEmail', className: 'form-control', placeholder: 'Email address', required: 'required', autofocus: 'autofocus' }),
                                React.createElement(
                                    'div',
                                    { className: 'help-block' },
                                    'Enter your e-mail address to reset your password.'
                                ),
                                React.createElement(
                                    'button',
                                    { className: 'btn btn-lg btn-primary btn-block', type: 'submit' },
                                    'Reset'
                                ),
                                React.createElement('div', { className: 'errorMessage', id: 'errorMessage' })
                            )
                        )
                    )
                )
            ),
            'a',
            React.createElement(Footer, null)
        );
    },
    handleChange: function handleChange(e) {
        this.setState({
            value: e.target.value
        });
    },
    sendCommunication: function sendCommunication(e) {
        var system = this.handleSubmit(e);
        setTimeout(function () {
            window.location.href = "/forgotSuccess";
        }, 3000);
        system.done(function (result) {
            if (!$.isEmptyObject(result.toUser)) {
                console.log("Forgot email sent");
            }
        });
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var data = this.getFormData();
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        return $.ajax({
            type: "POST",
            url: "/passwordHelp",
            data: formData,
            dataType: "json",
            contentType: "application/json"
        });
    },
    checkEmail: function checkEmail(e) {
        e.preventDefault();
        var data = this.getFormData();
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        var t = this;
        $.ajax({
            type: "POST",
            url: "/checkUserExists",
            data: formData,
            success: function success(result) {
                if (!$.isEmptyObject(result.toUser)) {
                    t.sendCommunication(e);
                } else {
                    document.getElementById("errorMessage").innerHTML = "<div class=\"alert alert-danger\" style=\"padding: 10px\" role=\"alert\"><label className=\"error\">E-mail doesn't exist. Try again!</label></div>";
                }
            },
            error: function error(request, status, _error) {
                document.getElementById("errorMessage").innerHTML = "<div class=\"alert alert-danger\" style=\"padding: 10px\" role=\"alert\"><label className=\"error\">Something went wrong. Try again!</label></div>";
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    getFormData: function getFormData() {
        var data = {
            email: this.refs.inputEmail.getDOMNode().value
        };
        return data;
    }
});

ReactDOM.render(React.createElement(ForgotForm, null), document.getElementById('content'));