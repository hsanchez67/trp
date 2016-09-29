'use strict';

var wellBkgColor = {
    backgroundColor: '#ECF0F1'
};

var ProfileContentBody = React.createClass({
    displayName: 'ProfileContentBody',
    getInitialState: function getInitialState() {
        return {
            profile: this.props.profile,
            shortlist: [],
            reviews: [],
            reviewCount: 0,
            rating: 0,
            view: { showModal: false },
            initials: ''
        };
    },
    openScoreDetails: function openScoreDetails() {
        // $("#modalContent").html("<div>Score details...</div>");
        // this.setState({view: {showModal: true}});
    },
    handleHideModal: function handleHideModal() {
        this.setState({ view: { showModal: false } });
    },
    componentDidMount: function componentDidMount() {
        // drag & drop
        $(".source li").draggable({
            addClasses: false,
            appendTo: "body",
            helper: "clone"
        });
    },
    componentWillMount: function componentWillMount() {
        console.log("ProfileContentBody:componentWillMount:");
        this.prepareComponentState(this.props);
        $('.nav-pills a[href="#linkedin"]').tab('show');
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("ProfileContentBody:componentWillReceiveProps:");
        this.prepareComponentState(nextProps);
    },
    prepareComponentState: function prepareComponentState(props) {
        console.log("ProfileContentBody:prepareComponentState:");
        if (!$.isEmptyObject(props.profile) && $.isEmptyObject(this.state.profile)) {
            this.setState({
                profile: props.profile
            });
            // Get reviews
            var data = {
                id: props.profile.id
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
                        this.props.displayReviews(result._embedded.reviewDTOList);
                    }
                }).bind(this),
                dataType: "json",
                contentType: "application/json"
            });
            // get initials
            var name = props.profile.firstName + ' ' + props.profile.lastName;
            console.log(name);
            if (name != null) {
                var initials = name.match(/\b\w/g);
                console.log(initials);
                initials = (initials.shift() + initials.pop()).toUpperCase();
                console.log(initials);
                this.setState({ initials: initials });
            }
        }
    },
    calculateRating: function calculateRating() {
        console.log("Calculate rating");
        var total = this.state.reviewCount;
        var sum = 0;
        var reviews = this.state.reviews;
        console.log(reviews);
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
        var address1 = '';
        var city = '';
        var state = '';
        if (!$.isEmptyObject(this.state.profile) && this.state.profile.businessAddress1 != null) {
            address1 = this.state.profile.businessAddress1;
            address1 = address1.replace(/\s/g, "+");
            city = this.state.profile.businessCity;
            city = city.replace(/\s/g, "+");
            state = this.state.profile.businessState;
            state = state.replace(/\s/g, "+");
        }
        var mapSource = "https://maps.google.com/?key=AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY&output=embed&f=q&source=s_q&hl=en&geocode=&q=" + address1 + "," + city + "," + state + "," + this.state.profile.businessZip;
        var leadParagraph = '';
        var description = '';
        if (this.state.profile.leadParagraph != null && this.state.profile.leadParagraph != "") {
            leadParagraph = this.state.profile.leadParagraph;
        }
        if (this.state.profile.description != null && this.state.profile.description != "") {
            description = this.state.profile.description;
        }
        var profileAvatar = React.createElement('img', { className: 'img-circle img-user', src: '/api/remoteFiles/view/' + this.state.profile.avatar });
        if (this.state.profile.avatar == 'default' && this.state.initials != '') {
            profileAvatar = React.createElement(
                'div',
                { className: 'avatar-circle-large' },
                React.createElement('img', { className: 'hidden', id: this.state.profile.id }),
                React.createElement(
                    'span',
                    { className: 'initials-large' },
                    this.state.initials
                )
            );
        }
        return React.createElement(
            'div',
            { className: 'panel-body' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'div',
                        { className: 'col-md-9' },
                        React.createElement(
                            'div',
                            { className: 'col-md-6 text-center', id: 'user' },
                            profileAvatar,
                            React.createElement(
                                'p',
                                { className: 'sosmed-user' },
                                React.createElement(
                                    'a',
                                    { href: '#' },
                                    React.createElement('i', { className: 'fa fa-facebook', onClick: this.openFacebook, 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'Facebook' })
                                ),
                                React.createElement(
                                    'a',
                                    { href: '#' },
                                    React.createElement('i', { className: 'fa fa-twitter', 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'Twitter' })
                                ),
                                React.createElement(
                                    'a',
                                    { href: '#' },
                                    React.createElement('i', { className: 'fa fa-google-plus', 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'Google Plus' })
                                ),
                                React.createElement(
                                    'a',
                                    { href: '#' },
                                    React.createElement('i', { className: 'fa fa-linkedin', 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'Linkedin' })
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
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
                            ),
                            React.createElement(ProfileBits, { profile: this.state.profile })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-3 canvas-score-parent-div' },
                        React.createElement(
                            'div',
                            { onClick: this.openScoreDetails, id: 'scoreChartDiv', className: 'canvas-score pointer' },
                            React.createElement(ScoreChart, { id: this.state.profile.id })
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
                ),
                this.state.view.showModal ? React.createElement(
                    RemoteModal,
                    { title: 'Score details', size: '', handleHideModal: this.handleHideModal },
                    React.createElement('div', { id: 'modalContent' })
                ) : null,
                React.createElement(
                    'div',
                    { className: 'col-lg-12 col-md-12 col-xs-12' },
                    React.createElement(
                        'div',
                        { className: 'tab-pane fade active in text-left', id: 'description' },
                        React.createElement(
                            'p',
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
        );
    }
});