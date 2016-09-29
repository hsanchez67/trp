var ProfileIntro = React.createClass({
    displayName: 'ProfileIntro',
    getInitialState: function() {
        return {
            view: {showModal: false}
        };
    },
    openFacebook: function () {
        window.open(
            'https://www.facebook.com/i-did-it-143881716081/',
            '_blank'
        );
    },
    openScoreDetails: function () {
        this.setState({view: {showModal: true}});
    },
    handleHideModal(){
        this.setState({view: {showModal: false}})
    },
    goToProfile() {
        window.open(
            '/profile/'+this.props.profile.id,
            '_blank'
        );
    },
    render: function () {
        return (
            <div className="col-lg-12 col-md-12 col-xs-12">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <header className="panel-title">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="col-lg-9">
                                    <div className="breadcrumbs-profileIntro-div">
                                        <ol className="breadcrumbs">
                                            <li>{this.props.profile.firstName} {this.props.profile.lastName}</li>
                                            <li>{this.props.profile.profession}</li>
                                            <li>{this.props.profile.city} {this.props.profile.state}</li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="col-lg-3 text-right">
                                    <div className="btn-group">
                                        <button type="button" onClick={this.goToProfile} className="btn btn-sm btn-primary">See Full Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                <ProfileContentBody profile={this.props.profile} />
            </div>
            </div>
        );
    }
});
