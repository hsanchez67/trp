'use strict';

var MyQ = React.createClass({
    displayName: 'MyQ',
    getInitialState: function getInitialState() {
        return {
            user: [],
            count: 0,
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function componentWillMount() {
        var id = $('#id').val();
        var source = '/api/users/' + id;
        console.log(source);
        $.get(source, (function (result) {
            console.log(result);
            if (!$.isEmptyObject(result)) {
                this.setState({
                    user: result
                });
            }
        }).bind(this));
    },
    updateMyQ: function updateMyQ(m) {
        console.log("Update MyQ " + m);
        this.setState({
            count: m
        });
    },
    updateCount: function updateCount() {
        var id = $('#id').val();
        var data = {
            id: id,
            status: "Pending"
        };
        $.ajax({
            type: "POST",
            url: "/getNumOfTasks",
            data: JSON.stringify(data, null, ' '),
            success: (function (result) {
                console.log(result);
                if (result != null) {
                    this.setState({
                        tasks: result.page.totalElements
                    });
                }
            }).bind(this),
            error: function error(_error) {
                if (_error.status == 401) {
                    window.location.href = '/login';
                }
                console.log(_error);
                return false;
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    handleAddUserToCurrentGroup: function handleAddUserToCurrentGroup(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(HeaderResponsiveIn, { user: this.state.user, myq: true, updateMyQ: this.updateMyQ, tasks: this.state.tasks, handleAddUserToCurrentGroup: this.handleAddUserToCurrentGroup }),
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
                        { className: 'row profile-row', id: 'inbox-content' },
                        React.createElement(MyQContent, { user: this.state.user, count: this.state.count, updateCount: this.updateCount }),
                        React.createElement(
                            'div',
                            { className: 'col-lg-4' },
                            React.createElement(MyShortListPanel, { droppable: false, addToCurrentGroup: this.state.addToCurrentGroup }),
                            React.createElement(NavigationPanel, null)
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

ReactDOM.render(React.createElement(MyQ, null), document.getElementById('content'));