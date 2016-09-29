var Header = React.createClass({displayName: 'Header',
    render: function() {
        return (
            <div className="Header">
                <div className="Header-container">
                    <a className="Header-brand" href="/home" onClick="">
                        <Logo />
                    </a>
                    <Navigation />
                </div>
            </div>
        );
    }

});