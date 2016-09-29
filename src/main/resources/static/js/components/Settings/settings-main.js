$(document).ready(function() {
    //toggle `popup` / `inline` mode
    $.fn.editable.defaults.mode = 'inline';

    //make username editable
    $('#firstName').editable();
    $('#lastName').editable();
    $('#email').editable('option', 'validate', function (v) {
        if (!v) return 'Required field!';
    });
    $('#password').editable();

    $('#profession').editable({
        value: 2,
        source: [
            {value: 1, text: 'Real Estate Developer'},
            {value: 2, text: 'Real Estate Agent'},
            {value: 3, text: 'Mortgage Broker'},
            {value: 4, text: 'Title Representative'}
        ]
    });
    $('#license').editable();
    $('#licenseExpiration').editable({
        format: 'YYYY-MM-DD',
        viewformat: 'DD.MM.YYYY',
        template: 'D / MMMM / YYYY',
        combodate: {
            minYear: 1970,
            maxYear: 2050,
            minuteStep: 1
        }
    });


    var btnCust = '<button type="button" class="btn btn-default" title="Save file" ' +
        'onclick="alert(\'Call your save file code here.\')">' +
        '<i class="glyphicon glyphicon-save-file"></i>' +
        '</button>';
    $("#avatar").fileinput({
        overwriteInitial: true,
        maxFileSize: 1500,
        showClose: false,
        showCaption: false,
        browseLabel: '',
        removeLabel: '',
        browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
        removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
        removeTitle: 'Cancel or reset changes',
        elErrorContainer: '#kv-avatar-errors',
        msgErrorClass: 'alert alert-block alert-danger',
        defaultPreviewContent: '<img class="avatar-img" src="../images/user-profile-image-10.jpg" alt="Your Avatar">',
        layoutTemplates: {main2: '{preview} ' +  btnCust + ' {remove} {browse}'},
        allowedFileExtensions: ["jpg", "png", "gif"]
    });

    $("#progressbar").css("width", "60%");
});