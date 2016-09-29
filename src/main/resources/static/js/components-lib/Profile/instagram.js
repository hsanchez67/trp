'use strict';

var Instagram = React.createClass({
    displayName: 'Instagram',

    getInitialState: function getInitialState() {
        return {
            proInfo: []
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log('Instagram:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - " + this.props.profile.id);
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
            console.log('Instagram:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getInstagramProfile",
                data: formData,
                success: (function (result) {
                    if (result != null) {
                        console.log(result);
                        this.setState({
                            proInfo: result
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
            console.log('Instagram:prepareComponentState: No user');
        }
    },
    showMedia: function showMedia(media) {
        var results = [];
        if (media.type == "video") {
            results.push(React.createElement(
                'div',
                { className: 'col-lg-4 col-md-4 col-sm-4 col-xs-12' },
                React.createElement(
                    'div',
                    { className: 'panel' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'a',
                            { className: 'various fancybox.iframe', rel: 'group', href: media.videos.standard_resolution.url, title: media.caption != null ? media.caption.text : "" },
                            React.createElement(
                                'video',
                                { className: 'video', controls: true, poster: media.images.low_resolution.url },
                                React.createElement('source', { src: media.videos.low_resolution.url, type: 'video/mp4' })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'caption' },
                            media.caption != null ? media.caption.text : ""
                        ),
                        React.createElement(
                            'div',
                            { className: 'likes pull-right' },
                            React.createElement('i', { className: 'fa fa-heart' }),
                            ' ',
                            media.likes.count
                        )
                    )
                )
            ));
        } else {
            results.push(React.createElement(
                'div',
                { className: 'col-lg-4 col-md-4 col-sm-4 col-xs-12' },
                React.createElement(
                    'div',
                    { className: 'panel' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'a',
                            { className: 'fancybox', rel: 'group', href: media.images.standard_resolution.url, title: media.caption != null ? media.caption.text : "" },
                            React.createElement('img', { className: 'image', src: media.images.low_resolution.url })
                        ),
                        React.createElement(
                            'div',
                            { className: 'caption' },
                            media.caption != null ? media.caption.text : ""
                        ),
                        React.createElement(
                            'div',
                            { className: 'likes pull-right' },
                            React.createElement('i', { className: 'fa fa-heart' }),
                            ' ',
                            media.likes.count
                        )
                    )
                )
            ));
        }
        return results;
    },
    render: function render() {
        var instagramInOrOut;
        if (!$.isEmptyObject(this.state.proInfo)) {
            var fullCircleFontMedia = classNames({
                'font100': this.state.proInfo.user.counts.media < 1000,
                'font1000': this.state.proInfo.user.counts.media >= 1000 && this.state.score < 10000,
                'font10000': this.state.proInfo.user.counts.media >= 10000
            });
            var fullCircleFontFollows = classNames({
                'font100': this.state.proInfo.user.counts.follows < 1000,
                'font1000': this.state.proInfo.user.counts.follows >= 1000 && this.state.score < 10000,
                'font10000': this.state.proInfo.user.counts.follows >= 10000
            });

            var fullCircleFontFollowedBy = classNames({
                'font100': this.state.proInfo.user.counts.followed_by < 1000,
                'font1000': this.state.proInfo.user.counts.followed_by >= 1000 && this.state.score < 10000,
                'font10000': this.state.proInfo.user.counts.followed_by >= 10000
            });

            var userlink = "http://www.instagram.com/" + this.state.proInfo.user.username;
            instagramInOrOut = React.createElement(
                'div',
                { id: 'external-media-panel', className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { id: 'instagram-body', className: 'panel-body panel-light img-rounded' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement(
                                'div',
                                { className: 'col-md-3' },
                                React.createElement('img', { src: this.state.proInfo.user.profile_picture, className: 'user-img' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-4 profile-bits' },
                                React.createElement(
                                    'div',
                                    { className: 'media-name' },
                                    React.createElement(
                                        'a',
                                        { href: userlink, target: '_blank' },
                                        this.state.proInfo.user.username
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement('i', { className: 'fa fa-user' }),
                                    ' ',
                                    this.state.proInfo.user.full_name
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement('i', { className: 'fa fa-globe' }),
                                    React.createElement(
                                        'a',
                                        { href: this.state.proInfo.user.website, target: '_blank' },
                                        this.state.proInfo.user.website
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement('i', { className: 'fa fa-instagram' }),
                                    React.createElement(
                                        'a',
                                        { href: userlink, target: '_blank' },
                                        userlink
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-5 instagram-counts' },
                                React.createElement(
                                    'div',
                                    { className: 'full-circle font35 posts' },
                                    React.createElement(
                                        'div',
                                        { className: fullCircleFontMedia },
                                        this.state.proInfo.user.counts.media
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'inner-circle-label' },
                                        'Posts'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'full-circle following' },
                                    React.createElement(
                                        'div',
                                        { className: fullCircleFontFollows },
                                        this.state.proInfo.user.counts.follows
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'inner-circle-label' },
                                        'Following'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'full-circle followers' },
                                    React.createElement(
                                        'div',
                                        { className: fullCircleFontFollowedBy },
                                        this.state.proInfo.user.counts.followed_by
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'inner-circle-label' },
                                        'Followers'
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12 summary' },
                            React.createElement(
                                'div',
                                { className: 'bio' },
                                this.state.proInfo.user.bio
                            )
                        ),
                        React.createElement(
                            'div',
                            { id: 'media', className: 'col-md-12 summary' },
                            this.state.proInfo.recent.data.map(this.showMedia)
                        )
                    )
                )
            );
            $(".fancybox").fancybox();
            $(".various").fancybox({
                maxWidth: 800,
                maxHeight: 600,
                fitToView: false,
                width: '70%',
                height: '70%',
                autoSize: false,
                closeClick: false,
                openEffect: 'none',
                closeEffect: 'none'
            });
        } else {
            instagramInOrOut = React.createElement(
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
            instagramInOrOut
        );
    }
});