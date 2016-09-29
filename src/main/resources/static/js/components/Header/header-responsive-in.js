var HeaderResponsiveIn = React.createClass({displayName: 'Header',
    getInitialState: function() {
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
    componentDidMount: function () {
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
            success: function(result){
                console.log(result);
                this.setState({
                    messages: result.page.totalElements
                });
                if (this.state.inbox != null && this.state.inbox) {
                    this.updateInbox(result.page.totalElements);
                }
            }.bind(this),
            error: function(error) {
                if(error.status == 401) {
                    window.location.href = '/login';
                }
                console.log(error);
                return false;
            },
            dataType: "json",
            contentType : "application/json"
        });
        this.getNumOfQueueItems();
        // TODO: Interval to check if new messages have arrived, turned off for development
      //this.interval = setInterval(this.tick, 1000);
    },
    componentWillReceiveProps: function (nextProps) {
        console.log("Header:componentWillReceiveProps");
        console.log(nextProps);
        if (nextProps.tasks != null) {
            this.setState({
                tasks: nextProps.tasks
            });
        }
        if (nextProps.avatar != this.props.avatar && nextProps.avatar != "default") {
            $("#header-avatar").attr("src", "/api/remoteFiles/view/" + nextProps.avatar)
        }
        // get initials
        var name = nextProps.user.firstName + ' ' + nextProps.user.lastName;
        if (name != null) {
            var initials = name.match(/\b\w/g);
            console.log(initials);
            initials = (initials.shift() + initials.pop()).toUpperCase();
            console.log(initials);
            this.setState({initials: initials});
        }
    },
    getNumOfQueueItems: function() {
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
            success: function(result){
                console.log(result);
                if (result != null) {
                    this.setState({
                        tasks: result.page.totalElements
                    });
                }
            }.bind(this),
            error: function(error) {
                if(error.status == 401) {
                    window.location.href = '/login';
                }
                console.log(error);
                return false;
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    tick: function() {
        this.setState({seconds: this.state.seconds - 1});
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
                success: function(result){
                    console.log(result.page.totalElements);
                    if (this.state.messages != result.page.totalElements) {
                        this.setState({
                            messages: result.page.totalElements
                        });
                        if (this.state.inbox != null && this.state.inbox) {
                            this.updateInbox(result.page.totalElements);
                        }
                    }
                }.bind(this),
                error: function(error) {
                    console.log(error);
                    if (error.status === 401) {
                        window.location.href = "/login";
                    }
                    return false;
                },
                dataType: "json",
                contentType : "application/json"
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
                success: function(result){
                    console.log(result);
                    this.setState({
                        tasks: result.page.totalElements
                    });
                    if (this.state.myq != null && this.state.myq) {
                        this.updateMyQ(result.page.totalElements);
                    }
                }.bind(this),
                error: function(error) {
                    if(error.status == 401) {
                        window.location.href = '/login';
                    }
                    console.log(error);
                    return false;
                },
                dataType: "json",
                contentType : "application/json"
            });
            this.setState({seconds: 60});
        }
    },
    updateInbox: function(m) {
        this.props.updateInbox(m);
    },
    updateMyQ: function(m) {
        this.props.updateMyQ(m);
    },
    timerReset: function() {
        console.log("Timer Reset");
    },
    gotoProfile: function () {
        var id = $('#id').val();
        console.log(id);
        window.location.href='/profile/'+id;
    },
    gotoInbox: function() {
        window.location.href='/inbox';
    },
    gotoMyQ: function()
    {
        window.location.href='/myq';
    },
    addMyQTask: function()
    {
        window.location.href='/myqplus';
    },
    handleAddUserToCurrentGroup: function(id) {
        this.props.handleAddUserToCurrentGroup(id);
    },
    render: function() {
        var profileAvatar = <img id="header-avatar" alt="" className="img-circle" src={'/api/remoteFiles/view/' + this.props.user.avatar} />;
        if (this.props.user.avatar == 'default' && this.state.initials != '') {
            profileAvatar = <div className="avatar-circle-small avatar-top-6px"><img className="hidden" id={this.props.user.id} /><span className="initials-small">{this.state.initials}</span></div>;
        }
        return (
            <div id="wrapper">
                <div className="header-top">
                    <nav className="navbar navbar-inverse navbar-static-top navbar-margin" role="navigation">
                        <div className="container">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="/">
                                    <Logo />
                                </a>
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                            <div className="collapse navbar-collapse" id="navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right top-menu hidden-xs">
                                    <li className="hidden-xs">
                                        <NavSearch handleAddUserToCurrentGroup={this.handleAddUserToCurrentGroup} label={this.props.label} />
                                    </li>
                                    <li className="hidden-xs">
                                        <span className="glyphicon glyphicon-search search marginRight50" aria-hidden="true"></span>
                                    </li>
                                    <li className="hidden-xs" className="dropdown">
                                        <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                            <span className="label">{this.props.user.firstName} {this.props.user.lastName}</span>
                                            <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a href={'/profile/'+this.props.user.id}><i className=" fa fa-suitcase"></i>Profile</a></li>
                                            <li><a href="/settings"><i className="fa fa-cog"></i>Settings</a></li>
                                            <li><a href="/logout"><i className="fa fa-key"></i>Log Out</a></li>
                                        </ul>
                                    </li>
                                    <li className="hidden-xs">
                                        <a className="pointer" onClick={this.gotoProfile}>
                                            {profileAvatar}
                                        </a>
                                    </li>
                                </ul>
                                <ul id="header-bar" className="nav navbar-nav navbar-left top-menu hidden-xs">
                                    <li id="header-inbox-bar">
                                        <a onClick={this.gotoInbox}>
                                            <i className="fa fa-envelope-o"></i>
                                            <span className="badge bg-important">{this.state.messages}</span>
                                        </a>
                                    </li>
                                    <li id="header-myq-bar" className="dropdown">
                                        <a onClick={this.gotoMyQ}>
                                            <i className="fa fa-tasks"></i>
                                            <span className="badge bg-success">{this.state.tasks}</span>
                                        </a>
                                    </li>
                                    <li id="header-myq-bar-plus">
                                        <a onClick={this.addMyQTask}>
                                            <span>
                                                <i className="fa fa-tasks"></i>
                                                <i className="fa fa-plus fa-0x-plus"></i>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                                <ul className="nav navbar-nav navbar-nav-hidden navbar-right hidden-lg hidden-md hidden-sm visible-xs">
                                    <li id="nav-hidden-home" className="active">
                                        <a href="/home">
                                            <div className="text-center">
                                                <i className="fa fa-home fa-3x"></i><br />
                                                Home
                                            </div>
                                        </a>
                                    </li>
                                    <li id="nav-hidden-search" className=" ">
                                        <a href="/search">
                                            <div className="text-center">
                                                <i className="fa fa-search fa-3x"></i><br />
                                                Search
                                            </div>
                                        </a>
                                    </li>
                                    <li id="nav-hidden-introduction" className="dropdown">
                                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                            <div className="text-center">
                                                <i className="fa fa-comments fa-3x"></i><br />
                                                Communications <span className="caret"></span>
                                            </div>
                                        </a>
                                        <ul className="dropdown-menu" role="menu">
                                            <li><a href="/introduction"><i className="fa fa-share-alt"></i> Introduction</a></li>
                                            <li><a href="/referral"><i className="fa fa-arrows-right"></i> Referral</a></li>
                                            <li><a href="/sendMessage"><i className="fa fa-envelope"></i> Communicate</a></li>
                                        </ul>
                                    </li>
                                    <li id="nav-hidden-myshortlist" className=" ">
                                        <a href="/myShortList">
                                            <div className="text-center">
                                                <i className="fa fa-sitemap fa-3x"></i><br />
                                                My Short List
                                            </div>
                                        </a>
                                    </li>
                                    <li id="nav-hidden-messages" className="dropdown">
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
                                    <li id="nav-hidden-myq" className=" ">
                                        <a href="/myq">
                                            <div className="text-center">
                                                <i className="fa fa-tasks fa-3x"></i><br />
                                                My Q
                                            </div>
                                        </a>
                                    </li>
                                    <li id="nav-hidden-reviews" className=" ">
                                        <a href="/reviews">
                                            <div className="text-center">
                                                <i className="fa fa-thumbs-up fa-3x"></i><br />
                                                NPS &amp; Reviews
                                            </div>
                                        </a>
                                    </li>
                                    <li id="nav-hidden-videos" className=" ">
                                        <a href="/videos">
                                            <div className="text-center">
                                                <i className="fa fa-youtube-play fa-3x"></i><br />
                                                Videos
                                            </div>
                                        </a>
                                    </li>
                                    <li id="nav-hidden-analytics" className=" ">
                                        <a href="/analytics">
                                            <div className="text-center">
                                                <i className="fa fa-bar-chart-o fa-3x"></i><br />
                                                Analytics
                                            </div>
                                        </a>
                                    </li>
                                    <li id="nav-hidden-settings" className=" ">
                                        <a href="/settings">
                                            <div className="text-center">
                                                <i className="fa fa-pencil-square-o fa-3x"></i><br />
                                                Edit Profile
                                            </div>
                                        </a>
                                    </li>
                                    <li id="nav-hidden-logout" className=" ">
                                        <a href="/logout">
                                            <div className="text-center">
                                                <i className="fa fa-lock fa-3x"></i><br />
                                                Logout
                                            </div>
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