var noMargin = {
    marginTop: 0,
    marginBottom: 0
}
var ProfilePanel = React.createClass({
    displayName: 'ProfilePanel',
    getInitialState: function() {
        return {
            reviews: [],
            reviewCount: 0,
            rating: 0,
            id: this.props.user.id,
            initials: ''
        };
    },
    componentDidMount: function() {
        $('.see-more').click(function(){
            $(this).text(function(i, text) {
                return text === "more..." ? "less..." : "more...";
            })
        });
    },
    componentWillReceiveProps: function (nextProps) {
        console.log("ProfilePanel:componentWillReceiveProps:");
        console.log(nextProps);
        console.log(this.props);
        if (nextProps.user != this.props.user) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function(props) {
        // Get reviews
        var data = {
            id: props.user.id
        }
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getReviewsForUser",
            async:   true,
            data: formData,
            success: function(result){
                console.log(result)
                if (result.page.totalElements > 0) {
                    this.setState({
                        reviews: result._embedded.reviewDTOList,
                        reviewCount: result.page.totalElements
                    });
                    this.calculateRating();
                } else {
                    this.setState({
                        reviews: [],
                        reviewCount: 0,
                        rating: 0
                    });
                }
            }.bind(this),
            dataType: "json",
            contentType : "application/json"
        });
        // get initials
        var name = props.user.firstName + ' ' + props.user.lastName;
        console.log(name);
        if (name != null) {
            var initials = name.match(/\b\w/g);
            console.log(initials);
            initials = (initials.shift() + initials.pop()).toUpperCase();
            console.log(initials);
            this.setState({initials: initials});
        }
    },
    calculateRating: function() {
        console.log("Calculate rating");
        var total = this.state.reviewCount;
        var sum = 0;
        var reviews = this.state.reviews;
        $.each(reviews, function(key, value) {
            if (value.overallRating != null) {
                sum = sum + value.overallRating;
            }
        })
        var rating = sum /total;
        console.log(rating);
        this.setState({
            rating: rating
        });
    },
    render: function () {
        if ($.isEmptyObject(this.props.user)) {
            return (
                <div id="profile-panel"></div>
            );
        } else {
            var leadParagraph = '';
            var description = '';
            if (this.props.user.leadParagraph != null && this.props.user.leadParagraph != "") {
                leadParagraph = this.props.user.leadParagraph;
            }
            if (this.props.user.description != null && this.props.user.description != "") {
                description = this.props.user.description;
            }
            var cityDisplay = '';
            if (this.props.user.businessCity != null && this.props.user.businessState != null) {
                cityDisplay = <span>
                                <small className="label label-warning label-as-location">{this.props.user.businessCity}, {this.props.user.businessState}</small>
                              </span>;
            }
            var moreButton = '';
            if (description != '' || leadParagraph != '') {
                moreButton = <div className="pull-right">
                    <a className="btn btn-primary btn-xs see-more" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" role="button">more...</a>
                </div>;
            }
            var profileAvatar = <img className="img-circle img-user" src={'/api/remoteFiles/view/' + this.props.user.avatar} />;
            if (this.props.user.avatar == 'default' && this.state.initials != '') {
                profileAvatar = <div className="avatar-circle-large"><img className="hidden" id={this.props.user.id} /><span className="initials-large">{this.state.initials}</span></div>;
            }
            return (
                <div id="profile-panel">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <header className="panel-title">
                                <div className="text-center">
                                    <strong>{this.props.user.firstName}</strong> {this.props.user.lastName}<strong>.</strong>
                                </div>
                            </header>
                        </div>
                        <div id="profile-panel-body" className="panel-body">
                            <div id="panel-compact" className="row">
                                <div className="col-lg-6">
                                    <div className="panel-body-left">
                                        <div className="text-center" id="user">
                                            {profileAvatar}
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-view" className="col-lg-6">
                                    <div className="panel-body-right">
                                        <div id="scoreChartDiv" className="canvas-score">
                                            <ScoreChart id={this.props.user.id}/>
                                        </div>
                                        <div className="text-center">
                                            <p className="score-label"><img src="/images/LATCH-Logo.png" className="Score-brandImg"/>Score</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center top-minus-20" id="user">
                                <div className="col-lg-12 col-lg-offset-2 col-md-12 col-md-offset-4 col-sm-12 col-xs-12">
                                    <div id="profile-content">
                                        <div className="profile-stars">
                                            <div className="profile-review-stars"><ReviewStars fontSize={'26px'} rating={this.state.rating}/></div>
                                            <div className="profile-head-title">({this.state.reviewCount} reviews)</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12"><h3>{this.props.user.profession}</h3></div>
                                <div className="col-lg-12"><h4 style={noMargin}>{this.props.user.businessName}</h4></div>
                                <div className="col-lg-12">
                                    {cityDisplay}
                                </div>
                                <div className="sosmed-user col-lg-12">
                                    <a href="#"><i className="fa fa-facebook" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter"></i></a>
                                    <a href="#"><i className="fa fa-google-plus" data-toggle="tooltip" data-placement="top" title="" data-original-title="Google Plus"></i></a>
                                    <a href="#"><i className="fa fa-linkedin" data-toggle="tooltip" data-placement="top" title="" data-original-title="Linkedin"></i></a>
                                </div>
                                <div className="clearfix" id="accordion">
                                    <div className="clear">
                                        {moreButton}
                                    </div>
                                    <div id="collapseOne" className="panel-collapse collapse">
                                        <div id="profile-panel-body-collapse" className="panel-body">
                                            <div className="lead">{leadParagraph}</div>
                                            <div className="mainText bottom10">
                                                <div dangerouslySetInnerHTML={{__html: marked(description)}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    },
});
