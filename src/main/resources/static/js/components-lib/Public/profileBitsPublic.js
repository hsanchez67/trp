'use strict';

var ProfileBits = React.createClass({
    displayName: 'ProfileBits',
    render: function render() {
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
        var mapSource = "https://maps.google.com/?key=AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY&output=embed&f=q&source=s_q&hl=en&geocode=&q=" + address1 + ",+" + city + ",+" + state + "+" + this.props.profile.businessZip;
        if (address1 != null && city != null && state != null) {
            mapIt = React.createElement(
                'li',
                null,
                React.createElement('i', { className: 'fa-li fa fa-map-marker fa-fw' }),
                ' ',
                React.createElement(
                    'a',
                    { className: 'various fancybox.iframe map-it', href: mapSource },
                    'map it'
                )
            );
        }
        var addressLineTwo = "";
        if (city != null && state != null) {
            addressLineTwo = React.createElement(
                'li',
                null,
                React.createElement('i', { className: 'fa-li fa fa-fw' }),
                React.createElement(
                    'span',
                    { className: 'address1' },
                    ' ',
                    this.props.profile.businessCity,
                    ' ',
                    this.props.profile.businessState,
                    ', ',
                    this.props.profile.businessZip
                )
            );
        }
        return React.createElement(
            'div',
            { className: 'profile-bits' },
            React.createElement(
                'div',
                { className: 'clear text-left' },
                React.createElement(
                    'ul',
                    { className: 'fa-ul' },
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-black-tie fa-fw' }),
                        ' ',
                        this.props.profile.profession,
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-suitcase fa-fw' }),
                        ' ',
                        this.props.profile.businessName,
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-envelope fa-fw' }),
                        ' ',
                        this.props.profile.email,
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-mobile fa-fw' }),
                        ' ',
                        this.props.profile.mobilePhone,
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-phone fa-fw' }),
                        ' ',
                        this.props.profile.businessPhone,
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-fax fa-fw' }),
                        ' ',
                        this.props.profile.faxNumber,
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-map-pin fa-fw' }),
                        this.props.profile.businessAddress1,
                        ' ',
                        this.props.profile.businessAddress2
                    ),
                    addressLineTwo,
                    mapIt
                )
            )
        );
    }
});