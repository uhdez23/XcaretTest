({
    getData : function(cmp) {
        var action = cmp.get('c.getItems');
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set('v.mydata', response.getReturnValue());
                console.log('Data:',response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },

    // Used to sort the 'Age' column
    sortBy: function(field, reverse, primer) {
        var key = primer
            ? function(x) {
                  return primer(x[field]);
              }
            : function(x) {
                  return x[field];
              };

        return function(a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    },

    handleSort: function(cmp, event) {
        var sortedBy = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');

        var data = cmp.get('v.mydata');
        //console.log('data',data);
        var cloneData = data.slice(0);
        //console.log('cloneData',cloneData);
        cloneData.sort((this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1)));
        //console.log('cloneData2',cloneData);
        
        cmp.set('v.mydata', cloneData);
        cmp.set('v.sortDirection', sortDirection);
        cmp.set('v.sortedBy', sortedBy);
    },

    removeBook: function (cmp, row) {
        var rows = cmp.get('v.mydata');
        console.log('rows',rows);
        var rowIndex = rows.indexOf(row);        
        console.log('rowIndex',rowIndex);

        for (var i = 0; i < rows.length; i++) {
            if(i == rowIndex){
                console.log('select::',rows[i].Id);
                var action = cmp.get('c.deleteItem');
                action.setParams({"idItem" : rows[i].Id});
                action.setCallback(this, $A.getCallback(function (response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        console.log('Status::'+response.getReturnValue());
                        if(response.getReturnValue() == 'Registro eliminado'){
                            rows.splice(rowIndex, 1);
                            cmp.set('v.mydata', rows);
                        }
                    } else if (state === "ERROR") {
                        var errors = response.getError();
                        console.error(errors);
                    }
                }));
                $A.enqueueAction(action);
                break;
            }
        }
    }

})