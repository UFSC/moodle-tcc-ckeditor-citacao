(function() {
    function createDialog(editor, isEdit) {
        var general_refs = [];
        var book_refs = [];
        var urls = [];
        $.ajax({
            dataType: "json",
            url: '/bibliographies.json',
            async: false,
            success: function(data) {
                //TODO: melhorar a construção do array que vai para a dialog
                urls = data.urls;

                if (data.references.general_refs != null) {
                    $.each(data.references.general_refs, function(key, val) {
                        general_refs.push([val.general_ref.reference_text, ['G', val.general_ref.id, val.general_ref.direct_citation, val.general_ref.indirect_citation, val.general_ref.reference_text]]);
                    });
                }
                if (data.references.book_refs != null) {
                    $.each(data.references.book_refs, function(key, val) {
                        book_refs.push([val.book_ref.title, ['L', val.book_ref.id, val.book_ref.title]]);
                    });
                }

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
                        },
//                        {
//                            type: 'html',
//                            id: 'new-citacao',
//                            label: 'Criar Nova Citação',
//                            html: '<a href="' + urls.general_ref + '">Nova Referência</a>'
//                        }

                    ]

                },
                {
                    id: 'tab-book-ref',
                    label: 'Livros',
                    elements: [
                        {
                            type: 'select',
                            id: 'ref-list',
                            style: 'width: 400px',
                            label: 'Escolha a citação',
                            items: book_refs

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
                        },
//                        {
//                            type: 'html',
//                            id: 'new-citacao',
//                            label: 'Criar Nova Citação',
//                            html: '<a href="' + urls.book_ref + '">Nova Referência</a>'
//                        }

                    ]
                }

            ],
            onOk: function() {
                var selected_citacao = this.getValueOf(this._.currentTabId, 'ref-list').split(',');
                var tipo_citacao = this.getValueOf(this._.currentTabId, 'ref-cit');
                var id_citacao = selected_citacao[1];
                var ref_type = selected_citacao[0];

                if (this._.currentTabId == 'tab-book-ref') {
                    var citacao_text = tipo_citacao;
                } else {
                    if (tipo_citacao == 'cd') {
                        var citacao_text = selected_citacao[2];
                    } else {
                        var citacao_text = selected_citacao[3];
                    }
                }

                CKEDITOR.plugins.citacao.createPlaceholder(editor, this, id_citacao, citacao_text, ref_type, tipo_citacao);
            },
            onShow: function() {
                if (isEdit) {
                    this._element = CKEDITOR.plugins.citacao.getSelectedPlaceHolder(editor);
                }
                this.setupContent(this._element);
            }

        };
    }

    CKEDITOR.dialog.add('citacaoDialog', function(editor) {
        return createDialog(editor);
    });
    CKEDITOR.dialog.add('editDialog', function(editor) {
        return createDialog(editor, 1);
    });

})();


