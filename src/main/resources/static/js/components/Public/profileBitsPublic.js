var ProfileBits = React.createClass({
    displayName: 'ProfileBits',
    render: function () {
        var address1 = '';
        var city = '';
        var state = '';
        var mapIt = '';
        if (!$.isEmptyObject(this.props.profile)) {
            address1 = this.props.profile.businessAddress1;
            if (address1 != null) {
                address1 = address1.replace(/\s/g, "+");
            }
            city = this.props.profile.businessCity;
            if (city != null) {
                city = city.replace(/\s/g, "+");
            }
            state = this.props.profile.businessState;
            if (state != null) {
                state = state.replace(/\s/g, "+");
            }
        }
        var mapSource = "https://maps.google.com/?key=AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY&output=embed&f=q&source=s_q&hl=en&geocode=&q="+address1+",+"+city+",+"+state+"+"+this.props.profile.businessZip;
        if (address1 != null && city != null && state != null) {
            mapIt = <li><i className="fa-li fa fa-map-marker fa-fw"></i> <a className="various fancybox.iframe map-it" href={mapSource}>map it</a></li>;
        }
        var addressLineTwo = "";
        if (city != null && state!= null) {
            addressLineTwo = <li><i className="fa-li fa fa-fw"></i><span className="address1"> {this.props.profile.businessCity} {this.props.profile.businessState},&nbsp;{this.props.profile.businessZip}</span></li>;
        }
        return (
            <div className="profile-bits">
                <div className="clear text-left">
                    <ul className="fa-ul">
                        <li><i className="fa-li fa fa-black-tie fa-fw"></i> {this.props.profile.profession}&nbsp;</li>
                        <li><i className="fa-li fa fa-suitcase fa-fw"></i> {this.props.profile.businessName}&nbsp;</li>
                        <li><i className="fa-li fa fa-envelope fa-fw"></i> {this.props.profile.email}&nbsp;</li>
                        <li><i className="fa-li fa fa-mobile fa-fw"></i> {this.props.profile.mobilePhone}&nbsp;</li>
                        <li><i className="fa-li fa fa-phone fa-fw"></i> {this.props.profile.businessPhone}&nbsp;</li>
                        <li><i className="fa-li fa fa-fax fa-fw"></i> {this.props.profile.faxNumber}&nbsp;</li>
                        <li><i className="fa-li fa fa-map-pin fa-fw"></i>{this.props.profile.businessAddress1} {this.props.profile.businessAddress2}</li>
                        {addressLineTwo}
                        {mapIt}
                    </ul>
                </div>
            </div>
        );
    }
});