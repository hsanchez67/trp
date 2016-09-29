var  NotFoundPage = React.createClass ({displayName: 'NotFoundPage',
  render: function() {
    return (
        <div>
          <h1>Page Not Found</h1>
          <p>Sorry, but the page you were trying to view does not exist.</p>
        </div>
    );
  }
});

ReactDOM.render(<NotFoundPage />, document.getElementById('content'));
