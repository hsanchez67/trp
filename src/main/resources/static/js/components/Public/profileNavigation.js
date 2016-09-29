var  ProfileNavigation = React.createClass({
    render: function() {
        return (
            <div id="navigation" className="Header-nav" role="navigation">
                <a className="Navigation-link" href="/#team" onClick="">About</a>
                <a className="Navigation-link" href="/#footer" onClick="">Contact</a>
                <span className="Navigation-spacer"> | </span>
                <a className="Navigation-link" href="/login">Log in</a>
                <span className="Navigation-spacer">or</span>
                <a className="Navigation-link Navigation-link--highlight" href="/register" onClick="">Sign up</a>

            </div>
        );
    }

});