var GooglePlus = React.createClass({
    getInitialState: function () {
        return {
            proInfo: [],
            imageUrl: '',
            coverPhoto: ''
        };
    },
    componentWillReceiveProps: function (nextProps) {
        console.log('GooglePlus:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - " + this.props.profile.id);
        if (nextProps.profile.id != this.props.profile.id) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function (props) {
        if (!$.isEmptyObject(props.profile)) {
            var data = {
                id: props.profile.id
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log('GooglePlus:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getGooglePlusProfile",
                data: formData,
                success: function (result) {
                    console.log(result);
                    if (!$.isEmptyObject(result)) {
                        var str = "";
                        var cp = "";
                        if (result.image.url != null) {
                            str = result.image.url;
                            str = str.split("?sz=50")[0] + "?sz=" + 128;
                        }
                        if (!$.isEmptyObject(result.cover)) {
                            cp = result.cover.coverPhoto.url;
                        }
                        this.setState({
                            proInfo: result,
                            imageUrl: str,
                            coverPhoto: cp
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
            console.log('GooglePlus:prepareComponentState: No user');
        }
    },
    showWork: function(element) {
        const results = [];
        if (element.type == "work") {
            results.push(
                <div className="BgK4Ef">
                    <div className="mGa2db">
                        <div className="DOdATc">{element.name}</div>
                        <div className="Y5upsc">{element.title}, {element.startDate} - {element.endDate == null && element.primary == true ? 'present' : element.endDate}</div>
                    </div>
                </div>
            );
        }
        return results;
    },
    showEducation: function(element) {
        const results = [];
        if (element.type == "school") {
            results.push(
                <div className="BgK4Ef">
                    <div className="mGa2db">
                        <div className="DOdATc">{element.name}</div>
                        <div className="Y5upsc">{element.title}, {element.startDate} - {element.endDate == null && element.primary == true ? 'present' : element.endDate}</div>
                    </div>
                </div>
            );
        }
        return results;
    },
    render() {
        var googlePlusExists;
        if (!$.isEmptyObject(this.state.proInfo)) {
            var personTitle;
            var orgName;
            var livesIn;
            var googlePlusId = "https://plus.google.com/"+this.state.proInfo.id+"?prsrc=3";
            for (var i = 0; i < this.state.proInfo.organizations.length; i++) {
                var organization = this.state.proInfo.organizations[i];
                console.log(organization);
                if (organization.primary) {
                    personTitle = organization.title;
                    orgName = organization.name;
                }
            }
            for (var i = 0; i < this.state.proInfo.placesLived.length; i++) {
                var places = this.state.proInfo.placesLived[i];
                console.log(places);
                if (places.primary) {
                    livesIn = places.value;
                }
            }
            if (!$.isEmptyObject(this.state.proInfo.cover)) {
                // /*lNCkJ4zzEwyRkDogSMRo2N/5ciM*/background-image: url(https://lh3.googleusercontent.com/-Nv-Yky7dbt0/VuUJMxS42WI/AAAAAAAACBc/eERg5IG-MRQCogfFUodl-XMJN-bR15qMw/w728-h1600-fcrop64=1,3c7e0c77fb52ad64-rw/922C5413.jpg)
                var coverPhotoExists = {
                    backgroundImage: 'url('+this.state.proInfo.cover.coverPhoto.url+')',
                    backgroundPosition: 'center',
                    maxHeight: '145.6px',
                    maxWidth: '745p',
                    height: '145px',
                    WebkitBackgroundSize: 'cover',
                    backgroundSize: 'cover',
                    minHeight: '75px',
                    position: 'relative',
                    width: '100%'
                };

            } else {
                var coverPhotoExists = {
                    marginTop: '20px'
                }
            }
            if (this.state.proInfo.tagline != null) {
                var taglineExists = {
                    display: 'block'
                }
            } else {
                var taglineExists = {
                    display: 'none'
                }
            }
            googlePlusExists = <div>
                <div className="panel-body panel-red">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="coverPhoto" style={coverPhotoExists}></div>
                            <div className="JvYz0">
                                <img src={this.state.imageUrl} className="user-img" />
                            </div>
                            <div className="qsScTb">{this.state.proInfo.displayName}</div>
                            <div className="C98T8d">{this.state.proInfo.circledByCount} followers</div>
                            <div className="zW13ob">
                                <div className="woZtZ UEycXe">{personTitle}  at {orgName}</div>
                                <div className="WRuIef UEycXe">Lives in {livesIn}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body panel-white panel-white-long">
                    <div className="col-md-12">
                        <div className="col-md-11">
                            <div className="o30VSc">About</div>
                            <div style={taglineExists}>
                                <div className="uqKsgd">
                                    <div className="zqU9Fe">Tagline</div>
                                    <div className="BgK4Ef">
                                        <div className="mGa2db">
                                            <div className="DOdATc">
                                                {this.state.proInfo.tagline}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="DOdATc" dangerouslySetInnerHTML={{__html: this.state.proInfo.aboutMe}}></div>
                        </div>
                        <div className="col-md-1">
                            <div className="google-plus-logo">
                                <a href={googlePlusId}
                                   rel="publisher" target="_blank">
                                    <img src="//ssl.gstatic.com/images/icons/gplus-64.png" alt="Google+"  />
                                </a>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="panel-body panel-white panel-white-long">
                    <div className="col-md-12">
                        <div className="o30VSc">Work &amp; Education</div>
                        <div>
                            <div className="uqKsgd">
                                <div className="zqU9Fe">Employment</div>
                                { this.state.proInfo.organizations.map(this.showWork) }
                            </div>
                        </div>
                        <div>
                            <div className="uqKsgd">
                                <div className="zqU9Fe">Education</div>
                                { this.state.proInfo.organizations.map(this.showEducation) }
                            </div>
                        </div>
                        <div className="DOdATc" dangerouslySetInnerHTML={{__html: this.state.proInfo.aboutMe}}></div>
                    </div>
                </div>
            </div>;
        } else {
            googlePlusExists = <div className="panel-body panel-light img-rounded">
                <div className="row">
                    <div className="col-md-12">
                    </div>
                </div>
            </div>;
        }
        return (
            <div>
                {googlePlusExists}
            </div>
        );
    }
});