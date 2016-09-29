var  NotFoundPage = React.createClass ({displayName: 'NotFoundPage',
    render: function() {
        return (
            <div>
                <h1>Something has gone wrong </h1>
                <p>Sorry for the inconvenience, please try again later!</p>
            </div>
        );
    }
});

ReactDOM.render(<NotFoundPage />, document.getElementById('content'));
