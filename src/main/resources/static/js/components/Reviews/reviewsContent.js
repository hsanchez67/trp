var minHeight = {
    minHeight: '330px'
};

var fontSize18 = {
    fontSize: '18px'
};

var ReviewsContent = React.createClass({
    displayName: 'ReviewsContent',
    getInitialState: function(){
        return {
            reviews: [],
            rating: 0,
            quality: 0,
            timeliness: 0,
            nps: 0,
            page: 0
        }
    },
    componentWillMount: function () {
        var id = $('#id').val();
        var page = 0;
        this.getReviews(id, page);
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("ReviewsContent:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.count != this.state.count) {
            console.log("ReviewsContent:componentWillReceiveProps:update");
            var id = $('#id').val();
            var page = 0;
            this.getReviews(id, page);
        }
    },
    getReviews: function(id, page) {
        var data = {
            id: id,
            page: page
        }
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $("#paginator" ).empty();
        $.ajax({
            type: "POST",
            url: "/getReviewsForUser",
            async:   true,
            data: formData,
            success: function(result){
            console.log(result)
            if (result.page.totalElements == 0 || $.contains(result, '<!DOCTYPE html>')) {
                console.log("No results");
                this.setState({
                    reviews: [],
                    reviewCount: 0,
                    page: page
                });
                return null;
            } else {
                this.setState({
                        reviews: result._embedded.reviewDTOList,
                        reviewCount: result.page.totalElements
                    });
                    this.calculateRating();
                    this.displayReviews(result._embedded.reviewDTOList);

                var currentPage = result.page.number;
                var totalPages = result.page.totalPages;
                var options = {
                    currentPage: currentPage + 1,
                    totalPages: totalPages,
                    size: 'normal',
                    alignment: 'center',
                    onPageClicked: function (e, originalEvent, type, page) {
                        console.log(page);
                        this.getReviews(id, page - 1);
                        }.bind(this),
                        /*    pageUrl: function(type, page, current) {
                         return '/api/users/search/findUsers?sort='+sort+',desc&size=10&name=' + queryName + '&profession=' + queryProfession + '&city=' + city + '&state=' + state + '&page=' + page;
                         }, */
                        itemTexts: function (type, page, current) {
                            switch (type) {
                                case "first":
                                    return "First";
                                case "prev":
                                    return "Previous";
                                case "next":
                                    return "Next";
                                case "last":
                                    return "Last";
                                case "page":
                                    return page;
                            }
                        }
                    }
                    $('#paginator').bootstrapPaginator(options);
                }
            }.bind(this),
            dataType: "json",
            contentType : "application/json"
        });
    },
    calculateRating: function() {
        console.log("Calculate rating");
        var total = this.state.reviewCount;
        var sum = 0;
        var sum2 = 0;
        var sum3 = 0;
        var reviews = this.state.reviews;
        // NPS score
        var promoters = 0;
        var detractors = 0;
        console.log(reviews);
        $.each(reviews, function(key, value) {
            if (value.overallRating != null) {
                sum = sum + value.overallRating;
            }
            if (value.overallQualityOfService != null) {
                sum2 = sum2 + value.overallQualityOfService;
            }
            if (value.timelinessOfService != null) {
                sum3 = sum3 + value.timelinessOfService;
            }
            if (value.nps < 7) {
                detractors++;
            }
            if (value.nps > 8) {
                promoters++;
            }
        })
        var rating = sum /total;
        var quality = sum2 /total;
        var timeliness = sum3 /total;
        if (total > 0) {
            var nps = ((promoters - detractors) / total) * 100;
        } else {
            nps = 0;
        }
        console.log(rating);
        console.log(nps);
        this.setState({
            rating: rating,
            nps: nps,
            quality: quality,
            timeliness: timeliness
        });
    },
    displayReviews: function(reviews) {
        this.setState({reviews: reviews});
    },
    whyCertified: function () {
        bootbox.dialog({
            title: "Latch Certified Reviews",
            message: '<div class="bootbox-logo-middle"><img class="img-responsive" src="/images/LATCH-Logo-reviews.png" /></div><div class="text-left">LATCH Certified reviews are reviews that originated from a user on the LATCH platform. The review itself could have been manually triggered by the professional using the LATCH platform or automatically generated by the LATCH review engine itself. Reviews with this emblem are certified to be authentic and accurate.</div> '
        });
    },
    showReviews: function(review) {
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
    showNPSHelp: function() {
        bootbox.dialog({
            title: "NPS Score",
            message: '<div class="text-left">The <strong>Net Promoter Score</strong> is an index ranging from -100 to 100 that measures the willingness of customers to recommend a company\'s products or services to others. It is used as a proxy for gauging the customer\'s overall satisfaction with a company\'s product or service and the customer\'s loyalty to the brand.</div>'
        });
    },
    render: function () {
        return (
            <div className="col-lg-8">
                <div className="row" id="profile-content">
                    <div className="col-lg-6">
                        <div id="inbox-content-row" className="row state-overview">
                            <div className="col-lg-12">
                                <div className="panel panel-default" id="nps-panel">
                                    <div className="panel-heading">
                                        <header className="panel-title text-center"><strong>Ratings</strong></header>
                                    </div>
                                    <div className="panel-body" style={minHeight}>
                                        <div className="margin-bottom-20"><h5 className="text-left">Based on <strong style={fontSize18}>{this.state.reviewCount}</strong> ratings</h5></div>
                                        <div className="profile-stars">
                                            <div className="profile-review-stars"><ReviewStars fontSize={'26px'} rating={this.state.rating}/></div>
                                            <div className="profile-head-title"><strong>Overall Rating</strong></div>
                                        </div>
                                        <div className="profile-stars">
                                            <div className="profile-review-stars"><ReviewStars fontSize={'26px'} rating={this.state.quality}/></div>
                                            <div className="profile-head-title"><strong>Overall Quality of Service</strong></div>
                                        </div>
                                        <div className="profile-stars">
                                            <div className="profile-review-stars"><ReviewStars fontSize={'26px'} rating={this.state.timeliness}/></div>
                                            <div className="profile-head-title"><strong>Timeliness of Service</strong></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div id="inbox-content-row" className="row state-overview">
                            <div className="col-lg-12">
                                <div className="panel panel-default" id="nps-panel">
                                    <div className="panel-heading">
                                        <header className="panel-title">
                                            <div className="row">
                                                <div className="col-md-2">
                                                </div>
                                                <div className="col-md-8">
                                                    <strong>NPS Score</strong>
                                                </div>
                                                <div className="col-md-2">
                                                    <a className="pointer" onClick={this.showNPSHelp} ><span className="fa fa-info"></span></a>
                                                </div>
                                            </div>
                                        </header>
                                    </div>
                                    <div className="panel-body">
                                        <NPSChart nps={this.state.nps} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="panel panel-default" id="reviews-panel">
                            <div className="panel-heading">
                                <header className="panel-title">
                                    <div className="row">
                                        <strong>Reviews</strong>
                                    </div>
                                </header>
                            </div>
                            <div className="panel-body">
                                <div className="col-lg-12 text-left">
                                    <div className="row">
                                        <div id="paginator" className="pagination"></div>
                                    </div>
                                </div>
                                <div className="col-lg-12 text-left">
                                    <div className="row">
                                        <ul classNamne="list-group">
                                            { this.state.reviews.map(this.showReviews) }
                                        </ul>
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