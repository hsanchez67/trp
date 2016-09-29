var ContentForm = React.createClass({
    displayName: 'ContentForm',
    render: function () {
        return (
            <div>
                <Header />
                <div className="mainContent">
                    <h1>Couldn't authenticate your account!</h1>
                    <p>Try again or please contact us</p>
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

ReactDOM.render(
    React.createElement(ContentForm, null),
    document.getElementById('content')
);