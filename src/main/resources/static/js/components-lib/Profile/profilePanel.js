'use strict';

var noMargin = {
    marginTop: 0,
    marginBottom: 0
};
var ProfilePanel = React.createClass({
    displayName: 'ProfilePanel',
    getInitialState: function getInitialState() {
        return {
            reviews: [],
            reviewCount: 0,
            rating: 0,
            id: this.props.user.id,
            initials: ''
        };
    },
    componentDidMount: function componentDidMount() {
        $('.see-more').click(function () {
            $(this).text(function (i, text) {
                return text === "more..." ? "less..." : "more...";
            });
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("ProfilePanel:componentWillReceiveProps:");
        console.log(nextProps);
        console.log(this.props);
        if (nextProps.user != this.props.user) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function prepareComponentState(props) {
        // Get reviews
        var data = {
            id: props.user.id
        };
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getReviewsForUser",
            async: true,
            data: formData,
            success: (function (result) {
                console.log(result);
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
            }).bind(this),
            dataType: "json",
            contentType: "application/json"
        });
        // get initials
        var name = props.user.firstName + ' ' + props.user.lastName;
        console.log(name);
        if (name != null) {
            var initials = name.match(/\b\w/g);
            console.log(initials);
            initials = (initials.shift() + initials.pop()).toUpperCase();
            console.log(initials);
            this.setState({ initials: initials });
        }
    },
    calculateRating: function calculateRating() {
        console.log("Calculate rating");
        var total = this.state.reviewCount;
        var sum = 0;
        var reviews = this.state.reviews;
        $.each(reviews, function (key, value) {
            if (value.overallRating != null) {
                sum = sum + value.overallRating;
            }
        });
        var rating = sum / total;
        console.log(rating);
        this.setState({
            rating: rating
        });
    },
    render: function render() {
        if ($.isEmptyObject(this.props.user)) {
            return React.createElement('div', { id: 'profile-panel' });
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
                cityDisplay = React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'small',
                        { className: 'label label-warning label-as-location' },
                        this.props.user.businessCity,
                        ', ',
                        this.props.user.businessState
                    )
                );
            }
            var moreButton = '';
            if (description != '' || leadParagraph != '') {
                moreButton = React.createElement(
                    'div',
                    { className: 'pull-right' },
                    React.createElement(
                        'a',
                        { className: 'btn btn-primary btn-xs see-more', 'data-toggle': 'collapse', 'data-parent': '#accordion', href: '#collapseOne', role: 'button' },
                        'more...'
                    )
                );
            }
            var profileAvatar = React.createElement('img', { className: 'img-circle img-user', src: '/api/remoteFiles/view/' + this.props.user.avatar });
            if (this.props.user.avatar == 'default' && this.state.initials != '') {
                profileAvatar = React.createElement(
                    'div',
                    { className: 'avatar-circle-large' },
                    React.createElement('img', { className: 'hidden', id: this.props.user.id }),
                    React.createElement(
                        'span',
                        { className: 'initials-large' },
                        this.state.initials
                    )
                );
            }
            return React.createElement(
                'div',
                { id: 'profile-panel' },
                React.createElement(
                    'div',
                    { className: 'panel panel-default' },
                    React.createElement(
                        'div',
                        { className: 'panel-heading' },
                        React.createElement(
                            'header',
                            { className: 'panel-title' },
                            React.createElement(
                                'div',
                                { className: 'text-center' },
                                React.createElement(
                                    'strong',
                                    null,
                                    this.props.user.firstName
                                ),
                                ' ',
                                this.props.user.lastName,
                                React.createElement(
                                    'strong',
                                    null,
                                    '.'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'profile-panel-body', className: 'panel-body' },
                        React.createElement(
                            'div',
                            { id: 'panel-compact', className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-6' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-body-left' },
                                    React.createElement(
                                        'div',
                                        { className: 'text-center', id: 'user' },
                                        profileAvatar
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { id: 'tab-view', className: 'col-lg-6' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-body-right' },
                                    React.createElement(
                                        'div',
                                        { id: 'scoreChartDiv', className: 'canvas-score' },
                                        React.createElement(ScoreChart, { id: this.props.user.id })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'text-center' },
                                        React.createElement(
                                            'p',
                                            { className: 'score-label' },
                                            React.createElement('img', { src: '/images/LATCH-Logo.png', className: 'Score-brandImg' }),
                                            'Score'
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'text-center top-minus-20', id: 'user' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-12 col-lg-offset-2 col-md-12 col-md-offset-4 col-sm-12 col-xs-12' },
                                React.createElement(
                                    'div',
                                    { id: 'profile-content' },
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
                                            '(',
                                            this.state.reviewCount,
                                            ' reviews)'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                React.createElement(
                                    'h3',
                                    null,
                                    this.props.user.profession
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                React.createElement(
                                    'h4',
                                    { style: noMargin },
                                    this.props.user.businessName
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                cityDisplay
                            ),
                            React.createElement(
                                'div',
                                { className: 'sosmed-user col-lg-12' },
                                React.createElement(
                                    'a',
                                    { href: '#' },
                                    React.createElement('i', { className: 'fa fa-facebook', 'data-toggle': 'tooltip', 'data-placement': 'top', title: '', 'data-original-title': 'Facebook' })
                                ),
                                React.createElement(
                                    'a',
                                    { href: '#' },
                                    React.createElement('i', { className: 'fa fa-twitter', 'data-toggle': 'tooltip', 'data-placement': 'top', title: '', 'data-original-title': 'Twitter' })
                                ),
                                React.createElement(
                                    'a',
                                    { href: '#' },
                                    React.createElement('i', { className: 'fa fa-google-plus', 'data-toggle': 'tooltip', 'data-placement': 'top', title: '', 'data-original-title': 'Google Plus' })
                                ),
                                React.createElement(
                                    'a',
                                    { href: '#' },
                                    React.createElement('i', { className: 'fa fa-linkedin', 'data-toggle': 'tooltip', 'data-placement': 'top', title: '', 'data-original-title': 'Linkedin' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'clearfix', id: 'accordion' },
                                React.createElement(
                                    'div',
                                    { className: 'clear' },
                                    moreButton
                                ),
                                React.createElement(
                                    'div',
                                    { id: 'collapseOne', className: 'panel-collapse collapse' },
                                    React.createElement(
                                        'div',
                                        { id: 'profile-panel-body-collapse', className: 'panel-body' },
                                        React.createElement(
                                            'div',
                                            { className: 'lead' },
                                            leadParagraph
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'mainText bottom10' },
                                            React.createElement('div', { dangerouslySetInnerHTML: { __html: marked(description) } })
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }
});