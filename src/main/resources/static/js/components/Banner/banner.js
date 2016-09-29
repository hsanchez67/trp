var Banner  = React.createClass({displayName: 'Banner',
    render: function() {
        return (
            <div id="header">
                <div className="overlay">
                    <HeaderMenu />
                </div>
            </div>
        );
    }

});