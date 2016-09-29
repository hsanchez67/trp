'use strict';

var Zillow = React.createClass({
    displayName: 'Zillow',

    getInitialState: function getInitialState() {
        return {
            reviews: [],
            proInfo: []
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log('Zillow:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - " + this.props.profile.id);
        if (nextProps.profile.id != this.props.profile.id) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function prepareComponentState(props) {
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
                success: (function (result) {
                    if (!$.isEmptyObject(result.response)) {
                        console.log(result);
                        this.setState({
                            proInfo: result.response.results.proInfo,
                            reviews: result.response.results.proReviews.review
                        });
                    }
                }).bind(this),
                error: function error(request, status, _error) {
                    console.log(_error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('Zillow:prepareComponentState: No user');
        }
    },
    showReviews: function showReviews(review) {
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
        var results = [];
        results.push(React.createElement(
            'li',
            { className: 'list-group-item', key: review.reviewer },
            React.createElement(
                'div',
                { className: 'review-stars' },
                React.createElement(ZillowStars, { fontSize: '20px', rating: review.rating })
            ),
            React.createElement(
                'div',
                { className: 'review-summary' },
                review.reviewSummary
            ),
            React.createElement(
                'div',
                { className: 'review-date' },
                review.reviewDate,
                ' - ',
                React.createElement(
                    'a',
                    { href: review.reviewerLink, target: '_blank' },
                    review.reviewer
                )
            ),
            React.createElement(
                'div',
                { className: 'review-description' },
                review.description
            )
        ));
        return results;
    },
    render: function render() {
        var zillowExists;
        if (!$.isEmptyObject(this.state.proInfo)) {
            zillowExists = React.createElement(
                'div',
                { id: 'external-media-panel', className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { className: 'panel-heading' },
                    React.createElement(
                        'div',
                        { className: 'head-stars' },
                        React.createElement(ZillowStars, { fontSize: '26px', rating: this.state.proInfo.avgRating })
                    ),
                    React.createElement(
                        'div',
                        { className: 'head-title' },
                        '(',
                        this.state.proInfo.reviewCount,
                        ' reviews on Zillow)'
                    ),
                    React.createElement(
                        'div',
                        { className: 'head-stats pull-right' },
                        React.createElement(
                            'span',
                            {
                                className: 'head-stats-number' },
                            this.state.proInfo.recentSaleCount
                        ),
                        ' Recent sales on Zillow'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body' },
                    React.createElement(
                        'div',
                        { className: 'panel-body-title pull-left' },
                        'Reviews from Zillow'
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel-body-link-to-zillow pull-left' },
                        React.createElement(
                            'a',
                            {
                                href: this.state.proInfo.profileURL + '?rx=true', target: '_blank' },
                            'See all reviews on Zillow'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'provided-by-zillow pull-right' },
                        React.createElement('img', {
                            src: 'https://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/logos/Zillowlogo_150x40_rounded.gif',
                            alt: 'Zillow Real Estate Search' })
                    )
                ),
                React.createElement(
                    'ul',
                    { classNamne: 'list-group' },
                    this.state.reviews.map(this.showReviews)
                )
            );
        } else {
            zillowExists = React.createElement(
                'div',
                { className: 'panel-body panel-light img-rounded' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement('div', { className: 'col-md-12' })
                )
            );
        }
        return React.createElement(
            'div',
            null,
            zillowExists
        );
    }
});

var ZillowStars = React.createClass({
    displayName: 'ZillowStars',

    render: function render() {
        var starPercentage = {
            width: this.props.rating * 100 / 5 + '%'
        };
        var starFontSize = {
            fontSize: this.props.fontSize,
            width: '100%'
        };
        return React.createElement(
            'div',
            { className: 'star-ratings-css', style: starFontSize },
            React.createElement(
                'div',
                { className: 'star-ratings-css-top', style: starPercentage },
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                )
            ),
            React.createElement(
                'div',
                { className: 'star-ratings-css-bottom' },
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                )
            )
        );
    }
});