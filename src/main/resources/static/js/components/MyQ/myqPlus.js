var MyQPlus = React.createClass({
    displayName: 'MyQPlus',
    getInitialState: function() {
        return {
            user: [],
            tasks: 0,
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function() {
        var id = $('#id').val();
        var source = '/api/users/'+id;
        $.get(source, function (result) {
            this.setState({
                user: result
            });
        }.bind(this));
    },
    updateCount: function() {
        var id = $('#id').val();
        var data = {
            id: id,
            status: "Pending"
        };
        $.ajax({
            type: "POST",
            url: "/getNumOfTasks",
            data: JSON.stringify(data, null, ' '),
            success: function(result){
                console.log(result);
                if (result != null) {
                    this.setState({
                        tasks: result.page.totalElements
                    });
                }
            }.bind(this),
            error: function(error) {
                if(error.status == 401) {
                    window.location.href = '/login';
                }
                console.log(error);
                return false;
            },
            dataType: "json",
            contentType : "application/json"
        });
    },
    handleAddUserToCurrentGroup: function(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    render: function () {
        return (
            <div>
                <HeaderResponsiveIn user={this.state.user} tasks={this.state.tasks} handleAddUserToCurrentGroup={this.handleAddUserToCurrentGroup} />
                <Banner />
                <div className="container">
                    <div id="main">
                        <ol className="breadcrumb">
                            <div className="row">
                                &nbsp;
                            </div>
                        </ol>
                        <div className="row" id="introduction-content">
                            <MyQPlusContent  user={this.state.user} updateCount={this.updateCount} />
                            <div className="col-lg-4">
                                <MyShortListPanel droppable={true} addToCurrentGroup={this.state.addToCurrentGroup} />
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
    <MyQPlus />,
    document.getElementById('content')
);