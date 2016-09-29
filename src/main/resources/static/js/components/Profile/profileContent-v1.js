var ProfileContent = React.createClass({
    displayName: 'ProfileContent',
    getInitialState: function() {
        return {
            profile: this.props.profile,
            shortlist: [],
            view: {showModal: false}

        };
    },
    componentWillMount: function () {
        console.log("ProfileContent:componentWillMount:");
        this.prepareComponentState(this.props);
        $('.nav-pills a[href="#linkedin"]').tab('show');
    },
    componentWillReceiveProps: function (nextProps) {
        console.log("ProfileContent:componentWillReceiveProps:");
        this.prepareComponentState(nextProps);
    },
    prepareComponentState: function(props) {
        console.log("ProfileContent:prepareComponentState:");
        if (!$.isEmptyObject(props.profile) && $.isEmptyObject(this.state.profile)) {
            this.setState({
                profile: props.profile
            });
        }
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
    introduceMe: function() {
        window.location.href = '/introduction/' +this.props.profile.id;
    },
    sendMessage: function() {
        window.location.href = '/sendMessage/' +this.props.profile.id;
    },
    addToShorlist: function(id) {
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
        }
        data = JSON.stringify(data, null, ' ');
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/addToShortList",
            data: data,
            success: function(result){
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({shortlist: result.users});
                }
            }.bind(this),
            error: function(error) {
                console.log("error: " + error.toString());
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    render: function () {
        return (
            <div className="row profile-row" id="home-content">
                <div className="col-lg-8">
                    <div id="profile-content-row" className="row state-overview">
                        <div className="row" id="profile-content">
                            <div className="col-lg-12">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <header className="panel-title">
                                            <div className="text-center">
                                                <strong>{this.state.profile.firstName}</strong> {this.state.profile.lastName}<strong>.</strong>
                                                <div className="btn-group pull-right">
                                                    <button type="button" className="btn btn-default dropdown-toggle"
                                                            data-toggle="dropdown" aria-haspopup="true"
                                                            aria-expanded="false">
                                                        Action <span className="caret"></span>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li><a onClick={this.introduceMe}>Introduce {this.state.profile.firstName}...</a></li>
                                                        <li><a onClick={this.sendMessage}>Send a message...</a></li>
                                                        <li><a onClick={this.addToShorlist}>Add to Shortlist...</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </header>
                                    </div>
                                    <div className="panel-body">
                                        <div className="col-lg-6">
                                            <div className="panel-body-left">
                                                <div className="text-center" id="user">
                                                    <img className="img-circle img-user" src={'/api/remoteFiles/view/' + this.state.profile.avatar} />
                                                    <h4>{this.state.profile.profession}</h4>
                                                    <h5>KELLER WILLIAMS Realty</h5>
                                                    <small className="label label-warning label-as-location">{this.state.profile.city}, {this.state.profile.state}</small>
                                                    <p className="sosmed-user">
                                                        <a href="#"><i className="fa fa-facebook" onClick={this.openFacebook} data-toggle="tooltip" data-placement="top" title="Facebook"></i></a>
                                                        <a href="#"><i className="fa fa-twitter" data-toggle="tooltip" data-placement="top" title="Twitter"></i></a>
                                                        <a href="#"><i className="fa fa-google-plus" data-toggle="tooltip" data-placement="top" title="Google Plus"></i></a>
                                                        <a href="#"><i className="fa fa-linkedin" data-toggle="tooltip" data-placement="top" title="Linkedin"></i></a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.view.showModal ? <RemoteModal title={'Score details'} size={''} handleHideModal={this.handleHideModal}><div>Score details...</div></RemoteModal> : null}
                                        <div id="tab-view" className="col-lg-6">
                                            <div className="panel-body-right">
                                                <div onClick={this.openScoreDetails} id="scoreChartDiv" className="canvas-score pointer">
                                                </div>
                                                <p><strong>Introductions</strong> 54</p>
                                                <p><strong>Network</strong> 72,444</p>
                                                <p><strong>Shortlist</strong> 18</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-xs-12">
                                            <div className="tab-pane fade active in text-left" id="description">
                                                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</p>
                                                <p>Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-xs-12">
                                <div className="panel">
                                    <div className="panel-body">
                                        Reviews will go here
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-xs-12">
                                <div className="panel">
                                    <div className="panel-body">
                                        <ul id="myTab" className="nav nav-pills">
                                            <li className="active"><a href="#zillow" data-toggle="tab"><i className="fa icon-zillow"></i><br /><div>Zillow</div></a></li>
                                            <li className=""><a href="#linkedin" data-toggle="tab"><i className="fa fa-linkedin"></i><br /><div>Linked In</div></a></li>
                                            <li className=""><a href="#googleplus" data-toggle="tab"><i className="fa fa-google-plus"><br /></i><div>Google Plus</div></a></li>
                                            <li className=""><a href="#instagram" data-toggle="tab"><i className="fa fa-instagram"><br /></i><div>Instagram</div></a></li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content">
                                            <div className="tab-pane fade active in text-left" id="zillow">
                                                <Zillow profile={this.state.profile} />
                                            </div>
                                            <div className="tab-pane fade" id="linkedin">
                                                <LinkedIn profile={this.state.profile} />
                                            </div>
                                            <div className="tab-pane fade" id="googleplus">

                                            </div>
                                            <div className="tab-pane fade" id="instagram">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <NotificationsPanel />
                    <MyShortListPanel shortlist={this.state.shortlist} droppable={true} />
                </div>
            </div>
        );
    }
});