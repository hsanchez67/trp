var Videos = React.createClass({
    displayName: 'Videos',
    getInitialState: function() {
        return {
            user: []
        };
    },
    componentWillMount: function () {
        var id = $('#id').val();
        var source = '/api/users/'+id;
        console.log(source);
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    user: result
                });
            }
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <HeaderResponsiveIn user={this.state.user} />
                <Banner />
                <div id="settings-container" className="container">
                    <div id="main">
                        <ol className="breadcrumb">
                            <div className="row">
                                <div className="col-md-12">
                                    <h4 className="margin-top-10">Latch Video Library</h4>
                                </div>
                            </div>
                        </ol>
                        <section className="wrapper site-min-height">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>The Information and Toolbar</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="The Information and Toolbar" href="https://youtu.be/IoAX-uU9QIo?list=PLIZatS1xaqZz8LSRJeXSdaulG_lFSVf94">
                                                        <img className="video-splash" src="/images/videos/vid1.jpg" alt="The Information and Toolbar" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>The Navigation Bar</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="The Navigation Bar" href="https://youtu.be/gk_NtQp88pY">
                                                        <img className="video-splash" src="/images/videos/vid2.jpg" alt="The Navigation Bar" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Search for a Contact</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Search for a Contact" href="https://youtu.be/8NvFtj3XBmk">
                                                        <img className="video-splash" src="/images/videos/vid3.jpg" alt="Search for a Contact" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Introduce Contacts</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Introduce Contacts" href="https://youtu.be/xFG1ddNZczE">
                                                        <img className="video-splash" src="/images/videos/vid4.jpg" alt="Introduce Contacts" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Refer Contacts</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Refer Contacts" href="https://youtu.be/Z3MIZwpBBtI">
                                                        <img className="video-splash" src="/images/videos/vid5.jpg" alt="Refer Contacts" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Communicate with Contacts</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Communicate with Contacts" href="https://youtu.be/CqT5nRG-e30">
                                                        <img className="video-splash" src="/images/videos/vid6.jpg" alt="Communicate with Contacts" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Managing Messages - Inbox</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Managing Messages - Inbox" href="https://youtu.be/-UNRgw2MkNg">
                                                        <img className="video-splash" src="/images/videos/vid7.jpg" alt="Managing Messages - Inbox" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Managing Messages - Trash Folder</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Managing Messages - Trash Folder" href="https://youtu.be/lChboJPtrNM">
                                                        <img className="video-splash" src="/images/videos/vid8.jpg" alt="Managing Messages - Trash Folder" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Managing Messages - Sent Folder</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Managing Messages - Sent Folder" href="https://youtu.be/lr8nV6rIPo8">
                                                        <img className="video-splash" src="/images/videos/vid9.jpg" alt="Managing Messages - Sent Folder" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Managing My Q</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Managing My Q" href="https://youtu.be/NP8CJBCsow4">
                                                        <img className="video-splash" src="/images/videos/vid10.jpg" alt="Managing My Q" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Profile Settings - Overview</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Profile Settings - Overview" href="https://youtu.be/kW7OnPE-vIg">
                                                        <img className="video-splash" src="/images/videos/vid11.jpg" alt="Profile Settings - Overview" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Profile Settings - Primary</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Profile Settings - Primary" href="https://youtu.be/p7nNiSBdaNU">
                                                        <img className="video-splash" src="/images/videos/vid12.jpg" alt="Profile Settings - Primary" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Profile Setting - Personal</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Profile Setting - Personal" href="https://youtu.be/523AABWBAA4">
                                                        <img className="video-splash" src="/images/videos/vid13.jpg" alt="Profile Setting - Personal" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Profile Setting - Professional</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Profile Setting - Professional" href="https://youtu.be/bWQEKqQqwJ8">
                                                        <img className="video-splash" src="/images/videos/vid14.jpg" alt="Profile Setting - Professional" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Profile Settings - Online/Social</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Profile Settings - Online/Social" href="https://youtu.be/ZpsTwCluTzM">
                                                        <img className="video-splash" src="/images/videos/vid15.jpg" alt="Profile Settings - Online/Social" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb">
                                            <div className="darkblue-panel pn">
                                                <div className="darkblue-header">
                                                    <h5>Profile Settings - Invite Contacts</h5>
                                                </div>
                                                <div className="darkblue-body">
                                                    <a className="video" title="Profile Settings - Invite Contacts" href="https://youtu.be/5z5f3mgoVUo">
                                                        <img className="video-splash" src="/images/videos/vid15.jpg" alt="Profile Settings - Invite Contacts" />
                                                        <img className="play-button" src="/images/youTube.png" />
                                                    </a>
                                                </div>
                                                <footer>
                                                </footer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <Videos />,
    document.getElementById('content')
);