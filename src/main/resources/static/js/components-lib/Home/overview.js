'use strict';

var HomeOverview = React.createClass({
    displayName: 'HomeOverview',
    gotoSearch: function gotoSearch() {
        window.location.href = '/search';
    },
    gotoIntroduction: function gotoIntroduction() {
        window.location.href = '/introduction';
    },
    gotoInbox: function gotoInbox() {
        window.location.href = '/inbox';
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'col-lg-8' },
            React.createElement(
                'div',
                { className: 'row state-overview' },
                React.createElement(
                    'div',
                    { className: 'col-lg-6 col-sm-6' },
                    React.createElement(
                        'section',
                        { className: 'panel panel-main-action light-green' },
                        React.createElement(
                            'div',
                            { id: 'panel', className: 'symbol green pointer', onCick: this.gotoIntroduction },
                            React.createElement('i', { className: 'fa fa-share-alt' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'value' },
                            React.createElement(
                                'h1',
                                { className: 'count' },
                                this.props.allActivity
                            ),
                            React.createElement(
                                'p',
                                { className: 'under-count-font' },
                                'All Activity'
                            ),
                            React.createElement(
                                'div',
                                { className: 'text-center' },
                                React.createElement(
                                    'a',
                                    { className: 'btn btn-link', href: '/introduction' },
                                    'Introduce'
                                ),
                                '  ',
                                React.createElement(
                                    'a',
                                    { className: 'btn btn-link', href: '/referral' },
                                    'Refer'
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-lg-6 col-sm-6' },
                    React.createElement(
                        'section',
                        { className: 'panel  panel-main-action light-blue' },
                        React.createElement(
                            'div',
                            { className: 'symbol blue pointer', onClick: this.gotoSearch },
                            React.createElement('i', { className: 'fa fa-search' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'value' },
                            React.createElement(
                                'h1',
                                { className: ' count2' },
                                this.props.yourNetwork
                            ),
                            React.createElement(
                                'p',
                                { className: 'under-count-font' },
                                'Professionals in Your Network'
                            ),
                            React.createElement(
                                'div',
                                { className: 'text-center' },
                                React.createElement(
                                    'a',
                                    { className: 'btn btn-link', href: '/search' },
                                    'Search for a Professional'
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-lg-6 col-sm-6' },
                    React.createElement(
                        'section',
                        { className: 'panel  panel-main-action light-yellow' },
                        React.createElement(
                            'div',
                            { className: 'symbol yellow' },
                            React.createElement('i', { className: 'fa fa-thumbs-up' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'value' },
                            React.createElement(
                                'h1',
                                { className: ' count3' },
                                this.props.avgRating
                            ),
                            React.createElement(
                                'p',
                                { className: 'under-count-font' },
                                'Average Review Rating'
                            ),
                            React.createElement(
                                'div',
                                { className: 'text-center' },
                                React.createElement(
                                    'a',
                                    { className: 'btn btn-link', href: '/reviews' },
                                    'Reviews'
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-lg-6 col-sm-6' },
                    React.createElement(
                        'section',
                        { className: 'panel  panel-main-action light-red' },
                        React.createElement(
                            'div',
                            { className: 'symbol red pointer', onClic: this.gotoInbox },
                            React.createElement('i', { className: 'fa fa-envelope' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'value' },
                            React.createElement(
                                'h1',
                                { className: ' count4' },
                                this.props.newMessages
                            ),
                            React.createElement(
                                'p',
                                { className: 'under-count-font' },
                                'New Messages'
                            ),
                            React.createElement(
                                'div',
                                { className: 'text-center' },
                                React.createElement(
                                    'a',
                                    { className: 'btn btn-link', href: '/inbox' },
                                    'Inbox'
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'latch-score-graph', className: 'col-lg-6 col-sm-6' },
                    React.createElement(
                        'section',
                        { className: 'panel panel-chart' },
                        React.createElement(
                            'div',
                            { className: 'panel-heading' },
                            React.createElement(
                                'header',
                                { className: 'panel-title' },
                                React.createElement(
                                    'div',
                                    { className: 'text-center' },
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Your Latch Score ',
                                        React.createElement(
                                            'span',
                                            { className: 'color-red' },
                                            ' - sample data'
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'panel-body text-center' },
                            React.createElement('canvas', { id: 'line-sample', height: '300' })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-lg-6 col-sm-6' },
                    React.createElement(
                        'section',
                        { className: 'panel panel-chart' },
                        React.createElement(
                            'div',
                            { className: 'panel-heading' },
                            React.createElement(
                                'header',
                                { className: 'panel-title' },
                                React.createElement(
                                    'div',
                                    { className: 'text-center' },
                                    React.createElement(
                                        'strong',
                                        null,
                                        'NPS Score'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'panel-body text-center' },
                            React.createElement(NPSChart, { nps: this.props.nps })
                        )
                    )
                )
            )
        );
    }
});