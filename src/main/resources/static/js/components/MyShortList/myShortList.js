var MyShortList = React.createClass({
    displayName: 'MyShortList',
    getInitialState: function() {
        return {
        	user: [],
            username: '',
            avatar: '',
            source: '',
            score: 0,
            addToCurrentGroup: ''
        };
    },
    componentDidMount: function () {
        var id = $('#id').val();
        var source = '/api/users/'+id;
        console.log(source);
        $.get(source, function(result) {
            console.log("User data: ");
            console.log(result);
            if (!$.isEmptyObject(result)) {
                var data = result;
                this.setState({
                    user: data
                });
            }
        }.bind(this));
    },
    handleAddUserToCurrentGroup: function(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    resetAddToCurrentGroup: function() {
        this.setState({
            addToCurrentGroup: ''
        });
    },
    render: function () {
        return (

            <div>
                <HeaderResponsiveIn user={this.state.user}  handleAddUserToCurrentGroup={this.handleAddUserToCurrentGroup} label={'Add To List'} />
                <Banner />
                <div className="container">
                    <div id="main">
                        <ol className="breadcrumb">
                            <div className="row">
                                &nbsp;
                            </div>
                        </ol>
                        <MyShortListContent user={this.state.user}  addToCurrentGroup={this.state.addToCurrentGroup} resetAddToCurrentGroup={this.resetAddToCurrentGroup} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    },
});

ReactDOM.render(
    <MyShortList />,
    document.getElementById('content')
);