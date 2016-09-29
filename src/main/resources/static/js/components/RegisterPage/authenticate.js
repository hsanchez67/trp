var ContentForm = React.createClass({
    displayName: 'ContentForm',
    render: function () {
        return (
            <div>
                <Header />
                <div className="mainContent">
                    <h1>Congratulations!</h1>
                    <p>You account is now active</p>
                    <button className="btn btn-primary btn-lg btn-block" onClick={this.goHome}>Login now</button>
                </div>
                <Footer />
            </div>
        );
    },

    goHome: function() {
        window.location.href = "/login";
    }
});

ReactDOM.render(
    React.createElement(ContentForm, null),
    document.getElementById('content')
);