var IntroductionDraft = React.createClass({
    displayName: 'IntroductionDraft',
    getInitialState: function() {
        return {
            user: [],
            communication: [],
            toUser: [],
            subjectUser: [],
            profession: '',
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function() {
        var id = $('#id').val();
        var source2 = '/api/users/'+id;
        $.get(source2, function (result) {
            this.setState({
                user: result
            });
        }.bind(this));
        var commId =$('#commId').val();
        if (commId != null && commId != '') {
            var data = {
                commId: commId,
                readOnly: false
            };
            data = JSON.stringify(data, null, ' ');
            $.ajax({
                type: "POST",
                url: "/getPendingMessageById",
                data: data,
                success: function(result){
                    this.setState({
                        communication: result.communication,
                        toUser : result.toUser,
                        subjectUser: result.subjectUser,
                        profession: result.communication.subjectUserProfession
                    });
                }.bind(this),
                error: function(error) {
                    console.log(error);
                    return false;
                },
                complete: function (e, xhr, settings) {
                    if (e.status === 401) {
                        window.location.href = "/myq";
                    }
                },
                dataType: "json",
                contentType : "application/json"
            });
        }
    },
    handleAddUserToCurrentGroup: function(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    render: function () {
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
                        <div className="row" id="introduction-content">
                            <IntroductionContent  user={this.state.user}  communication={this.state.communication} toUser={this.state.toUser} subjectUser={this.state.subjectUser} profession={this.state.profession}  />
                            <div className="col-lg-4">
                                <MyShortListPanel droppable={true} addToCurrentGroup={this.state.addToCurrentGroup}  />
                                <NavigationPanel />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    },
});

ReactDOM.render(
    <IntroductionDraft />,
    document.getElementById('content')
);