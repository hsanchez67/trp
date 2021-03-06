'use strict';

var LinkedInSettings = React.createClass({
    displayName: 'LinkedInSettings',
    getInitialState: function getInitialState() {
        return {
            user: [],
            accessToken: '',
            expiresIn: ''
        };
    },
    componentWillMount: function componentWillMount() {
        this.prepareComponentState(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.prepareComponentState(nextProps);
    },
    prepareComponentState: function prepareComponentState(props) {
        if (!$.isEmptyObject(props.user)) {
            var data = {
                id: props.user.id
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log('LinkedInSettings:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getLinkedInToken",
                data: formData,
                success: (function (result) {
                    console.log(result.access_token);
                    this.setState({
                        accessToken: result.access_token,
                        expiresIn: this.getExpireDate(result.expires_in)
                    });
                }).bind(this),
                error: function error(request, status, _error) {
                    console.log(_error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('LinkedInSettings:prepareComponentState: No user');
        }
    },
    getExpireDate: function getExpireDate(seconds) {
        return moment().add(seconds, 'seconds').format('dddd, MMM Do, H:mm:ss A');
    },
    componentWillUnmount: function componentWillUnmount() {
        this.serverRequest.abort();
    },
    handleAuthorize: function handleAuthorize() {
        window.location.href = '/authorization/linkedin';
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'section',
                { className: 'panel' },
                React.createElement(
                    'div',
                    { className: 'panel-body panel-margin-top' },
                    React.createElement(
                        'form',
                        null,
                        React.createElement('input', { type: 'hidden', name: 'id', ref: 'id', value: this.props.user.id }),
                        React.createElement(
                            'div',
                            { className: 'form-horizontal' },
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { 'for': 'inputAccessToken', className: 'col-sm-2 control-label' },
                                    'Access Token'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-10' },
                                    React.createElement('input', { type: 'text', className: 'form-control input-medium', id: 'inputAccessToken', placeholder: 'Access Token', value: this.state.accessToken, disabled: 'true' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { 'for': 'inputExpiresIn', className: 'col-sm-2 control-label' },
                                    'Expires On'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-10' },
                                    React.createElement('input', { type: 'text', className: 'form-control input-medium', id: 'inputExpiresIn', placeholder: 'Expires In', value: this.state.expiresIn, disabled: 'true' })
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group pull-left margin-top-20' },
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'a',
                                    { onClick: this.handleAuthorize, className: 'btn btn-block btn-social btn-linkedin' },
                                    React.createElement('i', { className: 'fa fa-linkedin' }),
                                    'Authorize Access to LinkedIn'
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});