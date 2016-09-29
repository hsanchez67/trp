var Avatar = React.createClass({
    getInitialState(){
        return {
            view: {showModal: false},
            username: this.props.username,
            avatar: this.props.avatar,
            id: this.props.id,
            name: this.props.name,
            initials: ''
        }
    },
    handleHideModal(){
        this.setState({view: {showModal: false}})
    },
    handleShowModal(){
        this.setState({view: {showModal: true}})
    },
    componentWillMount: function() {
        var name = this.props.name;
        if (name != null) {
            var initials = name.match(/\b\w/g);
            initials = (initials.shift() + initials.pop()).toUpperCase();
            this.setState({initials: initials});
        }
    },
    getHistory: function() {
        console.log("Inside getHistory");
        window.location.href = '/history/' + this.props.id;
    },
    componentDidMount: function () {
       $('.tastk-thumb').tooltip();
    },
    render: function() {
        return (
                <li className="pull-left">
                    <a href="javascript: void(0)" onClick={this.handleShowModal} className="task-thumb" title={this.props.name}>
                        <ProfilePicWithName id={this.props.id} username={this.props.username} initials={this.state.initials} score={this.props.score} firstName={this.props.firstName} />
                    </a>
                    {this.state.view.showModal ? <MyModal id={this.props.id} username={this.props.username} initials={this.state.initials} name={this.props.name} handleHideModal={this.handleHideModal} getHistory={this.getHistory} /> : null}
                </li>
        );
    }
});

var ProfilePic = React.createClass({
    render: function() {
        var borderClass = 'img-circle';
        var noPhotoClass = 'avatar-circle';
        console.log(this.props.score);
        if (this.props.score != null) {
            borderClass = classNames({
                'border-circle-green img-circle': this.props.score >= 7.5,
                'border-circle-blue img-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow img-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red img-circle': this.props.score < 2.5
            });
            noPhotoClass = classNames({
                'border-circle-green avatar-circle': this.props.score >= 7.5,
                'border-circle-blue avatar-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow avatar-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red avatar-circle': this.props.score < 2.5
            });
        }
        var image;
        if (this.props.username == 'default' && this.props.initials != '') {
            image = <div className={noPhotoClass}><img className="hidden" id={this.props.id} /><span className="initials">{this.props.initials}</span></div>;
        } else {
            image = <img id={this.props.id} src={'/api/remoteFiles/view/' + this.props.username} className={borderClass} />;
        }
        return (
            <span>{image}</span>
        );
    }
});

var ProfilePicWithName = React.createClass({
    render: function() {
        var borderClass = 'img-circle';
        var noPhotoClass = 'avatar-circle';
        if (this.props.score != null) {
            borderClass = classNames({
                'border-circle-green img-circle': this.props.score >= 7.5,
                'border-circle-blue img-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow img-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red img-circle': this.props.score < 2.5
            });
            noPhotoClass = classNames({
                'border-circle-green avatar-circle': this.props.score >= 7.5,
                'border-circle-blue avatar-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow avatar-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red avatar-circle': this.props.score < 2.5
            });
        }
        var image;
        if (this.props.username == 'default' && this.props.initials != '') {
            image = <div className="avatar">
                    <div className="avatar-image">
                        <div className={noPhotoClass}><img className="hidden" id={this.props.id} /><span className="initials">{this.props.initials}</span></div>
                    </div>
                    <div className="avatar-name">{this.props.firstName}</div>
                </div>;
        } else {
            image = <div className="avatar">
                <div className="avatar-image">
                    <img id={this.props.id} src={'/api/remoteFiles/view/' + this.props.username} className={borderClass} />
                </div>
                <div className="avatar-name">{this.props.firstName}</div>
            </div>;
        }
        return (
            <span>{image}</span>
        );
    }
});

var ProfilePicPlus = React.createClass({
    render: function() {
        var borderClass = 'img-circle';
        var noPhotoClass = 'avatar-circle';
        console.log(this.props.score);
        if (this.props.score != null) {
            borderClass = classNames({
                'border-circle-green img-circle': this.props.score >= 7.5,
                'border-circle-blue img-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow img-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red img-circle': this.props.score < 2.5
            });
            noPhotoClass = classNames({
                'border-circle-green avatar-circle': this.props.score >= 7.5,
                'border-circle-blue avatar-circle': this.props.score >= 5 && this.props.score < 7.5,
                'border-circle-yellow avatar-circle': this.props.score >= 2.5 && this.props.score < 5,
                'border-circle-red avatar-circle': this.props.score < 2.5
            });
        }
        console.log(borderClass);
        var image;
        if (this.props.username == 'default' && this.props.initials != '') {
            image = <div className="entry">
                <div className="container">
                    <div className="button entypo-chat"></div>
                    <div className="name">{this.props.name}
                        <span className="small">Profession</span>
                    </div>
                    <div className="photo">
                        <div className={noPhotoClass}><img className="hidden" id={this.props.id} /><span className="initials">{this.props.initials}</span></div>
                        </div>
                    </div>
                </div>;
        } else {
            image = <div className="entry">
                    <div className="container">
                        <div className="button entypo-chat"></div>
                        <div className="name">{this.props.name}
                            <span className="small">Profession</span>
                        </div>
                        <div className="photo">
                            <img id={this.props.id} src={'/api/remoteFiles/view/' + this.props.username} className={borderClass} />
                        </div>
                    </div>
                </div>;
        }
        return (
            <span>{image}</span>
        );
    }
});

var ProfileLink = React.createClass({
    render: function() {
        return (
            <a href={'/' + this.props.username}>
                {this.props.username}
            </a>
        );
    }
});
