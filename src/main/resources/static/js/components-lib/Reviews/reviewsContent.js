'use strict';

var minHeight = {
    minHeight: '330px'
};

var fontSize18 = {
    fontSize: '18px'
};

var ReviewsContent = React.createClass({
    displayName: 'ReviewsContent',
    getInitialState: function getInitialState() {
        return {
            reviews: [],
            rating: 0,
            quality: 0,
            timeliness: 0,
            nps: 0,
            page: 0
        };
    },
    componentWillMount: function componentWillMount() {
        var id = $('#id').val();
        var page = 0;
        this.getReviews(id, page);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("ReviewsContent:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.count != this.state.count) {
            console.log("ReviewsContent:componentWillReceiveProps:update");
            var id = $('#id').val();
            var page = 0;
            this.getReviews(id, page);
        }
    },
    getReviews: function getReviews(id, page) {
        var data = {
            id: id,
            page: page
        };
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $("#paginator").empty();
        $.ajax({
            type: "POST",
            url: "/getReviewsForUser",
            async: true,
            data: formData,
            success: (function (result) {
                console.log(result);
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
                        onPageClicked: (function (e, originalEvent, type, page) {
                            console.log(page);
                            this.getReviews(id, page - 1);
                        }).bind(this),
                        /*    pageUrl: function(type, page, current) {
                         return '/api/users/search/findUsers?sort='+sort+',desc&size=10&name=' + queryName + '&profession=' + queryProfession + '&city=' + city + '&state=' + state + '&page=' + page;
                         }, */
                        itemTexts: function itemTexts(type, page, current) {
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
                    };
                    $('#paginator').bootstrapPaginator(options);
                }
            }).bind(this),
            dataType: "json",
            contentType: "application/json"
        });
    },
    calculateRating: function calculateRating() {
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
        $.each(reviews, function (key, value) {
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
        });
        var rating = sum / total;
        var quality = sum2 / total;
        var timeliness = sum3 / total;
        if (total > 0) {
            var nps = (promoters - detractors) / total * 100;
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
    displayReviews: function displayReviews(reviews) {
        this.setState({ reviews: reviews });
    },
    whyCertified: function whyCertified() {
        bootbox.dialog({
            title: "Latch Certified Reviews",
            message: '<div class="bootbox-logo-middle"><img class="img-responsive" src="/images/LATCH-Logo-reviews.png" /></div><div class="text-left">LATCH Certified reviews are reviews that originated from a user on the LATCH platform. The review itself could have been manually triggered by the professional using the LATCH platform or automatically generated by the LATCH review engine itself. Reviews with this emblem are certified to be authentic and accurate.</div> '
        });
    },
    showReviews: function showReviews(review) {
        var results = [];
        if (review.overallRating != null && review.reviewComments != "") {
            var created = new Date(review.completeTime);
            var createDate = $.datepicker.formatDate("mm/dd/yy", new Date(created));
            results.push(React.createElement(
                'li',
                { className: 'list-group-item', key: review.id },
                React.createElement(
                    'div',
                    { className: 'review-date' },
                    createDate
                ),
                React.createElement(
                    'div',
                    { className: 'review-badge' },
                    React.createElement(
                        'a',
                        { onClick: this.whyCertified, className: 'pointer' },
                        React.createElement('img', { src: '/images/LATCH-Logo-reviews.png', alt: 'Latch Certified' })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'review-stars' },
                    React.createElement(ReviewStars, { fontSize: '20px', rating: review.overallRating })
                ),
                React.createElement(
                    'div',
                    { className: 'review-summary' },
                    'Written by ',
                    React.createElement(
                        'a',
                        { className: 'reviewer-link', href: '/profile/' + review.reviewerUserId, target: '_blank' },
                        review.reviewer.firstName,
                        ' ',
                        review.reviewer.lastName
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'review-description' },
                    review.reviewComments
                )
            ));
        }
        return results;
    },
    showNPSHelp: function showNPSHelp() {
        bootbox.dialog({
            title: "NPS Score",
            message: '<div class="text-left">The <strong>Net Promoter Score</strong> is an index ranging from -100 to 100 that measures the willingness of customers to recommend a company\'s products or services to others. It is used as a proxy for gauging the customer\'s overall satisfaction with a company\'s product or service and the customer\'s loyalty to the brand.</div>'
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'col-lg-8' },
            React.createElement(
                'div',
                { className: 'row', id: 'profile-content' },
                React.createElement(
                    'div',
                    { className: 'col-lg-6' },
                    React.createElement(
                        'div',
                        { id: 'inbox-content-row', className: 'row state-overview' },
                        React.createElement(
                            'div',
                            { className: 'col-lg-12' },
                            React.createElement(
                                'div',
                                { className: 'panel panel-default', id: 'nps-panel' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-heading' },
                                    React.createElement(
                                        'header',
                                        { className: 'panel-title text-center' },
                                        React.createElement(
                                            'strong',
                                            null,
                                            'Ratings'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'panel-body', style: minHeight },
                                    React.createElement(
                                        'div',
                                        { className: 'margin-bottom-20' },
                                        React.createElement(
                                            'h5',
                                            { className: 'text-left' },
                                            'Based on ',
                                            React.createElement(
                                                'strong',
                                                { style: fontSize18 },
                                                this.state.reviewCount
                                            ),
                                            ' ratings'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'profile-stars' },
                                        React.createElement(
                                            'div',
                                            { className: 'profile-review-stars' },
                                            React.createElement(ReviewStars, { fontSize: '26px', rating: this.state.rating })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'profile-head-title' },
                                            React.createElement(
                                                'strong',
                                                null,
                                                'Overall Rating'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'profile-stars' },
                                        React.createElement(
                                            'div',
                                            { className: 'profile-review-stars' },
                                            React.createElement(ReviewStars, { fontSize: '26px', rating: this.state.quality })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'profile-head-title' },
                                            React.createElement(
                                                'strong',
                                                null,
                                                'Overall Quality of Service'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'profile-stars' },
                                        React.createElement(
                                            'div',
                                            { className: 'profile-review-stars' },
                                            React.createElement(ReviewStars, { fontSize: '26px', rating: this.state.timeliness })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'profile-head-title' },
                                            React.createElement(
                                                'strong',
                                                null,
                                                'Timeliness of Service'
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-lg-6' },
                    React.createElement(
                        'div',
                        { id: 'inbox-content-row', className: 'row state-overview' },
                        React.createElement(
                            'div',
                            { className: 'col-lg-12' },
                            React.createElement(
                                'div',
                                { className: 'panel panel-default', id: 'nps-panel' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-heading' },
                                    React.createElement(
                                        'header',
                                        { className: 'panel-title' },
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            React.createElement('div', { className: 'col-md-2' }),
                                            React.createElement(
                                                'div',
                                                { className: 'col-md-8' },
                                                React.createElement(
                                                    'strong',
                                                    null,
                                                    'NPS Score'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'col-md-2' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'pointer', onClick: this.showNPSHelp },
                                                    React.createElement('span', { className: 'fa fa-info' })
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'panel-body' },
                                    React.createElement(NPSChart, { nps: this.state.nps })
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-lg-12' },
                    React.createElement(
                        'div',
                        { className: 'panel panel-default', id: 'reviews-panel' },
                        React.createElement(
                            'div',
                            { className: 'panel-heading' },
                            React.createElement(
                                'header',
                                { className: 'panel-title' },
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Reviews'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'panel-body' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-12 text-left' },
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement('div', { id: 'paginator', className: 'pagination' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-12 text-left' },
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'ul',
                                        { classNamne: 'list-group' },
                                        this.state.reviews.map(this.showReviews)
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});