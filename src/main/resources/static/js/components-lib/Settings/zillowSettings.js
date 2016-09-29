'use strict';

var ZillowSettings = React.createClass({
    displayName: 'ZillowSettings',
    getInitialState: function getInitialState() {
        return {
            screenName: ''
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
            console.log('ZillowSettings:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getZillowScreenName",
                data: formData,
                success: (function (result) {
                    console.log(result);
                    this.setState({
                        screenName: result.screenName
                    });
                }).bind(this),
                error: function error(request, status, _error) {
                    console.log(_error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('ZillowSettings:prepareComponentState: No user');
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
            url: '/saveZillowScreenName',
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
            zillowScreenName: this.refs.inputScreenName.getDOMNode().value
        };
    },
    onChange: function onChange(e) {
        this.setState({ screenName: e.target.value });
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
                                    { 'for': 'inputScreenName', className: 'col-sm-2 control-label' },
                                    'Screen Name'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-10' },
                                    React.createElement('input', { type: 'text', ref: 'inputScreenName', className: 'form-control', id: 'inputScreenName', value: this.state.screenName, onChange: this.onChange, placeholder: 'Screen Name' })
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