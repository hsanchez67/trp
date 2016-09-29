var ProfileHeaderIn = React.createClass({displayName: 'ProfileHeaderIn',
    handleLogoClick: function() {
        window.location.href = "/"
    },
    render: function() {
        return (
            <div id="wrapper">
                <div className="header-top">
                    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" onClick={this.handleLogoClick}><Logo /></a>
                            </div>
                            <div className="collapse navbar-collapse" id="navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right top-menu hidden-xs">
                                    <li className="hidden-xs">
                                        <NavSearch />
                                    </li>
                                    <li className="hidden-xs">
                                        <span className="glyphicon glyphicon-search search marginRight50" aria-hidden="true"></span>
                                    </li>
                                    <li className="hidden-xs">
                                        <span className="label">{this.props.user.firstName} {this.props.user.lastName}</span>
                                    </li>
                                    <li className="hidden-xs">
                                        <a className="pointer" onClick={this.gotoProfile}>
                                            <img alt="" className="img-circle" src={'/api/remoteFiles/view/' + this.props.user.avatar} />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
});