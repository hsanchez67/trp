var ProfilePanelPlus = React.createClass({
    displayName: 'ProfilePanelPlus',
    getInitialState: function() {
        return {
            reviews: [],
            reviewCount: 0,
            rating: 0,
            id: this.props.user.id,
            contactNotes: '',
            gotNotes: false,
            initials: '',
            userNotes: []
        };
    },
    componentDidUpdate: function(prevProps) {
        console.log("profilePanelPlus:componentDidUpdate:");
        console.log(prevProps);
        console.log(this.props);
        console.log(this.state.gotNotes);
        if (!$.isEmptyObject(this.props.user) && !this.state.gotNotes) {
            console.log("profilePanelPlus:componentDidUpdate:getNotes");
            $('#contactNotes').editable('destroy');
            this.initializeContactNotes(this.props.user.id);
            this.getContactNotes(this.props.user.id);
        }
    },
    getContactNotes: function(targetId) {
        // Get contact notes
        console.log("profilePanelPlus:getContactNotes:");
        var data = {
            ownerUserId: $('#id').val(),
            targetUserId: targetId,
        };
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getContactNotes",
            async:   true,
            data: formData,
            success: function(result, textStatus, xhr){
                console.log(result)
                if (xhr.status == 401) {
                    window.location.href = "/myShortList"
                }
                if (!$.isEmptyObject(result) && result.content != null) {
                    this.setState({
                        contactNotes: result.content,
                        gotNotes: true
                    });
                    $('#contactNotes').editable('setValue', result.content);
                } else if (!$.isEmptyObject(result) && result.content == null) {
                    this.setState({
                        contactNotes: '',
                        gotNotes: true
                    });
                    $('#contactNotes').editable('setValue', '');
                }
                //$('#contactNotes').editable('destroy');
            }.bind(this),
            complete: function(xhr, textStatus) {
                if (xhr.status == 401) {
                    window.location.href = "/myShortList"
                }
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    initializeContactNotes: function(targetId) {
        var id = $('#id').val();
        var id2 = targetId;
        console.log("ProfilePanelPlus:initializeContactNotes:id:");
        console.log(id);
        console.log(id2);
     /*   $.fn.editable.defaults.mode = 'inline';
        $.fn.editable.defaults.url = '/saveUser';
        $.fn.editable.defaults.pk = id;
        $.fn.editable.defaults.ajaxOptions = {
            contentType: 'application/json',
            type: "post",
            dataType: 'json'
        };
        $.fn.editable.defaults.send = 'always';
        $.fn.editable.defaults.pk = id; */


        $('#contactNotes').editable({
            type: 'textarea',
            mode: 'inline',
            pk: id,
            url: '/saveContactNotes',
            send: 'always',
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            params: function (params) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    content: params.value
                };
                return JSON.stringify(data);
            },
            success: function (data) {
                console.log("Success data below:");
                console.log(data)
            },
            error: function (errors) {
                console.log(errors.responseText)
            },
            rows: 10
        });
    },
    componentDidMount: function() {
        $('.see-more').click(function(){
            $(this).text(function(i, text) {
                return text === "more..." ? "less..." : "more...";
            })
        });
    },
    componentWillMount: function() {

    },
    componentWillReceiveProps: function (nextProps) {
        console.log("ProfilePanelPlus:componentWillReceiveProps:");
        console.log(nextProps);
        console.log(this.props);
        if (nextProps.user != this.props.user) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function(props) {
        console.log("ProfilePanelPlus:prepareComponentState:");
        console.log(props);
        if (props.user.id != null) {
            // Get reviews
            var data = {
                id: props.user.id
            }
            var formData = JSON.stringify(data, null, ' ');
            $.ajax({
                type: "POST",
                url: "/getReviewsForUser",
                async: true,
                data: formData,
                success: function (result) {
                    console.log(result)
                    if (result.page.totalElements > 0) {
                        this.setState({
                            reviews: result._embedded.reviewDTOList,
                            reviewCount: result.page.totalElements
                        });
                        this.calculateRating();
                    } else {
                        this.setState({
                            reviews: [],
                            reviewCount: 0,
                            rating: 0
                        });
                    }
                }.bind(this),
                dataType: "json",
                contentType: "application/json"
            });
            console.log(this.state.gotNotes);
            if (this.state.gotNotes) {
                console.log("profilePanelPlus:prepareComponentState:getNotes");
                $('#contactNotes').editable('destroy');
                this.initializeContactNotes(props.user.id);
                this.getContactNotes(props.user.id);
            }
            // get initials
            var name = props.user.firstName + ' ' + props.user.lastName;
            console.log(name);
            if (name != null) {
                var initials = name.match(/\b\w/g);
                console.log(initials);
                initials = (initials.shift() + initials.pop()).toUpperCase();
                console.log(initials);
                this.setState({initials: initials});
            }
        }
    },
    calculateRating: function() {
        console.log("Calculate rating");
        var total = this.state.reviewCount;
        var sum = 0;
        var reviews = this.state.reviews;
        $.each(reviews, function(key, value) {
            if (value.overallRating != null) {
                sum = sum + value.overallRating;
            }
        })
        var rating = sum /total;
        console.log(rating);
        this.setState({
            rating: rating
        });
    },
    render: function () {
        if ($.isEmptyObject(this.props.user)) {
            return (
                <div id="profile-panel"></div>
            );
        } else {
            var leadParagraph = '';
            var description = '';
            if (this.props.user.leadParagraph != null && this.props.user.leadParagraph != "") {
                leadParagraph = this.props.user.leadParagraph;
            }
            if (this.props.user.description != null && this.props.user.description != "") {
                description = this.props.user.description;
            }
            var profileAvatar = <img className="img-circle img-user" src={'/api/remoteFiles/view/' + this.props.user.avatar} />;
            if (this.props.user.avatar == 'default' && this.state.initials != '') {
                profileAvatar = <div className="avatar-circle-large"><img className="hidden" id={this.props.user.id} /><span className="initials-large">{this.state.initials}</span></div>;
            }
            return (
                <div id="profile-panel">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <header className="panel-title">
                                <div className="text-center">
                                    <strong>{this.props.user.firstName}</strong> {this.props.user.lastName}<strong>.</strong>
                                </div>
                            </header>
                        </div>
                        <div id="profile-panel-body" className="panel-body">
                            <div id="panel-compact" className="row">
                                <div className="col-lg-6">
                                    <div className="panel-body-left">
                                        <div className="text-center" id="user">
                                            {profileAvatar}
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-view" className="col-lg-6">
                                    <div className="panel-body-right">
                                        <div id="scoreChartDiv" className="canvas-score">
                                            <ScoreChart id={this.props.user.id}/>
                                        </div>
                                        <div className="text-center">
                                            <p className="score-label"><img src="/images/LATCH-Logo.png" className="Score-brandImg"/>Score</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center top-minus-20" id="user">
                                <div className="col-lg-12 col-lg-offset-2 col-md-12 col-md-offset-4 col-sm-12 col-xs-12">
                                    <div id="profile-content">
                                        <div className="profile-stars">
                                            <div className="profile-review-stars"><ReviewStars fontSize={'26px'} rating={this.state.rating}/></div>
                                            <div className="profile-head-title">({this.state.reviewCount} reviews)</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-lg-offset-1">
                                    <ProfileBits profile={this.props.user} />
                                </div>
                                <div className="col-lg-12 text-left">
                                    <div className="lead">{leadParagraph}</div>
                                </div>
                                <div className="clearfix" id="accordion">
                                    <div className="clear">
                                        <div className="pull-right">
                                            <a className="btn btn-primary btn-xs see-more" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" role="button">more...</a>
                                        </div>
                                    </div>
                                    <div id="collapseOne" className="panel-collapse collapse">
                                        <div id="profile-panel-body-collapse" className="panel-body">
                                            <div className="mainText bottom10">
                                                <div dangerouslySetInnerHTML={{__html: marked(description)}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="well well-sm clearfix margin-top-20">
                                    <div className="form-group text-left">
                                        <label for="contactNotes" className="col-sm-12 control-label">Notes</label>
                                        <div className="col-sm-12">
                                            <a href="#" id="contactNotes" ref="contactNotes" data-type="textarea" className="editable editable-click" data-title="Personal notes for this Contact">{this.state.contactNotes}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    },
});
