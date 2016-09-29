var SocialConnect = React.createClass({
    displayName: 'SocialConnect',
    render: function () {
        return (
            <div className="row">
                <section className="panel">
                    <div className="panel-body">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <div className="col-md-6 col-md-offset-3">
                                    <a className="btn btn-block btn-social btn-facebook">
                                        <i className="fa fa-facebook"></i>
                                        Sign in with Facebook
                                    </a>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-6 col-md-offset-3">
                                    <a className="btn btn-block btn-social btn-linkedin">
                                        <i className="fa fa-linkedin"></i>
                                        Sign in with LinkedIn
                                    </a>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-6 col-md-offset-3">
                                    <a className="btn btn-block btn-social btn-pinterest">
                                        <i className="fa fa-pinterest"></i>
                                        Sign in with Pinterest
                                    </a>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-6 col-md-offset-3">
                                    <a className="btn btn-block btn-social btn-twitter">
                                        <i className="fa fa-twitter"></i>
                                        Sign in with Twitter
                                    </a>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-6 col-md-offset-3">
                                    <a className="btn btn-block btn-social btn-zillow">
                                        <i className="fa icon-zillow"></i>
                                        Sign in with Zillow
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
});