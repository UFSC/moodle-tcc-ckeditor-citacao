(function () {
    function createDialog(editor, isEdit) {
        var result = [];
        $.ajax({
            dataType: "json",
            url: '/bibliographies.json',
            async: false,
            success: function (data) {
                result = data;
            }
        });
        var output = [];
        //TODO: Refatoração desse(s) loop(s)
        $.each(result, function (key, val) {

            var element_items = [];

            // Adapta a estrutura vinda do ajax para uso no plugin.
            $.each(val.collection, function (key, val) {
                var obj = [];
                var objects = [];
                obj.push(val.direct_citation);
                obj.push(val.indirect_citation);

                $.each(val, function (key, val) {
                    obj.push(val);
                });
                objects.push(obj);
                element_items.push([val.display_message, objects]);
            });

            var elements = [buildElement(element_items), buildTipoCitacaoChooseBox(val.tab_name.toLowerCase())];
            //var elements = [buildElement(element_items), buildTipoCitacaoChooseBox(val.tab_name.toLowerCase()), buildCreateNewButton(val.new_url)];

            // Valores para criar tab
            var id = val.tab_name.toLowerCase();
            var label = val.tab_name;
            var obj = {id: id, label: label, elements: elements};
            output.push(obj);
        });

        var retorno = { title: 'Adicionar Citação', minWidth: 400, minHeight: 200,
            contents: output,
            onOk: function () {
                var replace = this.getValueOf(this._.currentTabId,'ref-list').replace(/,[\W]/g,'&&&');
                var selected_citacao = replace.split(',');
                var tipo_citacao = this.getValueOf(this._.currentTabId, 'ref-cit-' + this._.currentTabId);
                var ref_type = this._.currentTabId;

                var id_citacao = selected_citacao[2];

                if (this._.currentTabId == 'gerais') {
                    if (tipo_citacao == 'cd') {
                        var citacao_text = selected_citacao[2].replace('&&&', ', ');
                    } else {
                        var citacao_text = selected_citacao[3].replace('&&&', ', ');
                    }
                } else {
                    if (tipo_citacao == 'cd') {
                        var citacao_text = selected_citacao[0].replace('&&&', ', ');
                    } else {
                        var citacao_text = selected_citacao[1].replace('&&&', ', ');
                    }
                }

                CKEDITOR.plugins.citacao.createPlaceholder(editor, this, id_citacao, citacao_text, ref_type, tipo_citacao);
            },
            onShow: function () {
                if (isEdit) {
                    this._element = CKEDITOR.plugins.citacao.getSelectedPlaceHolder(editor);
                }
                this.setupContent(this._element);
            }
        };
        return retorno;
    }

    CKEDITOR.dialog.add('citacaoDialog', function (editor) {
        return createDialog(editor);
    });
    CKEDITOR.dialog.add('editDialog', function (editor) {
        return createDialog(editor, 1);
    });

})();
function buildTipoCitacaoChooseBox(idref) {
    return {
        type: 'fieldset',
        id: 'fieldset-cit',
        label: 'Tipo de Citação',
        align: 'left',
        style: 'margin-top: 50px',
        children: [
            {
                type: 'radio', id: 'ref-cit-' + idref,
                items: [
                    [ 'Citação Direta', 'cd' ],
                    [ 'Citação Indireta', 'ci' ]
                ], 'default': 'cd'
            }
        ]};
}
function buildElement(element_items) {
    return {
        type: 'select',
        id: 'ref-list',
        style: 'width: 400px',
        label: 'Escolha a citação',
        items: element_items};
}
function buildCreateNewButton(url) {
    return   {
        type: 'html',
        id: 'new-citacao',
        label: 'Criar Nova Referências',
        html: '<a href="' + url + '">Nova Referência</a>'
    };
}


