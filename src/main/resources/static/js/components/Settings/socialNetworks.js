var SocialNetworks = React.createClass({
    displayName: 'SocialNetworks',
    componentDidMount: function () {
        var tab = this.getUrlParameter('t');
        if (tab == 'linkedin') {
            $('.nav-tabs a[href="#linkedin"]').tab('show');
        } else if (tab == 'instagram') {
            $('.nav-tabs a[href="#instagram"]').tab('show');
        }
    },
    getUrlParameter: function(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    },
    handleMessageResult: function(success) {
        if (success) {
            document.getElementById("messageDiv").innerHTML = "<div class=\"alert alert-success\" role=\"alert\"><label className=\"error\">Well done!</label> Settings saved.</div>";
        } else {
            document.getElementById("messageDiv").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"Oh snap!</label> Something went wrong.</div>";
        }
        $('#messageDiv').slideDown(500);
        $('#messageDiv').delay(5000).slideUp(500);
    },
    render: function () {
        return (
            <div className="col-lg-12 col-md-12 col-xs-12">
                <div className="panel panel-default">
                    <header className="panel-heading">
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2 text-center">
                                <strong>Online/Social Settings</strong>
                            </div>
                            <div className="col-md-2">
                                <a className="video" title="Profile Settings - Online/Social" href="https://youtu.be/ZpsTwCluTzM"><img className="video-icon pull-right" src="/images/youTube.png" alt="Latch channel" /></a>
                            </div>
                        </div>
                    </header>
                    <div className="panel-body">
                        <ul id="myInsideTab" className="nav nav-tabs">
                            <li className="active"><a href="#facebook" data-toggle="tab"><i className="fa fa-facebook"></i><br /><div>Facebook</div></a></li>
                            <li className=""><a href="#zillow" data-toggle="tab"><i className="fa icon-zillow"></i><br /><div>Zillow</div></a></li>
                            <li className=""><a href="#linkedin" data-toggle="tab"><i className="fa fa-linkedin"></i><br /><div>Linked In</div></a></li>
                            <li className=""><a href="#googleplus" data-toggle="tab"><i className="fa fa-google-plus"><br /></i><div>Google Plus</div></a></li>
                            <li className=""><a href="#instagram" data-toggle="tab"><i className="fa fa-instagram"><br /></i><div>Instagram</div></a></li>
                            <li className=""><a href="#socialconnect" data-toggle="tab"><i className="fa fa-sign-in"><br /></i><div>Log-in As</div></a></li>
                        </ul>
                        <div id="myInsideTabContent" className="tab-content">
                            <div className="tab-pane fade active in" id="facebook">
                                <FacebookSettings user={this.props.user} />
                            </div>
                            <div className="tab-pane fade" id="zillow">
                                <ZillowSettings user={this.props.user} />
                            </div>
                            <div className="tab-pane fade" id="linkedin">
                                <LinkedInSettings user={this.props.user} />
                            </div>
                            <div className="tab-pane fade" id="googleplus">
                                <GooglePlusSettings user={this.props.user} handleMessageResult={this.handleMessageResult} />
                            </div>
                            <div className="tab-pane fade" id="instagram">
                                <InstagramSettings user={this.props.user} />
                            </div>
                            <div className="tab-pane fade" id="socialconnect">
                                <SocialConnect user={this.props.user} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div id="messageDiv"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});