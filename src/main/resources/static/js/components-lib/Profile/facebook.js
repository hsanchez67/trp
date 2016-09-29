'use strict';

var Facebook = React.createClass({
    displayName: 'Facebook',

    getInitialState: function getInitialState() {
        return {
            pageUrl: ''
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log('Facebook:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - " + this.props.profile.id);
        if (nextProps.profile.id != this.props.profile.id) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function prepareComponentState(props) {
        if (!$.isEmptyObject(props.profile)) {
            var data = {
                id: props.profile.id
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log('Facebook:prepareComponentState:formData');
            console.log(formData);

            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getFacebookSettings",
                data: formData,
                success: (function (result) {
                    console.log(result);
                    this.setState({
                        pageUrl: result.facebookPageUrl
                    });
                }).bind(this),
                error: function error(request, status, _error) {
                    console.log(_error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('Facebook:prepareComponentState: No user');
        }
    },
    render: function render() {
        var pageUrl = this.state.pageUrl;
        var facebookInOrOut;
        if (pageUrl != '') {
            facebookInOrOut = React.createElement(
                'div',
                { className: 'panel-body panel-light img-rounded' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement('div', { className: 'fb-page', 'data-href': pageUrl, 'data-tabs': 'timeline,events,messages', 'data-width': '500', 'data-height': '1800', 'data-small-header': 'false', 'data-adapt-container-width': 'true', 'data-hide-cover': 'false', 'data-show-facepile': 'true' })
                    )
                )
            );
        } else {
            facebookInOrOut = React.createElement(
                'div',
                { className: 'panel-body panel-light img-rounded' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement('div', { className: 'col-md-12' })
                )
            );
        }
        return React.createElement(
            'div',
            null,
            facebookInOrOut
        );
    }
});