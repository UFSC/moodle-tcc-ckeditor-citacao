CKEDITOR.plugins.add( 'citacao', {
    icons: 'citacao',
    init: function( editor ) {

        editor.addCommand('citacaoDialog', new CKEDITOR.dialogCommand('citacaoDialog'));

        editor.ui.addButton( 'Citacao', {
            label: 'Inserir Citação',
            command: 'citacaoDialog',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'citacaoDialog', this.path + 'dialogs/citacao.js' );


    }
});