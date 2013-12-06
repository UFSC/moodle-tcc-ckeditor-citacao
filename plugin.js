CKEDITOR.plugins.add('citacao', {
    icons: 'citacao',
    requires: 'dialog',
    onLoad: function() {
        CKEDITOR.addCss('.citacao-class' +
            '{' +
            'background-color: #ffff00;' +
            ( CKEDITOR.env.gecko ? 'cursor: default;' : '' ) +
            '}'
        );
    },
    init: function(editor) {


        // Registra as funções no editor que irão carregar as Janelas de inserção e edição
        editor.addCommand('insertCitation', new CKEDITOR.dialogCommand('insertCitation'));
        editor.addCommand('editCitation', new CKEDITOR.dialogCommand('editCitation'));

        // Acrescenta o botão de inserir citação
        editor.ui.addButton('Citacao', {
            label: 'Inserir Citação',
            command: 'insertCitation',
            toolbar: 'editing'
        });

        // Adiciona um item de menu no botão direito para editar a citação
//        if (editor.contextMenu) {
//            editor.addMenuGroup('citacao', 20);
//            editor.addMenuItems({
//                editCitationItem: {
//                    label: 'Editar Citação',
//                    command: 'editCitation',
//                    group: 'citacao',
//                    order: 1,
//                    icon: 'citacao'
//                }
//            });
//
//            editor.contextMenu.addListener(function(element) {
//                if (!element || !element.hasClass('citacao-class'))
//                    return null;
//                return { editCitationItem: CKEDITOR.TRISTATE_OFF };
//            });
//        }

        // associa evento de duplo click no item ao comando de edição
//        editor.on('doubleclick', function(evt) {
//            if (CKEDITOR.plugins.citacao.getSelectedCitation(editor))
//                evt.data.dialog = 'editCitation';
//        });

        editor.on('contentDom', function() {
            editor.editable().on('resizestart', function(evt) {
                if (editor.getSelection().getSelectedElement().hasClass('citacao-class'))
                    evt.data.preventDefault();
            });
        });


        // associa as janelas de inserção e edição e aponta o javascript onde elas estão definidas
        CKEDITOR.dialog.add('insertCitation', this.path + 'dialogs/citacao.js');
        CKEDITOR.dialog.add('editCitation', this.path + 'dialogs/citacao.js');
    }
});

// Namespace com todas as funções específicas do plugin
CKEDITOR.plugins.citacao = {
    createPlaceholder: function(editor, dialog, id_citacao, citacao_text, ref_type, citacao_type, p, reference_id) {
        var citacao = editor.document.createElement('citacao');


        var pagina = 'p. ' + p
        if ((p != '') && (!isNaN(p)) && (p != null)) {
            citacao_text = citacao_text.replace(')', ', ' + pagina + ')')
        }
        var content = citacao_text;

        citacao.setAttributes({
            contentEditable: 'false',
            'data-cke-citacao': 1,
            'class': 'citacao-class'
        });
        citacao.setAttribute('reference_id', reference_id);
        citacao.setAttribute('pagina', p);
        citacao.setAttribute('title', content);
        citacao.setAttribute('citacao-text', citacao_text);
        citacao.setAttribute('ref-type', ref_type);
        citacao.setAttribute('citacao_type', citacao_type);
        citacao.setAttribute('id', id_citacao);
        if (citacao_text == undefined || citacao_text == "") {
            citacao.setText('')
        } else {
            citacao.setText(content);
        }

        editor.insertElement(citacao);
        return null;
    },
    getSelectedCitation: function(editor) {
        var range = editor.getSelection().getRanges()[ 0 ];
        range.shrink(CKEDITOR.SHRINK_TEXT);
        var node = range.startContainer;
        while (node && !( node.type == CKEDITOR.NODE_ELEMENT && node.hasClass('citacao-class') ))
            node = node.getParent();
        return node;
    }
};
