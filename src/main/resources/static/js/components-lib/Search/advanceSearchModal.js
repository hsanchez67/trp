"use strict";

var Result = React.createClass({
    displayName: "Result",

    render: function render() {
        var leadParagraph = '';
        if (this.props.user.leadParagraph != null && this.props.user.leadParagraph != "") {
            leadParagraph = this.props.user.leadParagraph;
            var maxLength = 180;
            var trimmedString = leadParagraph.substr(0, maxLength);
            var length = leadParagraph.length;
            if (length > maxLength) {
                console.log(trimmedString);
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
                console.log(trimmedString);
                leadParagraph = trimmedString.concat("...");
                console.log(leadParagraph);
            }
        }
        return React.createElement(
            "div",
            { className: this.props.count % 2 === 0 ? 'row resultInstant' : 'row resultInstantGrey' },
            React.createElement(
                "div",
                { className: "col-md-2 text-center vert-align" },
                React.createElement(
                    "ul",
                    { className: "source" },
                    React.createElement(Avatar, { id: this.props.id, username: this.props.avatar, name: this.props.firstName + ' ' + this.props.lastName, className: "task-thumb" })
                )
            ),
            React.createElement(
                "div",
                { className: "col-md-4 text-left" },
                React.createElement("input", { type: "hidden", "class": "id-input", name: "id-" + this.props.id, id: "id-" + this.props.id, value: this.props.id }),
                React.createElement("input", { type: "hidden", "class": "email-input", name: "email-" + this.props.id, id: "email-" + this.props.id, value: this.props.email }),
                React.createElement("input", { type: "hidden", "class": "firstName-input", name: "firstName-" + this.props.id, id: "firstName-" + this.props.id, value: this.props.firstName }),
                React.createElement("input", { type: "hidden", "class": "lastName-input", name: "lastName-" + this.props.id, id: "lastName-" + this.props.id, value: this.props.lastName }),
                React.createElement(
                    "strong",
                    null,
                    this.props.firstName,
                    " ",
                    this.props.lastName
                ),
                React.createElement("br", null),
                this.props.profession,
                React.createElement("br", null),
                this.props.business,
                React.createElement("br", null),
                this.props.city,
                ", ",
                this.props.state,
                React.createElement("br", null),
                React.createElement(
                    "a",
                    { className: "btn btn-primary btn-xs", onClick: this.props.onClick, role: "button" },
                    this.props.action,
                    " ",
                    this.props.firstName
                )
            ),
            React.createElement(
                "div",
                { className: "col-md-4 text-left" },
                leadParagraph
            ),
            React.createElement(
                "div",
                { className: "col-md-2 text-center" },
                React.createElement(
                    "div",
                    { className: "canvas-score" },
                    React.createElement(ScoreChartSearch, { avatar: this.props.avatar, score: this.props.score, count: this.props.count })
                )
            )
        );
    }
});

var SearchResults = React.createClass({
    displayName: "SearchResults",

    componentDidUpdate: function componentDidUpdate() {
        // drag & drop
        $(".source li").draggable({
            addClasses: false,
            appendTo: "body",
            helper: "clone"
        });
    },
    handleClick: function handleClick(id) {
        console.log("handleClick ");
        console.log(id);
        $("#advance-search").collapse('hide');
        this.props.handleClick(id);
    },
    render: function render() {
        if ($.isEmptyObject(this.props.data)) {
            return React.createElement(
                "div",
                { className: "no-entries" },
                "No results!"
            );
        } else {
            var users = [];
            var count = 0;
            var action = this.props.action;
            this.props.data.forEach((function (user) {
                var boundClick = this.handleClick.bind(this, user.id);
                users.push(React.createElement(Result, { key: user.id, id: user.id, avatar: user.avatar, firstName: user.firstName,
                    lastName: user.lastName, email: user.email, profession: user.profession, business: user.businessName,
                    city: user.businessCity, state: user.businessState, user: user,
                    score: user.score, action: action, onClick: boundClick, count: count++ }));
                console.log("SearchResults: ");
                console.log(users);
            }).bind(this));
            return React.createElement(
                "div",
                { id: "searchResults" },
                React.createElement("div", { id: "paginator", className: "pagination" }),
                users
            );
        }
    }
});

var selectResponsive2 = {
    width: '100%'
};

var AdvanceSearchModal = React.createClass({
    displayName: "AdvanceSearchModal",

    getInitialState: function getInitialState() {
        return {
            filteredConsumers: [],
            groupList: [],
            networkList: []
        };
    },
    doSearch: function doSearch() {
        var queryName = this.refs.searchName.value;
        var queryProfession = $("#searchProfessionSelect :selected").text();
        if (queryProfession == "Profession") queryProfession = "";
        var queryLocation = this.refs.searchLocation.value;
        var queryNetwork = this.refs.searchNetwork.value;
        var sort = this.refs.orderBy.value;
        var page = 0;
        this.doSearch2(queryName, queryProfession, queryLocation, queryNetwork, sort, page);
    },
    doSearchByScore: function doSearchByScore() {
        this.refs.orderBy.value = 'score';
        var queryName = this.refs.searchName.value;
        var queryProfession = $("#searchProfessionSelect :selected").text();
        if (queryProfession == "Profession") queryProfession = "";
        var queryLocation = this.refs.searchLocation.value;
        var queryNetwork = this.refs.searchNetwork.value;
        var sort = this.refs.orderBy.value;
        console.log(sort);
        var page = 0;
        this.doSearch2(queryName, queryProfession, queryLocation, queryNetwork, sort, page);
    },
    doSearchByName: function doSearchByName() {
        this.refs.orderBy.value = 'lastName';
        var queryName = this.refs.searchName.value;
        var queryProfession = $("#searchProfessionSelect :selected").text();
        if (queryProfession == "Profession") queryProfession = "";
        var queryLocation = this.refs.searchLocation.value;
        var queryNetwork = this.refs.searchNetwork.value;
        var sort = this.refs.orderBy.value;
        console.log(sort);
        var page = 0;
        this.doSearch2(queryName, queryProfession, queryLocation, queryNetwork, sort, page);
    },
    doClear: function doClear() {
        this.refs.searchName.value = '';
        this.refs.searchProfession.value = '';
        this.refs.searchLocation.value = '';
        $("#searchProfessionSelect").select2("val", "");
        var queryName = '';
        var queryProfession = '';
        var queryLocation = '';
        var queryNetwork = '';
        this.doSearch2(queryName, queryProfession, queryLocation, queryNetwork, '', 0);
    },
    doClose: function doClose() {
        $("#advance-search").collapse('hide');
    },
    doSearchForAnSpecificName: function doSearchForAnSpecificName(queryName) {
        $.ajax({
            url: '/userSearch',
            dataType: 'json',
            type: 'POST',
            data: 'search=' + queryName,
            success: (function (data) {
                console.log("doSearchForAnSpecificName:");
                console.log(data);
                console.log(this.state.filteredConsumers);
                if ($.isEmptyObject(data)) {
                    this.setState({
                        filteredConsumers: []
                    });
                    return null;
                } else {
                    console.log(data);
                }
                this.setState({
                    filteredConsumers: data._embedded.userDTOList
                });
                $("#paginator").empty();
            }).bind(this),
            error: (function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }).bind(this)
        });
    },
    doSearch2: function doSearch2(queryName, queryProfession, queryLocation, queryNetwork, sort, page) {
        if (!queryName && !queryProfession && !queryLocation && !queryNetwork) {
            this.setState({
                filteredConsumers: []
            });
            $("#paginator").empty();
            return null;
        }
        console.log("Query Elements: " + queryName + ' ' + queryProfession + ' ' + queryLocation + ' ' + queryNetwork + ' ' + page);
        if (queryLocation == '' && queryProfession == '' && queryName != '' && queryNetwork == '') {
            var name = queryName.split(" ");
            console.log(name);
            if (name.length > 1) {
                this.doSearchForAnSpecificName(queryName);
                return null;
            }
        }
        if (queryName != '' && (queryLocation != '' || queryProfession != '' || queryNetwork != '')) {
            var name = queryName.split(" ");
            if (name.length > 1) {
                queryName = $.trim(name[1]);
            }
        }
        var city = '';
        var state = '';
        if (queryLocation != '') {
            var location = queryLocation.split(",");
            city = location[0];
            state = $.trim(location[1]);
        }
        var originalQueryName = queryName + "%";
        var originalQueryProfession = queryProfession;
        var originalLocationCity = city;
        var originalLocationState = state;
        var originalQueryNetwork = queryNetwork;
        if (originalQueryProfession == "") originalQueryProfession = "%";
        if (originalLocationCity == "") originalLocationCity = "%";
        if (originalLocationState == "") originalLocationState = "%";
        queryName = queryName + "%25";
        if (queryProfession == "") queryProfession = "%25";
        if (city == "") city = "%25";
        if (state == "") state = "%25";
        var networkType = "networkid";
        var visible = '1,0';
        console.log(queryNetwork.substring(0, 11));
        if (queryNetwork == "") {
            queryNetwork = "%25";
            visible = '1';
        } else {
            if (queryNetwork.substring(0, 11) == 'my-network-') {
                queryNetwork = queryNetwork.substring(11, queryNetwork.length);
                networkType = "networkid";
            } else if (queryNetwork == 'shortlist') {
                queryNetwork = $('#id').val();
                networkType = "shortlistid";
            } else {
                networkType = "tagid";
            }
        }
        var source = '/api/users/search/findUsers?sort=score,desc&size=10&name=' + queryName + '&profession=' + queryProfession + '&city=' + city + '&state=' + state + '&' + networkType + '=' + queryNetwork + '&visible' + '=' + visible + '&page=' + page;
        if (sort == 'lastName') {
            source = '/api/users/search/findUsers?sort=lastName,desc&size=10&name=' + queryName + '&profession=' + queryProfession + '&city=' + city + '&state=' + state + '&' + networkType + '=' + queryNetwork + '&visible' + '=' + visible + '&page=' + page;
        }
        console.log(source);
        $("#paginator").empty();
        $.get(source, (function (result) {
            console.log(result);
            if ($.isEmptyObject(result._embedded)) {
                console.log("No results");
                this.setState({
                    filteredConsumers: []
                });
                return null;
            } else if ($.contains(result, '<!DOCTYPE html>')) {
                console.log("Reload Page");
                this.props.reloadPage();
            } else {
                console.log(result);
            }
            this.setState({
                filteredConsumers: result._embedded.users
            });
            console.log(result.page.number + ' ' + result.page.totalPages);
            var currentPage = result.page.number;
            var totalPages = result.page.totalPages;
            var options = {
                currentPage: currentPage + 1,
                totalPages: totalPages,
                size: 'normal',
                alignment: 'center',
                onPageClicked: (function (e, originalEvent, type, page) {
                    console.log(page);
                    this.doSearch2(queryName, queryProfession, queryLocation, originalQueryNetwork, sort, page - 1);
                }).bind(this),
                /*    pageUrl: function(type, page, current) {
                 return '/api/users/search/findUsers?sort='+sort+',desc&size=10&name=' + queryName + '&profession=' + queryProfession + '&city=' + city + '&state=' + state + '&page=' + page;
                 }, */
                itemTexts: function itemTexts(type, page, current) {
                    switch (type) {
                        case "first":
                            return "First";
                        case "prev":
                            return "Previous";
                        case "next":
                            return "Next";
                        case "last":
                            return "Last";
                        case "page":
                            return page;
                    }
                }
            };
            $('#paginator').bootstrapPaginator(options);
        }).bind(this));
    },
    componentDidMount: function componentDidMount() {
        console.log("AdvanceSearchModal:componentDidMount");
        var input = document.getElementById('searchLocation');
        var options = {
            types: ['(cities)'],
            componentRestrictions: { country: 'us' }
        };
        new google.maps.places.Autocomplete(input, options);
        $("#searchProfessionSelect").select2({
            minimumInputLength: 3,
            ajax: {
                url: "/searchProfession",
                method: 'POST',
                dataType: 'json',
                contentType: "application/json",
                delay: 250,
                data: function data(params) {
                    return {
                        search: params.term // search term
                    };
                },
                processResults: function processResults(data, params) {
                    console.log("AdvanceSearchModal:searchProfessionSelect:processResults:");
                    console.log(data);
                    if (!$.isEmptyObject(data) && data != undefined) {
                        var select2Data = $.map(data._embedded.professionDTOList, function (obj) {
                            //    obj.id = obj.text;
                            obj.text = obj.title;
                            return obj;
                        });
                        return {
                            results: select2Data
                        };
                    } else {
                        return false;
                    }
                }
            },
            escapeMarkup: function escapeMarkup(t) {
                return t;
            }, // let our custom formatter work
            templateResult: formatAjaxResponse, // omitted for brevity, see the source of this page
            templateSelection: formatAjaxSelection // omitted for brevity, see the source of this page
        });
        function formatAjaxResponse(data) {
            var markup = '<div class="clearfix">' + '<div class="col-sm-12 cursor text-left">' + '<div id="' + data.text + '">' + data.title + '</div>' + '</div>';
            return markup;
        }
        function formatAjaxSelection(data) {
            $("#searchProfession").val(data.title);
            return data.title || data.text;
        }

        this.getNetworkList();
        this.getGroupList();
    },
    getGroupList: function getGroupList() {
        var data = {
            id: $('#id').val()
        };
        data = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getGroupTagsList",
            data: data,
            success: (function (result) {
                console.log(result);
                if (!$.isEmptyObject(result)) {
                    this.setState({
                        groupList: result.groupList
                    });
                }
            }).bind(this),
            error: function error(_error) {
                console.log("error: " + _error.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    getNetworkList: function getNetworkList() {
        console.log("SearchBox:getNetworkList:");
        var data = {
            id: $('#id').val()
        };
        data = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getNetworkList",
            data: data,
            success: (function (result) {
                console.log(result);
                if (!$.isEmptyObject(result) && result.networkList != null) {
                    this.setState({
                        networkList: result.networkList
                    });
                }
            }).bind(this),
            error: function error(_error2) {
                console.log("error: " + _error2.toString());
            },
            dataType: "json",
            contentType: "application/json"
        });
    },
    render: function render() {
        var shortlistEntry = React.createElement(NetworksListEntry, { name: "Your Short List", id: "shortlist" });
        var NetworksList = this.state.networkList.map((function (net) {
            return React.createElement(NetworksListEntry, { key: net.id, name: net.name, id: 'my-network-' + net.id });
        }).bind(this));
        this.state.groupList.map((function (tag) {
            return NetworksList.unshift(React.createElement(NetworksListEntry, { key: tag.id, name: tag.name, id: tag.id, selected: this.state.groupName }));
        }).bind(this));
        NetworksList.unshift(shortlistEntry);
        return React.createElement(
            "div",
            { id: "advance-search", className: "col-lg-12 col-sm-12 collapse" },
            React.createElement(
                "section",
                { className: "panel panel-default", id: "search-panel" },
                React.createElement(
                    "div",
                    { className: "panel-heading" },
                    React.createElement(
                        "h3",
                        { className: "panel-title text-left" },
                        "Advanced Search"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-lg-12" },
                            React.createElement(
                                "div",
                                { className: "form-group text-left" },
                                React.createElement(
                                    "label",
                                    { className: "control-label" },
                                    "Name"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "input-group" },
                                    React.createElement(
                                        "span",
                                        { className: "input-group-addon" },
                                        React.createElement("i", { className: "fa fa-user" })
                                    ),
                                    React.createElement("input", { type: "text", className: "form-control", ref: "searchName", placeholder: "Name" })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "form-group text-left" },
                                React.createElement(
                                    "label",
                                    { className: "control-label" },
                                    "Profession"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "input-group" },
                                    React.createElement(
                                        "span",
                                        { className: "input-group-addon" },
                                        React.createElement("i", { className: "fa fa-briefcase" })
                                    ),
                                    React.createElement(
                                        "select",
                                        { id: "searchProfessionSelect", className: "form-control js-example-placeholder-single", className: "searchProfession", ref: "searchProfession", style: selectResponsive2 },
                                        React.createElement(
                                            "option",
                                            { value: "", selected: "selected" },
                                            "Profession"
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "form-group text-left" },
                                React.createElement(
                                    "label",
                                    { className: "control-label" },
                                    "Location"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "input-group" },
                                    React.createElement(
                                        "span",
                                        { className: "input-group-addon" },
                                        React.createElement("i", { className: "fa fa-location-arrow" })
                                    ),
                                    React.createElement("input", { type: "text", className: "form-control", id: "searchLocation", ref: "searchLocation", placeholder: "Location" })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "form-group text-left" },
                                React.createElement(
                                    "label",
                                    { className: "control-label" },
                                    "Network"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "input-group" },
                                    React.createElement(
                                        "span",
                                        { className: "input-group-addon" },
                                        React.createElement("i", { className: "fa fa-users" })
                                    ),
                                    React.createElement(
                                        "select",
                                        { className: "form-control", id: "searchNetwork", ref: "searchNetwork", style: selectResponsive2 },
                                        React.createElement("option", { value: "", selected: "selected" }),
                                        NetworksList
                                    )
                                )
                            ),
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-sm btn-default btn-primary", onClick: this.doSearch },
                                React.createElement("i", { id: "send-intro-icon", className: "fa fa-search " }),
                                "  Search"
                            ),
                            " ",
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-sm btn-default", onClick: this.doClear },
                                "Clear"
                            ),
                            " ",
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-sm btn-default", onClick: this.doClose, "data-dismiss": "modal" },
                                "Close"
                            ),
                            React.createElement(
                                "div",
                                { className: "row margin-top-50" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-md-12" },
                                    React.createElement(
                                        "div",
                                        { className: "text-right" },
                                        "Order By ",
                                        React.createElement(
                                            "a",
                                            { className: "pointer", onClick: this.doSearchByName },
                                            "Name"
                                        ),
                                        " | ",
                                        React.createElement(
                                            "a",
                                            { className: "pointer", onClick: this.doSearchByScore },
                                            "Score"
                                        )
                                    )
                                )
                            ),
                            React.createElement("input", { type: "hidden", ref: "orderBy", value: "score" })
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-12" },
                        React.createElement(SearchResults, { data: this.state.filteredConsumers, action: this.props.action, handleClick: this.props.handleClick })
                    )
                )
            )
        );
    }
});

var NetworksListEntry = React.createClass({
    displayName: "NetworksListEntry",

    render: function render() {
        return React.createElement(
            "option",
            { value: this.props.id },
            this.props.name
        );
    }
});