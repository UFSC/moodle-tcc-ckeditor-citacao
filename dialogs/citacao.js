CKEDITOR.dialog.add('citacaoDialog', function (editor) {

    var general_refs = [];
    var urls = [];
    $.ajax({
        dataType: "json",
        url: 'bibliographies.json',
        async: false,
        success: function (data) {
            //TODO melhorar a construção do array que vai para a dialog
            urls = data.urls;
            $.each(data.references.general_refs, function (key, val) {
                general_refs.push([val.general_ref.reference_text, ['g', val.general_ref.id, val.general_ref.direct_citation, val.general_ref.indirect_citation, val.general_ref.reference_text]]);
            });
        }
    });
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
                        type: 'select',
                        id: 'ref-list',
                        style: 'width: 400px',
                        label: 'Escolha a citação',
                        items: general_refs

                    },
                    {
                        type: 'fieldset',
                        id: 'fieldset-cit',
                        label: 'Tipo de Citação',
                        align: 'left',
                        style: 'margin-top: 50px',
                        children: [
                            {
                                type: 'radio',
                                id: 'ref-cit',
                                items: [
                                    [ 'Citação Direta', 'cd' ],
                                    [ 'Citação Indireta', 'ci' ]
                                ],
                                'default': 'cd'
                            }
                        ]
                    }
//                    ,
//                    {
//                        type: 'html',
//                        id: 'new-citacao',
//                        label: 'Criar Nova Citação',
//                        html: "<a href='/general_refs/new'>Criar Nova Referência</a>"
//                    }

                ]
            }
        ],
        onOk: function () {
            var selected_citacao = this.getValueOf('tab-general-ref', 'ref-list').split(',');
            var tipo_citacao = this.getValueOf('tab-general-ref', 'ref-cit');
            var id_citacao = selected_citacao[1];
            var ref_type = selected_citacao[0];

            if (tipo_citacao == 'cd') {
                var citacao_text = selected_citacao[2];
            } else {
                var citacao_text = selected_citacao[3];
            }


            CKEDITOR.plugins.citacao.createPlaceholder(editor, this, id_citacao, citacao_text, ref_type);
        }

    };


});