'use strict';

var ProfilePanelPlus = React.createClass({
    displayName: 'ProfilePanelPlus',
    getInitialState: function getInitialState() {
        return {
            reviews: [],
            reviewCount: 0,
            rating: 0,
            id: this.props.user.id,
            contactNotes: '',
            gotNotes: false,
            initials: '',
            userNotes: []
        };
    },
    componentDidUpdate: function componentDidUpdate(prevProps) {
        console.log("profilePanelPlus:componentDidUpdate:");
        console.log(prevProps);
        console.log(this.props);
        console.log(this.state.gotNotes);
        if (!$.isEmptyObject(this.props.user) && !this.state.gotNotes) {
            console.log("profilePanelPlus:componentDidUpdate:getNotes");
            $('#contactNotes').editable('destroy');
            this.initializeContactNotes(this.props.user.id);
            this.getContactNotes(this.props.user.id);
        }
    },
    getContactNotes: function getContactNotes(targetId) {
        // Get contact notes
        console.log("profilePanelPlus:getContactNotes:");
        var data = {
            ownerUserId: $('#id').val(),
            targetUserId: targetId
        };
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getContactNotes",
            async: true,
            data: formData,
            success: (function (result, textStatus, xhr) {
                console.log(result);
                if (xhr.status == 401) {
                    window.location.href = "/myShortList";
                }
                if (!$.isEmptyObject(result) && result.content != null) {
                    this.setState({
                        contactNotes: result.content,
                        gotNotes: true
                    });
                    $('#contactNotes').editable('setValue', result.content);
                } else if (!$.isEmptyObject(result) && result.content == null) {
                    this.setState({
                        contactNotes: '',
                        gotNotes: true
                    });
                    $('#contactNotes').editable('setValue', '');
                }
                //$('#contactNotes').editable('destroy');
            }).bind(this),
            complete: function complete(xhr, textStatus) {
                if (xhr.status == 401) {
                    window.location.href = "/myShortList";
                }
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    initializeContactNotes: function initializeContactNotes(targetId) {
        var id = $('#id').val();
        var id2 = targetId;
        console.log("ProfilePanelPlus:initializeContactNotes:id:");
        console.log(id);
        console.log(id2);
        /*   $.fn.editable.defaults.mode = 'inline';
           $.fn.editable.defaults.url = '/saveUser';
           $.fn.editable.defaults.pk = id;
           $.fn.editable.defaults.ajaxOptions = {
               contentType: 'application/json',
               type: "post",
               dataType: 'json'
           };
           $.fn.editable.defaults.send = 'always';
           $.fn.editable.defaults.pk = id; */

        $('#contactNotes').editable({
            type: 'textarea',
            mode: 'inline',
            pk: id,
            url: '/saveContactNotes',
            send: 'always',
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            params: function params(_params) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    content: _params.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            },
            rows: 10
        });
    },
    componentDidMount: function componentDidMount() {
        $('.see-more').click(function () {
            $(this).text(function (i, text) {
                return text === "more..." ? "less..." : "more...";
            });
        });
    },
    componentWillMount: function componentWillMount() {},
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("ProfilePanelPlus:componentWillReceiveProps:");
        console.log(nextProps);
        console.log(this.props);
        if (nextProps.user != this.props.user) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function prepareComponentState(props) {
        console.log("ProfilePanelPlus:prepareComponentState:");
        console.log(props);
        if (props.user.id != null) {
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
            console.log(this.state.gotNotes);
            if (this.state.gotNotes) {
                console.log("profilePanelPlus:prepareComponentState:getNotes");
                $('#contactNotes').editable('destroy');
                this.initializeContactNotes(props.user.id);
                this.getContactNotes(props.user.id);
            }
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
                                { className: 'col-lg-12 col-lg-offset-1' },
                                React.createElement(ProfileBits, { profile: this.props.user })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-12 text-left' },
                                React.createElement(
                                    'div',
                                    { className: 'lead' },
                                    leadParagraph
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'clearfix', id: 'accordion' },
                                React.createElement(
                                    'div',
                                    { className: 'clear' },
                                    React.createElement(
                                        'div',
                                        { className: 'pull-right' },
                                        React.createElement(
                                            'a',
                                            { className: 'btn btn-primary btn-xs see-more', 'data-toggle': 'collapse', 'data-parent': '#accordion', href: '#collapseOne', role: 'button' },
                                            'more...'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { id: 'collapseOne', className: 'panel-collapse collapse' },
                                    React.createElement(
                                        'div',
                                        { id: 'profile-panel-body-collapse', className: 'panel-body' },
                                        React.createElement(
                                            'div',
                                            { className: 'mainText bottom10' },
                                            React.createElement('div', { dangerouslySetInnerHTML: { __html: marked(description) } })
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'well well-sm clearfix margin-top-20' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group text-left' },
                                    React.createElement(
                                        'label',
                                        { 'for': 'contactNotes', className: 'col-sm-12 control-label' },
                                        'Notes'
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-sm-12' },
                                        React.createElement(
                                            'a',
                                            { href: '#', id: 'contactNotes', ref: 'contactNotes', 'data-type': 'textarea', className: 'editable editable-click', 'data-title': 'Personal notes for this Contact' },
                                            this.state.contactNotes
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