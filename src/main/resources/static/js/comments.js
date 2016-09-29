var CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <div>{this.state.data}</div>
            </div>
        );
    }
});


var renderClient = function (data) {
    React.render(
        <CommentBox data={data}  />,
        document.getElementById("content2")
    );
};