# fw-form-wrapper



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Default                         |
| ------------------ | ------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `formSchema`       | --                  |             | `{ title: string; name: string; fields: ({ id: string; type: string; label: string; name: string; position: number; editable: boolean; custom: boolean; inputType: string; placeholder: string; required: boolean; fieldOptions: {}; fields: any[]; field_options?: undefined; filterable?: undefined; searchable?: undefined; link?: undefined; choices?: undefined; optionLabelPath?: undefined; optionValuePath?: undefined; visible?: undefined; deleted?: undefined; hint?: undefined; parent_id?: undefined; parent?: undefined; } \| { name: string; label: string; type: string; inputType: string; field_options: {}; filterable: boolean; searchable: boolean; required: boolean; link: string; choices: { id: number; value: string; position: number; }[]; id?: undefined; position?: undefined; editable?: undefined; custom?: undefined; placeholder?: undefined; fieldOptions?: undefined; fields?: undefined; optionLabelPath?: undefined; optionValuePath?: undefined; visible?: undefined; deleted?: undefined; hint?: undefined; parent_id?: undefined; parent?: undefined; } \| { id: string; type: string; label: string; name: string; position: number; editable: boolean; custom: boolean; required: boolean; inputType: string; placeholder: string; optionLabelPath: string; optionValuePath: string; choices: { id: string; value: string; position: number; }[]; fields: any[]; fieldOptions?: undefined; field_options?: undefined; filterable?: undefined; searchable?: undefined; link?: undefined; visible?: undefined; deleted?: undefined; hint?: undefined; parent_id?: undefined; parent?: undefined; } \| { id: string; name: string; label: string; type: string; inputType: string; position: number; required: boolean; editable: boolean; visible: boolean; deleted: boolean; link: any; placeholder: any; hint: any; field_options: {}; filterable: boolean; searchable: boolean; parent_id: any; choices: { id: number; value: string; position: number; }[]; custom?: undefined; fieldOptions?: undefined; fields?: undefined; optionLabelPath?: undefined; optionValuePath?: undefined; parent?: undefined; } \| { id: string; parent: any; type: string; label: string; name: string; position: number; editable: boolean; custom: boolean; required: boolean; inputType: string; placeholder: string; fieldOptions: {}; fields: any[]; field_options?: undefined; filterable?: undefined; searchable?: undefined; link?: undefined; choices?: undefined; optionLabelPath?: undefined; optionValuePath?: undefined; visible?: undefined; deleted?: undefined; hint?: undefined; parent_id?: undefined; })[]; }` | `formSchema`                    |
| `initialErrors`    | `initial-errors`    |             | `any`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `initialErrors as any`          |
| `initialValues`    | --                  |             | `{ age: string; is_indian_citizen: boolean; }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `initialValues`                 |
| `validationSchema` | `validation-schema` |             | `any`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `staticValidationSchema as any` |


## Methods

### `doReset() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `doSubmit() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [fw-form](../form)
- [fw-input](../input)
- [fw-textarea](../textarea)
- [fw-datepicker](../datepicker)
- [fw-checkbox](../checkbox)
- [fw-radio-group](../radio-group)
- [fw-radio](../radio)
- [fw-select](../select)
- [fw-timepicker](../timepicker)

### Graph
```mermaid
graph TD;
  fw-form-wrapper --> fw-form
  fw-form-wrapper --> fw-input
  fw-form-wrapper --> fw-textarea
  fw-form-wrapper --> fw-datepicker
  fw-form-wrapper --> fw-checkbox
  fw-form-wrapper --> fw-radio-group
  fw-form-wrapper --> fw-radio
  fw-form-wrapper --> fw-select
  fw-form-wrapper --> fw-timepicker
  fw-input --> fw-icon
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  fw-datepicker --> fw-popover
  fw-datepicker --> fw-input
  fw-datepicker --> fw-select
  fw-datepicker --> fw-select-option
  fw-datepicker --> fw-button
  fw-select --> fw-tag
  fw-select --> fw-popover
  fw-select --> fw-button
  fw-select --> fw-spinner
  fw-select --> fw-icon
  fw-select --> fw-list-options
  fw-tag --> fw-avatar
  fw-tag --> fw-icon
  fw-button --> fw-spinner
  fw-button --> fw-icon
  fw-list-options --> fw-select-option
  fw-list-options --> fw-input
  fw-select-option --> fw-icon
  fw-select-option --> fw-checkbox
  fw-select-option --> fw-avatar
  fw-timepicker --> fw-select
  fw-timepicker --> fw-select-option
  style fw-form-wrapper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
