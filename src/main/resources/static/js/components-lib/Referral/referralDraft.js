'use strict';

var Referral = React.createClass({
    displayName: 'Referral',
    getInitialState: function getInitialState() {
        return {
            user: [],
            communication: [],
            toUser: [],
            subjectUser: [],
            profession: '',
            addToCurrentGroup: ''
        };
    },
    componentWillMount: function componentWillMount() {
        var id = $('#id').val();
        var source2 = '/api/users/' + id;
        $.get(source2, (function (result) {
            this.setState({
                user: result
            });
        }).bind(this));
        var commId = $('#commId').val();
        if (commId != null && commId != '') {
            var data = {
                commId: commId,
                readOnly: false
            };
            data = JSON.stringify(data, null, ' ');
            $.ajax({
                type: "POST",
                url: "/getPendingMessageById",
                data: data,
                success: (function (result) {
                    this.setState({
                        communication: result.communication,
                        toUser: result.toUser,
                        subjectUser: result.subjectUser,
                        profession: result.communication.subjectUserProfession
                    });
                }).bind(this),
                error: function error(_error) {
                    console.log(_error);
                    return false;
                },
                complete: function complete(e, xhr, settings) {
                    if (e.status === 401) {
                        window.location.href = "/myq";
                    }
                },
                dataType: "json",
                contentType: "application/json"
            });
        }
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
                        React.createElement(ReferralContent, { subjectUser: this.state.subjectUser, profession: this.state.profession, user: this.state.user, communication: this.state.communication, toUser: this.state.toUser }),
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