console.log("SocialInviter:componentDidMount:begin");
// Path for Production to https://thereferralportal.com/oauth
// Path for Development to https://localhost/oauth
 var licenses = "lic_84090528-a1be-4b89-a479-bc038"; // TODO:license key Production
//var licenses = "lic_b7a2da15-4655-4ed9-97a3-7fb1d"; //license key development (localhost)
var selectedContacts;
var SIConfiguration = {
    "path": {
        "authpage": "https://thereferralportal.com/oauth" //replace the web url of oauth.html (TODO:Change this for Production)
    },
    content: {
        "step1": {
            "title": "Import your contacts from {0}.",
            "description": "We found {0} people from your address book. Select the people you'd like to import.",
            "selected": "{0} Selected",
            "selectall": "Select all",
            "validation": {
                "selectcontact": "Please select a contact to proceed"
            },
            "button": {
                "refresh": "Refresh",
                "proceed": "Import"
            }
        }
    },
    "callbacks": {
        "loaded": function loaded(service, data) {
            //Will be executed when all contacts were populated on the page.

            //service - selected service(gmail, yahoo etc)
            //data - is an array of object(contacts)
            //product - type of product friendsinviter | contactimporter | crmcontacts

            //Contacts will be available in data object
            console.log(data);
        },
        "proceed": function (event, service, product) {
            //Will be executed when user clicks the proceed button.
            //If you don't want to display the form when user clicks the proceed button then return false on this callback
            console.log(event);
            console.log(service);
            console.log(product);
            selectedContacts = socialinviter.contactimporter.getSelectedContacts();
            console.log(selectedContacts);
            var contacts = [];
            var imports = [];
            var count = 0;
            var glyphicon = 'glyphicon-ok';
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;;
            $.each(selectedContacts.addressbook, function(i) {
                var name = "";
                var fname = this.name.first_name;
                var lname = this.name.last_name;
                if (this.name.first_name == null || this.name.last_name == null) {
                    if (this.name.first_name != null) {
                        name = name.concat(this.name.first_name + ' ');
                    }
                    if (this.name.last_name != null) {
                        name = name.concat(this.name.last_name);
                    }
                } else {
                    name = this.name.first_name + ' ' + this.name.last_name;
                }
                var email = this.email[0];
                var address = [];
                var address1 = "";
                var city = "";
                var state = "";
                var zip = "";
                if (this.address.length > 0) {
                    address = this.address[0];
                    address1 = address.street;
                    address1 = address1.replace(/\+/g, ' ');
                    address1 = address1.replace(/%20/g, ' ');
                    city = address.city.replace(/\+/g, ' ');
                    city =  city.replace(/%20/g, ' ');
                    state = address.state;
                    zip = address.zip;
                }
                var phone = "";
                if (this.phone.length > 0) {
                    phone = this.phone[0].replace(/%20/g, ' ');
                    phone = phone.replace(/\+/g, ' ');
                }
                var emailsSuccess = 'has-success';
                var checked = "checked";
                var invite = "false";
                if (!pattern.test(email)) {
                    emailsSuccess = 'has-error';
                    glyphicon = 'glyphicon-remove';
                    checked = "";
                }
                count++;
                var contact = {
                    'key': count,
                    'name': name,
                    'fname': fname,
                    'lname': lname,
                    'business': '',
                    'profession': '',
                    'address1': address1,
                    'address2': '',
                    'city': city,
                    'state': state,
                    'zip': zip,
                    'phone': phone,
                    'fax': '',
                    'id':count,
                    'emails': email,
                    'emailsSuccess': emailsSuccess,
                    'glyphicon': glyphicon,
                    'checked': checked,
                    'invite': invite,
                };
                imports.push(contact);
            });
            globalVar.callback(imports);
            $('#loading-file').hide();
            if (service == 'gmail') {$("#service-type").val("Imported via Gmail");}
            if (service == 'yahoo') {$("#service-type").val("Imported via Yahoo");}
            if (service == 'outlook') {$("#service-type").val("Imported via Outlook");}
            if (service == '') {$("#service-type").val("Imported contact");}
            $("#content-results-container").show();
            $(".check").prop('checked', 'checked');
            $('#importing-contacts').fadeOut('slow');

        /*        var contact = {
                    'email': this.email[0],
                    'firstName': this.name.first_name + ' ' + this.name.last_name
                }
                var name = ""
                if (this.name.first_name == null || this.name.last_name == null) {
                    event.preventDefault();
                    if (this.name.first_name != null) {
                        name = name.concat(this.name.first_name + ' ');
                    }
                    if (this.name.last_name == null) {
                        name = name.concat(this.name.last_name);
                    }
                } else {
                    contacts.push(contact);
                }
            });
            var data = {
                id: $('#id').val(),
                contacts: contacts,
                service: service
            }
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $('#importing-contacts').fadeIn('slow');   */
           /* $.ajax({
                type: "POST",
                url: "/importContacts2",
                async:   true,
                data: formData,
                success: function(result) {
                    $('#importing-contacts').fadeOut('slow');
                    bootbox.alert("<strong>Congratulations!</strong> You successfully imported " + result.imports + " contacts!", function() {
                        console.log("Inside Success");
                    });
                },
                error: function(error) {
                    bootbox.alert("<strong>Heads Up!</strong> There was a problem during import, please try again!", function() {
                        console.log('Create import error message');
                    });
                    console.log(result);
                },
                dataType: "json",
                contentType : "application/json"
            }); */
            socialinviter.close();
            //event - event of the proceed button
            //service - selected service(gmail, yahoo etc)
            //product - type of product friendsinviter | contactimporter | crmcontacts
            return false;
        },
        "navigation": "Step 1 of 1"
    }
};
var fileref = document.createElement("script");
fileref.setAttribute("type", "text/javascript");
fileref.setAttribute("id", "apiscript");
fileref.setAttribute("src", "https://socialinviter.com/all.js?keys=" + licenses);
console.log(fileref);
try {
    document.body.appendChild(fileref);
} catch (a) {
    document.getElementsByTagName("head")[0].appendChild(fileref);
}
var loadInitFlg = 0,
    socialinviter,
    loadConf = function loadConf() {
        window.setTimeout(function () {
            $(document).ready(function () {
                loadInitFlg++;
                socialinviter ? socialinviter.load(SIConfiguration) : 15 > loadInitFlg && window.setTimeout(loadConf, 200);
            });
        }, 250);
    };window.setTimeout(loadConf, 200);
console.log("SocialInviter:componentDidMount:end");