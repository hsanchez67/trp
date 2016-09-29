var LoginForm = React.createClass({
    getInitialState() {
        return {
            value: ''
        };
    },
    componentDidMount: function() {
        if(window.location.href.indexOf("error") > -1) {
            $('#errorMessage').slideDown(500);
            document.getElementById("errorMessage").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\">Oh Snap!</label> Wrong e-mail or password. </div>";
            $('#errorMessage').delay(5000).slideUp(500);
        }
    },
    render: function() {
        return (
            <div>
                <Header />
                <div className="LoginPage">
                    <div className="LoginPage-container">
                        <div className="container">
                            <form ref="form" className="form-signin" action="/login" /*onSubmit={this.handleSubmit}*/ method="post">
                                <h2 className="form-signin-heading">Log in now</h2>
                                <div className="login-wrap">
                                    <div className="errorMessage" id="errorMessage"></div>
                                    <label for="inputEmail" className="sr-only">Email address</label>
                                    <input type="email" id="username" name="username" ref="username" className="form-control" placeholder="Email address" required="required" autofocus="autofocus" />
                                    <label for="inputPassword" className="sr-only">Password</label>
                                    <input type="password" id="password" name="password" ref="password" className="form-control" placeholder="Password"  required="required" />
                                    <button className="btn btn-lg btn-primary btn-block" type="submit">Let me in</button>
                                    <span className="password-help pull-left"><a href="/forgot">Forgot Password?</a></span>
                                    <span className="password-help pull-right"><a href="/verifyHelp">Verify Account</a></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    },

});

ReactDOM.render(
    <LoginForm />,
    document.getElementById('content')
);