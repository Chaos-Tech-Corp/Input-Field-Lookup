# Input Field Lookup

This component creates a lookup field similar to the generic Salesforce Lookup fields to be used in Lightning components or applications.

## Usage

Define `modal_confirmation` component in a custom component markup:

```xml
<aura:component>

    <c:customLookup 
                    objectAPIName="Account" 
                    label="Relate to"
                    returnFields="['Name','Country']" 
                    queryFields="['Name','Description']"/>

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
