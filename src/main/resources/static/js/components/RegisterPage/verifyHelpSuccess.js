var ContentForm = React.createClass({
    displayName: 'ContentForm',
    render: function () {
        return (
            <div>
                <Header />
                <div className="mainContent">
                    <h1>Help is on its way!</h1>
                    <p>Please check your email for a link to verify your account</p>
                    <button className="btn btn-primary btn-lg btn-block" onClick={this.goHome}>Home</button>
                </div>
                <Footer />
            </div>
        );
    },

    goHome: function() {
        window.location.href = "/";
    }
});

ReactDOM.render(React.createElement(ContentForm, null),document.getElementById('content'));