'use strict';

var HeaderResponsiveIn = React.createClass({ displayName: 'Header',
    getInitialState: function getInitialState() {
        return {
            user: this.props.user,
            avatar: this.props.avatar,
            messages: 0,
            tasks: 0,
            seconds: 60,
            inbox: this.props.inbox,
            myq: this.props.myq,
            initials: ''
        };
    },
    componentDidMount: function componentDidMount() {
        console.log("HeaderResponsiveIn:componentDidMount:getNumOfMessages");
        var id = $('#id').val();
        var data = {
            id: id,
            status: "New"
        };
        $.ajax({
            type: "POST",
            url: "/getNumOfMessages",
            data: JSON.stringify(data, null, ' '),
            success: (function (result) {
                console.log(result);
                this.setState({
                    messages: result.page.totalElements
                });
                if (this.state.inbox != null && this.state.inbox) {
                    this.updateInbox(result.page.totalElements);
                }
            }).bind(this),
            error: function error(_error) {
                if (_error.status == 401) {
                    window.location.href = '/login';
                }
                console.log(_error);
                return false;
            },
            dataType: "json",
            contentType: "application/json"
        });
        this.getNumOfQueueItems();
        // TODO: Interval to check if new messages have arrived, turned off for development
        //this.interval = setInterval(this.tick, 1000);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("Header:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.tasks != null) {
            this.setState({
                tasks: nextProps.tasks
            });
        }
        if (nextProps.avatar != this.props.avatar && nextProps.avatar != "default") {
            $("#header-avatar").attr("src", "/api/remoteFiles/view/" + nextProps.avatar);
        }
        // get initials
        var name = nextProps.user.firstName + ' ' + nextProps.user.lastName;
        if (name != null) {
            var initials = name.match(/\b\w/g);
            console.log(initials);
            initials = (initials.shift() + initials.pop()).toUpperCase();
            console.log(initials);
            this.setState({ initials: initials });
        }
    },
    getNumOfQueueItems: function getNumOfQueueItems() {
        console.log("HeaderResponsiveIn:getNumOfQueueItems:getNumOfTasks");
        var id = $('#id').val();
        var data = {
            id: id,
            status: "Pending"
        };
        $.ajax({
            type: "POST",
            url: "/getNumOfTasks",
            data: JSON.stringify(data, null, ' '),
            success: (function (result) {
                console.log(result);
                if (result != null) {
                    this.setState({
                        tasks: result.page.totalElements
                    });
                }
            }).bind(this),
            error: function error(_error2) {
                if (_error2.status == 401) {
                    window.location.href = '/login';
                }
                console.log(_error2);
                return false;
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    componentWillUnmount: function componentWillUnmount() {
        clearInterval(this.interval);
    },
    tick: function tick() {
        this.setState({ seconds: this.state.seconds - 1 });
        if (this.state.seconds <= 0) {
            console.log("HeaderResponsiveIn:componentDidMount:tick 0");
            var id = $('#id').val();
            var data = {
                id: id,
                status: "New"
            };
            $.ajax({
                type: "POST",
                url: "/getNumOfMessages",
                data: JSON.stringify(data, null, ' '),
                success: (function (result) {
                    console.log(result.page.totalElements);
                    if (this.state.messages != result.page.totalElements) {
                        this.setState({
                            messages: result.page.totalElements
                        });
                        if (this.state.inbox != null && this.state.inbox) {
                            this.updateInbox(result.page.totalElements);
                        }
                    }
                }).bind(this),
                error: function error(_error3) {
                    console.log(_error3);
                    if (_error3.status === 401) {
                        window.location.href = "/login";
                    }
                    return false;
                },
                dataType: "json",
                contentType: "application/json"
            });
            // Check if tasks have updated
            var data2 = {
                id: id,
                status: "Pending"
            };
            $.ajax({
                type: "POST",
                url: "/getNumOfTasks",
                data: JSON.stringify(data2, null, ' '),
                success: (function (result) {
                    console.log(result);
                    this.setState({
                        tasks: result.page.totalElements
                    });
                    if (this.state.myq != null && this.state.myq) {
                        this.updateMyQ(result.page.totalElements);
                    }
                }).bind(this),
                error: function error(_error4) {
                    if (_error4.status == 401) {
                        window.location.href = '/login';
                    }
                    console.log(_error4);
                    return false;
                },
                dataType: "json",
                contentType: "application/json"
            });
            this.setState({ seconds: 60 });
        }
    },
    updateInbox: function updateInbox(m) {
        this.props.updateInbox(m);
    },
    updateMyQ: function updateMyQ(m) {
        this.props.updateMyQ(m);
    },
    timerReset: function timerReset() {
        console.log("Timer Reset");
    },
    gotoProfile: function gotoProfile() {
        var id = $('#id').val();
        console.log(id);
        window.location.href = '/profile/' + id;
    },
    gotoInbox: function gotoInbox() {
        window.location.href = '/inbox';
    },
    gotoMyQ: function gotoMyQ() {
        window.location.href = '/myq';
    },
    addMyQTask: function addMyQTask() {
        window.location.href = '/myqplus';
    },
    handleAddUserToCurrentGroup: function handleAddUserToCurrentGroup(id) {
        this.props.handleAddUserToCurrentGroup(id);
    },
    render: function render() {
        var profileAvatar = React.createElement('img', { id: 'header-avatar', alt: '', className: 'img-circle', src: '/api/remoteFiles/view/' + this.props.user.avatar });
        if (this.props.user.avatar == 'default' && this.state.initials != '') {
            profileAvatar = React.createElement(
                'div',
                { className: 'avatar-circle-small avatar-top-6px' },
                React.createElement('img', { className: 'hidden', id: this.props.user.id }),
                React.createElement(
                    'span',
                    { className: 'initials-small' },
                    this.state.initials
                )
            );
        }
        return React.createElement(
            'div',
            { id: 'wrapper' },
            React.createElement(
                'div',
                { className: 'header-top' },
                React.createElement(
                    'nav',
                    { className: 'navbar navbar-inverse navbar-static-top navbar-margin', role: 'navigation' },
                    React.createElement(
                        'div',
                        { className: 'container' },
                        React.createElement(
                            'div',
                            { className: 'navbar-header' },
                            React.createElement(
                                'a',
                                { className: 'navbar-brand', href: '/' },
                                React.createElement(Logo, null)
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar-collapse-1' },
                                React.createElement(
                                    'span',
                                    { className: 'sr-only' },
                                    'Toggle navigation'
                                ),
                                React.createElement('span', { className: 'icon-bar' }),
                                React.createElement('span', { className: 'icon-bar' }),
                                React.createElement('span', { className: 'icon-bar' })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'collapse navbar-collapse', id: 'navbar-collapse-1' },
                            React.createElement(
                                'ul',
                                { className: 'nav navbar-nav navbar-right top-menu hidden-xs' },
                                React.createElement(
                                    'li',
                                    { className: 'hidden-xs' },
                                    React.createElement(NavSearch, { handleAddUserToCurrentGroup: this.handleAddUserToCurrentGroup, label: this.props.label })
                                ),
                                React.createElement(
                                    'li',
                                    { className: 'hidden-xs' },
                                    React.createElement('span', { className: 'glyphicon glyphicon-search search marginRight50', 'aria-hidden': 'true' })
                                ),
                                React.createElement(
                                    'li',
                                    { className: 'hidden-xs', className: 'dropdown' },
                                    React.createElement(
                                        'a',
                                        { 'data-toggle': 'dropdown', className: 'dropdown-toggle', href: '#' },
                                        React.createElement(
                                            'span',
                                            { className: 'label' },
                                            this.props.user.firstName,
                                            ' ',
                                            this.props.user.lastName
                                        ),
                                        React.createElement('b', { className: 'caret' })
                                    ),
                                    React.createElement(
                                        'ul',
                                        { className: 'dropdown-menu' },
                                        React.createElement(
                                            'li',
                                            null,
                                            React.createElement(
                                                'a',
                                                { href: '/profile/' + this.props.user.id },
                                                React.createElement('i', { className: ' fa fa-suitcase' }),
                                                'Profile'
                                            )
                                        ),
                                        React.createElement(
                                            'li',
                                            null,
                                            React.createElement(
                                                'a',
                                                { href: '/settings' },
                                                React.createElement('i', { className: 'fa fa-cog' }),
                                                'Settings'
                                            )
                                        ),
                                        React.createElement(
                                            'li',
                                            null,
                                            React.createElement(
                                                'a',
                                                { href: '/logout' },
                                                React.createElement('i', { className: 'fa fa-key' }),
                                                'Log Out'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { className: 'hidden-xs' },
                                    React.createElement(
                                        'a',
                                        { className: 'pointer', onClick: this.gotoProfile },
                                        profileAvatar
                                    )
                                )
                            ),
                            React.createElement(
                                'ul',
                                { id: 'header-bar', className: 'nav navbar-nav navbar-left top-menu hidden-xs' },
                                React.createElement(
                                    'li',
                                    { id: 'header-inbox-bar' },
                                    React.createElement(
                                        'a',
                                        { onClick: this.gotoInbox },
                                        React.createElement('i', { className: 'fa fa-envelope-o' }),
                                        React.createElement(
                                            'span',
                                            { className: 'badge bg-important' },
                                            this.state.messages
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'header-myq-bar', className: 'dropdown' },
                                    React.createElement(
                                        'a',
                                        { onClick: this.gotoMyQ },
                                        React.createElement('i', { className: 'fa fa-tasks' }),
                                        React.createElement(
                                            'span',
                                            { className: 'badge bg-success' },
                                            this.state.tasks
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'header-myq-bar-plus' },
                                    React.createElement(
                                        'a',
                                        { onClick: this.addMyQTask },
                                        React.createElement(
                                            'span',
                                            null,
                                            React.createElement('i', { className: 'fa fa-tasks' }),
                                            React.createElement('i', { className: 'fa fa-plus fa-0x-plus' })
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'ul',
                                { className: 'nav navbar-nav navbar-nav-hidden navbar-right hidden-lg hidden-md hidden-sm visible-xs' },
                                React.createElement(
                                    'li',
                                    { id: 'nav-hidden-home', className: 'active' },
                                    React.createElement(
                                        'a',
                                        { href: '/home' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement('i', { className: 'fa fa-home fa-3x' }),
                                            React.createElement('br', null),
                                            'Home'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'nav-hidden-search', className: ' ' },
                                    React.createElement(
                                        'a',
                                        { href: '/search' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement('i', { className: 'fa fa-search fa-3x' }),
                                            React.createElement('br', null),
                                            'Search'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'nav-hidden-introduction', className: 'dropdown' },
                                    React.createElement(
                                        'a',
                                        { className: 'dropdown-toggle', 'data-toggle': 'dropdown', href: '#' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement('i', { className: 'fa fa-comments fa-3x' }),
                                            React.createElement('br', null),
                                            'Communications ',
                                            React.createElement('span', { className: 'caret' })
                                        )
                                    ),
                                    React.createElement(
                                        'ul',
                                        { className: 'dropdown-menu', role: 'menu' },
                                        React.createElement(
                                            'li',
                                            null,
                                            React.createElement(
                                                'a',
                                                { href: '/introduction' },
                                                React.createElement('i', { className: 'fa fa-share-alt' }),
                                                ' Introduction'
                                            )
                                        ),
                                        React.createElement(
                                            'li',
                                            null,
                                            React.createElement(
                                                'a',
                                                { href: '/referral' },
                                                React.createElement('i', { className: 'fa fa-arrows-right' }),
                                                ' Referral'
                                            )
                                        ),
                                        React.createElement(
                                            'li',
                                            null,
                                            React.createElement(
                                                'a',
                                                { href: '/sendMessage' },
                                                React.createElement('i', { className: 'fa fa-envelope' }),
                                                ' Communicate'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'nav-hidden-myshortlist', className: ' ' },
                                    React.createElement(
                                        'a',
                                        { href: '/myShortList' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement('i', { className: 'fa fa-sitemap fa-3x' }),
                                            React.createElement('br', null),
                                            'My Short List'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'nav-hidden-messages', className: 'dropdown' },
                                    React.createElement(
                                        'a',
                                        { className: 'dropdown-toggle', 'data-toggle': 'dropdown', href: '#' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement('i', { className: 'fa fa-envelope fa-3x' }),
                                            React.createElement('br', null),
                                            'Messages ',
                                            React.createElement('span', { className: 'caret' })
                                        )
                                    ),
                                    React.createElement(
                                        'ul',
                                        { className: 'dropdown-menu', role: 'menu' },
                                        React.createElement(
                                            'li',
                                            null,
                                            React.createElement(
                                                'a',
                                                { href: '/inbox' },
                                                React.createElement('i', { className: 'fa fa-inbox fa-fw' }),
                                                ' Inbox'
                                            )
                                        ),
                                        React.createElement(
                                            'li',
                                            null,
                                            React.createElement(
                                                'a',
                                                { href: '/archive' },
                                                React.createElement('i', { className: 'fa fa-archive fa-fw' }),
                                                ' Archive'
                                            )
                                        ),
                                        React.createElement(
                                            'li',
                                            null,
                                            React.createElement(
                                                'a',
                                                { href: '/deleted' },
                                                React.createElement('i', { className: 'fa fa-trash fa-fw' }),
                                                ' Trash'
                                            )
                                        ),
                                        React.createElement(
                                            'li',
                                            null,
                                            React.createElement(
                                                'a',
                                                { href: '/sent' },
                                                React.createElement('i', { className: 'fa fa-paper-plane fa-fw' }),
                                                ' Sent'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'nav-hidden-myq', className: ' ' },
                                    React.createElement(
                                        'a',
                                        { href: '/myq' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement('i', { className: 'fa fa-tasks fa-3x' }),
                                            React.createElement('br', null),
                                            'My Q'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'nav-hidden-reviews', className: ' ' },
                                    React.createElement(
                                        'a',
                                        { href: '/reviews' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement('i', { className: 'fa fa-thumbs-up fa-3x' }),
                                            React.createElement('br', null),
                                            'NPS & Reviews'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'nav-hidden-videos', className: ' ' },
                                    React.createElement(
                                        'a',
                                        { href: '/videos' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement('i', { className: 'fa fa-youtube-play fa-3x' }),
                                            React.createElement('br', null),
                                            'Videos'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'nav-hidden-analytics', className: ' ' },
                                    React.createElement(
                                        'a',
                                        { href: '/analytics' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement('i', { className: 'fa fa-bar-chart-o fa-3x' }),
                                            React.createElement('br', null),
                                            'Analytics'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'nav-hidden-settings', className: ' ' },
                                    React.createElement(
                                        'a',
                                        { href: '/settings' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement('i', { className: 'fa fa-pencil-square-o fa-3x' }),
                                            React.createElement('br', null),
                                            'Edit Profile'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    { id: 'nav-hidden-logout', className: ' ' },
                                    React.createElement(
                                        'a',
                                        { href: '/logout' },
                                        React.createElement(
                                            'div',
                                            { className: 'text-center' },
                                            React.createElement('i', { className: 'fa fa-lock fa-3x' }),
                                            React.createElement('br', null),
                                            'Logout'
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