var ProfileHeader = React.createClass({displayName: 'ProfileHeader',
    handleLogoClick: function() {
        window.location.href = "/home"
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var data = this.getFormData();
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/login",
            data: formData,
            success: function(result){
                console.log(result);
                // var goto = result.id;
                // window.location.href = "/profile/"+goto;
            },
            error: function(request, status, error) {
                console.log(error);
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    getFormData: function () {
        var data = {
            email: ReactDOM.findDOMNode(this.refs.email).value,
            password: ReactDOM.findDOMNode(this.refs.password).value
        }
        return data;
    },
    render: function() {
        return (
            <div id="wrapper">
                <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand pointer" onClick={this.handleLogoClick}><Logo /></a>
                        </div>
                        <div id="navigation" className="Header-nav navbar-collapse collapse" role="navigation">
                            <a className="Navigation-link" href="/#team" onClick="">About</a>
                            <a className="Navigation-link" href="/#footer" onClick="">Contact</a>
                            <span className="Navigation-spacer"> | </span>
                            <a className="Navigation-link" href="/login">Log in</a>
                            <span className="Navigation-spacer">or</span>
                            <a className="Navigation-link Navigation-link--highlight" href="/register" onClick="">Sign up</a>

                        </div>
                    </div>
                </nav>
            </div>
        );
    }
});