var Avatar = React.createClass({
    render: function() {
        return (
            <ReactBootstrap.OverlayTrigger container={this} trigger="hover" placement="top" overlay={<ReactBootstrap.Popover id="popover" title="Popover top"><strong>Holy guacamole!</strong> Check this info.</ReactBootstrap.Popover>}>
                <a href="javascript: void(0)" className="task-thumb">
                    <ProfilePic username={this.props.username} />
                </a>
            </ReactBootstrap.OverlayTrigger>
        );
    }
});

var ProfilePic = React.createClass({
    render: function() {
        return (
            <img src={'/api/remoteFiles/view/' + this.props.avatar} className="img-circle" />
        );
    }
});

var ProfileLink = React.createClass({
    render: function() {
        return (
            <a href={'/' + this.props.username}>
                {this.props.username}
            </a>
        );
    }
});
