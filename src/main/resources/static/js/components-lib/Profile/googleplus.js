'use strict';

var GooglePlus = React.createClass({
    displayName: 'GooglePlus',

    getInitialState: function getInitialState() {
        return {
            proInfo: [],
            imageUrl: '',
            coverPhoto: ''
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log('GooglePlus:componentWillReceiveProps:ids: ' + nextProps.profile.id + " - " + this.props.profile.id);
        if (nextProps.profile.id != this.props.profile.id) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function prepareComponentState(props) {
        if (!$.isEmptyObject(props.profile)) {
            var data = {
                id: props.profile.id
            };
            var formData = JSON.stringify(data, null, ' ');
            console.log('GooglePlus:prepareComponentState:formData');
            console.log(formData);
            this.serverRequest = $.ajax({
                type: "POST",
                url: "/getGooglePlusProfile",
                data: formData,
                success: (function (result) {
                    console.log(result);
                    if (!$.isEmptyObject(result)) {
                        var str = "";
                        var cp = "";
                        if (result.image.url != null) {
                            str = result.image.url;
                            str = str.split("?sz=50")[0] + "?sz=" + 128;
                        }
                        if (!$.isEmptyObject(result.cover)) {
                            cp = result.cover.coverPhoto.url;
                        }
                        this.setState({
                            proInfo: result,
                            imageUrl: str,
                            coverPhoto: cp
                        });
                    }
                }).bind(this),
                error: function error(request, status, _error) {
                    console.log(_error);
                },
                dataType: "json",
                contentType: "application/json"
            });
        } else {
            console.log('GooglePlus:prepareComponentState: No user');
        }
    },
    showWork: function showWork(element) {
        var results = [];
        if (element.type == "work") {
            results.push(React.createElement(
                'div',
                { className: 'BgK4Ef' },
                React.createElement(
                    'div',
                    { className: 'mGa2db' },
                    React.createElement(
                        'div',
                        { className: 'DOdATc' },
                        element.name
                    ),
                    React.createElement(
                        'div',
                        { className: 'Y5upsc' },
                        element.title,
                        ', ',
                        element.startDate,
                        ' - ',
                        element.endDate == null && element.primary == true ? 'present' : element.endDate
                    )
                )
            ));
        }
        return results;
    },
    showEducation: function showEducation(element) {
        var results = [];
        if (element.type == "school") {
            results.push(React.createElement(
                'div',
                { className: 'BgK4Ef' },
                React.createElement(
                    'div',
                    { className: 'mGa2db' },
                    React.createElement(
                        'div',
                        { className: 'DOdATc' },
                        element.name
                    ),
                    React.createElement(
                        'div',
                        { className: 'Y5upsc' },
                        element.title,
                        ', ',
                        element.startDate,
                        ' - ',
                        element.endDate == null && element.primary == true ? 'present' : element.endDate
                    )
                )
            ));
        }
        return results;
    },
    render: function render() {
        var googlePlusExists;
        if (!$.isEmptyObject(this.state.proInfo)) {
            var personTitle;
            var orgName;
            var livesIn;
            var googlePlusId = "https://plus.google.com/" + this.state.proInfo.id + "?prsrc=3";
            for (var i = 0; i < this.state.proInfo.organizations.length; i++) {
                var organization = this.state.proInfo.organizations[i];
                console.log(organization);
                if (organization.primary) {
                    personTitle = organization.title;
                    orgName = organization.name;
                }
            }
            for (var i = 0; i < this.state.proInfo.placesLived.length; i++) {
                var places = this.state.proInfo.placesLived[i];
                console.log(places);
                if (places.primary) {
                    livesIn = places.value;
                }
            }
            if (!$.isEmptyObject(this.state.proInfo.cover)) {
                // /*lNCkJ4zzEwyRkDogSMRo2N/5ciM*/background-image: url(https://lh3.googleusercontent.com/-Nv-Yky7dbt0/VuUJMxS42WI/AAAAAAAACBc/eERg5IG-MRQCogfFUodl-XMJN-bR15qMw/w728-h1600-fcrop64=1,3c7e0c77fb52ad64-rw/922C5413.jpg)
                var coverPhotoExists = {
                    backgroundImage: 'url(' + this.state.proInfo.cover.coverPhoto.url + ')',
                    backgroundPosition: 'center',
                    maxHeight: '145.6px',
                    maxWidth: '745p',
                    height: '145px',
                    WebkitBackgroundSize: 'cover',
                    backgroundSize: 'cover',
                    minHeight: '75px',
                    position: 'relative',
                    width: '100%'
                };
            } else {
                var coverPhotoExists = {
                    marginTop: '20px'
                };
            }
            if (this.state.proInfo.tagline != null) {
                var taglineExists = {
                    display: 'block'
                };
            } else {
                var taglineExists = {
                    display: 'none'
                };
            }
            googlePlusExists = React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'panel-body panel-red' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement('div', { id: 'coverPhoto', style: coverPhotoExists }),
                            React.createElement(
                                'div',
                                { className: 'JvYz0' },
                                React.createElement('img', { src: this.state.imageUrl, className: 'user-img' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'qsScTb' },
                                this.state.proInfo.displayName
                            ),
                            React.createElement(
                                'div',
                                { className: 'C98T8d' },
                                this.state.proInfo.circledByCount,
                                ' followers'
                            ),
                            React.createElement(
                                'div',
                                { className: 'zW13ob' },
                                React.createElement(
                                    'div',
                                    { className: 'woZtZ UEycXe' },
                                    personTitle,
                                    '  at ',
                                    orgName
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'WRuIef UEycXe' },
                                    'Lives in ',
                                    livesIn
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body panel-white panel-white-long' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'div',
                            { className: 'col-md-11' },
                            React.createElement(
                                'div',
                                { className: 'o30VSc' },
                                'About'
                            ),
                            React.createElement(
                                'div',
                                { style: taglineExists },
                                React.createElement(
                                    'div',
                                    { className: 'uqKsgd' },
                                    React.createElement(
                                        'div',
                                        { className: 'zqU9Fe' },
                                        'Tagline'
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'BgK4Ef' },
                                        React.createElement(
                                            'div',
                                            { className: 'mGa2db' },
                                            React.createElement(
                                                'div',
                                                { className: 'DOdATc' },
                                                this.state.proInfo.tagline
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement('div', { className: 'DOdATc', dangerouslySetInnerHTML: { __html: this.state.proInfo.aboutMe } })
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-1' },
                            React.createElement(
                                'div',
                                { className: 'google-plus-logo' },
                                React.createElement(
                                    'a',
                                    { href: googlePlusId,
                                        rel: 'publisher', target: '_blank' },
                                    React.createElement('img', { src: '//ssl.gstatic.com/images/icons/gplus-64.png', alt: 'Google+' })
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body panel-white panel-white-long' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'div',
                            { className: 'o30VSc' },
                            'Work & Education'
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { className: 'uqKsgd' },
                                React.createElement(
                                    'div',
                                    { className: 'zqU9Fe' },
                                    'Employment'
                                ),
                                this.state.proInfo.organizations.map(this.showWork)
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { className: 'uqKsgd' },
                                React.createElement(
                                    'div',
                                    { className: 'zqU9Fe' },
                                    'Education'
                                ),
                                this.state.proInfo.organizations.map(this.showEducation)
                            )
                        ),
                        React.createElement('div', { className: 'DOdATc', dangerouslySetInnerHTML: { __html: this.state.proInfo.aboutMe } })
                    )
                )
            );
        } else {
            googlePlusExists = React.createElement(
                'div',
                { className: 'panel-body panel-light img-rounded' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement('div', { className: 'col-md-12' })
                )
            );
        }
        return React.createElement(
            'div',
            null,
            googlePlusExists
        );
    }
});