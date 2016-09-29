var MyHome = React.createClass({
    displayName: 'Home',
    getInitialState: function() {
        return {
            user: [],
            username: '',
            avatar: '',
            source: '',
            score: 0,
            addToCurrentGroup: '',
            allActivity: 0,
            yourNetwork: 0,
            avgRating: 0.0,
            newMessages: 0,
            nps: 0
        };
    },
    componentWillMount: function () {
        this.setState({
            allActivity: $('#allActivity').val(),
            yourNetwork: $('#yourNetwork').val(),
            avgRating: $('#avgRating').val(),
            newMessages: $('#newMessages').val()
        });
        var id = $('#id').val();
        var source = '/api/users/'+id;
        $.get(source, function(result) {
            if (!$.isEmptyObject(result)) {
                var data = result;
                this.setState({
                    user: data,
                    username: data.firstName.toLowerCase()+'.'+data.lastName.toLowerCase(),
                    avatar: data.avatar,
                    score: data.score
                });
            }
        }.bind(this));
        this.getReviews(id, 0);
    },
    handleAddUserToCurrentGroup: function(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    getReviews: function(id, page) {
        var data = {
            id: id,
            page: page
        }
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $.ajax({
            type: "POST",
            url: "/getReviewsForUser",
            async:   true,
            data: formData,
            success: function(result){
                console.log(result)
                if (result.page.totalElements == 0 || $.contains(result, '<!DOCTYPE html>')) {
                    console.log("No results");
                    return null;
                } else {
                    this.calculateNPS(result._embedded.reviewDTOList, result.page.totalElements);
                }
            }.bind(this),
            dataType: "json",
            contentType : "application/json"
        });
    },
    calculateNPS: function(reviews, total) {
        console.log("Calculate NPS");
        var sum = 0;
        var sum2 = 0;
        var sum3 = 0;
        // NPS score
        var promoters = 0;
        var detractors = 0;
        $.each(reviews, function(key, value) {
            if (value.overallRating != null) {
                sum = sum + value.overallRating;
            }
            if (value.nps < 7) {
                detractors++;
            }
            if (value.nps > 8) {
                promoters++;
            }
        })
        var rating = sum /total;
        var nps = 0;
        if (total > 0) {
            var nps = ((promoters - detractors) / total) * 100;
        }
        console.log(rating);
        console.log(nps);
        this.setState({
            nps: nps
        });
    },
    render: function () {
        var noHomeAddressWarning = "";
        if (this.state.user.address1 != null && this.state.user.address1 != '' && this.state.user.city != null && this.state.user.city != '' && this.state.user.state != null && this.state.user.state != '') {
            noHomeAddressWarning = "";
        } else if (!$.isEmptyObject(this.state.user)) {
            noHomeAddressWarning = <NoHomeAddressPanel user={this.state.user} />
        }
        return (
            <div>
                <HeaderResponsiveIn user={this.state.user} handleAddUserToCurrentGroup={this.handleAddUserToCurrentGroup} />
                <Banner />
                <div className="container">
                    <div id="main">
                        <ol className="breadcrumb">
                            <div className="row">
                                &nbsp;
                            </div>
                        </ol>
                        <div className="row" id="home-content">
                            <HomeOverview  user={this.state.user} allActivity={this.state.allActivity} yourNetwork={this.state.yourNetwork} avgRating={this.state.avgRating} newMessages={this.state.newMessages} nps={this.state.nps} />
                            <div className="col-lg-4">
                                <ProfilePanel  user={this.state.user}  />
                                {noHomeAddressWarning}
                                <MyShortListPanel droppable={true} addToCurrentGroup={this.state.addToCurrentGroup} />
                                <NavigationPanel />
                                <NotificationsPanel />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <MyHome />,
    document.getElementById('content')
);