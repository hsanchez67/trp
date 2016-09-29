var ProfileContent = React.createClass({
    displayName: 'ProfileContent',
    getInitialState: function() {
        return {
            profile: this.props.profile,
            shortlist: [],
            tempScrolltop: 0,
            reviews: []
        };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        console.log("ProfileContent:shouldComponentUpdate:");
        console.log(nextProps);
        console.log(nextState);
        return nextState.tempScrolltop == 0;
       // return nextProps.tempScrolltop !== this.props.id;
    },
    componentDidMount: function() {
        $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
            this.setState({
                tempScrolltop:$(window).scrollTop()
            });
            console.log(this.state.tempScrolltop);
        }.bind(this));

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $(window).scrollTop(this.state.tempScrolltop);
        }.bind(this));
    },
    componentWillMount: function () {
        console.log("ProfileContent:componentWillMount:");
        this.prepareComponentState(this.props);
        $('.nav-pills a[href="#linkedin"]').tab('show');
    },
    componentWillReceiveProps: function (nextProps) {
        console.log("ProfileContent:componentWillReceiveProps:");
        this.prepareComponentState(nextProps);
    },
    prepareComponentState: function(props) {
        console.log("ProfileContent:prepareComponentState:");
        if (!$.isEmptyObject(props.profile) && $.isEmptyObject(this.state.profile)) {
            this.setState({
                profile: props.profile
            });
        }
    },
    openFacebook: function () {
        window.open(
            'https://www.facebook.com/i-did-it-143881716081/',
            '_blank'
        );
    },
    introduceMe: function() {
        window.location.href = '/introduction/' +this.props.profile.id;
    },
    sendMessage: function() {
        window.location.href = '/sendMessage/' +this.props.profile.id;
    },
    goToPublicProfile: function() {
        // window.location.href = '/public/' +this.props.profile.profileName;
        window.open(
            'https://thereferralportal.com/public/' +this.state.profile.profileName,
            '_blank'
        );
    },
    addToShorlist: function(id) {
        var contacts = [];
        var contact = {
            'id': this.props.profile.id
        };
        contacts.push(contact);
        var id = $('#id').val();
        var data = {
            id: id,
            groupId: 'shortlist',
            users: contacts
        }
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/addToShortList",
            data: data,
            success: function(result){
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({shortlist: result.users});
                }
                document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> You successfully added  " + this.state.profile.firstName + " " + this.state.profile.lastName + " to your Shortlist!</label></div>";
                $("#content-results").alert();
                $("#content-results").fadeTo(4000, 500).slideUp(500, function(){
                    $("#content-results").alert('close');
                    document.getElementById("content-results").innerHTML = "";
                });
            }.bind(this),
            error: function(error) {
                console.log("error: " + error.toString());
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    addToMyNetwork: function(id) {
        var contacts = [];
        var contact = {
            'id': this.props.profile.id
        };
        contacts.push(contact);
        var id = $('#id').val();
        var data = {
            id: id,
            groupId: 'my-network',
            users: contacts
        }
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/addToShortList",
            data: data,
            success: function(result){
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({shortlist: result.users});
                }
                document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> You successfully added  " + this.state.profile.firstName + " " + this.state.profile.lastName + " to your Network!</label></div>";
                $("#content-results").alert();
                $("#content-results").fadeTo(4000, 500).slideUp(500, function(){
                    $("#content-results").alert('close');
                    document.getElementById("content-results").innerHTML = "";
                });
            }.bind(this),
            error: function(error) {
                console.log("error: " + error.toString());
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    displayReviews: function(reviews) {
        this.setState({reviews: reviews});
    },
    whyCertified: function () {
        bootbox.dialog({
            title: "Latch Certified Reviews",
            message: '<div class="bootbox-logo-middle"><img class="img-responsive" src="/images/LATCH-Logo-reviews.png" /></div><div class="text-left">LATCH Certified reviews are reviews that originated from a user on the LATCH platform. The review itself could have been manually triggered by the professional using the LATCH platform or automatically generated by the LATCH review engine itself. Reviews with this emblem are certified to be authentic and accurate.</div>'
        });
    },
    showReviews: function(review) {
        console.log("ProfileContent:ShowReviews:");
        console.log(review);
        const results = [];
        if (review.overallRating != null && review.reviewComments != "") {
            var created = new Date(review.completeTime);
            var createDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
            results.push(
                <li className="list-group-item" key={review.id}>
                    <div className="review-date">{createDate}</div>
                    <div className="review-badge"><a onClick={this.whyCertified} className="pointer"><img src="/images/LATCH-Logo-reviews.png" alt="Latch Certified" /></a></div>
                    <div className="review-stars"><ReviewStars fontSize={'20px'} rating={review.overallRating}/></div>
                    <div className="review-summary">Written by <a className="reviewer-link" href={'/profile/' + review.reviewerUserId} target="_blank">{review.reviewer.firstName} {review.reviewer.lastName}</a></div>
                    <div className="review-description">{review.reviewComments}</div>
                </li>
            );
        }
        return results;
    },
    render: function () {
        var userId = $('#id').val();
        var actionButton = <div className="btn-group">
            <button type="button" className="btn btn-primary btn-sm dropdown-toggle"
                    data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                Action <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
                <li><a onClick={this.introduceMe}>Introduce {this.state.profile.firstName}...</a></li>
                <li><a onClick={this.sendMessage}>Send a message...</a></li>
                <li><a onClick={this.addToShorlist}>Add to Shortlist</a></li>
                <li><a onClick={this.addToMyNetwork}>Add to My Network</a></li>
                <li><a onClick={this.goToPublicProfile}>Public Profile...</a></li>
            </ul>
        </div>;
        if (userId == this.state.profile.id) {
            actionButton = <div className="btn-group">
                <a onClick={this.goToPublicProfile} role="button" className="btn btn-sm btn-primary pointer">
                    <i className="fa fa-user" title={'View ' + this.state.profile.firstName + ' profile'} aria-hidden="true"></i>&nbsp;
                    Public Page
                </a>
                </div>
        }
        return (
            <div className="col-lg-8">
                <div id="profile-content-row" className="row state-overview">
                    <div className="row" id="profile-content">
                        <div className="col-lg-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <header className="panel-title">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="col-lg-10">
                                                    <div className="profile-name"><strong>{this.state.profile.firstName}</strong> {this.state.profile.lastName}<strong>.</strong></div>
                                                </div>
                                                <div className="col-lg-2 text-right">
                                                    {actionButton}
                                                </div>
                                            </div>
                                        </div>
                                    </header>
                                </div>
                                <ProfileContentBody profile={this.state.profile} displayReviews={this.displayReviews} />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12">
                            <div id="content-results" class="alert alert-success" role="alert"></div>
                        </div>
                        <div id="reviews-panel" className="col-lg-12 col-md-12 col-xs-12">
                            <div className="panel">
                                <div className="panel-header">

                                </div>
                                <div className="panel-body">
                                    <ul classNamne="list-group">
                                        { this.state.reviews.map(this.showReviews) }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12">
                            <div className="panel">
                                <div className="panel-body">
                                    <ul id="myTab" className="nav nav-pills">
                                        <li className="active"><a href="#linkedin" data-toggle="tab"><i className="fa fa-linkedin"></i><br /><div>Linked In</div></a></li>
                                        <li className=""><a href="#zillow" data-toggle="tab"><i className="fa icon-zillow"></i><br /><div>Zillow</div></a></li>
                                        <li className=""><a href="#facebook" data-toggle="tab"><i className="fa fa-facebook"></i><br /><div>Facebook</div></a></li>
                                        <li className=""><a href="#googleplus" data-toggle="tab"><i className="fa fa-google-plus"><br /></i><div>Google Plus</div></a></li>
                                        <li className=""><a href="#instagram" data-toggle="tab"><i className="fa fa-instagram"><br /></i><div>Instagram</div></a></li>
                                    </ul>
                                    <div id="myTabContent" className="tab-content">
                                        <div className="tab-pane fade active in" id="linkedin">
                                            <LinkedIn profile={this.state.profile} />
                                        </div>
                                        <div className="tab-pane fade text-left" id="zillow">
                                            <Zillow profile={this.state.profile} />
                                        </div>
                                        <div className="tab-pane fade" id="facebook">
                                            <Facebook profile={this.state.profile} />
                                        </div>
                                        <div className="tab-pane fade" id="googleplus">
                                            <GooglePlus profile={this.state.profile} />
                                        </div>
                                        <div className="tab-pane fade" id="instagram">
                                            <Instagram profile={this.state.profile} />
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
});

var ReviewStars = React.createClass ({
    render () {
        var starPercentage = {
            width: (this.props.rating * 100) / 5 + '%'
        };
        var starFontSize = {
            fontSize: this.props.fontSize,
            width: '100%'
        };
        return(
            <div className="star-ratings-css" style={starFontSize}>
                <div className="star-ratings-css-top" style={starPercentage}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            </div>
        );
    }
});