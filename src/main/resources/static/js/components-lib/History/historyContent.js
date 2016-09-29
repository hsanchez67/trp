'use strict';

var Result4 = React.createClass({
    displayName: 'Result4',

    getInitialState: function getInitialState() {
        return {
            fromUser: [],
            toUser: [],
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function componentWillMount() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/' + fromUserId;
        $.get(source, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }).bind(this));
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/' + toUserId;
        $.get(source2, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }).bind(this));
    },
    handleOpenMessage: function handleOpenMessage() {
        window.location.href = '/reviewRequest/' + this.props.reviewId;
    },
    render: function render() {
        var arrow = classNames({
            'arrow': this.props.count % 2 === 0,
            'arrow-alt': this.props.count % 2 !== 0
        });
        var timeline = classNames({
            'timeline-item': this.props.count % 2 === 0,
            'timeline-item alt': this.props.count % 2 !== 0
        });
        var reviewStatus = "";
        if (this.props.status == "Reviewed") {
            reviewStatus = React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'red' },
                    this.state.fromUser.firstName,
                    ' ',
                    this.state.fromUser.lastName
                ),
                ' received a ',
                React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'a',
                        { className: 'blue' },
                        'REVIEW'
                    )
                ),
                ' from ',
                React.createElement(
                    'a',
                    { className: 'red' },
                    this.state.toUser.firstName,
                    ' ',
                    this.state.toUser.lastName
                ),
                ' '
            );
        } else {
            reviewStatus = React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'red' },
                    this.state.fromUser.firstName,
                    ' ',
                    this.state.fromUser.lastName
                ),
                ' sent a ',
                React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'a',
                        { className: 'blue' },
                        'REVIEW REQUEST'
                    )
                ),
                ' to ',
                React.createElement(
                    'a',
                    { className: 'red' },
                    this.state.toUser.firstName,
                    ' ',
                    this.state.toUser.lastName
                ),
                ' '
            );
        }
        return React.createElement(
            'article',
            { className: timeline },
            React.createElement(
                'div',
                { className: 'timeline-desk' },
                React.createElement(
                    'div',
                    { className: 'panel' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement('span', { className: arrow }),
                        React.createElement('span', { className: 'timeline-icon light-green' }),
                        React.createElement(
                            'span',
                            { className: 'timeline-date' },
                            this.props.createdTime
                        ),
                        React.createElement(
                            'h1',
                            { className: 'light-green' },
                            this.props.createdDate
                        ),
                        reviewStatus,
                        React.createElement(
                            'div',
                            { className: 'album' },
                            React.createElement(Avatar, { id: this.state.fromUser.id, username: this.state.fromUser.avatar, name: this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName, className: 'task-thumb' }),
                            React.createElement(Avatar, { id: this.state.toUser.id, username: this.state.toUser.avatar, name: this.state.toUser.firstName + ' ' + this.state.toUser.lastName, className: 'task-thumb' })
                        )
                    )
                )
            )
        );
    }
});

var Result3 = React.createClass({
    displayName: 'Result3',

    getInitialState: function getInitialState() {
        return {
            fromUser: [],
            toUser: [],
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function componentWillMount() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/' + fromUserId;
        $.get(source, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }).bind(this));
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/' + toUserId;
        $.get(source2, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }).bind(this));
    },
    handleOpenMessage: function handleOpenMessage() {
        window.location.href = '/message/' + this.props.id;
    },
    render: function render() {
        var arrow = classNames({
            'arrow': this.props.count % 2 === 0,
            'arrow-alt': this.props.count % 2 !== 0
        });
        var timeline = classNames({
            'timeline-item': this.props.count % 2 === 0,
            'timeline-item alt': this.props.count % 2 !== 0
        });
        return React.createElement(
            'article',
            { className: timeline },
            React.createElement(
                'div',
                { className: 'timeline-desk' },
                React.createElement(
                    'div',
                    { className: 'panel' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement('span', { className: arrow }),
                        React.createElement('span', { className: 'timeline-icon red' }),
                        React.createElement(
                            'span',
                            { className: 'timeline-date' },
                            this.props.createdTime
                        ),
                        React.createElement(
                            'h1',
                            { className: 'red' },
                            this.props.createdDate
                        ),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'a',
                                { className: 'red' },
                                this.state.fromUser.firstName,
                                ' ',
                                this.state.fromUser.lastName
                            ),
                            ' sent a ',
                            React.createElement(
                                'span',
                                null,
                                React.createElement(
                                    'a',
                                    { className: 'blue' },
                                    'MESSAGE'
                                )
                            ),
                            ' to ',
                            React.createElement(
                                'a',
                                { className: 'red' },
                                this.state.toUser.firstName,
                                ' ',
                                this.state.toUser.lastName
                            ),
                            ' '
                        ),
                        React.createElement(
                            'div',
                            { className: 'notification' },
                            React.createElement(
                                'strong',
                                null,
                                'Subject: '
                            ),
                            this.props.subject
                        ),
                        React.createElement(
                            'div',
                            { className: 'album' },
                            React.createElement(Avatar, { id: this.state.fromUser.id, username: this.state.fromUser.avatar, name: this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName, className: 'task-thumb' }),
                            React.createElement(Avatar, { id: this.state.toUser.id, username: this.state.toUser.avatar, name: this.state.toUser.firstName + ' ' + this.state.toUser.lastName, className: 'task-thumb' })
                        )
                    )
                )
            )
        );
    }
});

var Result2 = React.createClass({
    displayName: 'Result2',

    getInitialState: function getInitialState() {
        return {
            fromUser: [],
            toUser: [],
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function componentWillMount() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/' + fromUserId;
        $.get(source, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }).bind(this));
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/' + toUserId;
        $.get(source2, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }).bind(this));
        var subjectUserId = this.props.subjectUserId;
        var source3 = '/api/users/' + subjectUserId;
        $.get(source3, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    subjectUser: result
                });
            }
        }).bind(this));
    },
    handleOpenReferral: function handleOpenReferral() {
        window.location.href = '/referralRequest/' + this.props.id;
    },
    render: function render() {
        var referralStatus = "";
        if (this.props.status == "Accepted") {
            referralStatus = React.createElement(
                'span',
                null,
                React.createElement(
                    'strong',
                    null,
                    'Referral Accepted! '
                ),
                React.createElement('img', { className: 'latched-icon', src: '/images/LATCH-Logo-Check.png', alt: 'Latched' })
            );
        } else if (this.props.status == "Rejected") {
            referralStatus = React.createElement(
                'span',
                null,
                React.createElement(
                    'strong',
                    null,
                    'Referral Rejected! '
                ),
                React.createElement('img', { className: 'latched-icon', src: '/images/LATCH-Logo-Uncheck.png', alt: 'Latched' })
            );
        } else {
            referralStatus = React.createElement(
                'span',
                null,
                React.createElement(
                    'strong',
                    null,
                    'Referral Pending! '
                )
            );
        }
        var arrow = classNames({
            'arrow': this.props.count % 2 === 0,
            'arrow-alt': this.props.count % 2 !== 0
        });
        var timeline = classNames({
            'timeline-item': this.props.count % 2 === 0,
            'timeline-item alt': this.props.count % 2 !== 0
        });
        return React.createElement(
            'article',
            { className: timeline },
            React.createElement(
                'div',
                { className: 'timeline-desk' },
                React.createElement(
                    'div',
                    { className: 'panel' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement('span', { className: arrow }),
                        React.createElement('span', { className: 'timeline-icon purple' }),
                        React.createElement(
                            'span',
                            { className: 'timeline-date' },
                            this.props.createdTime
                        ),
                        React.createElement(
                            'h1',
                            { className: 'purple' },
                            this.props.createdDate
                        ),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'a',
                                { className: 'red' },
                                this.state.fromUser.firstName,
                                ' ',
                                this.state.fromUser.lastName
                            ),
                            '  ',
                            React.createElement(
                                'span',
                                null,
                                React.createElement(
                                    'a',
                                    { className: 'blue' },
                                    'REFERRED'
                                )
                            ),
                            '  ',
                            React.createElement(
                                'a',
                                { className: 'red' },
                                this.state.subjectUser.firstName,
                                ' ',
                                this.state.subjectUser.lastName
                            ),
                            ' to ',
                            React.createElement(
                                'a',
                                { className: 'red' },
                                this.state.toUser.firstName,
                                ' ',
                                this.state.toUser.lastName
                            ),
                            ' '
                        ),
                        React.createElement(
                            'div',
                            { className: 'notification' },
                            referralStatus
                        ),
                        React.createElement(
                            'div',
                            { className: 'album' },
                            React.createElement(Avatar, { id: this.state.fromUser.id, username: this.state.fromUser.avatar, name: this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName, className: 'task-thumb' }),
                            React.createElement(Avatar, { id: this.state.subjectUser.id, username: this.state.subjectUser.avatar, name: this.state.subjectUser.firstName + ' ' + this.state.subjectUser.lastName, className: 'task-thumb' }),
                            React.createElement(Avatar, { id: this.state.toUser.id, username: this.state.toUser.avatar, name: this.state.toUser.firstName + ' ' + this.state.toUser.lastName, className: 'task-thumb' })
                        )
                    )
                )
            )
        );
    }
});

var Result = React.createClass({
    displayName: 'Result',

    getInitialState: function getInitialState() {
        return {
            fromUser: [],
            toUser: [],
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function componentWillMount() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/' + fromUserId;
        $.get(source, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }).bind(this));
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/' + toUserId;
        $.get(source2, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }).bind(this));
        var subjectUserId = this.props.subjectUserId;
        var source3 = '/api/users/' + subjectUserId;
        $.get(source3, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    subjectUser: result
                });
            }
        }).bind(this));
    },
    handleOpenIntroduction: function handleOpenIntroduction() {
        window.location.href = '/introductionRequest/' + this.props.id;
    },
    render: function render() {
        var arrow = classNames({
            'arrow': this.props.count % 2 === 0,
            'arrow-alt': this.props.count % 2 !== 0
        });
        var timeline = classNames({
            'timeline-item': this.props.count % 2 === 0,
            'timeline-item alt': this.props.count % 2 !== 0
        });
        return React.createElement(
            'article',
            { className: timeline },
            React.createElement(
                'div',
                { className: 'timeline-desk' },
                React.createElement(
                    'div',
                    { className: 'panel' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement('span', { className: arrow }),
                        React.createElement('span', { className: 'timeline-icon blue' }),
                        React.createElement(
                            'span',
                            { className: 'timeline-date' },
                            this.props.createdTime
                        ),
                        React.createElement(
                            'h1',
                            { className: 'blue' },
                            this.props.createdDate
                        ),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'a',
                                { className: 'red' },
                                this.state.fromUser.firstName,
                                ' ',
                                this.state.fromUser.lastName
                            ),
                            ' ',
                            React.createElement(
                                'span',
                                null,
                                React.createElement(
                                    'a',
                                    { className: 'blue' },
                                    'INTRODUCED'
                                )
                            ),
                            '  ',
                            React.createElement(
                                'a',
                                { className: 'red' },
                                this.state.subjectUser.firstName,
                                ' ',
                                this.state.subjectUser.lastName
                            ),
                            ' to ',
                            React.createElement(
                                'a',
                                { className: 'red' },
                                this.state.toUser.firstName,
                                ' ',
                                this.state.toUser.lastName
                            ),
                            ' '
                        ),
                        React.createElement(
                            'div',
                            { className: 'album' },
                            React.createElement(Avatar, { id: this.state.fromUser.id, username: this.state.fromUser.avatar, name: this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName, className: 'task-thumb' }),
                            React.createElement(Avatar, { id: this.state.subjectUser.id, username: this.state.subjectUser.avatar, name: this.state.subjectUser.firstName + ' ' + this.state.subjectUser.lastName, className: 'task-thumb' }),
                            React.createElement(Avatar, { id: this.state.toUser.id, username: this.state.toUser.avatar, name: this.state.toUser.firstName + ' ' + this.state.toUser.lastName, className: 'task-thumb' })
                        )
                    )
                )
            )
        );
    }
});

var HistoryResults = React.createClass({
    displayName: 'HistoryResults',

    getInitialState: function getInitialState() {
        return {
            loading: true
        };
    },
    componentDidUpdate: function componentDidUpdate() {
        // drag & drop
        $(".source li").draggable({
            addClasses: false,
            appendTo: "body",
            helper: "clone"
        });
    },
    componentDidMount: function componentDidMount() {
        setTimeout((function () {
            this.setState({ loading: false });
        }).bind(this), 5000);
    },
    deleteMessage: function deleteMessage(id) {
        this.props.deleteMessage(id);
    },
    render: function render() {
        if (this.state.loading) {
            return React.createElement(
                'div',
                { className: 'no-entries' },
                React.createElement('i', { className: 'fa fa-5x fa-cog fa-spin' })
            );
        } else if ($.isEmptyObject(this.props.data) && !this.state.loading) {
            return React.createElement(
                'div',
                { className: 'no-entries' },
                'No History'
            );
        } else {
            var messages = [];
            var count = 0;
            var countIntros = 0;
            var countReferrals = 0;
            this.props.data.forEach((function (message) {
                var created = new Date(message.created);
                var hours = created.getHours();
                var minutes = created.getMinutes();
                var createdDate = $.datepicker.formatDate("dd MM yy | DD", new Date(created));
                var createdTime = $.datepicker.formatTime("h:mm tt", { hour: hours, minute: minutes }, {});
                if (message.transactionType == "Introduction") {
                    countIntros++;
                    messages.push(React.createElement(Result, { key: message.id, id: message.id, fromUserId: message.fromUserId, groupId: message.groupId,
                        subjectUserId: message.subjectUserId, attachments: message.attachedAssetIds,
                        status: message.status, subject: message.subject, toUserId: message.toUserId,
                        transactionType: message.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++, deleteMessage: this.deleteMessage }));
                } else if (message.transactionType == "Referral") {
                    countReferrals++;
                    messages.push(React.createElement(Result2, { key: message.id, id: message.id, fromUserId: message.fromUserId, groupId: message.groupId,
                        subjectUserId: message.subjectUserId, attachments: message.attachedAssetIds,
                        status: message.status, subject: message.subject, toUserId: message.toUserId,
                        transactionType: message.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++, deleteMessage: this.deleteMessage }));
                } else if (message.transactionType == "Communication" || message.transactionType == "Notification") {
                    messages.push(React.createElement(Result3, { key: message.id, id: message.id, fromUserId: message.fromUserId, groupId: message.groupId,
                        subjectUserId: message.subjectUserId, attachments: message.attachedAssetIds,
                        status: message.status, subject: message.subject, toUserId: message.toUserId,
                        transactionType: message.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++, deleteMessage: this.deleteMessage }));
                } else if (message.transactionType == "Review") {
                    messages.push(React.createElement(Result4, { key: message.id, id: message.id, reviewId: message.transactionid, fromUserId: message.fromUserId, groupId: message.groupId,
                        subjectUserId: message.subjectUserId, attachments: message.attachedAssetIds,
                        status: message.status, subject: message.subject, toUserId: message.toUserId,
                        transactionType: message.transactionType, createdDate: createdDate, createdTime: createdTime,
                        count: count++, deleteMessage: this.deleteMessage }));
                }
            }).bind(this));
            console.log(countIntros + " - " + console.log(countReferrals));
            return React.createElement(
                'div',
                { id: 'timeline', className: 'timeline' },
                messages
            );
        }
    }
});

var HistoryContent = React.createClass({
    displayName: 'HistoryContent',
    getInitialState: function getInitialState() {
        return {
            user: [],
            history: [],
            touches: 0,
            referrals: 0,
            intros: 0,
            reviews: 0,
            messages: 0,
            page: 0
        };
    },
    componentWillMount: function componentWillMount() {
        console.log("HistoryContent:componentWillMount:");
        var page = 0;
        this.prepareComponentState(page);
    },
    prepareComponentState: function prepareComponentState(page) {
        console.log("HistoryContent:prepareComponentState:");
        var id = $('#id').val();
        var subjectUserId = $('#profileid').val();
        var data = {
            id: id,
            subjectUserId: subjectUserId,
            page: page
        };
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $("#paginator").empty();
        $.ajax({
            type: "POST",
            url: "/getHistory",
            data: formData,
            success: (function success(result) {
                if ($.isEmptyObject(result) || result.error == "No History") {
                    console.log("No History");
                    this.setState({
                        user: [],
                        history: [],
                        touches: 0,
                        referrals: 0,
                        intros: 0,
                        review: 0,
                        messages: 0
                    });
                    return null;
                } else {
                    console.log(result);
                    this.setState({
                        user: result.user,
                        history: result.history,
                        touches: result.touches,
                        reviews: result.reviews,
                        intros: result.intros,
                        referrals: result.referrals,
                        messages: result.messages
                    });
                    var currentPage = result.pageNumber;
                    var totalPages = result.totalPages;
                    var options = {
                        currentPage: currentPage + 1,
                        totalPages: totalPages,
                        size: 'normal',
                        alignment: 'center',
                        onPageClicked: (function (e, originalEvent, type, page) {
                            console.log(page);
                            this.prepareComponentState(page - 1);
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
            error: function error(_error) {
                console.log('Error: ' + _error);
                return false;
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'col-lg-8' },
            React.createElement(
                'div',
                { id: 'profile-content-row', className: 'row' },
                React.createElement(
                    'div',
                    { className: 'row', id: 'history-content' },
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
                                                    { className: 'history-title' },
                                                    'Relationship history with ',
                                                    React.createElement(
                                                        'strong',
                                                        null,
                                                        this.state.user.firstName
                                                    ),
                                                    ' ',
                                                    this.state.user.lastName,
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
                                                React.createElement(
                                                    'div',
                                                    { className: 'btn-group' },
                                                    React.createElement(
                                                        'button',
                                                        { type: 'button', className: 'btn btn-primary btn-sm' },
                                                        React.createElement('i', { className: 'fa fa-print' }),
                                                        ' Print'
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'section',
                                { className: 'panel-body', id: 'timeline' },
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement(
                                                'h3',
                                                { className: 'timeline-title' },
                                                'Timeline'
                                            ),
                                            React.createElement(
                                                'p',
                                                { className: 't-info' },
                                                React.createElement(
                                                    'strong',
                                                    null,
                                                    this.state.touches
                                                ),
                                                ' Touches  ',
                                                React.createElement(
                                                    'strong',
                                                    { className: 'margin-left-20' },
                                                    this.state.referrals
                                                ),
                                                ' Referrals   ',
                                                React.createElement(
                                                    'strong',
                                                    { className: 'margin-left-20' },
                                                    this.state.intros
                                                ),
                                                ' Intros ',
                                                React.createElement(
                                                    'strong',
                                                    { className: 'margin-left-20' },
                                                    this.state.reviews
                                                ),
                                                ' Reviews ',
                                                React.createElement(
                                                    'strong',
                                                    { className: 'margin-left-20' },
                                                    this.state.messages
                                                ),
                                                ' Messages'
                                            )
                                        ),
                                        React.createElement(HistoryResults, { data: this.state.history })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12 margin-top-20' },
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            React.createElement(
                                                'div',
                                                { className: 'text-center' },
                                                React.createElement('div', { id: 'paginator', className: 'pagination' })
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
    }
});