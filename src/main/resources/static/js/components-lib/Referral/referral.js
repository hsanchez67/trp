'use strict';

var Referral = React.createClass({
    displayName: 'Referral',
    getInitialState: function getInitialState() {
        return {
            profile: [],
            user: [],
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function componentWillMount() {
        var profileid = $('#profileid').val();
        var source = '/api/users/' + profileid;
        if (profileid != null && profileid != '') {
            $.get(source, (function (result) {
                if (result != null) {
                    this.setState({
                        profile: result
                    });
                }
            }).bind(this));
        }
        var id = $('#id').val();
        var source2 = '/api/users/' + id;
        $.get(source2, (function (result) {
            this.setState({
                user: result
            });
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
                        { className: 'row', id: 'introduction-content' },
                        React.createElement(ReferralContent, { profile: this.state.profile, user: this.state.user }),
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

ReactDOM.render(React.createElement(Referral, null), document.getElementById('content'));