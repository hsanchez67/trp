var backgroundWhite = {
    backgroundColor: '#ffffff'
}
var NoHomeAddressPanel = React.createClass({
    displayName: 'NoHomeAddressPanel',
    render: function () {
        return (
            <div className="panel panel-danger">
                <div className="panel-heading">
                    <header className="panel-title">
                        <div className="text-center">
                            <i className="fa fa-exclamation-triangle"></i><strong> Missing Personal Information</strong>
                        </div>
                    </header>
                </div>
                <div id="profile-panel-body" className="panel-body text-left" style={backgroundWhite}>
                    <strong>Important!</strong> Personal information is required to calculate your Latch Financial Stability score. Completing this information will also improve your Latch System Usage score!
                    To enter your personal information please go to <a className="btn btn-link" href="/settings#personal">Settings</a>
                </div>
            </div>
        );
    }
});
