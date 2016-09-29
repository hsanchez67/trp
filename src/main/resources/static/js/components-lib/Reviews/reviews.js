'use strict';

var Reviews = React.createClass({
    displayName: 'Reviews',
    getInitialState: function getInitialState() {
        return {
            user: [],
            count: 0
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
    updateInbox: function updateInbox(m) {
        console.log("Update Inbox " + m);
        this.setState({
            count: m
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(HeaderResponsiveIn, { user: this.state.user }),
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
                        React.createElement(ReviewsContent, { user: this.state.user }),
                        React.createElement(
                            'div',
                            { className: 'col-lg-4' },
                            React.createElement(MyShortListPanel, { droppable: false }),
                            React.createElement(NavigationPanel, null)
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

ReactDOM.render(React.createElement(Reviews, null), document.getElementById('content'));