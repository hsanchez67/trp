var divStyle = {
    display: 'none',
    opacity: 1
};

var fontSize = {
    fontSize: '1em'
};

var ReviewRequestForm = React.createClass({
    displayName: 'ReviewRequestForm',
    getInitialState: function () {
        return {
            user: [],
            reviewId: undefined,
            reviewedUser: []
        };
    },
    componentDidMount: function () {
        var id = $('#id').val();
        var source = '/api/users/' + id;
        $.get(source, function (result) {
            if (!$.isEmptyObject(result)) {
                console.log('ReviewRequestForm:componentDidMount:user:');
                console.log(result);
                this.setState({
                    user: result
                });
            }
        }.bind(this));
        var reviewId = $('#reviewId').val();
        if (reviewId != "") {
            this.setState({
                reviewId: reviewId
            });
        }

        var reviewedUserId = $('#reviewedUserId').val();
        if (reviewedUserId != "") {
            this.getReviewedUser(reviewedUserId);
        }

        $('input[type=radio][name=didBusiness]').change(function () {
            console.log(this.value);
            if (this.value == "Yes") {
                $(".professional").fadeIn(1000);
            } else {
                $(".professional").fadeOut(1000);
            }
        });
    },
    getReviewedUser: function (id) {
        var source = '/api/users/' + id;
        $.get(source, function (result) {
            if (!$.isEmptyObject(result)) {
                console.log('ReviewRequestForm:componentDidMount:user:');
                console.log(result);
                this.setState({
                    reviewedUser: result
                });
            }
        }.bind(this));
    },
    getUrlParameter: function (sParam) {
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
    handleSubmit: function (e) {
        e.preventDefault();
        var source = '/submitReviewRequest';
        var data = this.getFormData();
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $.ajax({
            type: "POST",
            url: source,
            async: true,
            data: formData,
            success: function (result) {
                /*   console.log("Saved successfully!" + result);
                 document.getElementById("save-alert").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Congratulations!</strong> Review Submitted Successfully.</label></div>";
                 $("#save-alert").alert();
                 $("#save-alert").fadeTo(4000, 500).slideUp(500, function(){
                 $("#save-alert").alert('close');
                 document.getElementById("save-alert").innerHTML = "";
                 }) */
                this.setState({
                    reviewId: undefined
                });
            }.bind(this),
            error: function (request, status, error) {
                console.log("Error saving data: " + error.toString());
                document.getElementById("save-alert").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label className=\"error\"><strong>Heads Up!</strong> An error occurred!</label></div>";
                $("#save-alert").alert();
                $("#save-alert").fadeTo(4000, 500).slideUp(500, function () {
                    $("#save-alert").alert('close');
                    document.getElementById("save-alert").innerHTML = "";
                });
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    getFormData: function () {
        return {
            id: this.state.reviewId,
            nps: $("input[name=recommendScale]:checked").val(),
            overallQualityOfService: $("input[name=rating2]:checked").val(),
            timelinessOfService: $("input[name=rating3]:checked").val(),
            overallRating: $("input[name=rating]:checked").val(),
            reviewComments: this.refs.comments.getDOMNode().value
        };
    },
    render: function () {
        if (this.state.reviewId == undefined) {
            return (
                <div>
                    <HeaderResponsiveIn user={this.state.user}/>
                    <Banner />

                    <div id="review-request-container" className="container">
                        <div id="main">
                            <ol className="breadcrumb">
                                <div className="row">
                                    <div className="col-md-12 text-left margin-left-10"><h4 className="margin-top-10"></h4></div>
                                </div>
                            </ol>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="panel">
                                        <div id="review-request-main-panel" className="panel-body">
                                            <div className="jumbotron">
                                                <h1>Thank you!</h1>

                                                <p>This review has been submitted</p>

                                                <p><a className="btn btn-primary btn-lg" href="/home" role="button">
                                                    <span className="fa fa-home"></span>
                                                    &nbsp;
                                                    Home
                                                </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <HeaderResponsiveIn user={this.state.user}/>
                    <Banner />

                    <div id="review-request-container" className="container">
                        <div id="main">
                            <ol className="breadcrumb">
                                <div className="row">
                                    <div className="col-lg-12 text-left margin-left-10"><h4 className="margin-top-10">
                                        Submit a review
                                        for {this.state.reviewedUser.firstName} {this.state.reviewedUser.lastName}</h4>
                                    </div>
                                </div>
                            </ol>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="panel">
                                        <div id="review-request-main-panel" className="panel-body">
                                            <div className="row">
                                                <div className="col-lg-8 text-left ">
                                                    <div className="input-group">
                                                        <div className="col-sm-12">
                                                            <div id="save-alert"></div>
                                                        </div>
                                                    </div>
                                                    <div className="well well-sm col-lg-12">
                                                        <div className="input-group">
                                                            <label className="control-label" for="recommendScale">On a scale of 0 to 10, how likely are you to recommend {this.state.reviewedUser.firstName} {this.state.reviewedUser.lastName} to a friend or colleague?</label>

                                                            <div className="col-md-12">
                                                                <label className="radio-inline"><input id="rate0"
                                                                                                       name="recommendScale"
                                                                                                       type="radio"
                                                                                                       value="0"/>
                                                                    0
                                                                </label>
                                                                <label className="radio-inline"><input id="rate1"
                                                                                                       name="recommendScale"
                                                                                                       type="radio"
                                                                                                       value="1"/>
                                                                    1
                                                                </label>
                                                                <label className="radio-inline"><input id="rate1"
                                                                                                       name="recommendScale"
                                                                                                       type="radio"
                                                                                                       value="2"/>
                                                                    2
                                                                </label>
                                                                <label className="radio-inline"><input id="rate1"
                                                                                                       name="recommendScale"
                                                                                                       type="radio"
                                                                                                       value="3"/>
                                                                    3
                                                                </label>
                                                                <label className="radio-inline"><input id="rate1"
                                                                                                       name="recommendScale"
                                                                                                       type="radio"
                                                                                                       value="4"/>
                                                                    4
                                                                </label>
                                                                <label className="radio-inline"><input id="rate1"
                                                                                                       name="recommendScale"
                                                                                                       type="radio"
                                                                                                       value="5"/>
                                                                    5
                                                                </label>
                                                                <label className="radio-inline"><input id="rate1"
                                                                                                       name="recommendScale"
                                                                                                       type="radio"
                                                                                                       value="6"/>
                                                                    6
                                                                </label>
                                                                <label className="radio-inline"><input id="rate1"
                                                                                                       name="recommendScale"
                                                                                                       type="radio"
                                                                                                       value="7"/>
                                                                    7
                                                                </label>
                                                                <label className="radio-inline"><input id="rate1"
                                                                                                       name="recommendScale"
                                                                                                       type="radio"
                                                                                                       value="8"/>
                                                                    8
                                                                </label>
                                                                <label className="radio-inline"><input id="rate1"
                                                                                                       name="recommendScale"
                                                                                                       type="radio"
                                                                                                       value="9"/>
                                                                    9
                                                                </label>
                                                                <label className="radio-inline"><input id="rate1"
                                                                                                       name="recommendScale"
                                                                                                       type="radio"
                                                                                                       value="10"/>
                                                                    10
                                                                </label>
                                                            </div>
                                                            <label className="col-md-5 control-label text-left help"><span className="fa fa-long-arrow-left"></span> Not likely to recommend</label>
                                                            <label className="col-md-7 control-label text-left help">Extremely likely to recommend <span className="fa fa-long-arrow-right"></span></label>
                                                        </div>
                                                    </div>
                                                    <div className="well well-sm col-lg-12">
                                                        <label className="col-lg-12 control-label text-left alert">If Services were provided, please
                                                            rate {this.state.reviewedUser.firstName} {this.state.reviewedUser.lastName} in the following categories:</label>

                                                        <div className="input-group col-lg-12">
                                                            <label className="col-lg-4 col-md-12 col-sm-12 col-xs-12 control-label stars-label">Overall Rating</label>

                                                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                                <fieldset className="rating">
                                                                    <input type="radio" id="star5" name="rating"
                                                                           value="5"/><label htmlFor="star5"
                                                                                             title="Rocks!">5
                                                                    stars</label>
                                                                    <input type="radio" id="star4" name="rating"
                                                                           value="4"/><label htmlFor="star4"
                                                                                             title="Pretty good">4
                                                                    stars</label>
                                                                    <input type="radio" id="star3" name="rating"
                                                                           value="3"/><label htmlFor="star3"
                                                                                             title="Meh">3 stars</label>
                                                                    <input type="radio" id="star2" name="rating"
                                                                           value="2"/><label htmlFor="star2"
                                                                                             title="Kinda bad">2
                                                                    stars</label>
                                                                    <input type="radio" id="star1" name="rating"
                                                                           value="1"/><label htmlFor="star1"
                                                                                             title="Sucks big time">1
                                                                    star</label>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                        <div className="input-group col-lg-12">
                                                            <label className="col-lg-4 col-md-12 col-sm-12 col-xs-12 control-label stars-label">Overall
                                                                Quality of Service</label>

                                                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                                <fieldset className="rating">
                                                                    <input type="radio" id="quality5" name="rating2"
                                                                           value="5"/><label htmlFor="quality5"
                                                                                             title="Rocks!">5
                                                                    stars</label>
                                                                    <input type="radio" id="quality4" name="rating2"
                                                                           value="4"/><label htmlFor="quality4"
                                                                                             title="Pretty good">4
                                                                    stars</label>
                                                                    <input type="radio" id="quality3" name="rating2"
                                                                           value="3"/><label htmlFor="quality3"
                                                                                             title="Meh">3 stars</label>
                                                                    <input type="radio" id="quality2" name="rating2"
                                                                           value="2"/><label htmlFor="quality2"
                                                                                             title="Kinda bad">2
                                                                    stars</label>
                                                                    <input type="radio" id="quality1" name="rating2"
                                                                           value="1"/><label htmlFor="quality1"
                                                                                             title="Sucks big time">1
                                                                    star</label>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                        <div className="input-group col-lg-12">
                                                            <label className="col-lg-4 col-md-12 col-sm-12 col-xs-12 control-label stars-label">Timeliness
                                                                of Service</label>

                                                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                                <fieldset className="rating">
                                                                    <input type="radio" id="time5" name="rating3"
                                                                           value="5"/><label htmlFor="time5"
                                                                                             title="Rocks!">5
                                                                    stars</label>
                                                                    <input type="radio" id="time4" name="rating3"
                                                                           value="4"/><label htmlFor="time4"
                                                                                             title="Pretty good">4
                                                                    stars</label>
                                                                    <input type="radio" id="time3" name="rating3"
                                                                           value="3"/><label htmlFor="time3"
                                                                                             title="Meh">3 stars</label>
                                                                    <input type="radio" id="time2" name="rating3"
                                                                           value="2"/><label htmlFor="time2"
                                                                                             title="Kinda bad">2
                                                                    stars</label>
                                                                    <input type="radio" id="time1" name="rating3"
                                                                           value="1"/><label htmlFor="time1"
                                                                                             title="Sucks big time">1
                                                                    star</label>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="well well-sm col-lg-12">
                                                        <div className="input-group">
                                                            <label htmlFor="comments"
                                                                   className="col-lg-12 control-label text-left alert">We
                                                                would appreciate any comments you may have about your
                                                                overall experience:</label>
                                                            <textarea className="form-control col-md-12" rows="5"
                                                                      name="comments" id="comments" ref="comments"
                                                                      placeholder="Your Comments"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <button type="button"
                                                                    className="btn btn-primary btn-sm btn-block"
                                                                    onClick={this.handleSubmit}>
                                                                <span className="fa fa-send"></span>
                                                                &nbsp;Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <ProfilePanel user={this.state.reviewedUser}/>
                                                    <NavigationPanel />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-footer">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
        ;
    }
});

ReactDOM.render(
    <ReviewRequestForm />,
    document.getElementById('content')
);