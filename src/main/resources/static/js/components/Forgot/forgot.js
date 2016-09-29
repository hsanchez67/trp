var ForgotForm = React.createClass({
    displayName: 'Forgot Form',
    getInitialState() {
        return {
            value: ''
        };
    },
    componentDidMount: function () {
          $('#inputEmail').on("focus", function() {
                 document.getElementById("errorMessage").innerHTML = "";
          });
    },
    render: function() {
        return (
            <div>
                <Header />
                <div className="Forgot">
                    <div className="Forgot-container">
                        <div className="container">
                            <form ref="form" className="form-forgot" action="/forgot" onSubmit={this.checkEmail} method="post">
                                <h2 className="form-forgot-heading">Forgot Password</h2>
                                <div className="forgot-wrap">
                                    <label for="inputEmail" className="sr-only">Email address</label>
                                    <input type="email" id="inputEmail" name="inputEmail" ref="inputEmail" className="form-control" placeholder="Email address" required="required" autofocus="autofocus" />
                                    <div className="help-block">Enter your e-mail address to reset your password.</div>
                                    <button className="btn btn-lg btn-primary btn-block" type="submit">Reset</button>
                                    <div className="errorMessage" id="errorMessage"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>a
                <Footer />
            </div>
        );
    },
    handleChange: function (e) {
        this.setState({
            value: e.target.value
        });
    },
    sendCommunication: function(e) {
        var system = this.handleSubmit(e);
        setTimeout(function() {
            window.location.href = "/forgotSuccess";
        }, 3000);
        system.done(function(result) {
            if (!$.isEmptyObject(result.toUser)) {
                console.log("Forgot email sent");
            }
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var data = this.getFormData();
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        return $.ajax({
            type: "POST",
            url: "/passwordHelp",
            data: formData,
            dataType: "json",
            contentType : "application/json"
        });

    },
    checkEmail: function(e) {
        e.preventDefault();
        var data = this.getFormData();
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        var t = this;
        $.ajax({
            type: "POST",
            url: "/checkUserExists",
            data: formData,
            success: function(result){
                if (!$.isEmptyObject(result.toUser)) {
                    t.sendCommunication(e);
                } else {
                    document.getElementById("errorMessage").innerHTML = "<div class=\"alert alert-danger\" style=\"padding: 10px\" role=\"alert\"><label className=\"error\">E-mail doesn't exist. Try again!</label></div>";
                }
            },
            error: function(request, status, error) {
                document.getElementById("errorMessage").innerHTML = "<div class=\"alert alert-danger\" style=\"padding: 10px\" role=\"alert\"><label className=\"error\">Something went wrong. Try again!</label></div>";
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    getFormData: function () {
        var data = {
            email: this.refs.inputEmail.getDOMNode().value
        }
        return data;
    }
});

ReactDOM.render(
    <ForgotForm />,
    document.getElementById('content')
);