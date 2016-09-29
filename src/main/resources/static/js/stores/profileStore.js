'use strict';

var ProfileStore = Reflux.createStore({
    listenables: [Actions],
    profileData: [],
    sourceUrl: '',

    init: function() {
        var profileid = $('#profileid').val();
        this.sourceUrl = '/api/users/'+profileid;
        console.log(this.sourceUrl);
        this.loadProfile();
    },

    loadProfile: function() {
        $.ajax({
            url: this.sourceUrl,
            dataType: 'json',
            cache: false,
            context: this,
            success: function(data) {
                console.log("ProfileStore:profileData:");
                console.log(data);
                this.profileData = data;
                this.trigger(this.profileData);
            }
        });
    }
});