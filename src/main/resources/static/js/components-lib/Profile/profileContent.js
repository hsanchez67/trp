'use strict';

var ProfileContent = React.createClass({
    displayName: 'ProfileContent',
    getInitialState: function getInitialState() {
        return {
            profile: this.props.profile,
            shortlist: [],
            tempScrolltop: 0,
            reviews: []
        };
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        console.log("ProfileContent:shouldComponentUpdate:");
        console.log(nextProps);
        console.log(nextState);
        return nextState.tempScrolltop == 0;
        // return nextProps.tempScrolltop !== this.props.id;
    },
    componentDidMount: function componentDidMount() {
        $('a[data-toggle="tab"]').on('show.bs.tab', (function (e) {
            this.setState({
                tempScrolltop: $(window).scrollTop()
            });
            console.log(this.state.tempScrolltop);
        }).bind(this));

        $('a[data-toggle="tab"]').on('shown.bs.tab', (function (e) {
            $(window).scrollTop(this.state.tempScrolltop);
        }).bind(this));
    },
    componentWillMount: function componentWillMount() {
        console.log("ProfileContent:componentWillMount:");
        this.prepareComponentState(this.props);
        $('.nav-pills a[href="#linkedin"]').tab('show');
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("ProfileContent:componentWillReceiveProps:");
        this.prepareComponentState(nextProps);
    },
    prepareComponentState: function prepareComponentState(props) {
        console.log("ProfileContent:prepareComponentState:");
        if (!$.isEmptyObject(props.profile) && $.isEmptyObject(this.state.profile)) {
            this.setState({
                profile: props.profile
            });
        }
    },
    openFacebook: function openFacebook() {
        window.open('https://www.facebook.com/i-did-it-143881716081/', '_blank');
    },
    introduceMe: function introduceMe() {
        window.location.href = '/introduction/' + this.props.profile.id;
    },
    sendMessage: function sendMessage() {
        window.location.href = '/sendMessage/' + this.props.profile.id;
    },
    goToPublicProfile: function goToPublicProfile() {
        // window.location.href = '/public/' +this.props.profile.profileName;
        window.open('https://thereferralportal.com/public/' + this.state.profile.profileName, '_blank');
    },
    addToShorlist: function addToShorlist(id) {
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
        };
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/addToShortList",
            data: data,
            success: (function (result) {
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({ shortlist: result.users });
                }
                document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> You successfully added  " + this.state.profile.firstName + " " + this.state.profile.lastName + " to your Shortlist!</label></div>";
                $("#content-results").alert();
                $("#content-results").fadeTo(4000, 500).slideUp(500, function () {
                    $("#content-results").alert('close');
                    document.getElementById("content-results").innerHTML = "";
                });
            }).bind(this),
            error: function error(_error) {
                console.log("error: " + _error.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    addToMyNetwork: function addToMyNetwork(id) {
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
        };
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/addToShortList",
            data: data,
            success: (function (result) {
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({ shortlist: result.users });
                }
                document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> You successfully added  " + this.state.profile.firstName + " " + this.state.profile.lastName + " to your Network!</label></div>";
                $("#content-results").alert();
                $("#content-results").fadeTo(4000, 500).slideUp(500, function () {
                    $("#content-results").alert('close');
                    document.getElementById("content-results").innerHTML = "";
                });
            }).bind(this),
            error: function error(_error2) {
                console.log("error: " + _error2.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    displayReviews: function displayReviews(reviews) {
        this.setState({ reviews: reviews });
    },
    whyCertified: function whyCertified() {
        bootbox.dialog({
            title: "Latch Certified Reviews",
            message: '<div class="bootbox-logo-middle"><img class="img-responsive" src="/images/LATCH-Logo-reviews.png" /></div><div class="text-left">LATCH Certified reviews are reviews that originated from a user on the LATCH platform. The review itself could have been manually triggered by the professional using the LATCH platform or automatically generated by the LATCH review engine itself. Reviews with this emblem are certified to be authentic and accurate.</div>'
        });
    },
    showReviews: function showReviews(review) {
        console.log("ProfileContent:ShowReviews:");
        console.log(review);
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
    render: function render() {
        var userId = $('#id').val();
        var actionButton = React.createElement(
            'div',
            { className: 'btn-group' },
            React.createElement(
                'button',
                { type: 'button', className: 'btn btn-primary btn-sm dropdown-toggle',
                    'data-toggle': 'dropdown', 'aria-haspopup': 'true',
                    'aria-expanded': 'false' },
                'Action ',
                React.createElement('span', { className: 'caret' })
            ),
            React.createElement(
                'ul',
                { className: 'dropdown-menu' },
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { onClick: this.introduceMe },
                        'Introduce ',
                        this.state.profile.firstName,
                        '...'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { onClick: this.sendMessage },
                        'Send a message...'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { onClick: this.addToShorlist },
                        'Add to Shortlist'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { onClick: this.addToMyNetwork },
                        'Add to My Network'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { onClick: this.goToPublicProfile },
                        'Public Profile...'
                    )
                )
            )
        );
        if (userId == this.state.profile.id) {
            actionButton = React.createElement(
                'div',
                { className: 'btn-group' },
                React.createElement(
                    'a',
                    { onClick: this.goToPublicProfile, role: 'button', className: 'btn btn-sm btn-primary pointer' },
                    React.createElement('i', { className: 'fa fa-user', title: 'View ' + this.state.profile.firstName + ' profile', 'aria-hidden': 'true' }),
                    '  Public Page'
                )
            );
        }
        return React.createElement(
            'div',
            { className: 'col-lg-8' },
            React.createElement(
                'div',
                { id: 'profile-content-row', className: 'row state-overview' },
                React.createElement(
                    'div',
                    { className: 'row', id: 'profile-content' },
                    React.createElement(
                        'div',
                        { className: 'col-lg-12' },
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
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-lg-12' },
                                            React.createElement(
                                                'div',
                                                { className: 'col-lg-10' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'profile-name' },
                                                    React.createElement(
                                                        'strong',
                                                        null,
                                                        this.state.profile.firstName
                                                    ),
                                                    ' ',
                                                    this.state.profile.lastName,
                                                    React.createElement(
                                                        'strong',
                                                        null,
                                                        '.'
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'col-lg-2 text-right' },
                                                actionButton
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(ProfileContentBody, { profile: this.state.profile, displayReviews: this.displayReviews })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-lg-12 col-md-12 col-xs-12' },
                        React.createElement('div', { id: 'content-results', 'class': 'alert alert-success', role: 'alert' })
                    ),
                    React.createElement(
                        'div',
                        { id: 'reviews-panel', className: 'col-lg-12 col-md-12 col-xs-12' },
                        React.createElement(
                            'div',
                            { className: 'panel' },
                            React.createElement('div', { className: 'panel-header' }),
                            React.createElement(
                                'div',
                                { className: 'panel-body' },
                                React.createElement(
                                    'ul',
                                    { classNamne: 'list-group' },
                                    this.state.reviews.map(this.showReviews)
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-lg-12 col-md-12 col-xs-12' },
                        React.createElement(
                            'div',
                            { className: 'panel' },
                            React.createElement(
                                'div',
                                { className: 'panel-body' },
                                React.createElement(
                                    'ul',
                                    { id: 'myTab', className: 'nav nav-pills' },
                                    React.createElement(
                                        'li',
                                        { className: 'active' },
                                        React.createElement(
                                            'a',
                                            { href: '#linkedin', 'data-toggle': 'tab' },
                                            React.createElement('i', { className: 'fa fa-linkedin' }),
                                            React.createElement('br', null),
                                            React.createElement(
                                                'div',
                                                null,
                                                'Linked In'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { className: '' },
                                        React.createElement(
                                            'a',
                                            { href: '#zillow', 'data-toggle': 'tab' },
                                            React.createElement('i', { className: 'fa icon-zillow' }),
                                            React.createElement('br', null),
                                            React.createElement(
                                                'div',
                                                null,
                                                'Zillow'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { className: '' },
                                        React.createElement(
                                            'a',
                                            { href: '#facebook', 'data-toggle': 'tab' },
                                            React.createElement('i', { className: 'fa fa-facebook' }),
                                            React.createElement('br', null),
                                            React.createElement(
                                                'div',
                                                null,
                                                'Facebook'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { className: '' },
                                        React.createElement(
                                            'a',
                                            { href: '#googleplus', 'data-toggle': 'tab' },
                                            React.createElement(
                                                'i',
                                                { className: 'fa fa-google-plus' },
                                                React.createElement('br', null)
                                            ),
                                            React.createElement(
                                                'div',
                                                null,
                                                'Google Plus'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { className: '' },
                                        React.createElement(
                                            'a',
                                            { href: '#instagram', 'data-toggle': 'tab' },
                                            React.createElement(
                                                'i',
                                                { className: 'fa fa-instagram' },
                                                React.createElement('br', null)
                                            ),
                                            React.createElement(
                                                'div',
                                                null,
                                                'Instagram'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { id: 'myTabContent', className: 'tab-content' },
                                    React.createElement(
                                        'div',
                                        { className: 'tab-pane fade active in', id: 'linkedin' },
                                        React.createElement(LinkedIn, { profile: this.state.profile })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'tab-pane fade text-left', id: 'zillow' },
                                        React.createElement(Zillow, { profile: this.state.profile })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'tab-pane fade', id: 'facebook' },
                                        React.createElement(Facebook, { profile: this.state.profile })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'tab-pane fade', id: 'googleplus' },
                                        React.createElement(GooglePlus, { profile: this.state.profile })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'tab-pane fade', id: 'instagram' },
                                        React.createElement(Instagram, { profile: this.state.profile })
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

var ReviewStars = React.createClass({
    displayName: 'ReviewStars',

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