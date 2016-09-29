var Search = React.createClass({
    displayName: 'Search',
    getInitialState: function() {
        return {
        	user: [],
            addToCurrentGroup: '',
            shortlist: [],
            netwoerkid: ''
        };
    },
    componentWillMount: function () {
        var networkid = $('#networkid').val();
        var id = $('#id').val();
        var source = '/api/users/'+id;
        console.log(source);
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                	user: result,
                    networkid: networkid
                });
            }
        }.bind(this));
    },
    handleAddUserToCurrentGroup: function(id) {
        var users = [{id: id}];
        this.setState({
            shortlist: users
        });
    },
    handleAddUsersToCurrentGroup: function(users) {
        console.log("Search:handleAddUsersToCurrentGroup");
        this.setState({
            shortlist: users
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
                        <div className="row profile-row" id="search-content">
                            <SearchContent user={this.state.user} networkid={this.state.networkid} handleAddUsersToCurrentGroup={this.handleAddUsersToCurrentGroup} />
                            <div className="col-lg-4">
                                <MyShortListPanel shortlist={this.state.shortlist} droppable={false} addToCurrentGroup={this.state.addToCurrentGroup} />
                                <NavigationPanel />
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
    <Search />,
    document.getElementById('content')
);