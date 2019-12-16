({
    doInit : function(component, event, helper) {
		//show spinner
        component.set("v.Loading", true);
        
        component.set('v.tableColumns', [
            {label: 'Product', fieldName: 'Product2Name', type: 'text'},
            {label: 'Quantity', fieldName: 'Quantity', type: 'number'},
            {label: 'Total Price', fieldName: 'TotalPrice', type: 'currency'},
            {
                label: 'Start date',
                fieldName: 'ServiceDate',
                type: 'date',
                typeAttributes: {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }
            },
            {label: 'Fund', fieldName: 'FundName', type: 'text'}
        ]);
        
        let action = component.get("c.GetSiblings");
        action.setParams({ Id : component.get("v.recordId") });
        action.setCallback(this, function(response) {
            component.set("v.relatedOrders", response.getReturnValue());
            //hide spinner
        	component.set("v.Loading", false);
            
        });
        $A.enqueueAction(action);
        
        
	},
    

    handleRefreshClick : function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    },
    
    showSplit : function(component, event, helper) {
        component.set("v.Loading", true);
        let action = component.get("c.GetOrderItems");
        action.setParams({ Id : component.get("v.recordId") });
        action.setCallback(this, function(response) {
            var data = response.getReturnValue();
            for(var i = 0; i < data.length; i++) {
                data[i].Product2Name = data[i].Product2.Name;
                if (data[i].Order_Fund__r) {
                data[i].FundName = data[i].Order_Fund__r.Fund_F_Name__c;
                }
            }
            component.set("v.data", data);
            component.set("v.showSplit", true);
            component.set("v.Loading", false);
        });
        $A.enqueueAction(action);
        
    },
    
    hideSplit : function(component, event, helper) {
        component.set("v.showSplit", false);
    },
    
    updateSelectedRows : function(component, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        component.set('v.selectedRows', selectedRows);
    },
    
    doSplit : function(component, event, helper) {
        component.set("v.Loading", true);
        var selectedRows = component.get('v.selectedRows'),
            selectedIds = [];
        
        for (var i = 0; i< selectedRows.length; i++) {
            selectedIds.push(selectedRows[i].Id);
        }
        console.log(selectedIds);
        component.set("v.showSplit", false);
        let action = component.get("c.SplitOrder");
        action.setParams({ Id : component.get("v.recordId"), ProductIds: selectedIds });
        action.setCallback(this, function(response) {
            $A.get('e.force:refreshView').fire();
        });
        $A.enqueueAction(action);

    }
})
