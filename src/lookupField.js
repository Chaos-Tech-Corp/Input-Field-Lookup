({
    doInit : function(component,event,helper){
        var action = component.get("c.findObjectIcon");
        action.setParams({'sObjectName' : component.get("v.sObjectAPIName")});
        action.setCallback(this, function(response) {
            component.set("v.IconName", response.getReturnValue());
        });
        $A.enqueueAction(action);
        
        var returnFields =  component.get("v.returnFields"),
            queryFields =  component.get("v.queryFields");
        
        if (returnFields == null || returnFields.length <= 0) {
            component.set("v.returnFields", ['Name']);
        }
        
        if (queryFields == null || queryFields.length <= 0) {
            component.set("v.queryFields", ['Name']);
        }
    },
    
    onFocus : function(component,event,helper){
        var inputBox = component.find("lookup-input-box");
        $A.util.addClass(inputBox, 'slds-is-open');
        $A.util.removeClass(inputBox, 'slds-is-close');
        
        $A.util.addClass(component.find("lookup-input-box"),'slds-has-focus');
    },
    
    onBlur : function(component,event,helper){       
        var inputBox = component.find("lookup-input-box");
        $A.util.addClass(inputBox, 'slds-is-close');
        $A.util.removeClass(inputBox, 'slds-is-open');
        
        $A.util.removeClass(component.find("lookup-input-box"),'slds-has-focus');
    },
    
    handleKeyUp : function(component, event, helper) {
        
        var searchText = component.get('v.searchText');
		
        if (searchText == null || searchText.trim().length < 3) {
            /*component.set("v.listOfSearchRecords", null ); 
            var forclose = component.find("lookup-container");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');*/
            return;
        }

        //do not repeat the search if nothing changed
        if (component.lastSearchText !== searchText) {
            component.lastSearchText = searchText;
        } else {
            return;
        }
        
        
        component.set("v.isSearching", true);        
        var action = component.get("c.SearchRecords"),
            returnFields = component.get("v.returnFields");
        
        action.setParams({
            'ObjectName' : component.get("v.sObjectAPIName"),
            'ReturnFields' :  returnFields,
            'QueryFields' :  component.get("v.queryFields"),
            'SearchText': searchText,
            'SortColumn' : component.get("v.sortColumn"),
            'SortOrder' : component.get("v.sortOrder"),
            'MaxResults' : component.get("v.maxResults")
        });
        
        action.setCallback(this, function(response) {
            var results = response.getReturnValue();
            if (results != null) {
                debugger;
                for (var i = 0; i < results.length; i++) {
                    
                    results[i]['Field0'] = results[i][returnFields[0]];    
                    
                    for(var j = 1; j < returnFields.length; j++){
                        results[i]['Field1'] = (results[i]['Field1'] || '') + ' · ' + results[i][returnFields[j]];    
                    }
                    if (results[i]['Field1']) {
                        results[i]['Field1'] = results[i]['Field1'].substring(3);
                    }
                }
                component.set("v.searchResult", results);
            } else {
                
            }
            component.set("v.isSearching", false);
        });
        $A.enqueueAction(action);

    }    
    
})
