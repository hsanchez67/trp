'use strict';

var MyShortList = React.createClass({
    displayName: 'MyShortList',
    getInitialState: function getInitialState() {
        return {
            user: [],
            username: '',
            avatar: '',
            source: '',
            score: 0,
            addToCurrentGroup: ''
        };
    },
    componentDidMount: function componentDidMount() {
        var id = $('#id').val();
        var source = '/api/users/' + id;
        console.log(source);
        $.get(source, (function (result) {
            console.log("User data: ");
            console.log(result);
            if (!$.isEmptyObject(result)) {
                var data = result;
                this.setState({
                    user: data
                });
            }
        }).bind(this));
    },
    handleAddUserToCurrentGroup: function handleAddUserToCurrentGroup(id) {
        this.setState({
            addToCurrentGroup: id
        });
    },
    resetAddToCurrentGroup: function resetAddToCurrentGroup() {
        this.setState({
            addToCurrentGroup: ''
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(HeaderResponsiveIn, { user: this.state.user, handleAddUserToCurrentGroup: this.handleAddUserToCurrentGroup, label: 'Add To List' }),
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
                    React.createElement(MyShortListContent, { user: this.state.user, addToCurrentGroup: this.state.addToCurrentGroup, resetAddToCurrentGroup: this.resetAddToCurrentGroup })
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

ReactDOM.render(React.createElement(MyShortList, null), document.getElementById('content'));