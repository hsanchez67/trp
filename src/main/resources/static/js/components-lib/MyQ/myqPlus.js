'use strict';

var MyQPlus = React.createClass({
    displayName: 'MyQPlus',
    getInitialState: function getInitialState() {
        return {
            user: [],
            tasks: 0,
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function componentWillMount() {
        var id = $('#id').val();
        var source = '/api/users/' + id;
        $.get(source, (function (result) {
            this.setState({
                user: result
            });
        }).bind(this));
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
            React.createElement(HeaderResponsiveIn, { user: this.state.user, tasks: this.state.tasks, handleAddUserToCurrentGroup: this.handleAddUserToCurrentGroup }),
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
                        { className: 'row', id: 'introduction-content' },
                        React.createElement(MyQPlusContent, { user: this.state.user, updateCount: this.updateCount }),
                        React.createElement(
                            'div',
                            { className: 'col-lg-4' },
                            React.createElement(MyShortListPanel, { droppable: true, addToCurrentGroup: this.state.addToCurrentGroup }),
                            React.createElement(NavigationPanel, null)
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

ReactDOM.render(React.createElement(MyQPlus, null), document.getElementById('content'));