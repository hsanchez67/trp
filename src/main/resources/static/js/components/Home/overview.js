var HomeOverview = React.createClass({
    displayName: 'HomeOverview',
    gotoSearch: function() {
        window.location.href = '/search';
    },
    gotoIntroduction: function() {
        window.location.href = '/introduction';
    },
    gotoInbox: function() {
        window.location.href = '/inbox';
    },
    render: function () {
        return (
            <div className="col-lg-8">
                <div className="row state-overview">
                    <div className="col-lg-6 col-sm-6">
                        <section className="panel panel-main-action light-green">
                            <div id="panel" className="symbol green pointer" onCick={this.gotoIntroduction}>
                                <i className="fa fa-share-alt"></i>
                            </div>
                            <div className="value">
                                <h1 className="count">
                                    {this.props.allActivity}
                                </h1>
                                <p className="under-count-font">All Activity</p>
                                <div className="text-center">
                                    <a className="btn btn-link" href="/introduction">Introduce</a>  <a className="btn btn-link" href="/referral">Refer</a>
                                 </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                        <section className="panel  panel-main-action light-blue">
                            <div className="symbol blue pointer" onClick={this.gotoSearch} >
                                <i className="fa fa-search"></i>
                            </div>
                            <div className="value">
                                <h1 className=" count2">
                                    {this.props.yourNetwork}
                                </h1>
                                <p className="under-count-font">Professionals in Your Network</p>
                                <div className="text-center">
                                    <a className="btn btn-link" href="/search">Search for a Professional</a>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                        <section className="panel  panel-main-action light-yellow">
                            <div className="symbol yellow">
                                <i className="fa fa-thumbs-up"></i>
                            </div>
                            <div className="value">
                                <h1 className=" count3">
                                    {this.props.avgRating}
                                </h1>
                                <p className="under-count-font">Average Review Rating</p>
                                <div className="text-center">
                                    <a className="btn btn-link" href="/reviews">Reviews</a>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                        <section className="panel  panel-main-action light-red">
                            <div className="symbol red pointer" onClic={this.gotoInbox}>
                                <i className="fa fa-envelope"></i>
                            </div>
                            <div className="value">
                                <h1 className=" count4">
                                    {this.props.newMessages}
                                </h1>
                                <p className="under-count-font">New Messages</p>
                                <div className="text-center">
                                    <a className="btn btn-link" href="/inbox">Inbox</a>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div id="latch-score-graph" className="col-lg-6 col-sm-6">
                        <section className="panel panel-chart">
                            <div className="panel-heading">
                                <header className="panel-title">
                                    <div className="text-center">
                                        <strong>Your Latch Score <span className="color-red"> - sample data</span></strong>
                                    </div>
                                </header>
                            </div>
                            <div className="panel-body text-center">
                                <canvas id="line-sample" height="300"></canvas>
                            </div>
                        </section>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                        <section className="panel panel-chart">
                            <div className="panel-heading">
                                <header className="panel-title">
                                    <div className="text-center">
                                        <strong>NPS Score</strong>
                                    </div>
                                </header>
                            </div>
                            <div className="panel-body text-center">
                                <NPSChart nps={this.props.nps} />
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        );
    },
});