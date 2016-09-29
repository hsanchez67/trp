'use strict';

var FacebookSettings = React.createClass({
    displayName: 'FacebookSettings',
    getInitialState: function getInitialState() {
        return {
            user: [],
            url: '',
            appId: ''
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
            console.log('FacebookSettings:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getFacebookSettings",
                data: formData,
                success: (function (result) {
                    console.log(result.access_token);
                    this.setState({
                        url: result.facebookPageUrl,
                        appId: result.facebookAppId
                    });
                }).bind(this),
                error: function error(request, status, _error) {
                    console.log(_error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('FacebookSettings:prepareComponentState: No user');
        }
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var id = $('#id').val();
        var data = this.getFormData();
        data.id = id;
        var formData = JSON.stringify(data, null, ' ');
        console.log(formData);
        $.ajax({
            type: "POST",
            url: '/saveFacebookSettings',
            async: true,
            data: formData,
            success: function success(result) {
                console.log("Saved successfully!" + result);
            },
            error: function error(request, status, _error2) {
                console.log("Error saving data: " + _error2.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    getFormData: function getFormData() {
        return {
            id: '',
            facebookPageUrl: this.refs.pageUrl.getDOMNode().value,
            facebookAppId: this.reffs.appId.getDOMNode().value
        };
    },
    onChangeUrl: function onChangeUrl(e) {
        this.setState({
            url: e.target.value
        });
    },
    onChangeAppId: function onChangeAppId(e) {
        this.setState({
            appId: e.target.value
        });
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
                        { onSubmit: this.handleSubmit },
                        React.createElement('input', { type: 'hidden', name: 'id', ref: 'id', value: this.props.user.id }),
                        React.createElement(
                            'div',
                            { className: 'form-horizontal' },
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { 'for': 'pageUrl', className: 'col-sm-2 control-label' },
                                    'Page Url'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-10' },
                                    React.createElement('input', { type: 'text', className: 'form-control input-medium', id: 'pageUrl', onChange: this.onChangeUrl, placeholder: 'Page Url', value: this.state.url })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { 'for': 'appId', className: 'col-sm-2 control-label' },
                                    'App Id'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-10' },
                                    React.createElement('input', { type: 'text', className: 'form-control input-medium', id: 'appId', placeholder: 'App Id', onChange: this.onChangeAppId, value: this.state.appId })
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group pull-left' },
                            React.createElement(
                                'div',
                                { className: 'col-sm-offset-2 col-sm-10' },
                                React.createElement(
                                    'button',
                                    { type: 'submit', className: 'btn btn-primary' },
                                    'Submit'
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});