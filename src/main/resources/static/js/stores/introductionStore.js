'use strict';

var IntroductionStore = Reflux.createStore({
    listenables: [Actions],
    user: [],
    sourceUrl: '',

    init: function() {
        var id = $('#id').val();
        this.sourceUrl = '/api/users/'+id;
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
                console.log(data);
                this.user = data;
                this.trigger(this.user);
            }
        });
    }
});