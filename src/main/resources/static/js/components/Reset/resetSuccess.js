var ContentForm = React.createClass({
    displayName: 'ContentForm',
    render: function () {
        return (
            <div>
                <Header />
                <div className="mainContent">
                    <h1>Your password has been reset!</h1>
                    <p>Use the login process to access your account</p>
                    <button className="btn btn-primary btn-lg btn-block" onClick={this.goToLogin}>Login</button>
                </div>
                <Footer />
            </div>
        );
    },
    goToLogin: function() {
        window.location.href = "/login";
    }
});

ReactDOM.render(React.createElement(ContentForm, null),document.getElementById('content'));