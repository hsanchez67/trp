var HeaderMenu = React.createClass({displayName: 'HeaderMenu',
    render: function() {
        return (
        <nav className="navbar" role="navigation">
            <div className="container">
                <div className="collapse navbar-collapse navbar-ex1-collapse">
                    <ul className="nav navbar-nav">
                        <li id="nav-home" className="active">
                            <a href="/home">
                                <div className="text-center">
                                    <i className="fa fa-home fa-3x"></i><br />
                                    Home
                                </div>
                            </a>
                        </li>
                        <li id="nav-search" className=" ">
                            <a href="/search">
                                <div className="text-center">
                                    <i className="fa fa-search fa-3x"></i><br />
                                    Search
                                </div>
                            </a>
                        </li>
                        <li id="nav-introduction" className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <div className="text-center">
                                    <i className="fa fa-comments fa-3x"></i><br />
                                    Communications <span className="caret"></span>
                                </div>
                            </a>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="/introduction"><i className="fa fa-share-alt"></i> Introduction</a></li>
                                <li><a href="/referral"><i className="fa fa-arrow-right"></i> Referral</a></li>
                                <li><a href="/sendMessage"><i className="fa fa-envelope"></i> Communicate</a></li>
                            </ul>
                        </li>
                        <li id="nav-myshortlist" className=" ">
                            <a href="/myShortList">
                                <div className="text-center">
                                    <i className="fa fa-sitemap fa-3x"></i><br />
                                    Networks
                                </div>
                            </a>
                        </li>
                        <li id="nav-messages" className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <div className="text-center">
                                    <i className="fa fa-envelope fa-3x"></i><br />
                                    Messages <span className="caret"></span>
                                </div>
                            </a>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="/inbox"><i className="fa fa-inbox fa-fw"></i> Inbox</a></li>
                                <li><a href="/archive"><i className="fa fa-archive fa-fw"></i> Archive</a></li>
                                <li><a href="/deleted"><i className="fa fa-trash fa-fw"></i> Trash</a></li>
                                <li><a href="/sent"><i className="fa fa-paper-plane fa-fw"></i> Sent</a></li>
                            </ul>
                        </li>
                        <li id="nav-myq" className=" ">
                            <a href="/myq">
                                <div className="text-center">
                                    <i className="fa fa-tasks fa-3x"></i><br />
                                    My Q
                                </div>
                            </a>
                        </li>
                        <li id="nav-reviews" className=" ">
                            <a href="/reviews">
                                <div className="text-center">
                                    <i className="fa fa-thumbs-up fa-3x"></i><br />
                                    NPS &amp; Reviews
                                </div>
                            </a>
                        </li>
                        <li id="nav-videos" className=" ">
                            <a href="/videos">
                                <div className="text-center">
                                    <i className="fa fa-youtube-play fa-3x"></i><br />
                                    Videos
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        );
    }
});