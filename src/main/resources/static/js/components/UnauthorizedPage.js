var  NotFoundPage = React.createClass ({displayName: 'NotFoundPage',
    render: function() {
        return (
            <div>
                <h1>Unauthorized Access</h1>
                <p>Sorry, you have attempted to access a page you are not authorized to view.</p>
            </div>
        );
    }
});

ReactDOM.render(<NotFoundPage />, document.getElementById('content'));
