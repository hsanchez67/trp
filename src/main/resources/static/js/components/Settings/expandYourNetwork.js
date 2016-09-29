var ExpandYourNetwork;
ExpandYourNetwork = React.createClass({
    displayName: 'ExpandYourNetwork',
    getInitialState: function () {
        return {
            user: this.props.user,
            imports: [],
            contacts: [],
            view: {showModal: false},
            results: []
        };
    },
    handleHideModal(){
        this.setState({view: {showModal: false}})
    },
    handleShowModal(){
        console.log(this.state.view.showModal);
        this.setState({view: {showModal: true}})
        console.log(this.state.view.showModal);
    },
    handleImport: function () {
        $.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
        var contacts = [];
        var dataList = [];
        var $entries = $("#import-list").find('form');
        $entries.each(function (i, entry) {
//            console.log($(entry).find(':input:checkbox').prop('checked'));
            $(entry).find(':input:checkbox').each(function () {
                if ($(this).prop('checked') == true) {
                    dataList.push(JSON.stringify($(entry).serializeObject()));
                    var contact = {
                        'email': $(entry).find('.email-input').val(),
                        'firstName': $(entry).find('.name-input').val()
                    }
                    contacts.push(contact);
                }
            });
        });
        console.log(dataList);
        console.log(contacts);
        this.setState({
            contacts: contacts,
            view: {showModal: true}
        });
    },
    makeApiCall: function (authResult) {
        var importButton = document.getElementById('import-button');
        var searchBox = document.getElementById('search-box');
        var checkAll = document.getElementById('check-all-container');
        var spinnerButton = document.getElementById('spinner-button');
        var json = $.getJSON('https://www.google.com/m8/feeds/contacts/default/full/?access_token=' +
            authResult.access_token + "&max-results=10000&alt=json&callback=?", function (result) {
            //console.log(JSON.stringify(result));
            spinnerButton.style.visibility = 'hidden';
            spinnerButton.style.display = 'none';
            importButton.style.visibility = '';
            importButton.style.display = 'block';
            searchBox.style.visibility = '';
            searchBox.style.display = 'block';
            checkAll.style.visibility = '';
            checkAll.style.display = 'block';
            var contacts = [];
            var items = [];
            var imports = [];
            /* $.each( result.feed.entry, function(key, value) {
             if (value.title.$t != '' && value.gd$email.address != "")
             items.push( value.title.$t + " | " + value.gd$email.address +  "<br>" );
             }); */

            for (var i = 0, entry; entry = result.feed.entry[i]; i++) {
                var contact = {
                    'name': entry['title']['$t'],
                    'id': entry['id']['$t'],
                    'emails': [],
                    'phoneNumber': []
                };

                if (entry['gd$email']) {
                    var emails = entry['gd$email'];
                    for (var j = 0, email; email = emails[j]; j++) {
                        contact['emails'].push(email['address']);
                    }
                }
                if (entry['gd$phoneNumber']) {
                    var phoneNumber = entry['gd$phoneNumber'];
                    for (var j2 = 0, phone; phone = phoneNumber[j2]; j2++) {
                        contact['phoneNumber'].push(phone['$t']);
                    }
                }
                if (!contact['name']) {
                    contact['name'] = contact['emails'][0] || "<Unknown>";
                }
                contact['name'] = contact['name'].toString().replace('<', '').replace('>', '');
                if (contact['name'].toString().indexOf('@') != -1) contact['name'] = '';
                if (contact['emails'] != '' && contact['name'] != '') {
                    contacts.push(contact);
                }
                /*  if (contact['name'] != '') {
                 var bigName = contact['name'];
                 var arrayName = bigName.split(" ");
                 contact['firstName'] = arrayName[0];
                 if (arrayName.length > 1) {
                 contact['lastName'] = arrayName[arrayName.length - 1];
                 }
                 }*/
            }

            $.each(contacts, function (key, value) {
                //  items.push( "<li>" + value.name + " | " + value.emails + " | " + value.phoneNumber + "</li>");
                var glyphicon = 'glyphicon-ok';
                var emails = value.emails;
                emails = emails.toString().replace('<', '').replace('>', '');
                var emailsSuccess = 'has-success';
                if (emails.toString().indexOf(',') != -1) {
                    //emailsSuccess = 'has-error';
                    //glyphicon = 'glyphicon-remove';
                    emails = emails.toString().substring(0, emails.toString().indexOf(','));
                }
                var name = value.name;
                items.push("<li id='li-" + key + "'>" + "<form name='form" + key + "' class='form-inline'>" +
                    "<div class='checkbox'>" +
                    "<label>" +
                    "<input class='check' type='checkbox' id='import" + key + "' name='import" + key + "' value='' aria-label='...'>" +
                    "</label>" +
                    "</div>" +
                    "<div class='form-group " + emailsSuccess + " has-feedback'>" +
                    "<label class='sr-only' for='exampleInputEmail3'>Email address</label>" +
                    "<div class='input-group'>" +
                    "<span class='input-group-addon'>@</span>" +
                    "<input type='text' class='form-control email-input' name='email" + key + "' placeholder='Email' value='" + emails + "'>" +
                    "</div>" +
                    "<span class='glyphicon " + glyphicon + " form-control-feedback' aria-hidden='true'></span>" +
                    "<span id='inputGroupSuccess3Status' class='sr-only'>(success)</span>" +
                    "</div>" +
                    "<div class='form-group'>" +
                    "<label class='sr-only' for='exampleInputName3'>Name</label>" +
                    "<input type='text' class='form-control name-input' id='name-" + key + "' name='name" + key + "' placeholder='Name' value='" + name + "'>" + " </ div>" +
                    "</form>" +
                    "</li>"
                );
                var contact = {
                    'key': key,
                    'name': name,
                    'id': key,
                    'emails': emails,
                    'phoneNumber': []
                };
                imports.push(contact);
            });
            console.log("Updating state");
            this.setState({imports: imports});
            console.log(this.state.imports);
            $("<ul />", {
                "id": "import-list",
                html: items.join(" ")
            }).appendTo("#content-results");
        }.bind(this));
    },
    handleAuthResult: function (authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
            authorizeButton.style.visibility = 'hidden';
            authorizeButton.style.display = 'none';
            this.makeApiCall(authResult);
        } else {
            authorizeButton.style.visibility = '';
            authorizeButton.style.display = 'block';
            authorizeButton.onclick = this.handleAuthClick;
        }
    },
    handleAuthClick: function () {
        console.log("Inside handleAuthClick");
        var spinnerButton = document.getElementById('spinner-button');
        var authorizeButton = document.getElementById('authorize-button');
        authorizeButton.style.visibility = 'hidden';
        authorizeButton.style.display = 'none';
        spinnerButton.style.visibility = '';
        spinnerButton.style.display = 'block';
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, this.handleAuthResult);
        return false;
    },
    checkAuth: function () {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, this.handleAuthResult);
    },
    handleClientLoad: function () {
        console.log(apiKey);
        gapi.client.setApiKey(apiKey);
        window.setTimeout(this.checkAuth, 1);
    },
    validateEntry: function (elem, key) {
        console.log(key)
    },
    componentDidMount: function () {
        var importButton = document.getElementById('import-button');
        importButton.style.visibility = 'hidden';
        importButton.style.display = 'none';
        var searchBox = document.getElementById('search-box');
        searchBox.style.visibility = 'hidden';
        searchBox.style.display = 'none';
        var spinnerButton = document.getElementById('spinner-button');
        spinnerButton.style.visibility = 'hidden';
        spinnerButton.style.display = 'none';
        var checkAll = document.getElementById('check-all-container');
        checkAll.style.visibility = 'hidden';
        checkAll.style.display = 'none';
        console.log(this.state.user);
        this.handleClientLoad;

        $("#checkAll").click(function () {
            $(".check").prop('checked', $(this).prop('checked'));
        });
    },
    handleFilterUpdate: function (filterValue) {
        console.log('Filter Value: ' + filterValue);
        var container = $('#content-results'),
            scrollTo = $('#li-' + filterValue),
            hightlightName = $('#name-' + filterValue);
        console.log(scrollTo);
        container.animate({
            scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
        });
        hightlightName.addClass('highlighted');
        setTimeout(function () {
            hightlightName.removeClass('highlighted');
        }, 3000);
    },
    handleResults: function (results) {
        console.log("In handleResults");
        console.log(results);
        //TODO: Overwrite screen and display results, showing how many records imported, etc...
        var importButton = document.getElementById('import-button');
        importButton.style.visibility = 'hidden';
        importButton.style.display = 'none';
        var searchBox = document.getElementById('search-box');
        searchBox.style.visibility = 'hidden';
        searchBox.style.display = 'none';
        var spinnerButton = document.getElementById('spinner-button');
        spinnerButton.style.visibility = 'hidden';
        spinnerButton.style.display = 'none';
        var checkAll = document.getElementById('check-all-container');
        checkAll.style.visibility = 'hidden';
        checkAll.style.display = 'none';
        if (results > 0) {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label class=\"error\"><strong>Congratulations!</strong> You successfully imported " + results + " contact(s)!</label></div>";
        } else {
            document.getElementById("content-results").innerHTML = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><label class=\"error\"><strong>Heads Up!</strong> There was a problem during import, please try again!</label></div>";
        }
        $('.alert-dismissible').on('closed.bs.alert', function () {
            console.log('After hide message, show Add button');
            var authorizeButton = document.getElementById('authorize-button');
            authorizeButton.style.visibility = '';
            authorizeButton.style.display = 'block';
        });
    },
    render: function () {
        return (
            <div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <div className="col-md-4 col-md-offset-1">
                            <a onClick={this.handleAuthClick} id="authorize-button"
                               className="btn btn-block btn-social btn-google">
                                <i className="fa fa-google"></i>
                                Add contacts from Gmail
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 col-md-offset-1">
                        <div className="form-gorup">
                            <a onClick={this.handleImport} id="import-button"
                               className="btn btn-block btn-social btn-google">
                                <i className="fa fa-google"></i>
                                Import selected from Gmail
                            </a>
                            {this.state.view.showModal ?
                                <NewContactsModal user={this.props.user} contacts={this.state.contacts}
                                                  handleResults={this.handleResults}
                                                  handleHideModal={this.handleHideModal}/> : null}
                            <a id="spinner-button" className="btn btn-block btn-social btn-google">
                                <i id="importing-button-first-child"
                                   className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></i>
                                Importing...
                            </a>
                        </div>
                    </div>
                    <div id="search-box-container" className="col-md-5">
                        <ImportsSearch key={1} imports={this.state.imports} updateFilter={this.handleFilterUpdate}/>
                    </div>
                    <div id="check-all-container" className="checkbox">
                        <label>
                            <input className="check" id="checkAll" value="Check All" type="checkbox"/> Select All
                        </ label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div id="content-results">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});