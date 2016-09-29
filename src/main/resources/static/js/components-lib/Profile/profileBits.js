'use strict';

var ProfileBits = React.createClass({
    displayName: 'ProfileBits',
    getInitialState: function getInitialState() {
        return {
            profile: this.props.profile,
            mapIt: ''
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({ profile: nextProps.profile });
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        var id = $('#id').val();
        console.log("ProfileBits:componentDidUpdate:");
        console.log(prevProps);
        console.log(this.props);
        if (prevProps.profile != this.props.profile && id != this.props.profile.id) {
            console.log("ProfileBits:componentDidUpdate:Yes");
            this.prepareComponentState(this.props.profile);
        } else if (prevProps.profile != this.props.profile && id == this.props.profile.id) {
            this.destroyEditable();
            if (this.props.profile.businessAddress1 != null && this.props.profile.businessAddress1 != "" && this.props.profile.businessCity != null && this.props.profile.businessCity != "" && this.props.profile.businessState != null && this.props.profile.businessState != "" && this.props.profile.businessZip != null && this.props.profile.businessZip != "") {
                var mapSource = "https://maps.google.com/?key=AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY&output=embed&f=q&source=s_q&hl=en&geocode=&q=" + this.props.profile.businessAddress1 + ",+" + this.props.profile.businessCity + ",+" + this.props.profile.businessState + "+" + this.props.profile.businessZip;
                this.setState({
                    mapIt: '<a class="various fancybox.iframe map-it" href="' + mapSource + '">map it</a>'
                });
            }
        }
    },
    destroyEditable: function destroyEditable() {
        $('#profession').editable('destroy');
        $('#businessName').editable('destroy');
        $('#mobilePhone').editable('destroy');
        $('#businessPhone').editable('destroy');
        $('#faxNumber').editable('destroy');
        $('#address').editable('destroy');
    },
    prepareComponentState: function prepareComponentState(profile) {
        this.destroyEditable();
        this.initializeUserNotes(profile.id, profile);
        this.getUserNotes(profile.id);
    },
    getUserNotes: function getUserNotes(targetId) {
        var id = $('#id').val();
        var id2 = targetId;
        var thisElem = this;
        // Get contact notes
        console.log("ProfileBits:getUserNotes:");
        var data = {
            ownerUserId: $('#id').val(),
            targetUserId: targetId
        };
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getContactNotes",
            async: true,
            data: formData,
            success: (function (result) {
                console.log("ProfileBits:getUserNotes:result");
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    if (this.props.profile.profession == null || this.props.profile.profession == "") {
                        $('#profession').editable('enable');
                        $('#profession').editable('setValue', result.profession);
                    }
                    if (this.props.profile.businessName == null || this.props.profile.businessName == "") {
                        $('#businessName').editable('enable');
                        $('#businessName').editable('setValue', result.businessName);
                    }
                    if (this.props.profile.mobilePhone == null || this.props.profile.mobilePhone == "") {
                        $('#mobilePhone').editable('enable');
                        $('#mobilePhone').editable('setValue', result.mobilePhone);
                    }
                    if (this.props.profile.businessPhone == null || this.props.profile.businessPhone == "") {
                        console.log("ProfileBits:getUserNotes:result:businessPhone");
                        $('#businessPhone').editable('enable');
                        $('#businessPhone').editable('setValue', result.businessPhone);
                    }
                    if (this.props.profile.faxNumber == null || this.props.profile.faxNumber == "") {
                        $('#faxNumber').editable('enable');
                        $('#faxNumber').editable('setValue', result.faxNumber);
                    }
                    console.log(this.props.profile.businessAddress1);
                    if (this.props.profile.businessAddress1 == null || this.props.profile.businessAddress1 == "") {
                        if (result.businessAddress1 != null && result.businessAddress1 != "" && result.businessCity != null && result.businessCity != "" && result.businessState != null && result.businessState != "" && result.businessZip != null && result.businessZip != "") {
                            var mapSource = "https://maps.google.com/?key=AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY&output=embed&f=q&source=s_q&hl=en&geocode=&q=" + result.businessAddress1 + ",+" + result.businessCity + ",+" + result.businessState + "+" + result.businessZip;
                            thisElem.setState({
                                mapIt: '<a class="various fancybox.iframe map-it" href="' + mapSource + '">map it</a>'
                            });
                        } else {
                            thisElem.setState({
                                mapIt: ''
                            });
                        }
                        $('#address').editable({
                            type: 'address',
                            pk: id,
                            url: '/saveUserNotes',
                            send: 'always',
                            disabled: false,
                            placement: 'bottom',
                            ajaxOptions: {
                                contentType: 'application/json',
                                type: 'post',
                                dataType: 'json' //assuming json response
                            },
                            params: function params(_params) {
                                console.log(_params);
                                var data = {
                                    ownerUserId: id,
                                    targetUserId: id2,
                                    businessAddress1: _params.value.address1,
                                    businessAddress2: _params.value.address2,
                                    businessCity: _params.value.city,
                                    businessState: _params.value.state,
                                    businessZip: _params.value.zip
                                };
                                return JSON.stringify(data);
                            },
                            value: {
                                address1: result.businessAddress1,
                                address2: result.businessAddress2,
                                city: result.businessCity,
                                state: result.businessState,
                                zip: result.businessZip
                            },
                            validate: function validate(value) {
                                if (value.address1 == '' || value.city == '' || value.state == '' || value.zip == '') {
                                    return 'Address 1, City, State and Zip are required!';
                                }
                            },
                            success: function success(data) {
                                console.log("Success data below:");
                                console.log(data);
                                if (!$.isEmptyObject(data) && data.businessAddress1 != null && data.businessAddress1 != "" && data.businessCity != null && data.businessCity != "" && data.businessState != null && data.businessState != "" && data.businessZip != null && data.businessZip != "") {
                                    var mapSource = "https://maps.google.com/?key=AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY&output=embed&f=q&source=s_q&hl=en&geocode=&q=" + data.businessAddress1 + ",+" + data.businessCity + ",+" + data.businessState + "+" + data.businessZip;
                                    thisElem.setState({
                                        mapIt: '<a class="various fancybox.iframe map-it" href="' + mapSource + '">map it</a>'
                                    });
                                } else {
                                    thisElem.setState({
                                        mapIt: ''
                                    });
                                }
                            },
                            error: function error(errors) {
                                console.log(errors.responseText);
                            },
                            display: function display(value) {
                                console.log("Display address");
                                console.log(value);
                                if (value) {
                                    if (value.address1 != null && value.address1 != "" && value.city != null && value.city != "" && value.state != null && value.state != "" && value.zip != null && value.zip != "") {
                                        var html = $('<div>').text(value.address1).html() + ' ' + $('<div>').text(value.address2).html() + '<br />' + $('<div>').text(value.city).html() + ', ' + $('<div>').text(value.state).html() + ' ' + $('<div>').text(value.zip).html();
                                        $(this).html(html);
                                    }
                                }
                            } // End display option
                        });
                    } else {
                            if (!$.isEmptyObject(this.props.profile) && this.props.profile.businessAddress1 != null && this.props.profile.businessAddress1 != "" && this.props.profile.businessCity != null && this.props.profile.businessCity != "" && this.props.profile.businessState != null && this.props.profile.businessState != "") {
                                var mapSource = "https://maps.google.com/?key=AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY&output=embed&f=q&source=s_q&hl=en&geocode=&q=" + this.props.profile.businessAddress1 + ",+" + this.props.profile.businessCity + ",+" + this.props.profile.businessState + "+" + this.props.profile.businessZip;
                                this.setState({
                                    mapIt: '<a class="various fancybox.iframe map-it" href="' + mapSource + '">map it</a>'
                                });
                            }
                        }
                } else if (!$.isEmptyObject(result)) {
                    $('#profession').editable('disable');
                    $('#businessName').editable('disable');
                    $('#mobilePhone').editable('disable');
                    $('#businessPhone').editable('disable');
                    $('#faxNumber').editable('disable');
                    $('#address').editable('disable');
                }
            }).bind(this),
            dataType: "json",
            contentType: "application/json"
        });
    },
    initializeUserNotes: function initializeUserNotes(targetId, profile) {
        var id = $('#id').val();
        var id2 = targetId;
        $('#profession').editable({
            type: 'text',
            pk: id,
            url: '/saveUserNotes',
            send: 'always',
            disabled: true,
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            value: profile.profession,
            params: function params(_params2) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    profession: _params2.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            }
        });

        $('#businessName').editable({
            type: 'text',
            pk: id,
            url: '/saveUserNotes',
            send: 'always',
            disabled: true,
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            value: profile.businessName,
            params: function params(_params3) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    businessName: _params3.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            }
        });

        $('#mobilePhone').editable({
            type: 'text',
            pk: id,
            url: '/saveUserNotes',
            send: 'always',
            disabled: true,
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            value: profile.mobilePhone,
            params: function params(_params4) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    mobilePhone: _params4.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            }
        });

        $('#businessPhone').editable({
            type: 'text',
            pk: id,
            url: '/saveUserNotes',
            send: 'always',
            disabled: true,
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            value: profile.businessPhone,
            params: function params(_params5) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    businessPhone: _params5.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            }
        });

        $('#faxNumber').editable({
            type: 'text',
            pk: id,
            url: '/saveUserNotes',
            send: 'always',
            disabled: true,
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            value: profile.faxNumber,
            params: function params(_params6) {
                console.log(_params6);
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    faxNumber: _params6.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            }
        });
    },
    render: function render() {
        var addressLineOne = "";
        var addressLineTwo = "";
        if (this.state.profile.businessAddress1 != '' && this.state.profile.businessAddress1 != null) {
            addressLineOne = React.createElement(
                'li',
                null,
                React.createElement('i', { className: 'fa-li fa fa-map-pin fa-fw' }),
                ' ',
                this.state.profile.businessAddress1,
                ' ',
                this.state.profile.businessAddress2
            );
        } else {
            addressLineOne = React.createElement(
                'li',
                null,
                React.createElement('i', { className: 'fa-li fa fa-map-pin fa-fw' }),
                ' ',
                React.createElement('a', { href: '#', id: 'address', 'data-type': 'address', className: 'editable editable-click' })
            );
        }
        if (this.state.profile.businessCity != '' && this.state.profile.businessCity != null && this.state.profile.businessState != '' && this.state.profile.businessState != null) {
            addressLineTwo = React.createElement(
                'li',
                null,
                React.createElement('i', { 'class': 'fa-li fa fa-fw' }),
                this.state.profile.businessCity,
                ' ',
                this.state.profile.businessState,
                ', ',
                this.state.profile.businessZip
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
                        React.createElement(
                            'a',
                            { href: '#', id: 'profession', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Profession' },
                            this.state.profile.profession
                        ),
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-suitcase fa-fw' }),
                        ' ',
                        React.createElement(
                            'a',
                            { href: '#', id: 'businessName', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Business Name' },
                            this.state.profile.businessName
                        ),
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
                        React.createElement(
                            'a',
                            { href: '#', id: 'mobilePhone', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Mobile Phone' },
                            this.state.profile.mobilePhone
                        ),
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-phone fa-fw' }),
                        ' ',
                        React.createElement(
                            'a',
                            { href: '#', id: 'businessPhone', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Business Phone' },
                            this.state.profile.businessPhone
                        ),
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-fax fa-fw' }),
                        ' ',
                        React.createElement(
                            'a',
                            { href: '#', id: 'faxNumber', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Fax Number' },
                            this.state.profile.faxNumber
                        ),
                        ' '
                    ),
                    addressLineOne,
                    addressLineTwo,
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-map-marker fa-fw' }),
                        ' ',
                        React.createElement('span', { dangerouslySetInnerHTML: { __html: marked(this.state.mapIt) } })
                    )
                )
            )
        );
    }
});

var ProfileBits2 = React.createClass({
    displayName: 'ProfileBits2',
    getInitialState: function getInitialState() {
        return {
            mapIt: ''
        };
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        var id = $('#id').val();
        console.log("ProfileBits:componentDidUpdate:");
        console.log(prevProps);
        console.log(this.props);
        if (prevProps.profile != this.props.profile && id != this.props.profile.id) {
            console.log("ProfileBits:componentDidUpdate:Yes");
            this.initializeUserNotes(this.props.profile.id);
            this.getUserNotes(this.props.profile.id);
        } else if (prevProps.profile != this.props.profile && id == this.props.profile.id) {
            this.destroyEditable();
            if (this.props.profile.businessAddress1 != null && this.props.profile.businessAddress1 != "" && this.props.profile.businessCity != null && this.props.profile.businessCity != "" && this.props.profile.businessState != null && this.props.profile.businessState != "" && this.props.profile.businessZip != null && this.props.profile.businessZip != "") {
                var mapSource = "https://maps.google.com/?key=AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY&output=embed&f=q&source=s_q&hl=en&geocode=&q=" + this.props.profile.businessAddress1 + ",+" + this.props.profile.businessCity + ",+" + this.props.profile.businessState + "+" + this.props.profile.businessZip;
                this.setState({
                    mapIt: '<a class="various fancybox.iframe map-it" href="' + mapSource + '">map it</a>'
                });
            }
        }
    },
    destroyEditable: function destroyEditable() {
        $('#profession2').editable('destroy');
        $('#businessName2').editable('destroy');
        $('#mobilePhone2').editable('destroy');
        $('#businessPhone2').editable('destroy');
        $('#faxNumber2').editable('destroy');
        $('#address2').editable('destroy');
    },
    getUserNotes: function getUserNotes(targetId) {
        var id = $('#id').val();
        var id2 = targetId;
        var thisElem = this;
        // Get contact notes
        console.log("ProfileBits:getUserNotes:");
        var data = {
            ownerUserId: $('#id').val(),
            targetUserId: targetId
        };
        var formData = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getContactNotes",
            async: true,
            data: formData,
            success: (function (result) {
                console.log("ProfileBits:getUserNotes:result");
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    if (this.props.profile.profession == null || this.props.profile.profession == "") {
                        $('#profession2').editable('enable');
                        $('#profession2').editable('setValue', result.profession);
                    }
                    if (this.props.profile.businessName == null || this.props.profile.businessName == "") {
                        $('#businessName2').editable('enable');
                        $('#businessName2').editable('setValue', result.businessName);
                    }
                    if (this.props.profile.mobilePhone == null || this.props.profile.mobilePhone == "") {
                        $('#mobilePhone2').editable('enable');
                        $('#mobilePhone2').editable('setValue', result.mobilePhone);
                    }
                    if (this.props.profile.businessPhone == null || this.props.profile.businessPhone == "") {
                        $('#businessPhone2').editable('enable');
                        $('#businessPhone2').editable('setValue', result.businessPhone);
                    }
                    if (this.props.profile.faxNumber == null || this.props.profile.faxNumber == "") {
                        $('#faxNumber2').editable('enable');
                        $('#faxNumber2').editable('setValue', result.faxNumber);
                    }
                    if (this.props.profile.businessAddress1 == null || this.props.profile.businessAddress1 == "") {
                        $('#address2').editable({
                            type: 'address',
                            pk: id,
                            url: '/saveUserNotes',
                            send: 'always',
                            disabled: false,
                            placement: 'bottom',
                            ajaxOptions: {
                                contentType: 'application/json',
                                type: 'post',
                                dataType: 'json' //assuming json response
                            },
                            params: function params(_params7) {
                                console.log(_params7);
                                var data = {
                                    ownerUserId: id,
                                    targetUserId: id2,
                                    businessAddress1: _params7.value.address1,
                                    businessAddress2: _params7.value.address2,
                                    businessCity: _params7.value.city,
                                    businessState: _params7.value.state,
                                    businessZip: _params7.value.zip
                                };
                                return JSON.stringify(data);
                            },
                            validate: function validate(value) {
                                if (value.address1 == '' || value.city == '' || value.state == '' || value.zip == '') {
                                    return 'Address 1, City, State and Zip are required!';
                                }
                            },
                            success: function success(data) {
                                console.log("Success data below:");
                                console.log(data);
                                if (!$.isEmptyObject(data) && data.businessAddress1 != null && data.businessAddress1 != "" && data.businessCity != null && data.businessCity != "" && data.businessState != null && data.businessState != "" && data.businessZip != null && data.businessZip != "") {
                                    var mapSource = "https://maps.google.com/?key=AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY&output=embed&f=q&source=s_q&hl=en&geocode=&q=" + data.businessAddress1 + ",+" + data.businessCity + ",+" + data.businessState + "+" + data.businessZip;
                                    thisElem.setState({
                                        mapIt: '<a class="various fancybox.iframe map-it" href="' + mapSource + '">map it</a>'
                                    });
                                } else {
                                    thisElem.setState({
                                        mapIt: ''
                                    });
                                }
                            },
                            value: {
                                address1: result.businessAddress1,
                                address2: result.businessAddress2,
                                city: result.businessCity,
                                state: result.businessState,
                                zip: result.businessZip
                            },
                            error: function error(errors) {
                                console.log(errors.responseText);
                            },
                            display: function display(value, response) {
                                console.log("Display address 2");
                                console.log(value);
                                console.log(response);
                                if (value) {
                                    if (value.address1 != null && value.address1 != "" && value.city != null && value.city != "" && value.state != null && value.state != "" && value.zip != null && value.zip != "") {
                                        var html = $('<div>').text(value.address1).html() + ' ' + $('<div>').text(value.address2).html() + '<br />' + $('<div>').text(value.city).html() + ', ' + $('<div>').text(value.state).html() + ' ' + $('<div>').text(value.zip).html();
                                        $(this).html(html);
                                    }
                                }
                            } // End display option
                        });
                        if (result.businessAddress1 != null && result.businessAddress1 != "" && result.businessCity != null && result.businessCity != "" && result.businessState != null && result.businessState != "" && result.businessZip != null && result.businessZip != "") {
                            var mapSource = "https://maps.google.com/?key=AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY&output=embed&f=q&source=s_q&hl=en&geocode=&q=" + result.businessAddress1 + ",+" + result.businessCity + ",+" + result.businessState + "+" + result.businessZip;
                            thisElem.setState({
                                mapIt: '<a class="various fancybox.iframe map-it" href="' + mapSource + '">map it</a>'
                            });
                        } else {
                            thisElem.setState({
                                mapIt: ''
                            });
                        }
                    } else {
                        $("#address2").editable("disable");
                        if (!$.isEmptyObject(this.props.profile) && this.props.profile.businessAddress1 != null && this.props.profile.businessAddress1 != "" && this.props.profile.businessCity != null && this.props.profile.businessCity != "" && this.props.profile.businessState != null && this.props.profile.businessState != "") {
                            var mapSource = "https://maps.google.com/?key=AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY&output=embed&f=q&source=s_q&hl=en&geocode=&q=" + this.props.profile.businessAddress1 + ",+" + this.props.profile.businessCity + ",+" + this.props.profile.businessState + "+" + this.props.profile.businessZip;
                            this.setState({
                                mapIt: '<a class="various fancybox.iframe map-it" href="' + mapSource + '">map it</a>'
                            });
                        }
                    }
                } else if (!$.isEmptyObject(result)) {
                    $('#profession2').editable('disable');
                    $('#businessName2').editable('disable');
                    $('#mobilePhone2').editable('disable');
                    $('#businessPhone2').editable('disable');
                    $('#faxNumber2').editable('disable');
                    $('#address2').editable('disable');
                }
            }).bind(this),
            dataType: "json",
            contentType: "application/json"
        });
    },
    initializeUserNotes: function initializeUserNotes(targetId) {
        var id = $('#id').val();
        var id2 = targetId;
        $('#profession2').editable({
            type: 'text',
            pk: id,
            url: '/saveUserNotes',
            send: 'always',
            disabled: true,
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            params: function params(_params8) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    profession: _params8.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            }
        });

        $('#businessName2').editable({
            type: 'text',
            pk: id,
            url: '/saveUserNotes',
            send: 'always',
            disabled: true,
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            params: function params(_params9) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    businessName: _params9.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            }
        });

        $('#mobilePhone2').editable({
            type: 'text',
            pk: id,
            url: '/saveUserNotes',
            send: 'always',
            disabled: true,
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            params: function params(_params10) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    mobilePhone: _params10.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            }
        });

        $('#businessPhone2').editable({
            type: 'text',
            pk: id,
            url: '/saveUserNotes',
            send: 'always',
            disabled: true,
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            params: function params(_params11) {
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    businessPhone: _params11.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            }
        });

        $('#faxNumber2').editable({
            type: 'text',
            pk: id,
            url: '/saveUserNotes',
            send: 'always',
            disabled: true,
            ajaxOptions: {
                contentType: 'application/json',
                type: 'post',
                dataType: 'json' //assuming json response
            },
            params: function params(_params12) {
                console.log(_params12);
                var data = {
                    ownerUserId: id,
                    targetUserId: id2,
                    faxNumber: _params12.value
                };
                return JSON.stringify(data);
            },
            success: function success(data) {
                console.log("Success data below:");
                console.log(data);
            },
            error: function error(errors) {
                console.log(errors.responseText);
            }
        });
    },
    render: function render() {
        var addressLineOne = "";
        var addressLineTwo = "";
        if (this.props.profile.businessAddress1 != '' && this.props.profile.businessAddress1 != null) {
            addressLineOne = React.createElement(
                'li',
                null,
                React.createElement('i', { className: 'fa-li fa fa-map-pin fa-fw' }),
                this.props.profile.businessAddress1,
                ' ',
                this.props.profile.businessAddress2,
                ' '
            );
        } else {
            addressLineOne = React.createElement(
                'li',
                null,
                React.createElement('i', { className: 'fa-li fa fa-map-pin fa-fw' }),
                ' ',
                React.createElement('a', { href: '#', id: 'address2', 'data-type': 'address', className: 'editable editable-click' })
            );
        }
        if (this.props.profile.businessCity != '' && this.props.profile.businessCity != null && this.props.profile.businessState != '' && this.props.profile.businessState != null) {
            addressLineTwo = React.createElement(
                'li',
                null,
                React.createElement('i', { 'class': 'fa-li fa fa-fw' }),
                this.props.profile.businessCity,
                ' ',
                this.props.profile.businessState,
                ', ',
                this.props.profile.businessZip,
                ' '
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
                        React.createElement(
                            'a',
                            { href: '#', id: 'profession2', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Profession' },
                            this.props.profile.profession
                        ),
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-suitcase fa-fw' }),
                        ' ',
                        React.createElement(
                            'a',
                            { href: '#', id: 'businessName2', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Business Name' },
                            this.props.profile.businessName
                        ),
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
                        React.createElement(
                            'a',
                            { href: '#', id: 'mobilePhone2', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Mobile Phone' },
                            this.props.profile.mobilePhone
                        ),
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-phone fa-fw' }),
                        ' ',
                        React.createElement(
                            'a',
                            { href: '#', id: 'businessPhone2', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Business Phone' },
                            this.props.profile.businessPhone
                        ),
                        ' '
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-fax fa-fw' }),
                        ' ',
                        React.createElement(
                            'a',
                            { href: '#', id: 'faxNumber2', 'data-type': 'text', className: 'editable editable-click', 'data-title': 'Fax Number' },
                            this.props.profile.faxNumber
                        ),
                        ' '
                    ),
                    addressLineOne,
                    addressLineTwo,
                    React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'fa-li fa fa-map-marker fa-fw' }),
                        ' ',
                        React.createElement('span', { dangerouslySetInnerHTML: { __html: marked(this.state.mapIt) } })
                    )
                )
            )
        );
    }
});