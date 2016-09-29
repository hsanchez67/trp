'use strict';

var ReferralRequest = React.createClass({
    displayName: 'ReferralRequest',
    getInitialState: function getInitialState() {
        return {
            user: [],
            subjectUserId: '',
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function componentWillMount() {
        var subjectUserId = $('#subjectUserId').val();
        this.setState({
            subjectUserId: subjectUserId
        });
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
    handleAddUserToCurrentGroup: function handleAddUserToCurrentGroup(id) {
        this.setState({
            addToCurrentGroup: id
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
                        { className: 'row profile-row' },
                        React.createElement(ReferralRequestContent, null),
                        React.createElement(
                            'div',
                            { className: 'col-lg-4' },
                            React.createElement(MyShortListPanel, { droppable: true, addToCurrentGroup: this.state.addToCurrentGroup }),
                            React.createElement(NavigationPanel, null),
                            React.createElement(SendingModal, null)
                        )
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
});

ReactDOM.render(React.createElement(ReferralRequest, null), document.getElementById('content'));