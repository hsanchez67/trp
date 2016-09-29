var Zillow = React.createClass({
    getInitialState: function() {
        return {
            reviews: [],
            proInfo: []
        };
    },
    componentWillReceiveProps: function (nextProps) {
        console.log('Zillow:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - "+ this.props.profile.id);
        if (nextProps.profile.id != this.props.profile.id) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function(props) {
        if (!$.isEmptyObject(props.profile)) {
            var data = {
                id: props.profile.id
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log('Zillow:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getZillowReviews",
                data: formData,
                success: function(result){
                    if (!$.isEmptyObject(result.response)) {
                        console.log(result);
                        this.setState({
                            proInfo: result.response.results.proInfo,
                            reviews: result.response.results.proReviews.review
                        });
                    }
                }.bind(this),
                error: function(request, status, error) {
                    console.log(error);
                },
                dataType: "json",
                contentType : "application/json"
            });
        } else {
            console.log('Zillow:prepareComponentState: No user');
        }
    },
    showReviews: function(review) {
        /*
         proInfo: {
         name: "Sandy Crichton",
         photo: "https://d14mm2ttxradcn.cloudfront.net/h_g/ISxz11hzet7y831000000000.jpg",
         profileURL: "http://www.zillow.com/profile/sandycrichton/",
         profileLink: "Continue reading",
         title: "Real Estate Agent",
         businessName: "Better Homes & Garden Real Estate",
         address: "925 Highland Pointe Dr #140, Roseville, CA 95678",
         phone: "(916) 571-9328",
         specialties: "Buyer's Agent, Listing Agent, Property Management",
         serviceAreas: [],
         recentSaleCount: "19",
         reviewRequestURL: "http://www.zillow.com/reviews/write/?s=X1-ZUz8rfilp6n289_3qul1",
         reviewCount: "8",
         avgRating: "5.0",
         localknowledgeRating: "5.0",
         processexpertiseRating: "5.0",
         responsivenessRating: "4.9",
         negotiationskillsRating: "4.9"

        *description: "Bought and sold with Sandy.  Sandy found clients for house on Chelsea.  Negotiated a great price and a solid contract.    Sandy held open houses.  She also helped me make decision on sales price by taking ..."
         localknowledgeRating: "5.0"
         negotiationskillsRating: "5.0"
         processexpertiseRating: "5.0"
         rating: "5"
         responsivenessRating: "5.0"
         reviewDate: "02/09/2016"
         reviewSummary: "Sold a Single Family home in 2004 in Rocklin, CA."
         reviewURL: "http://www.zillow.com/profile/sandycrichton/Reviews/?review=2179593"
         reviewer: "zuser20160204200550113"
         reviewerLink: "http://www.zillow.com/profile/zuser20160204200550113/"
         */
        const results = [];
        results.push(
            <li className="list-group-item" key={review.reviewer}>
                <div className="review-stars"><ZillowStars fontSize={'20px'} rating={review.rating} /></div>
                <div className="review-summary">{review.reviewSummary}</div>
                <div className="review-date">{review.reviewDate} - <a href={review.reviewerLink}  target="_blank">{review.reviewer}</a></div>
                <div className="review-description">{review.description}</div>
            </li>
        );
        return results;
    },
    render() {
        var zillowExists;
        if (!$.isEmptyObject(this.state.proInfo)) {
            zillowExists = <div id="external-media-panel" className="panel panel-default">
                <div className="panel-heading">
                    <div className="head-stars"><ZillowStars fontSize={'26px'} rating={this.state.proInfo.avgRating}/>
                    </div>
                    <div className="head-title">({this.state.proInfo.reviewCount} reviews on Zillow)</div>
                    <div className="head-stats pull-right"><span
                        className="head-stats-number">{this.state.proInfo.recentSaleCount}</span> Recent sales on Zillow
                    </div>
                </div>
                <div className="panel-body">
                    <div className="panel-body-title pull-left">Reviews from Zillow</div>
                    <div className="panel-body-link-to-zillow pull-left"><a
                        href={this.state.proInfo.profileURL+'?rx=true'} target="_blank">See all reviews on Zillow</a>
                    </div>
                    <div className="provided-by-zillow pull-right"><img
                        src="https://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/logos/Zillowlogo_150x40_rounded.gif"
                        alt="Zillow Real Estate Search"/></div>
                </div>

                <ul classNamne="list-group">
                    { this.state.reviews.map(this.showReviews) }
                </ul>
            </div>;
        } else {
            zillowExists = <div className="panel-body panel-light img-rounded">
                <div className="row">
                    <div className="col-md-12">
                    </div>
                </div>
            </div>;
        }
        return (
            <div>
                {zillowExists}
            </div>
        );
    }
});

var ZillowStars = React.createClass ({
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