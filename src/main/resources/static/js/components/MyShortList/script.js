var Popover = ReactBootstrap.Popover;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Button = ReactBootstrap.Button;

var App = React.createClass({

    getInitialState: function() {
        return {
            value: false
        };
    },

    render: function() {
        var children = (
            <Popover title="Something">
               Test
            </Popover>
        );

        return (
            <OverlayTrigger trigger="click" rootClose overlay={children}>
                <Button>Options</Button>
            </OverlayTrigger>
        );
    },

});
