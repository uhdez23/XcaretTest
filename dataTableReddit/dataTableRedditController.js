({
    init: function (cmp, event, helper) {
        var actions = [
            { label: 'Eliminar', name: 'delete' }
        ];
         cmp.set('v.mycolumns', [
             { label: 'Title', fieldName: 'title__c', type: 'text'},
             { label: 'Thumbnail', fieldName: 'thumbnail__c', type: 'text'},
             { label: 'Selftext', fieldName: 'selftext__c', type: 'text'},
             { label: 'Author Fullname', fieldName: 'author_fullname__c', type: 'text'},
             { label: 'Fecha de Modificación', fieldName: 'LastModifiedDate', sortable: true},
             { type: 'action', typeAttributes: { rowActions: actions } }
         ]);
         helper.getData(cmp);
     },

     handleSort: function(cmp, event, helper) {
        helper.handleSort(cmp, event);
    },

    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');

        if(action.name == 'delete'){
            helper.removeBook(cmp, row); 
        }
    }
 })