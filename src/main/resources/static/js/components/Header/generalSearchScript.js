$( document ).ready(function() {
    function formatGeneralResponse (data){
        if(data.loading) return data.text;
        var markup = '<div class="clearfix">' +
            '<div class="col-sm-2">' +
            '<img class="img-circle" src="/api/remoteFiles/view/' + data.avatar + '" style="max-width: 60px" />' +
            '</div>' +
            '<div class="col-sm-10">' +
            '<div class="clearfix">' +
            '<div class="full-name">' + data.firstName + ' ' + data.lastName + '</div>' +
            '<div><i class="fa fa-star"></i> 9.2 </div>' +
            '</div>';

        /*if (repo.description) {
         markup += '<div>' + repo.description + '</div>';
         }*/

        markup += '</div></div>';

        console.log(markup);
        return markup;
    }

    function formatGeneralSelection (data) {
        return data.firstName + ' ' + data.lastName || data.text;
    }

    $('#selectGeneralSearch').select2({
        /*   placeholder: {
         id: "-1",
         placeholder: "Search..."
         },
         allowClear: true, */
        minimumInputLength: 3,
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
            processResults: function (data, params) {
                //   console.log(data);
                if (!$.isEmptyObject(data)) {
                    var select2Data = $.map(data._embedded.userDTOList, function (obj) {
                        obj.id = obj.email;
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
        templateResult: formatGeneralResponse,
        templateSelection: formatGeneralSelection,
        escapeMarkup:function(t) { return t; }
    });
});