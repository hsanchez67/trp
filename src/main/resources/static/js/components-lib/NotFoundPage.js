'use strict';

var NotFoundPage = React.createClass({ displayName: 'NotFoundPage',
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Page Not Found'
      ),
      React.createElement(
        'p',
        null,
        'Sorry, but the page you were trying to view does not exist.'
      )
    );
  }
});

ReactDOM.render(React.createElement(NotFoundPage, null), document.getElementById('content'));