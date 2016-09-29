var pStyle = {
    color: '#fff',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '300',
    fontSize: '20px',
    letterSpacing: '1px'
};

var divStyle = {
    width: '300px',
    margin: '0 auto'
};

var tableWidth = {
    width: '300px'
};

var tdWidth = {
    width: '100px'
};

var aDims = {
    width: '61px',
    height: '61px'
};

var ContentForm = React.createClass({
    displayName: 'ContentForm',
    render: function () {
        return (
            <div>
                <Header />
                <div className="mainPage">
                    <div className="mainContentDark">
                        <div className="splash-image">
                            <img src="/images/latch-2-coming-soon.png" alt="Latch 2.0 Coming Soon!" />
                         </div>
                        <p style={pStyle}>
                            Follow our progress!
                        </p>
                        <div style={divStyle}>
                            <table style={tableWidth}>
                                <tbody>
                                <tr>
                                    <td style={tdWidth}><a style={aDims} href="https://www.facebook.com/LatchInc"><img src="/images/icon-facebook.png" style={aDims} /></a></td>
                                    <td style={tdWidth}><a href="https://twitter.com/latchinc"><img src="/images/icon-twitter.png" style={aDims} /></a></td>
                                    <td style={tdWidth}><a href="mailto:info@thereferralportal.com"><img src="/images/icon-email.png" style={aDims} /></a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    },
});

ReactDOM.render(
    <ContentForm />,
    document.getElementById('content')
);


