# Input (fw-input)
fw-input displays a single-line input box on the user interface and enables assigning a value to it. 

## Demo

You can use Input component for handling `Text`, `Number`, `Decimal` user input.

```html live
<fw-input
  label="Name"
  icon-left="add-contact"
  state-text="Do not enter your user ID"
  state="warning"
  placeholder="Enter your official name"
  required
  clear-input>
</fw-input>
<fw-input
  label="Password"
  state-text="Password is incorrect"
  state="error"
  required
  clear-input>
</fw-input>
<fw-input
  label="Verification Code"
placeholder="Enter the verification code sent to the registered email address"
  state="normal"
  clear-input>
</fw-input>
<fw-input
  label="Deprecated Field"
  disabled
  state="normal"
  clear-input>
</fw-input>
<fw-input
  label="Do Not Modify"
  value="Not applicable"
  readonly
  state="normal"
  clear-input>
</fw-input>
<fw-input value="123" type="number" label="Number Input"></fw-input>
<fw-input type="number" min="0" max="10" label="Number Input with min and max"></fw-input>
<fw-input value="3.001" type="number" step="0.1" max="5"
label="Decimal Input with step and max"
></fw-input>

```

## Usage

<code-group>
<code-block title="HTML">
```html
<fw-input
  label="Name"
  icon-left="add-contact"
  state-text="Do not enter your user ID"
  state="warning"
  placeholder="Enter your official name"
  required
  clear-input>
</fw-input>
<fw-input
  label="Password"
  state-text="Password is incorrect"
  state="error"
  required
  clear-input>
</fw-input>
<fw-input
  label="Verification Code"
placeholder="Enter the verification code sent to the registered email address"
  state="normal"
  clear-input>
</fw-input>
<fw-input
  label="Deprecated Field"
  disabled
  state="normal"
  clear-input>
</fw-input>
<fw-input
  label="Do Not Modify"
  value="Not applicable"
  readonly
  state="normal"
  clear-input>
</fw-input>
<fw-input value="123" type="number" label="Number Input"></fw-input>
<fw-input type="number" min="0" max="10" label="Number Input with min and max"></fw-input>
<fw-input value="3.001" type="number" step="0.1" max="5"
label="Decimal Input with step and max"
></fw-input>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwInput } from "@freshworks/crayons/react";
function App() {
  return (<div>
      <FwInput
      label="Name"
      iconLeft="add-contact"
      stateText="Do not enter your user ID"
      state="warning"
      placeholder="Enter your official name"
      required
      clearInput>
    </FwInput>
    <FwInput
      label="Password"
      stateText="Password is incorrect"
      state="error"
      required
      clearInput>
    </FwInput>
    <FwInput
      label="Verification Code"
      placeholder="Enter the verification code sent to the registered email address"
      state="normal"
      clearInput>
    </FwInput>
    <FwInput
      label="Deprecated Field"
      disabled
      state="normal"
      clearInput>
    </FwInput>
    <FwInput
      label="Do Not Modify"
      value="Not applicable"
      readonly
      state="normal"
      clearInput>
    </FwInput>
    <FwInput value="123" type="number" label="Number Input"></FwInput>
    <FwInput type="number" min={0} max={10} label="Number Input with min and max"></FwInput>
    <FwInput value="3.001" type="number" step="0.1" max={5}
    label="Decimal Input with step and max"
    ></FwInput>
 </div>);
```
</code-block>
</code-group>


<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                                                                                                                                                                                                                                                                               | Type                                     | Default          |
| -------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ---------------- |
| `autocomplete` | `autocomplete` | Specifies whether the browser can display suggestions to autocomplete the text value.                                                                                                                                                                                                                                     | `"off" \| "on"`                          | `'off'`          |
| `clearInput`   | `clear-input`  | Displays a right-justified clear icon in the text box. Clicking the icon clears the input text. If the attribute’s value is undefined, the value is set to false. For a read-only input box, the clear icon is not displayed unless a default value is specified for the input box.                                       | `boolean`                                | `false`          |
| `disabled`     | `disabled`     | Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.                                                                                                                                                                                                                | `boolean`                                | `false`          |
| `handleBlur`   | --             |                                                                                                                                                                                                                                                                                                                           | `(_e: any, _o: any) => void`             | `(_e, _o) => {}` |
| `handleFocus`  | --             |                                                                                                                                                                                                                                                                                                                           | `(_e: any, _o: any) => void`             | `(_e, _o) => {}` |
| `handleInput`  | --             |                                                                                                                                                                                                                                                                                                                           | `(_e: any, _o: any) => void`             | `(_e, _o) => {}` |
| `iconLeft`     | `icon-left`    | Identifier of the icon that is displayed in the left side of the text box. The attribute’s value must be a valid svg file in the repo of icons (assets/icons).                                                                                                                                                            | `string`                                 | `undefined`      |
| `iconRight`    | `icon-right`   | Identifier of the icon that is displayed in the right side of the text box. The attribute’s value must be a valid svg file in the repo of icons (assets/icons).                                                                                                                                                           | `string`                                 | `undefined`      |
| `label`        | `label`        | Label displayed on the interface, for the component.                                                                                                                                                                                                                                                                      | `string`                                 | `''`             |
| `max`          | `max`          | Specifies a maximum value that can be entered for the number/decimal input.                                                                                                                                                                                                                                               | `number`                                 | `undefined`      |
| `maxlength`    | `maxlength`    | Maximum number of characters a user can enter in the text box.                                                                                                                                                                                                                                                            | `number`                                 | `undefined`      |
| `min`          | `min`          | Specifies a minimum value that can be entered for the number/decimal input.                                                                                                                                                                                                                                               | `number`                                 | `undefined`      |
| `minlength`    | `minlength`    | Minimum number of characters a user must enter in the text box for the value to be valid.                                                                                                                                                                                                                                 | `number`                                 | `undefined`      |
| `name`         | `name`         | Name of the component, saved as part of form data.                                                                                                                                                                                                                                                                        | `string`                                 | `''`             |
| `placeholder`  | `placeholder`  | Text displayed in the text box before a user enters a value.                                                                                                                                                                                                                                                              | `string`                                 | `undefined`      |
| `readonly`     | `readonly`     | If true, the user cannot enter a value in the input box. If the attribute’s value is undefined, the value is set to false.                                                                                                                                                                                                | `boolean`                                | `false`          |
| `required`     | `required`     | Specifies the input box as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.                                                                                                                                                                | `boolean`                                | `false`          |
| `state`        | `state`        | Theme based on which the text box is styled.                                                                                                                                                                                                                                                                              | `"error" \| "normal" \| "warning"`       | `'normal'`       |
| `stateText`    | `state-text`   | Descriptive or instructional text displayed below the text box.                                                                                                                                                                                                                                                           | `string`                                 | `''`             |
| `step`         | `step`         | The step attribute is used when the type is `number`. It specifies the interval between legal numbers in a number/decimal input element. Works with the min and max attributes to limit the increments at which a value can be set. Possible values are `any` or a positive floating point number. Default value is `any` | `string`                                 | `'any'`          |
| `type`         | `type`         | Type of value accepted as the input value. If a user enters a value other than the specified type, the input box is not populated.                                                                                                                                                                                        | `"email" \| "number" \| "text" \| "url"` | `'text'`         |
| `value`        | `value`        | Default value displayed in the input box.                                                                                                                                                                                                                                                                                 | `string`                                 | `''`             |


## Events

| Event          | Description                                            | Type                         |
| -------------- | ------------------------------------------------------ | ---------------------------- |
| `fwBlur`       | Triggered when the input box loses focus.              | `CustomEvent<void>`          |
| `fwChange`     | Triggered when the value in the input box is modified. | `CustomEvent<any>`           |
| `fwFocus`      | Triggered when the input box comes into focus.         | `CustomEvent<void>`          |
| `fwInput`      | Triggered when a value is entered in the input box.    | `CustomEvent<KeyboardEvent>` |
| `fwInputClear` | Triggered when clear icon is clicked.                  | `CustomEvent<any>`           |


## Methods

### `nativeRef() => Promise<HTMLInputElement>`

Return native element

#### Returns

Type: `Promise<HTMLInputElement>`



### `setFocus() => Promise<void>`

Sets focus on a specific `fw-input`. Use this method instead of the global `input.focus()`.

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [fw-datepicker](../datepicker)
 - [fw-dropdown-button](../dropdown-button)
 - [fw-form-wrapper](../form-wrapper)
 - [fw-list-options](../options-list)

### Depends on

- [fw-icon](../icon)

### Graph
```mermaid
graph TD;
  fw-input --> fw-icon
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  fw-datepicker --> fw-input
  fw-dropdown-button --> fw-input
  fw-form-wrapper --> fw-input
  fw-list-options --> fw-input
  style fw-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
