var MyShortListContent = React.createClass({
    displayName: 'MyShortListContent',
    render: function () {
        return (
            <div className="row" id="home-content">
                <div className="content">
                    <div className="row state-overview">
                        <div className="page-header text-center">
                            <h3>Your Short List <sup>&#8482;</sup></h3>
                        </div>
                        <div id="shortList-content">

                        </div>
                    </div>
                </div>
            </div>
        );
    },
});