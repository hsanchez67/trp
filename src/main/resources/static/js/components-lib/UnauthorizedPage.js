'use strict';

var NotFoundPage = React.createClass({ displayName: 'NotFoundPage',
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Unauthorized Access'
            ),
            React.createElement(
                'p',
                null,
                'Sorry, you have attempted to access a page you are not authorized to view.'
            )
        );
    }
});

ReactDOM.render(React.createElement(NotFoundPage, null), document.getElementById('content'));