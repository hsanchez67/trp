var Result4 = React.createClass({
    getInitialState: function() {
        return {
            fromUser: [],
            toUser: [],
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/'+fromUserId;
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }.bind(this));
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/'+toUserId;
        $.get(source2, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }.bind(this));
    },
    handleOpenMessage: function() {
        window.location.href = '/reviewRequest/' + this.props.reviewId;
    },
    render:function() {
        let arrow = classNames({
            'arrow': this.props.count%2 === 0,
            'arrow-alt': this.props.count%2 !== 0
        });
        let timeline = classNames({
            'timeline-item': this.props.count%2 === 0,
            'timeline-item alt': this.props.count%2 !== 0
        });
        var reviewStatus = "";
        if (this.props.status == "Reviewed") {
            reviewStatus = <p><a className="red">{this.state.fromUser.firstName} {this.state.fromUser.lastName}</a> received a <span><a className="blue">REVIEW</a></span> from <a className="red">{this.state.toUser.firstName} {this.state.toUser.lastName}</a> </p>;
        } else  {
            reviewStatus = <p><a className="red">{this.state.fromUser.firstName} {this.state.fromUser.lastName}</a> sent a <span><a className="blue">REVIEW REQUEST</a></span> to <a className="red">{this.state.toUser.firstName} {this.state.toUser.lastName}</a> </p>
        }
        return (
            <article className={timeline}>
                <div className="timeline-desk">
                    <div className="panel">
                        <div className="panel-body">
                            <span className={arrow}></span>
                            <span className="timeline-icon light-green"></span>
                            <span className="timeline-date">{this.props.createdTime}</span>
                            <h1 className="light-green">{this.props.createdDate}</h1>
                            {reviewStatus}
                            <div className="album">
                                <Avatar id={this.state.fromUser.id} username={this.state.fromUser.avatar} name={this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName} className="task-thumb" />
                                <Avatar id={this.state.toUser.id} username={this.state.toUser.avatar} name={this.state.toUser.firstName + ' ' + this.state.toUser.lastName} className="task-thumb" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>);
    }
});

var Result3 = React.createClass({
    getInitialState: function() {
        return {
            fromUser: [],
            toUser: [],
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/'+fromUserId;
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }.bind(this));
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/'+toUserId;
        $.get(source2, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }.bind(this));
    },
    handleOpenMessage: function() {
        window.location.href = '/message/' + this.props.id;
    },
    render:function() {
        let arrow = classNames({
            'arrow': this.props.count%2 === 0,
            'arrow-alt': this.props.count%2 !== 0
        });
        let timeline = classNames({
            'timeline-item': this.props.count%2 === 0,
            'timeline-item alt': this.props.count%2 !== 0
        });
        return (
            <article className={timeline}>
                <div className="timeline-desk">
                    <div className="panel">
                        <div className="panel-body">
                            <span className={arrow}></span>
                            <span className="timeline-icon red"></span>
                            <span className="timeline-date">{this.props.createdTime}</span>
                            <h1 className="red">{this.props.createdDate}</h1>
                            <p><a className="red">{this.state.fromUser.firstName} {this.state.fromUser.lastName}</a> sent a <span><a className="blue">MESSAGE</a></span> to <a className="red">{this.state.toUser.firstName} {this.state.toUser.lastName}</a> </p>
                            <div className="notification">
                                <strong>Subject: </strong>{this.props.subject}
                            </div>
                            <div className="album">
                                <Avatar id={this.state.fromUser.id} username={this.state.fromUser.avatar} name={this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName} className="task-thumb" />
                                <Avatar id={this.state.toUser.id} username={this.state.toUser.avatar} name={this.state.toUser.firstName + ' ' + this.state.toUser.lastName} className="task-thumb" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>);
    }
});

var Result2 = React.createClass({
    getInitialState: function() {
        return {
            fromUser: [],
            toUser: [],
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/'+fromUserId;
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }.bind(this));
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/'+toUserId;
        $.get(source2, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }.bind(this));
        var subjectUserId = this.props.subjectUserId;
        var source3 = '/api/users/'+subjectUserId;
        $.get(source3, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    subjectUser: result
                });
            }
        }.bind(this));
    },
    handleOpenReferral: function() {
        window.location.href = '/referralRequest/' + this.props.id;
    },
    render:function() {
        var referralStatus = "";
        if (this.props.status == "Accepted") {
            referralStatus = <span><strong>Referral Accepted! </strong><img className="latched-icon" src="/images/LATCH-Logo-Check.png" alt="Latched" /></span>;
        } else if (this.props.status == "Rejected")  {
            referralStatus = <span><strong>Referral Rejected! </strong><img className="latched-icon" src="/images/LATCH-Logo-Uncheck.png" alt="Latched" /></span>;
        } else {
            referralStatus = <span><strong>Referral Pending! </strong></span>;
        }
        let arrow = classNames({
            'arrow': this.props.count%2 === 0,
            'arrow-alt': this.props.count%2 !== 0
        });
        let timeline = classNames({
            'timeline-item': this.props.count%2 === 0,
            'timeline-item alt': this.props.count%2 !== 0
        });
        return (
            <article className={timeline}>
                <div className="timeline-desk">
                    <div className="panel">
                        <div className="panel-body">
                            <span className={arrow}></span>
                            <span className="timeline-icon purple"></span>
                            <span className="timeline-date">{this.props.createdTime}</span>
                            <h1 className="purple">{this.props.createdDate}</h1>
                            <p><a className="red">{this.state.fromUser.firstName} {this.state.fromUser.lastName}</a>  <span><a className="blue">REFERRED</a></span>  <a className="red">{this.state.subjectUser.firstName} {this.state.subjectUser.lastName}</a> to <a className="red">{this.state.toUser.firstName} {this.state.toUser.lastName}</a> </p>
                            <div className="notification">
                                {referralStatus}
                            </div>
                            <div className="album">
                                <Avatar id={this.state.fromUser.id} username={this.state.fromUser.avatar} name={this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName} className="task-thumb" />
                                <Avatar id={this.state.subjectUser.id} username={this.state.subjectUser.avatar} name={this.state.subjectUser.firstName + ' ' + this.state.subjectUser.lastName} className="task-thumb" />
                                <Avatar id={this.state.toUser.id} username={this.state.toUser.avatar} name={this.state.toUser.firstName + ' ' + this.state.toUser.lastName} className="task-thumb" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>);
    }
});

var Result = React.createClass({
    getInitialState: function() {
        return {
            fromUser: [],
            toUser: [],
            subjectUser: [],
            commId: this.props.id
        };
    },
    componentWillMount: function() {
        var fromUserId = this.props.fromUserId;
        var source = '/api/users/'+fromUserId;
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    fromUser: result
                });
            }
        }.bind(this));
        var toUserId = this.props.toUserId;
        var source2 = '/api/users/'+toUserId;
        $.get(source2, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    toUser: result
                });
            }
        }.bind(this));
        var subjectUserId = this.props.subjectUserId;
        var source3 = '/api/users/'+subjectUserId;
        $.get(source3, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    subjectUser: result
                });
            }
        }.bind(this));
    },
    handleOpenIntroduction: function() {
        window.location.href = '/introductionRequest/' + this.props.id;
    },
    render:function() {
        let arrow = classNames({
            'arrow': this.props.count%2 === 0,
            'arrow-alt': this.props.count%2 !== 0
        });
        let timeline = classNames({
            'timeline-item': this.props.count%2 === 0,
            'timeline-item alt': this.props.count%2 !== 0
        });
        return (
            <article className={timeline}>
                <div className="timeline-desk">
                    <div className="panel">
                        <div className="panel-body">
                            <span className={arrow}></span>
                            <span className="timeline-icon blue"></span>
                            <span className="timeline-date">{this.props.createdTime}</span>
                            <h1 className="blue">{this.props.createdDate}</h1>
                            <p><a className="red">{this.state.fromUser.firstName} {this.state.fromUser.lastName}</a> <span><a className="blue">INTRODUCED</a></span>  <a className="red">{this.state.subjectUser.firstName} {this.state.subjectUser.lastName}</a> to <a className="red">{this.state.toUser.firstName} {this.state.toUser.lastName}</a> </p>
                            <div className="album">
                                <Avatar id={this.state.fromUser.id} username={this.state.fromUser.avatar} name={this.state.fromUser.firstName + ' ' + this.state.fromUser.lastName} className="task-thumb" />
                                <Avatar id={this.state.subjectUser.id} username={this.state.subjectUser.avatar} name={this.state.subjectUser.firstName + ' ' + this.state.subjectUser.lastName} className="task-thumb" />
                                <Avatar id={this.state.toUser.id} username={this.state.toUser.avatar} name={this.state.toUser.firstName + ' ' + this.state.toUser.lastName} className="task-thumb" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>);
    }
});

var HistoryResults = React.createClass({
    getInitialState: function () {
        return {
            loading: true
        };
    },
    componentDidUpdate: function() {
        // drag & drop
        $(".source li").draggable({
            addClasses: false,
            appendTo: "body",
            helper: "clone"
        });
    },
    componentDidMount: function () {
        setTimeout(function() {
            this.setState({ loading: false });
        }.bind(this), 5000);
    },
    deleteMessage: function (id) {
        this.props.deleteMessage(id);
    },
    render:function() {
        if (this.state.loading) {
            return (
                <div className="no-entries"><i className="fa fa-5x fa-cog fa-spin"></i></div>
            );
        } else if ($.isEmptyObject(this.props.data) && !this.state.loading) {
            return <div className="no-entries">No History</div>;
        } else {
            var messages = [];
            var count = 0;
            var countIntros = 0;
            var countReferrals = 0;
            this.props.data.forEach(function (message) {
                var created = new Date(message.created);
                var hours = created.getHours()
                var minutes = created.getMinutes()
                var createdDate = $.datepicker.formatDate("dd MM yy | DD", new Date(created));
                var createdTime = $.datepicker.formatTime("h:mm tt", {hour: hours, minute: minutes}, {});
                if (message.transactionType == "Introduction") {
                    countIntros++;
                    messages.push(<Result key={message.id} id={message.id} fromUserId={message.fromUserId} groupId={message.groupId}
                                          subjectUserId={message.subjectUserId} attachments={message.attachedAssetIds}
                                          status={message.status} subject={message.subject} toUserId={message.toUserId}
                                          transactionType={message.transactionType} createdDate={createdDate} createdTime={createdTime}
                                          count={count++} deleteMessage={this.deleteMessage} />);
                } else if (message.transactionType == "Referral") {
                    countReferrals++;
                    messages.push(<Result2 key={message.id} id={message.id} fromUserId={message.fromUserId} groupId={message.groupId}
                                           subjectUserId={message.subjectUserId} attachments={message.attachedAssetIds}
                                           status={message.status} subject={message.subject} toUserId={message.toUserId}
                                           transactionType={message.transactionType} createdDate={createdDate} createdTime={createdTime}
                                           count={count++} deleteMessage={this.deleteMessage} />);
                } else if (message.transactionType == "Communication" || message.transactionType == "Notification") {
                    messages.push(<Result3 key={message.id} id={message.id} fromUserId={message.fromUserId} groupId={message.groupId}
                                           subjectUserId={message.subjectUserId} attachments={message.attachedAssetIds}
                                           status={message.status} subject={message.subject} toUserId={message.toUserId}
                                           transactionType={message.transactionType} createdDate={createdDate} createdTime={createdTime}
                                           count={count++} deleteMessage={this.deleteMessage} />);
                } else if (message.transactionType == "Review") {
                    messages.push(<Result4 key={message.id} id={message.id} reviewId={message.transactionid} fromUserId={message.fromUserId} groupId={message.groupId}
                                           subjectUserId={message.subjectUserId} attachments={message.attachedAssetIds}
                                           status={message.status} subject={message.subject} toUserId={message.toUserId}
                                           transactionType={message.transactionType} createdDate={createdDate} createdTime={createdTime}
                                           count={count++} deleteMessage={this.deleteMessage} />);
                }
            }.bind(this));
            console.log(countIntros + " - " + console.log(countReferrals));
            return (
                <div id="timeline" className="timeline">{messages}</div>
            );
        }
    }
});

var HistoryContent = React.createClass({
    displayName: 'HistoryContent',
    getInitialState: function() {
        return {
            user: [],
            history: [],
            touches: 0,
            referrals: 0,
            intros: 0,
            reviews: 0,
            messages: 0,
            page: 0
        };
    },
    componentWillMount: function () {
        console.log("HistoryContent:componentWillMount:");
        var page = 0;
        this.prepareComponentState(page);
    },
    prepareComponentState: function(page) {
        console.log("HistoryContent:prepareComponentState:");
        var id = $('#id').val();
        var subjectUserId = $('#profileid').val();
        var data = {
            id: id,
            subjectUserId: subjectUserId,
            page: page
        }
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $("#paginator" ).empty();
        $.ajax({
            type: "POST",
            url: "/getHistory",
            data: formData,
            success: function success(result) {
                if ($.isEmptyObject(result) || result.error == "No History") {
                    console.log("No History");
                    this.setState({
                        user: [],
                        history: [],
                        touches: 0,
                        referrals: 0,
                        intros: 0,
                        review: 0,
                        messages: 0
                    });
                    return null;
                } else {
                    console.log(result);
                    this.setState({
                        user: result.user,
                        history: result.history,
                        touches: result.touches,
                        reviews: result.reviews,
                        intros: result.intros,
                        referrals: result.referrals,
                        messages: result.messages,
                    });
                    var currentPage = result.pageNumber;
                    var totalPages = result.totalPages;
                    var options = {
                        currentPage: currentPage + 1,
                        totalPages: totalPages,
                        size: 'normal',
                        alignment: 'center',
                        onPageClicked: function (e, originalEvent, type, page) {
                            console.log(page);
                            this.prepareComponentState(page - 1);
                        }.bind(this),
                        /*    pageUrl: function(type, page, current) {
                         return '/api/users/search/findUsers?sort='+sort+',desc&size=10&name=' + queryName + '&profession=' + queryProfession + '&city=' + city + '&state=' + state + '&page=' + page;
                         }, */
                        itemTexts: function (type, page, current) {
                            switch (type) {
                                case "first":
                                    return "First";
                                case "prev":
                                    return "Previous";
                                case "next":
                                    return "Next";
                                case "last":
                                    return "Last";
                                case "page":
                                    return page;
                            }
                        }
                    }
                    $('#paginator').bootstrapPaginator(options);
                }
            }.bind(this),
            error: function (error) {
                console.log('Error: '+ error);
                return false;
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    render: function () {
        return (
            <div className="col-lg-8">
                <div id="profile-content-row" className="row">
                    <div className="row" id="history-content">
                        <div className="col-lg-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <header className="panel-title">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="col-lg-10">
                                                    <div className="history-title">Relationship history with <strong>{this.state.user.firstName}</strong> {this.state.user.lastName}<strong>.</strong></div>
                                                </div>
                                                <div className="col-lg-2 text-right">
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-primary btn-sm">
                                                            <i className="fa fa-print"></i>&nbsp;Print
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </header>
                                </div>
                                <section className="panel-body" id="timeline">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="text-center">
                                                <h3 className="timeline-title">Timeline</h3>
                                                <p className="t-info"><strong>{this.state.touches}</strong> Touches  <strong className="margin-left-20">{this.state.referrals}</strong> Referrals   <strong className="margin-left-20">{this.state.intros}</strong> Intros <strong className="margin-left-20">{this.state.reviews}</strong> Reviews <strong className="margin-left-20">{this.state.messages}</strong> Messages</p>
                                            </div>
                                            <HistoryResults data={this.state.history} />
                                        </div>
                                        <div className="col-md-12 margin-top-20">
                                            <div className="row">
                                                <div className="text-center">
                                                    <div id="paginator" className="pagination"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});