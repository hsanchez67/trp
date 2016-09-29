var ContentForm = React.createClass({displayName: 'ContentForm',
    getInitialState() {
        return {
            value: '',
            disabled: false,
            style: 'primary'
        };
    },

    render: function() {
        return (
            <div>
                <Header />
                <div className="RegisterPage">
                    <div className="RegisterPage-container">
                        <div className="container">
                            <form className="form-signin">
                                <h2 class="form-signin-heading">Please register</h2>
                                <label for="inputEmail" className="sr-only">Email address</label>
                                <input type="email" id="inputEmail" ref="inputEmail" className="form-control" placeholder="Email address" required="required" autofocus="autofocus" />
                                <label for="inputFirstName" className="sr-only">First name</label>
                                <input type="text" id="inputFirstName" ref="inputFirstName" className="form-control" placeholder="First name" required="required" />
                                <label for="inputLastName" className="sr-only">Email address</label>
                                <input type="text" id="inputLastName" ref="inputLastName" className="form-control" placeholder="Last Name" required="required" />
                                <label for="inputPassword" className="sr-only">Password</label>
                                <input type="password" id="inputPassword" ref="inputPassword" className="form-control" placeholder="Password"  required="required" />
                                <label for="inputPassword2" className="sr-only">Confirm Password</label>
                                <input type="password" id="inputPassword2" ref="inputPassword2" className="form-control" onBlur={this.handleBlur}  placeholder="Confirm Password" required="required" />
                                <Input
                                    type="password"
                                    ref="confirmPass"
                                    value={this.state.value}
                                    bsStyle={this.validationState()}
                                    hasFeedback
                                    placeholder="Confirm Password"
                                    groupClassName="group-class"
                                    onChange={this.handleChange} />
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me" ref="inputTaCs" required="required" /> I have read and understood the <a href="">Terms of Use</a>
                                    </label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit} type="submit">Sign in</button>
                                <ButtonInput type="submit" value="Sign in" bbStyle={this.state.style} bsSize="large" block disabled={this.state.disabled} />
                                <div className="errorMessage" id="passwordConfirmError"></div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    },

    validationState() {
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
    handleChange: function (e) {
        // This could also be done using ReactLink:
        // http://facebook.github.io/react/docs/two-way-binding-helpers.html
        this.setState({
            value: e.target.value
        });
    },


    handleBlur: function () {
        if (this.refs.inputPassword.getDOMNode().value !== this.refs.inputPassword2.getDOMNode().value) {
            this.refs.inputPassword2.getDOMNode().value = '';
            this.refs.inputPassword.getDOMNode().value = '';
            this.refs.inputPassword.getDOMNode().focus();
            document.getElementById("passwordConfirmError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Passwords don't match.</label></div>";
        } else {
            document.getElementById("passwordConfirmError").innerHTML = "";
        }
        return null;
    },


    handleSubmit: function() {
        var data = this.getFormData();
        alert(JSON.stringify(data, null, ' '));
    },

    getFormData: function () {
        var data = {
            email: this.refs.inputEmail.getDOMNode().value,
            firstName: this.refs.inputFirstName.getDOMNode().value,
            lastName: this.refs.inputLastName.getDOMNode().value,
            password: this.refs.inputPassword.getDOMNode().value,
            password2: this.refs.inputPassword2.getDOMNode().value,
            acceptTerms: this.refs.inputTaCs.getDOMNode().checked
        }
        return data;
    },
});

React.render(
    React.createElement(ContentForm, {}),
    document.getElementById('content')
);