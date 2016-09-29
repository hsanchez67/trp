'use strict';

var GooglePlusSettings = React.createClass({
    displayName: 'GooglePlusSettings',
    getInitialState: function getInitialState() {
        return {
            googlePlusID: ''
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
            console.log('GooglePlusSettings:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getGooglePlusSettings",
                data: formData,
                success: (function (result) {
                    console.log(result);
                    this.setState({
                        googlePlusID: result.googlePlusUserId
                    });
                }).bind(this),
                error: function error(request, status, _error) {
                    console.log(_error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('GooglePlusSettings:prepareComponentState: No user');
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
            url: '/saveGooglePlusId',
            async: true,
            data: formData,
            success: (function (result) {
                console.log("Saved successfully!" + result);
                this.props.handleMessageResult(true);
            }).bind(this),
            error: function error(request, status, _error2) {
                console.log("Error saving data: " + _error2.toString());
                this.props.handleMessageResult(false);
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    getFormData: function getFormData() {
        return {
            id: '',
            googlePlusId: this.refs.googlePlusID.getDOMNode().value
        };
    },
    onChange: function onChange(e) {
        this.setState({ googlePlusID: e.target.value });
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
                                    { 'for': 'googlePlusID', className: 'col-sm-2 control-label' },
                                    'Google+ ID'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-10' },
                                    React.createElement('input', { type: 'text', ref: 'googlePlusID', className: 'form-control', id: 'googlePlusID', value: this.state.googlePlusID, onChange: this.onChange, placeholder: 'Google Plus ID' })
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