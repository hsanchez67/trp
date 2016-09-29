var mainDiv = {
    padding: '0px',
    margin: '0px'
};

var displayNone = {
    display: 'none'
};

var tableMain = {
    width: '550px',
    padding: '10px',
    textAlign: 'center'
};

var OauthForm = React.createClass({
    displayName: 'OauthForm',
    render: function () {
        return (
        <div style={mainDiv}>
            <div className="apimissing" style={displayNone}>
                <h1 className="apimissingtitle">Missing <span className="titleservice"></span> APP configuration</h1>
                <table style={tableMain} className="marTop55">
                    <tbody>
                    <tr>
                        <td colSpan="2">
                            <div className="guide">API keys were not added for <span className="titleservice"></span>, to make this service work please create an APP at <span className="titleservice"></span> by going here <a href="" id="linkapikey" target="_blank">here</a>. Need help in configuring? please view <a href="" id="linkscreenshot" target="_blank">screenshots</a> on how to create API key. </div>
                        </td>
                    </tr>
                    <tr className="apierror">
                        <td colSpan="2"><div className="apierrormsg">Please enter API key, API secret and callback url</div></td>
                    </tr>
                    <tr>
                        <td className="apitd">API key</td>
                        <td className="valuetd"><input type="text" id="apikey" /></td>
                    </tr>
                    <tr>
                        <td className="apitd">Secret key</td>
                        <td className="valuetd"><input type="text" id="secretkey" /></td>
                    </tr>
                    <tr>
                        <td className="apitd">Callback url</td>
                        <td className="valuetd"><input type="text" id="callbackurl" /></td>
                    </tr>
                    <tr>
                        <td className="apitd"></td>
                        <td><div className="addbtn">Add</div></td>
                    </tr>
                    <tr>
                        <td className="apitd"></td>
                        <td className="apimissingnote">Note: You can always change the configuration by <a href="//socialinviter.com/#!/account" target="_blank">login to your account</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="loading" id="loadingStatus">
                <span className="lbl" id="loadingtext">Authenticating</span>
                <span><img src="//socialinviter.com/assets/img/icons/processing.gif" /></span>
            </div>
        </div>
        );
    },
});

ReactDOM.render(
    <OauthForm />,
    document.getElementById('content')
);