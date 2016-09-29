'use strict';

var Videos = React.createClass({
    displayName: 'Videos',
    getInitialState: function getInitialState() {
        return {
            user: []
        };
    },
    componentWillMount: function componentWillMount() {
        var id = $('#id').val();
        var source = '/api/users/' + id;
        console.log(source);
        $.get(source, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    user: result
                });
            }
        }).bind(this));
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(HeaderResponsiveIn, { user: this.state.user }),
            React.createElement(Banner, null),
            React.createElement(
                'div',
                { id: 'settings-container', className: 'container' },
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
                                { className: 'col-md-12' },
                                React.createElement(
                                    'h4',
                                    { className: 'margin-top-10' },
                                    'Latch Video Library'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'section',
                        { className: 'wrapper site-min-height' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'The Information and Toolbar'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'The Information and Toolbar', href: 'https://youtu.be/IoAX-uU9QIo?list=PLIZatS1xaqZz8LSRJeXSdaulG_lFSVf94' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid1.jpg', alt: 'The Information and Toolbar' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'The Navigation Bar'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'The Navigation Bar', href: 'https://youtu.be/gk_NtQp88pY' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid2.jpg', alt: 'The Navigation Bar' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Search for a Contact'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Search for a Contact', href: 'https://youtu.be/8NvFtj3XBmk' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid3.jpg', alt: 'Search for a Contact' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Introduce Contacts'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Introduce Contacts', href: 'https://youtu.be/xFG1ddNZczE' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid4.jpg', alt: 'Introduce Contacts' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Refer Contacts'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Refer Contacts', href: 'https://youtu.be/Z3MIZwpBBtI' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid5.jpg', alt: 'Refer Contacts' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Communicate with Contacts'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Communicate with Contacts', href: 'https://youtu.be/CqT5nRG-e30' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid6.jpg', alt: 'Communicate with Contacts' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Managing Messages - Inbox'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Managing Messages - Inbox', href: 'https://youtu.be/-UNRgw2MkNg' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid7.jpg', alt: 'Managing Messages - Inbox' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Managing Messages - Trash Folder'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Managing Messages - Trash Folder', href: 'https://youtu.be/lChboJPtrNM' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid8.jpg', alt: 'Managing Messages - Trash Folder' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Managing Messages - Sent Folder'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Managing Messages - Sent Folder', href: 'https://youtu.be/lr8nV6rIPo8' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid9.jpg', alt: 'Managing Messages - Sent Folder' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Managing My Q'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Managing My Q', href: 'https://youtu.be/NP8CJBCsow4' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid10.jpg', alt: 'Managing My Q' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Profile Settings - Overview'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Profile Settings - Overview', href: 'https://youtu.be/kW7OnPE-vIg' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid11.jpg', alt: 'Profile Settings - Overview' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Profile Settings - Primary'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Profile Settings - Primary', href: 'https://youtu.be/p7nNiSBdaNU' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid12.jpg', alt: 'Profile Settings - Primary' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Profile Setting - Personal'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Profile Setting - Personal', href: 'https://youtu.be/523AABWBAA4' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid13.jpg', alt: 'Profile Setting - Personal' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Profile Setting - Professional'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Profile Setting - Professional', href: 'https://youtu.be/bWQEKqQqwJ8' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid14.jpg', alt: 'Profile Setting - Professional' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Profile Settings - Online/Social'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Profile Settings - Online/Social', href: 'https://youtu.be/ZpsTwCluTzM' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid15.jpg', alt: 'Profile Settings - Online/Social' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-lg-4 col-md-6 col-sm-6 mb' },
                                        React.createElement(
                                            'div',
                                            { className: 'darkblue-panel pn' },
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-header' },
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    'Profile Settings - Invite Contacts'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'darkblue-body' },
                                                React.createElement(
                                                    'a',
                                                    { className: 'video', title: 'Profile Settings - Invite Contacts', href: 'https://youtu.be/5z5f3mgoVUo' },
                                                    React.createElement('img', { className: 'video-splash', src: '/images/videos/vid15.jpg', alt: 'Profile Settings - Invite Contacts' }),
                                                    React.createElement('img', { className: 'play-button', src: '/images/youTube.png' })
                                                )
                                            ),
                                            React.createElement('footer', null)
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

ReactDOM.render(React.createElement(Videos, null), document.getElementById('content'));