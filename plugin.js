CKEDITOR.plugins.add('citacao', {
    icons: 'citacao',
    onLoad: function () {
        CKEDITOR.addCss('.citacao-class' +
            '{' +
            'background-color: #ffff00;' +
            ( CKEDITOR.env.gecko ? 'cursor: default;' : '' ) +
            '}'
        );
    },
    init: function (editor) {

        editor.addCommand('createCitacao', new CKEDITOR.dialogCommand('citacaoDialog'));
        editor.addCommand('citacaoDialog', new CKEDITOR.dialogCommand('citacaoDialog'));
        editor.addCommand('editDialog', new CKEDITOR.dialogCommand('editDialog'));

        editor.ui.addButton('Citacao', {
            label: 'Inserir Citação',
            command: 'citacaoDialog',
            toolbar: 'editing'
        });

        CKEDITOR.dialog.add('citacaoDialog', this.path + 'dialogs/citacao.js');
        CKEDITOR.dialog.add('editDialog', this.path + 'dialogs/citacao.js');


    }
});


CKEDITOR.plugins.citacao = {
    createPlaceholder: function (editor, dialog, id_citacao, citacao_text, ref_type) {
        var citacao = editor.document.createElement('citacao');

        var content = '[[' + ref_type + id_citacao + ' ' + citacao_text + ']]';
        citacao.setAttributes({
            contentEditable: 'false',
            'class': 'citacao-class'
        });
        citacao.setAttribute('title', content);
        citacao.setAttribute('citacao-text', citacao_text);
        citacao.setAttribute('ref-type', ref_type);
        citacao.setAttribute('id', id_citacao);
        citacao.setText(content);

        editor.insertElement(citacao);
        return null;
    }
//    ,
//
//    getSelectedPlaceHolder: function( editor ) {
//        var range = editor.getSelection().getRanges()[ 0 ];
//        range.shrink( CKEDITOR.SHRINK_TEXT );
//        var node = range.startContainer;
//        while ( node && !( node.type == CKEDITOR.NODE_ELEMENT && node.data( 'cke-placeholder' ) ) )
//            node = node.getParent();
//        return node;
//    }
};
