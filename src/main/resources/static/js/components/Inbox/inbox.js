var Inbox = React.createClass({
    displayName: 'Inbox',
    getInitialState: function() {
        return {
        	user: [],
            count: 0,
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function() {
        var id = $('#id').val();
        var source = '/api/users/'+id;
        console.log(source);
        $.get(source, function(result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    user: result
                });
            }
        }.bind(this));
    },
    updateInbox: function(m) {
        console.log("Update Inbox " + m);
        this.setState({
            count: m
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
                <HeaderResponsiveIn user={this.state.user} inbox={true} updateInbox={this.updateInbox} handleAddUserToCurrentGroup={this.handleAddUserToCurrentGroup} />
                <Banner />
                <div className="container">
                    <div id="main">
                        <ol className="breadcrumb">
                            <div className="row">
                                &nbsp;
                            </div>
                        </ol>
                        <div className="row profile-row" id="inbox-content">
                            <InboxContent  user={this.state.user} count={this.state.count}  />
                            <div className="col-lg-4">
                                <MyShortListPanel droppable={false} />
                                <NavigationPanel addToCurrentGroup={this.state.addToCurrentGroup} />
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
    <Inbox />,
    document.getElementById('content')
);