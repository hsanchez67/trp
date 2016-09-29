var Footer = React.createClass ({displayName: 'Footer',

    render: function () {
        return (
            <div className="Footer">
                <div className="Footer-container">
                    <span className="Footer-text">© Latch</span>
                    <span className="Footer-spacer">·</span>
                    <a className="Footer-link" href="/">Home</a>
                    <span className="Footer-spacer">·</span>
                    <a className="Footer-link" href="/privacy">Privacy</a>
                    <span className="Footer-spacer"> | </span>
                    <span ref="viewport" className="Footer-viewport Footer-text Footer-text--muted">Viewport: <WindowDimensions /></span>
                </div>
            </div>
        );
    }
});

var WindowDimensions = React.createClass({
    render: function() {
        return <span>{this.state.width} x {this.state.height}</span>;
    },
    updateDimensions: function() {
        this.setState({width: $(window).width(), height: $(window).height()});
    },
    componentWillMount: function() {
        this.updateDimensions();
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.updateDimensions);
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.updateDimensions);
    }
});