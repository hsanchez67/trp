var Instagram = React.createClass({
    getInitialState: function() {
        return {
            proInfo: [],
        };
    },
    componentWillReceiveProps: function (nextProps) {
        console.log('Instagram:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - "+ this.props.profile.id);
        if (nextProps.profile.id != this.props.profile.id) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function(props) {
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
                success: function (result) {
                    if (result != null) {
                        console.log(result);
                        this.setState({
                            proInfo: result
                        });
                    }
                }.bind(this),
                error: function (request, status, error) {
                    console.log(error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('Instagram:prepareComponentState: No user');
        }
    },
    showMedia: function(media) {
        const results = [];
        if (media.type == "video") {
            results.push(
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <div className="panel">
                        <div className="panel-body">
                            <a className="various fancybox.iframe" rel="group" href={media.videos.standard_resolution.url} title={media.caption != null ? media.caption.text : ""}>
                                <video className="video" controls poster={media.images.low_resolution.url}>
                                    <source src={media.videos.low_resolution.url} type="video/mp4" />
                                </video>
                            </a>

                            <div className="caption">
                                {media.caption != null ? media.caption.text : ""}
                            </div>
                            <div className="likes pull-right">
                                <i className="fa fa-heart"></i> {media.likes.count}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            results.push(
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <div className="panel">
                        <div className="panel-body">
                            <a className="fancybox" rel="group" href={media.images.standard_resolution.url} title={media.caption != null ? media.caption.text : ""}>
                                <img className="image" src={media.images.low_resolution.url} />
                            </a>
                            <div className="caption">
                                {media.caption != null ? media.caption.text : ""}
                            </div>
                            <div className="likes pull-right">
                                <i className="fa fa-heart"></i> {media.likes.count}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return results;
    },
    render() {
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

            var userlink = "http://www.instagram.com/"+this.state.proInfo.user.username;
            instagramInOrOut = <div id="external-media-panel" className="panel panel-default">
                <div id="instagram-body" className="panel-body panel-light img-rounded">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-3">
                                <img src={this.state.proInfo.user.profile_picture} className="user-img" />
                            </div>
                            <div className="col-md-4 profile-bits">
                                <div className="media-name"><a href={userlink} target="_blank">{this.state.proInfo.user.username}</a></div>
                                <div><i className="fa fa-user"></i> {this.state.proInfo.user.full_name}</div>
                                <div><i className="fa fa-globe"></i><a href={this.state.proInfo.user.website} target="_blank">{this.state.proInfo.user.website}</a></div>
                                <div><i className="fa fa-instagram"></i><a href={userlink} target="_blank">{userlink}</a></div>
                            </div>
                            <div className="col-md-5 instagram-counts">
                                <div className="full-circle font35 posts">
                                    <div className={fullCircleFontMedia}>{this.state.proInfo.user.counts.media}</div>
                                    <div className="inner-circle-label">Posts</div>
                                </div>
                                <div className="full-circle following">
                                    <div className={fullCircleFontFollows}>{this.state.proInfo.user.counts.follows}</div>
                                    <div className="inner-circle-label">Following</div>
                                </div>
                                <div className="full-circle followers">
                                    <div className={fullCircleFontFollowedBy}>{this.state.proInfo.user.counts.followed_by}</div>
                                    <div className="inner-circle-label">Followers</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 summary">
                            <div className="bio">
                                {this.state.proInfo.user.bio}
                            </div>
                        </div>
                        <div id="media" className="col-md-12 summary">
                            { this.state.proInfo.recent.data.map(this.showMedia) }
                        </div>
                    </div>
                </div>
            </div>;
            $(".fancybox").fancybox();
            $(".various").fancybox({
                maxWidth	: 800,
                maxHeight	: 600,
                fitToView	: false,
                width		: '70%',
                height		: '70%',
                autoSize	: false,
                closeClick	: false,
                openEffect	: 'none',
                closeEffect	: 'none'
            });
        } else {
            instagramInOrOut = <div className="panel-body panel-light img-rounded">
                <div className="row">
                    <div className="col-md-12">
                    </div>
                </div>
            </div>;
        }
        return (
            <div>
                {instagramInOrOut}
            </div>
        );
    }
});