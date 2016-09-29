'use strict';

var LinkedIn = React.createClass({
    displayName: 'LinkedIn',

    getInitialState: function getInitialState() {
        return {
            proInfo: []
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log('LinkedIn:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - " + this.props.profile.id);
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
            console.log('LinkedIn:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getLinkedInProfile",
                data: formData,
                success: (function (result) {
                    if (result != null) {
                        console.log(result);
                        this.setState({
                            proInfo: result
                        });
                    }
                }).bind(this),
                error: function error(request, status, _error) {
                    console.log(_error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('LinkedIn:prepareComponentState: No user');
        }
    },
    render: function render() {
        var linkedInOrOut;
        if (!$.isEmptyObject(this.state.proInfo) && this.state.proInfo.publicProfileUrl != null) {
            linkedInOrOut = React.createElement(
                'div',
                { id: 'external-media-panel', className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { className: 'panel-body panel-dark img-rounded' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement(
                                'div',
                                { className: 'col-md-2' },
                                React.createElement('img', { className: 'img-rounded', src: this.state.proInfo.pictureUrl })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-6 profile-bits' },
                                React.createElement(
                                    'div',
                                    { className: 'linked-in-name' },
                                    ' ',
                                    this.state.proInfo.formattedName
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement('i', { className: 'fa fa-black-tie' }),
                                    ' ',
                                    this.state.proInfo.headline
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement('i', { className: 'fa fa-map-pin' }),
                                    ' ',
                                    this.state.proInfo.loc
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement('i', { className: 'fa fa-linkedin' }),
                                    ' ',
                                    React.createElement(
                                        'a',
                                        {
                                            href: this.state.proInfo.publicProfileUrl, target: '_blank' },
                                        'See full profile'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-3 linked-in-connections' },
                                React.createElement(
                                    'div',
                                    { className: 'full-circle' },
                                    this.state.proInfo.numConnections,
                                    React.createElement(
                                        'div',
                                        { className: 'inner-circle-label' },
                                        'Connections'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-1 media-logo' },
                                React.createElement('img', { src: '/images/In-2C-41px-TM.png' })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-12 linked-in-summary' },
                            React.createElement(
                                'div',
                                { className: 'pull-left' },
                                this.state.proInfo.summary
                            )
                        )
                    )
                )
            );
        } else {
            linkedInOrOut = React.createElement(
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
            linkedInOrOut
        );
    }
});