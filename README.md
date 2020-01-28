[![Deploy](https://deploy2.org/dist/deploy2org.svg)](https://deploy2.org/deploy)

# Input Field Lookup

This component creates a lookup field similar to the generic Salesforce Lookup fields to be used in Lightning components or applications.

It automatically loads the object icon and allows to create a new record similar the native component (it won't navigate away and will select it after creation).

Default state:
![default](static/lookup_default.png?raw=true)

Focused, showing recent items:
![focused](static/lookup_focused.png?raw=true)

Record Selected:
![selected](static/lookup_selected.png?raw=true)

Record Selected and Disabled:
![disabled](static/lookup_selected_disabled.png?raw=true)



## Usage

Define `lookupField` component in a custom component markup:

```xml
<aura:component>

    <aura:attribute name="selectedId" type="String" />
    
    <c:lookupField 
                    objectAPIName="Account" 
                    label="Relate to"
                    returnFields="['Name','Phone','Website']" 
                    queryFields="['Name','Phone','Website']"
                    selectedId="{!v.selectedId}"/>

</aura:component>
```

## Properties

- `objectAPIName` _(String)_ - The API name of the object.
- `label` _(String)_ - The label of the input field _(optional)_.
- `variant` _(String)_ - Changes the appearance of the component. Accepted values are `standard` and `label-hidden`. Defaults to `standard` _(optional)_.
- `showIcon` _(Boolean)_ - Show the Icon of the Object (Tab). Defaults to `true` _(optional)_.
- `returnFields` _(List)_ -  The list of fields to display in the search results. Default displays only `Name` _(optional)_.
- `queryFields` _(List)_ -  The list of fields to search into. Default displays only `Name` _(optional)_.
- `maxResults` _(Integer)_ - Maximum numbers of records in the search. Defaults to `5` _(optional)_.
- `sortColumn` _(String)_ - Field used to sort the search results. Defaults to `CreatedDate` _(optional)_.
- `sortOrder` _(String)_ - Field used to define the sort direction of the search results. Defaults to `DESC` _(optional)_.
- `showRecent` _(Boolean)_ - Indicates whether to display the recent user records when focus. Defaults to `true` _(optional)_.
- `showAddNew` _(Boolean)_ - Indicates whether to allow create a new record and relate to it. Defaults to `true` _(optional)_.
- `selectedId` _(Boolean)_ - Gets or Sets the RecordId of the Object. _(optional)_.
- `selectedName` _(Boolean)_ - Gets or Sets the `Name` of the Selected Record of the Object. _(optional)_.
- `disabled` _(Boolean)_ - Specifies whether the component should be displayed in a disabled state. Defaults to `false` _(optional)_.

### Notes & Considerations

The variable `selectedName` uses the first value in the `returnFields` parameter. If none is defined it will return the `Name` field of the Object.

When adding new record from the menu option `+ New _objectname_`, it won't navigate away, instead it selects the recently created record.

If you see the `Search Error!` message in the Search Results, check the fields you are using in the `returnFields` and `queryFields` parameters as they might not exists or they might not be available for query or filter (You cannot filter by the `Description` field in the `Account` object so you shouldn't use it as in the `queryFields` but you can use it in the `returnFields`).

### How to Deploy it in your Salesforce Org (Sandbox)

Open the Developer Console and proceed as follows:

1. Create a new Apex Class (File > New > Apex Class) and name it: `lookupfieldController`.
2. Create a new Lightning Event (File > New > Lightning Event) and name it `selectedsObjectRecordEvent`.
3. Create a new Lightning Component (File > New > Lightning Component) and name it `lookupField`.
4. Copy and pase the code from the SRC directory into the recently created files.
   - For the `Apex Class`: _lookupfieldController.apxc_
   - For the `Event`: _selectedsObjectRecordEvent.evt_
   - For the lightning component:
     - `COMPONENT`: _lookupField.cmp_
     - `CONTROLLER`: _lookupField.js_
     - `HELPER`: _lookupField.helper_
     - `STYLE`: _lookupField.css_


Alternatively you can use `deploy2.org` to deploy directly from Github to your Sandbox.

[![Deploy](https://deploy2.org/dist/deploy2org.svg)](https://deploy2.org/deploy)
