'use strict';

var ProfileContent = React.createClass({
    displayName: 'ProfileContent',
    getInitialState: function getInitialState() {
        return {
            profile: this.props.profile,
            shortlist: [],
            view: { showModal: false }

        };
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
    openScoreDetails: function openScoreDetails() {
        this.setState({ view: { showModal: true } });
    },
    handleHideModal: function handleHideModal() {
        this.setState({ view: { showModal: false } });
    },
    introduceMe: function introduceMe() {
        window.location.href = '/introduction/' + this.props.profile.id;
    },
    sendMessage: function sendMessage() {
        window.location.href = '/sendMessage/' + this.props.profile.id;
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
            groupId: 'shortlis',
            userss: contacts
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
            }).bind(this),
            error: function error(_error) {
                console.log("error: " + _error.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'row profile-row', id: 'home-content' },
            React.createElement(
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
                                            { className: 'text-center' },
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
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'btn-group pull-right' },
                                                React.createElement(
                                                    'button',
                                                    { type: 'button', className: 'btn btn-default dropdown-toggle',
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
                                                            'Add to Shortlist...'
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'panel-body' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-6' },
                                        React.createElement(
                                            'div',
                                            { className: 'panel-body-left' },
                                            React.createElement(
                                                'div',
                                                { className: 'text-center', id: 'user' },
                                                React.createElement('img', { className: 'img-circle img-user', src: '/api/remoteFiles/view/' + this.state.profile.avatar }),
                                                React.createElement(
                                                    'h4',
                                                    null,
                                                    this.state.profile.profession
                                                ),
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'KELLER WILLIAMS Realty'
                                                ),
                                                React.createElement(
                                                    'small',
                                                    { className: 'label label-warning label-as-location' },
                                                    this.state.profile.city,
                                                    ', ',
                                                    this.state.profile.state
                                                ),
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
                                            )
                                        )
                                    ),
                                    this.state.view.showModal ? React.createElement(
                                        RemoteModal,
                                        { title: 'Score details', size: '', handleHideModal: this.handleHideModal },
                                        React.createElement(
                                            'div',
                                            null,
                                            'Score details...'
                                        )
                                    ) : null,
                                    React.createElement(
                                        'div',
                                        { id: 'tab-view', className: 'col-lg-6' },
                                        React.createElement(
                                            'div',
                                            { className: 'panel-body-right' },
                                            React.createElement('div', { onClick: this.openScoreDetails, id: 'scoreChartDiv', className: 'canvas-score pointer' }),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement(
                                                    'strong',
                                                    null,
                                                    'Introductions'
                                                ),
                                                ' 54'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement(
                                                    'strong',
                                                    null,
                                                    'Network'
                                                ),
                                                ' 72,444'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement(
                                                    'strong',
                                                    null,
                                                    'Shortlist'
                                                ),
                                                ' 18'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-12 col-md-12 col-xs-12' },
                                        React.createElement(
                                            'div',
                                            { className: 'tab-pane fade active in text-left', id: 'description' },
                                            React.createElement(
                                                'p',
                                                { className: 'lead' },
                                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                'Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.'
                                            )
                                        )
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
                                    'Reviews will go here'
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
                                            { className: 'tab-pane fade active in text-left', id: 'zillow' },
                                            React.createElement(Zillow, { profile: this.state.profile })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'tab-pane fade', id: 'linkedin' },
                                            React.createElement(LinkedIn, { profile: this.state.profile })
                                        ),
                                        React.createElement('div', { className: 'tab-pane fade', id: 'googleplus' }),
                                        React.createElement('div', { className: 'tab-pane fade', id: 'instagram' })
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-4' },
                React.createElement(NotificationsPanel, null),
                React.createElement(MyShortListPanel, { shortlist: this.state.shortlist, droppable: true })
            )
        );
    }
});