CKEDITOR.dialog.add('citacaoDialog', function (editor) {
    $.getJSON('ajax/build', function (data) {
        var items = [];

        $.each(data, function (key, val) {
            items.push([val.id, val.direct_citation, val.indirect_citation, val.reference_text]);
        });
        build(items);
    });

//    var response = $.ajax({
//        dataType: "json",
//        url: 'ajax/build',
//        async: false
//    });
//
//    var items = [];
//    $.each(response.responseJSON, function (key, val) {
//        items.push([val.id, val.direct_citation, val.indirect_citation, val.reference_text]);
//    });
//
//    alert(items);


});
function build(items){
    return {
        title: 'Adicionar Citação',
        minWidth: 400,
        minHeight: 200,

        contents: [
            {
                id: 'tab-general-ref',
                label: 'Referência Geral',
                elements: [
                    {
                        type: 'radio',
                        id: 'country',
                        label: 'Which country is bigger',
                        items: [['asdada', 'asdasd'], ['asdadasd', 'adasdasdas'] ]

                    }
                ]
            }
        ]
    };
}