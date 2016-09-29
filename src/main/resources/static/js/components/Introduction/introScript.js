$( document ).ready(function() {
    /* drag and drop */
    $(".source li").draggable({
        addClasses: false,
        appendTo: "body",
        helper: "clone"
    });

    $(".target").droppable({
        addClasses: false,
        /*activeClass: "listActive", */
        accept: ":not(.ui-sortable-helper)",
        activate: function() {
            //    $(this).find(".placeholder").attr("class", "placeholderOn");
            $(this).attr("class", "panel-body panel-body-border-on target");
        },
        deactivate: function() {
            //      $(this).find(".placeholderOn").attr("class", "placeholder");
            $(this).attr("class", "panel-body panel-body-border target");
        },
        drop: function(event, ui) {
            //Instead of removing the placeholder, insert image dragged here ????????
            //   $(this).find(".placeholder").remove();
            $(this).find(".placeholder").attr("class", "placeholderDropped");
            $(this).attr("class", "panel-body panel-body-border");
            var avatarSrc = ui.draggable.find("img").attr("src");
            var avatar = $(this).find("img").attr("id");
            console.log("avatar: " + avatar);
            console.log("avatarSrc: " + avatarSrc);
            $(this).find("img").attr("src", avatarSrc);
            var userId = ui.draggable.find("img").attr("id");
            updateValues(avatar, avatarSrc, userId);
            //   var link = $("<a href='#' class='dismiss'>x</a>");
            //   var list = $("<li></li>").text(ui.draggable.text());
            //   $(list).append(link);
            //   $(list).appendTo(this);
            //  updateValues();
        }
    }).sortable({
        items: "li:not(.placeholder)",
        sort: function() {
            $(this).removeClass("listActive");
        },
        update: function() {
            updateValues();
        }
    }).on("click", ".dismiss", function(event) {
        event.preventDefault();
        $(this).parent().remove();
        // updateValues();
    });

    function updateValues(avatar, avatarSrc, userId) {
        // get data from server and populate
        var data = {
            id: userId
        };
        data = JSON.stringify(data, null, ' ');
        $.ajax({
            type: "POST",
            url: "/getUserById",
            data: data,
            success: function(result){
                PopulateResults(avatar, result);
            },
            error: function(error) {
                document.getElementById("validationError").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><label className=\"error\"><strong>Oh snap!</strong> Something went wrong. Try again!</label></div>";
                return false;
            },
            dataType: "json",
            contentType : "application/json"
        });
    }

    function PopulateResults(avatar, data)  {
        console.log(data);
        if (avatar == "avatar1") {
            // var data = [{ id: 0, email: 'jdoe@gmail.com', text: 'John Doe', firstName: 'John', lastName: 'Doe',  avatar: 'avatar-1'}];
            $('#contactid1').val(data.id);
            $('#contact1').val(data.email);
            $('#contactAvatar1').val(data.avatar);
            $("#confirmationAvatar1").attr('src', '/api/remoteFiles/view/'+data.avatar);
            $('#contact1SelectedName').text(data.firstName + ' ' + data.lastName);
            $('#contact1SelectedProfession').text(data.profession);
            $('#selectContact1Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
            $('#selectContact1Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
        } else {
            //var data = [{ id: 0,  email: 'jdoe@gmail.com', text: 'John Doe', firstName: 'John', lastName: 'Doe',  avatar: 'avatar-1'}];
            $('#contactid2').val(data.id);
            $('#contact2').val(data.email);
            $('#contactAvatar2').val(data.avatar);
            $("#confirmationAvatar2").attr('src', '/api/remoteFiles/view/'+data.avatar);
            $('#contact2SelectedName').text(data.firstName + ' ' + data.lastName);
            $('#contact2SelectedProfession').text(data.profession);
            $('#selectContact2Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
            $('#selectContact2Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
        }
    }

    /* drag and drop end */

    $(".js-example-placeholder-multiple").select2({
        placeholder: "Enter a name or Email address"
    });

    function formatAjaxResponse (data){
        if(data.loading) return data.text;
        var markup = '<div class="clearfix">' +
            '<div class="col-sm-2">' +
            '<img class="img-circle" src="/api/remoteFiles/view/' + data.avatar + '" style="max-width: 40px" />' +
            '</div>' +
            '<div class="col-sm-10">' +
            '<div class="clearfix">' +
            '<div>' + data.firstName + ' ' + data.lastName + '</div>' +
            '<div><i class="fa fa-star"></i> '+ data.score + '</div>' +
            '</div>';

        /*if (repo.description) {
         markup += '<div>' + repo.description + '</div>';
         }*/

        markup += '</div></div>';

        console.log(markup);
        return markup;
    }

    function formatAjaxSelection2 (data) {
        var avatar2 = $('#avatar2');
        avatar2.attr('src', '/api/remoteFiles/view/'+data.avatar);
        avatar2.attr('class', 'contact-img img-circle');
        avatar2.parents('li').attr('class', 'placeholderDropped');
        $('#contactid2').val(data.id);
        $('#contact2').val(data.email);
        $('#contactAvatar2').val(data.avatar);
        $("#confirmationAvatar2").attr('src', '/api/remoteFiles/view/'+data.avatar);
        $('#contact2SelectedName').text(data.firstName + ' ' + data.lastName);
        $('#contact2SelectedProfession').text(data.profession);
        $('#selectContact2Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
        $('#selectContact2Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
        return data.firstName + ' ' + data.lastName || data.text;
    }

    function formatAjaxSelection (data) {
        var avatar1 = $('#avatar1');
        avatar1.attr('src', '/api/remoteFiles/view/'+data.avatar);
        avatar1.attr('class', 'contact-img img-circle');
        avatar1.parents('li').attr('class', 'placeholderDropped');
        $('#contactid1').val(data.id);
        $('#contact1').val(data.email);
        $('#contactAvatar1').val(data.avatar);
        $("#confirmationAvatar2").attr('src', '/api/remoteFiles/view/'+data.avatar);
        $('#contact1SelectedName').text(data.firstName + ' ' + data.lastName);
        $('#contact1SelectedProfession').text(data.profession);
        $('#selectContact1Edit').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8 padding-left-30 hidden');
        $('#selectContact1Selected').attr('class', 'col-lg-10 col-md-8 col-sm-8 col-xs-8');
        return data.firstName + ' ' + data.lastName || data.text;
    }

    $('#selectContact1').select2({
        /*   placeholder: {
         id: "-1",
         placeholder: "Enter a name or Email address"
         },
         allowClear: true, */
        minimumInputLength: 2,
        ajax: {
            url: "/userSearch",
            method: 'POST',
            dataType: 'json',
            contentType : "application/json",
            delay: 250,
            data: function (params) {
                return {
                    search: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data) {
                console.log(data);
                if (!$.isEmptyObject(data)) {
                    var select2Data = $.map(data._embedded.userDTOList, function (obj) {
                     //   obj.id = obj.email;
                        obj.text = obj.firstName + ' ' + obj.lastName;

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
        templateResult: formatAjaxResponse,
        templateSelection: formatAjaxSelection,
        escapeMarkup:function(t) { return t; }
    });

    $('#selectContact2').select2({
        /*    placeholder: {
         id: "-1",
         placeholder: "Enter a name or Email address"
         },
         allowClear: true, */
        minimumInputLength: 2,
        ajax: {
            url: "/userSearch",
            method: 'POST',
            dataType: 'json',
            contentType : "application/json",
            delay: 250,
            data: function (params) {
                return {
                    search: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data) {
                console.log(data);
                if (!$.isEmptyObject(data)) {
                    var select2Data = $.map(data._embedded.userDTOList, function (obj) {
                      //  obj.id = obj.email;
                        obj.text = obj.firstName + ' ' + obj.lastName;

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
        templateResult: formatAjaxResponse,
        templateSelection: formatAjaxSelection2,
        escapeMarkup:function(t) { return t; }
    });

    $(function(){
        $("#searchclear").click(function(){
            $("#selectContact1").select2('val', 'All');
            $("#selectContact2").select2('val', 'All');
        });
    });
});

