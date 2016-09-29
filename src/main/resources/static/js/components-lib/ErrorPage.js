'use strict';

var NotFoundPage = React.createClass({ displayName: 'NotFoundPage',
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Something has gone wrong '
            ),
            React.createElement(
                'p',
                null,
                'Sorry for the inconvenience, please try again later!'
            )
        );
    }
});

ReactDOM.render(React.createElement(NotFoundPage, null), document.getElementById('content'));