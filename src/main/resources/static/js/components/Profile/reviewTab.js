var ProfileReviewTab = React.createClass({
    displayName: 'ProfileReviewTab',
    render: function () {
        return (
            <div id="reviewsTab" className="row">
                <div className="col-lg-12">
                    <div className="panel">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-5">
                                    <ul id="myReviewTab" className="nav nav-pills nav-stacked">
                                        <li className="active text-left"><a href="#professional" data-toggle="tab">From Professionals <span className="margin-left-10">4.5 <span className="glyphicon glyphicon-star" aria-hidden="true"></span></span></a></li>
                                        <li className=""><a href="#consumers" data-toggle="tab">From Consumers</a></li>
                                        <li className=""><a href="#zillow" data-toggle="tab">From Zillow</a></li>
                                    </ul>
                                </div>
                                <div className="col-md-7">
                                    <div id="myReviewTabContent" className="tab-content">
                                        <div className="tab-pane fade active in" id="professional">
                                            <p>Professionals</p>
                                        </div>
                                        <div className="tab-pane fade" id="consumers">
                                            <p>Consumers</p>
                                        </div>
                                        <div className="tab-pane fade" id="zillow">
                                            <p>Zillow</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});