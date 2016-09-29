'use strict';

var ReviewStars = React.createClass({
    displayName: 'ReviewStars',

    render: function render() {
        var starPercentage = {
            width: this.props.rating * 100 / 5 + '%'
        };
        var starFontSize = {
            fontSize: this.props.fontSize,
            width: '100%'
        };
        return React.createElement(
            'div',
            { className: 'latch-star-ratings-css', style: starFontSize },
            React.createElement(
                'div',
                { className: 'latch-star-ratings-css-top', style: starPercentage },
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                )
            ),
            React.createElement(
                'div',
                { className: 'latch-star-ratings-css-bottom' },
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                ),
                React.createElement(
                    'span',
                    null,
                    '★'
                )
            )
        );
    }
});