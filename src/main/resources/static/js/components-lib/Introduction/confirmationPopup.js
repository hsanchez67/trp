'use strict';

var ConfirmationModal = React.createClass({
    displayName: 'ConfirmationModal',

    componentDidMount: function componentDidMount() {
        $(this.getDOMNode()).modal('show');
        $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    },
    componentWillUnmount: function componentWillUnmount() {
        $(this.getDOMNode()).modal('hide');
    },
    render: function render() {
        return React.createElement(
            'div',
            { id: 'avatarProfile', className: 'modal fade' },
            React.createElement(
                'div',
                { className: 'modal-dialog' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header text-center' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close', onClick: this.props.handleHideModal },
                            React.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '×'
                            )
                        ),
                        React.createElement(
                            'h4',
                            { className: 'modal-title' },
                            'Your message has been sent.'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        React.createElement(
                            'div',
                            { className: 'text-center' },
                            React.createElement(ConfirmationPic, { username: this.refs.avatar1.value }),
                            React.createElement(
                                'span',
                                { id: 'arrow', 'aria-hidden': 'true' },
                                '→'
                            ),
                            React.createElement(ConfirmationPic, { username: this.refs.avatar1.value })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal', onClick: this.props.handleHideModal },
                            'Close'
                        )
                    )
                )
            )
        );
    },
    propTypes: {
        handleHideModal: React.PropTypes.func.isRequired
    }
});

var SendIntroductionButtons = React.createClass({
    displayName: 'SendIntroductionButtons',

    getInitialState: function getInitialState() {
        return { view: { showModal: false } };
    },
    handleHideModal: function handleHideModal() {
        this.setState({ view: { showModal: false } });
    },
    handleShowModal: function handleShowModal() {
        this.setState({ view: { showModal: true } });
    },
    ResetIntroForm: function ResetIntroForm() {
        $("#selectContact1").select2("val", "");
        $("#selectContact2").select2("val", "");
        $('#avatar1').attr('src', '../images/120px-blank.png');
        $('#avatar2').attr('src', '../images/120px-blank.png');
        $('#includeMessage').val("");
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                { type: 'submit', onClick: this.handleShowModal, className: 'btn btn-primary btn-space' },
                'Send Introduction'
            ),
            React.createElement(
                'button',
                { type: 'button', onClick: this.ResetIntroForm, className: 'btn btn-default btn-space' },
                'Reset'
            ),
            this.state.view.showModal ? React.createElement(ConfirmationModal, { username: this.props.username, username2: this.props.username2, handleHideModal: this.handleHideModal }) : null
        );
    }
});

var ConfirmationPic = React.createClass({
    displayName: 'ConfirmationPic',

    render: function render() {
        return React.createElement('img', { src: '/api/remoteFiles/view/' + this.props.username, className: 'img-circle profile-picture' });
    }
});