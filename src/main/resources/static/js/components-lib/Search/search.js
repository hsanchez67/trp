'use strict';

var Search = React.createClass({
    displayName: 'Search',
    getInitialState: function getInitialState() {
        return {
            user: [],
            addToCurrentGroup: '',
            shortlist: [],
            netwoerkid: ''
        };
    },
    componentWillMount: function componentWillMount() {
        var networkid = $('#networkid').val();
        var id = $('#id').val();
        var source = '/api/users/' + id;
        console.log(source);
        $.get(source, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    user: result,
                    networkid: networkid
                });
            }
        }).bind(this));
    },
    handleAddUserToCurrentGroup: function handleAddUserToCurrentGroup(id) {
        var users = [{ id: id }];
        this.setState({
            shortlist: users
        });
    },
    handleAddUsersToCurrentGroup: function handleAddUsersToCurrentGroup(users) {
        console.log("Search:handleAddUsersToCurrentGroup");
        this.setState({
            shortlist: users
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(HeaderResponsiveIn, { user: this.state.user, handleAddUserToCurrentGroup: this.handleAddUserToCurrentGroup }),
            React.createElement(Banner, null),
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { id: 'main' },
                    React.createElement(
                        'ol',
                        { className: 'breadcrumb' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            ' '
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row profile-row', id: 'search-content' },
                        React.createElement(SearchContent, { user: this.state.user, networkid: this.state.networkid, handleAddUsersToCurrentGroup: this.handleAddUsersToCurrentGroup }),
                        React.createElement(
                            'div',
                            { className: 'col-lg-4' },
                            React.createElement(MyShortListPanel, { shortlist: this.state.shortlist, droppable: false, addToCurrentGroup: this.state.addToCurrentGroup }),
                            React.createElement(NavigationPanel, null)
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

ReactDOM.render(React.createElement(Search, null), document.getElementById('content'));