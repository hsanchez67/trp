var NavigationPanel = React.createClass({
    displayName: 'NavigationPanel',
    render: function () {
        return (
            <div id="navigation-panel">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <header className="panel-title">
                            <div className="text-center">
                                <strong>Shortcuts</strong>
                            </div>
                        </header>
                    </div>
                    <div className="panel-body">
                        <a href="/search">
                            <div className="panel-row">
                                 <div className="row">
                                     <div className="col-md-3 col-xs-3">
                                        <div className="navigation-symbol blue"><i className="fa fa-search"></i></div>
                                     </div>
                                     <div className="col-md-9 col-xs-9">
                                        <div className="navigation-text">Search for a Professional</div>
                                     </div>
                                 </div>
                            </div>
                        </a>
                        <a href="/introduction">
                            <div className="panel-row">
                                <div className="row">
                                    <div className="col-md-3 col-xs-3">
                                        <div className="navigation-symbol green"><i className="fa fa-share-alt"></i></div>
                                    </div>
                                    <div className="col-md-9 col-xs-9">
                                        <div className="navigation-text">Make an Introduction</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="/referral">
                            <div className="panel-row">
                                <div className="row">
                                    <div className="col-md-3 col-xs-3">
                                        <div className="navigation-symbol purple"><i className="fa fa-arrow-right"></i></div>
                                    </div>
                                    <div className="col-md-9 col-xs-9">
                                        <div className="navigation-text">Send a Referral</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="/reviews">
                            <div className="panel-row">
                                <div className="row">
                                    <div className="col-md-3 col-xs-3">
                                        <div className="navigation-symbol yellow"><i className="fa fa-thumbs-up"></i></div>
                                    </div>
                                    <div className="col-md-9 col-xs-9">
                                        <div className="navigation-text">NPS &amp; Reviews</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="/inbox">
                            <div className="panel-row">
                                <div className="row">
                                    <div className="col-md-3 col-xs-3">
                                        <div className="navigation-symbol red"><i className="fa fa-inbox"></i></div>
                                    </div>
                                    <div className="col-md-9 col-xs-9">
                                        <div className="navigation-text">Go to your Inbox</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    },
});