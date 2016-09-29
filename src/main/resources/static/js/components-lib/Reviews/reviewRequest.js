'use strict';

var divStyle = {
    display: 'none',
    opacity: 1
};

var fontSize = {
    fontSize: '1em'
};

var ReviewRequestForm = React.createClass({
    displayName: 'ReviewRequestForm',
    getInitialState: function getInitialState() {
        return {
            user: [],
            reviewId: undefined,
            reviewedUser: []
        };
    },
    componentDidMount: function componentDidMount() {
        var id = $('#id').val();
        var source = '/api/users/' + id;
        $.get(source, (function (result) {
            if (!$.isEmptyObject(result)) {
                console.log('ReviewRequestForm:componentDidMount:user:');
                console.log(result);
                this.setState({
                    user: result
                });
            }
        }).bind(this));
        var reviewId = $('#reviewId').val();
        if (reviewId != "") {
            this.setState({
                reviewId: reviewId
            });
        }

        var reviewedUserId = $('#reviewedUserId').val();
        if (reviewedUserId != "") {
            this.getReviewedUser(reviewedUserId);
        }

        $('input[type=radio][name=didBusiness]').change(function () {
            console.log(this.value);
            if (this.value == "Yes") {
                $(".professional").fadeIn(1000);
            } else {
                $(".professional").fadeOut(1000);
            }
        });
    },
    getReviewedUser: function getReviewedUser(id) {
        var source = '/api/users/' + id;
        $.get(source, (function (result) {
            if (!$.isEmptyObject(result)) {
                console.log('ReviewRequestForm:componentDidMount:user:');
                console.log(result);
                this.setState({
                    reviewedUser: result
                });
            }
        }).bind(this));
    },
    getUrlParameter: function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var source = '/submitReviewRequest';
        var data = this.getFormData();
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $.ajax({
            type: "POST",
            url: source,
            async: true,
            data: formData,
            success: (function (result) {
                /*   console.log("Saved successfully!" + result);
                 document.getElementById("save-alert").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> Review Submitted Successfully.</label></div>";
                 $("#save-alert").alert();
                 $("#save-alert").fadeTo(4000, 500).slideUp(500, function(){
                 $("#save-alert").alert('close');
                 document.getElementById("save-alert").innerHTML = "";
                 }) */
                this.setState({
                    reviewId: undefined
                });
            }).bind(this),
            error: function error(request, status, _error) {
                console.log("Error saving data: " + _error.toString());
                document.getElementById("save-alert").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> An error occurred!</label></div>";
                $("#save-alert").alert();
                $("#save-alert").fadeTo(4000, 500).slideUp(500, function () {
                    $("#save-alert").alert('close');
                    document.getElementById("save-alert").innerHTML = "";
                });
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    getFormData: function getFormData() {
        return {
            id: this.state.reviewId,
            nps: $("input[name=recommendScale]:checked").val(),
            overallQualityOfService: $("input[name=rating2]:checked").val(),
            timelinessOfService: $("input[name=rating3]:checked").val(),
            overallRating: $("input[name=rating]:checked").val(),
            reviewComments: this.refs.comments.getDOMNode().value
        };
    },
    render: function render() {
        if (this.state.reviewId == undefined) {
            return React.createElement(
                'div',
                null,
                React.createElement(HeaderResponsiveIn, { user: this.state.user }),
                React.createElement(Banner, null),
                React.createElement(
                    'div',
                    { id: 'review-request-container', className: 'container' },
                    React.createElement(
                        'div',
                        { id: 'main' },
                        React.createElement(
                            'ol',
                            { className: 'breadcrumb' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12 text-left margin-left-10' },
                                    React.createElement('h4', { className: 'margin-top-10' })
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                React.createElement(
                                    'div',
                                    { className: 'panel' },
                                    React.createElement(
                                        'div',
                                        { id: 'review-request-main-panel', className: 'panel-body' },
                                        React.createElement(
                                            'div',
                                            { className: 'jumbotron' },
                                            React.createElement(
                                                'h1',
                                                null,
                                                'Thank you!'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                'This review has been submitted'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement(
                                                    'a',
                                                    { className: 'btn btn-primary btn-lg', href: '/home', role: 'button' },
                                                    React.createElement('span', { className: 'fa fa-home' }),
                                                    '  Home'
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        } else {
            return React.createElement(
                'div',
                null,
                React.createElement(HeaderResponsiveIn, { user: this.state.user }),
                React.createElement(Banner, null),
                React.createElement(
                    'div',
                    { id: 'review-request-container', className: 'container' },
                    React.createElement(
                        'div',
                        { id: 'main' },
                        React.createElement(
                            'ol',
                            { className: 'breadcrumb' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-12 text-left margin-left-10' },
                                    React.createElement(
                                        'h4',
                                        { className: 'margin-top-10' },
                                        'Submit a review for ',
                                        this.state.reviewedUser.firstName,
                                        ' ',
                                        this.state.reviewedUser.lastName
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                React.createElement(
                                    'div',
                                    { className: 'panel' },
                                    React.createElement(
                                        'div',
                                        { id: 'review-request-main-panel', className: 'panel-body' },
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            React.createElement(
                                                'div',
                                                { className: 'col-lg-8 text-left ' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'col-sm-12' },
                                                        React.createElement('div', { id: 'save-alert' })
                                                    )
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { className: 'well well-sm col-lg-12' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'input-group' },
                                                        React.createElement(
                                                            'label',
                                                            { className: 'control-label', 'for': 'recommendScale' },
                                                            'On a scale of 0 to 10, how likely are you to recommend ',
                                                            this.state.reviewedUser.firstName,
                                                            ' ',
                                                            this.state.reviewedUser.lastName,
                                                            ' to a friend or colleague?'
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            { className: 'col-md-12' },
                                                            React.createElement(
                                                                'label',
                                                                { className: 'radio-inline' },
                                                                React.createElement('input', { id: 'rate0',
                                                                    name: 'recommendScale',
                                                                    type: 'radio',
                                                                    value: '0' }),
                                                                '0'
                                                            ),
                                                            React.createElement(
                                                                'label',
                                                                { className: 'radio-inline' },
                                                                React.createElement('input', { id: 'rate1',
                                                                    name: 'recommendScale',
                                                                    type: 'radio',
                                                                    value: '1' }),
                                                                '1'
                                                            ),
                                                            React.createElement(
                                                                'label',
                                                                { className: 'radio-inline' },
                                                                React.createElement('input', { id: 'rate1',
                                                                    name: 'recommendScale',
                                                                    type: 'radio',
                                                                    value: '2' }),
                                                                '2'
                                                            ),
                                                            React.createElement(
                                                                'label',
                                                                { className: 'radio-inline' },
                                                                React.createElement('input', { id: 'rate1',
                                                                    name: 'recommendScale',
                                                                    type: 'radio',
                                                                    value: '3' }),
                                                                '3'
                                                            ),
                                                            React.createElement(
                                                                'label',
                                                                { className: 'radio-inline' },
                                                                React.createElement('input', { id: 'rate1',
                                                                    name: 'recommendScale',
                                                                    type: 'radio',
                                                                    value: '4' }),
                                                                '4'
                                                            ),
                                                            React.createElement(
                                                                'label',
                                                                { className: 'radio-inline' },
                                                                React.createElement('input', { id: 'rate1',
                                                                    name: 'recommendScale',
                                                                    type: 'radio',
                                                                    value: '5' }),
                                                                '5'
                                                            ),
                                                            React.createElement(
                                                                'label',
                                                                { className: 'radio-inline' },
                                                                React.createElement('input', { id: 'rate1',
                                                                    name: 'recommendScale',
                                                                    type: 'radio',
                                                                    value: '6' }),
                                                                '6'
                                                            ),
                                                            React.createElement(
                                                                'label',
                                                                { className: 'radio-inline' },
                                                                React.createElement('input', { id: 'rate1',
                                                                    name: 'recommendScale',
                                                                    type: 'radio',
                                                                    value: '7' }),
                                                                '7'
                                                            ),
                                                            React.createElement(
                                                                'label',
                                                                { className: 'radio-inline' },
                                                                React.createElement('input', { id: 'rate1',
                                                                    name: 'recommendScale',
                                                                    type: 'radio',
                                                                    value: '8' }),
                                                                '8'
                                                            ),
                                                            React.createElement(
                                                                'label',
                                                                { className: 'radio-inline' },
                                                                React.createElement('input', { id: 'rate1',
                                                                    name: 'recommendScale',
                                                                    type: 'radio',
                                                                    value: '9' }),
                                                                '9'
                                                            ),
                                                            React.createElement(
                                                                'label',
                                                                { className: 'radio-inline' },
                                                                React.createElement('input', { id: 'rate1',
                                                                    name: 'recommendScale',
                                                                    type: 'radio',
                                                                    value: '10' }),
                                                                '10'
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'label',
                                                            { className: 'col-md-5 control-label text-left help' },
                                                            React.createElement('span', { className: 'fa fa-long-arrow-left' }),
                                                            ' Not likely to recommend'
                                                        ),
                                                        React.createElement(
                                                            'label',
                                                            { className: 'col-md-7 control-label text-left help' },
                                                            'Extremely likely to recommend ',
                                                            React.createElement('span', { className: 'fa fa-long-arrow-right' })
                                                        )
                                                    )
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { className: 'well well-sm col-lg-12' },
                                                    React.createElement(
                                                        'label',
                                                        { className: 'col-lg-12 control-label text-left alert' },
                                                        'If Services were provided, please rate ',
                                                        this.state.reviewedUser.firstName,
                                                        ' ',
                                                        this.state.reviewedUser.lastName,
                                                        ' in the following categories:'
                                                    ),
                                                    React.createElement(
                                                        'div',
                                                        { className: 'input-group col-lg-12' },
                                                        React.createElement(
                                                            'label',
                                                            { className: 'col-lg-4 col-md-12 col-sm-12 col-xs-12 control-label stars-label' },
                                                            'Overall Rating'
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            { className: 'col-lg-4 col-md-12 col-sm-12 col-xs-12' },
                                                            React.createElement(
                                                                'fieldset',
                                                                { className: 'rating' },
                                                                React.createElement('input', { type: 'radio', id: 'star5', name: 'rating',
                                                                    value: '5' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'star5',
                                                                        title: 'Rocks!' },
                                                                    '5 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'star4', name: 'rating',
                                                                    value: '4' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'star4',
                                                                        title: 'Pretty good' },
                                                                    '4 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'star3', name: 'rating',
                                                                    value: '3' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'star3',
                                                                        title: 'Meh' },
                                                                    '3 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'star2', name: 'rating',
                                                                    value: '2' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'star2',
                                                                        title: 'Kinda bad' },
                                                                    '2 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'star1', name: 'rating',
                                                                    value: '1' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'star1',
                                                                        title: 'Sucks big time' },
                                                                    '1 star'
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'div',
                                                        { className: 'input-group col-lg-12' },
                                                        React.createElement(
                                                            'label',
                                                            { className: 'col-lg-4 col-md-12 col-sm-12 col-xs-12 control-label stars-label' },
                                                            'Overall Quality of Service'
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            { className: 'col-lg-4 col-md-12 col-sm-12 col-xs-12' },
                                                            React.createElement(
                                                                'fieldset',
                                                                { className: 'rating' },
                                                                React.createElement('input', { type: 'radio', id: 'quality5', name: 'rating2',
                                                                    value: '5' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'quality5',
                                                                        title: 'Rocks!' },
                                                                    '5 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'quality4', name: 'rating2',
                                                                    value: '4' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'quality4',
                                                                        title: 'Pretty good' },
                                                                    '4 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'quality3', name: 'rating2',
                                                                    value: '3' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'quality3',
                                                                        title: 'Meh' },
                                                                    '3 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'quality2', name: 'rating2',
                                                                    value: '2' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'quality2',
                                                                        title: 'Kinda bad' },
                                                                    '2 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'quality1', name: 'rating2',
                                                                    value: '1' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'quality1',
                                                                        title: 'Sucks big time' },
                                                                    '1 star'
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'div',
                                                        { className: 'input-group col-lg-12' },
                                                        React.createElement(
                                                            'label',
                                                            { className: 'col-lg-4 col-md-12 col-sm-12 col-xs-12 control-label stars-label' },
                                                            'Timeliness of Service'
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            { className: 'col-lg-4 col-md-12 col-sm-12 col-xs-12' },
                                                            React.createElement(
                                                                'fieldset',
                                                                { className: 'rating' },
                                                                React.createElement('input', { type: 'radio', id: 'time5', name: 'rating3',
                                                                    value: '5' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'time5',
                                                                        title: 'Rocks!' },
                                                                    '5 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'time4', name: 'rating3',
                                                                    value: '4' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'time4',
                                                                        title: 'Pretty good' },
                                                                    '4 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'time3', name: 'rating3',
                                                                    value: '3' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'time3',
                                                                        title: 'Meh' },
                                                                    '3 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'time2', name: 'rating3',
                                                                    value: '2' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'time2',
                                                                        title: 'Kinda bad' },
                                                                    '2 stars'
                                                                ),
                                                                React.createElement('input', { type: 'radio', id: 'time1', name: 'rating3',
                                                                    value: '1' }),
                                                                React.createElement(
                                                                    'label',
                                                                    { htmlFor: 'time1',
                                                                        title: 'Sucks big time' },
                                                                    '1 star'
                                                                )
                                                            )
                                                        )
                                                    )
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { className: 'well well-sm col-lg-12' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'input-group' },
                                                        React.createElement(
                                                            'label',
                                                            { htmlFor: 'comments',
                                                                className: 'col-lg-12 control-label text-left alert' },
                                                            'We would appreciate any comments you may have about your overall experience:'
                                                        ),
                                                        React.createElement('textarea', { className: 'form-control col-md-12', rows: '5',
                                                            name: 'comments', id: 'comments', ref: 'comments',
                                                            placeholder: 'Your Comments' })
                                                    )
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { className: 'row' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'col-lg-12' },
                                                        React.createElement(
                                                            'button',
                                                            { type: 'button',
                                                                className: 'btn btn-primary btn-sm btn-block',
                                                                onClick: this.handleSubmit },
                                                            React.createElement('span', { className: 'fa fa-send' }),
                                                            ' Submit'
                                                        )
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'col-lg-4' },
                                                React.createElement(ProfilePanel, { user: this.state.reviewedUser }),
                                                React.createElement(NavigationPanel, null)
                                            )
                                        )
                                    ),
                                    React.createElement('div', { className: 'panel-footer' })
                                )
                            )
                        )
                    )
                ),
                React.createElement(Footer, null)
            );
        }
        ;
    }
});

ReactDOM.render(React.createElement(ReviewRequestForm, null), document.getElementById('content'));