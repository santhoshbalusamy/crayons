/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
  Fragment,
} from '@stencil/core';

import { handleKeyDown, renderHiddenField } from '../../utils';
import {
  DropdownVariant,
  TagVariant,
  PopoverPlacementType,
} from '../../utils/types';
@Component({
  tag: 'fw-select',
  styleUrl: 'select.scss',
  shadow: true,
})
export class Select {
  @Element() host: HTMLElement;
  private selectInput?: HTMLInputElement;
  private fwListOptions?: HTMLFwListOptionsElement;
  private popover?: HTMLFwPopoverElement;
  private tagContainer: HTMLElement;
  private tagRefs = [];
  private tagArrowKeyCounter = 0;
  private hostId;

  private changeEmittable = () => !this.disabled;

  private innerOnFocus = (e: Event) => {
    if (this.changeEmittable()) {
      this.hasFocus = true;
      this.fwFocus.emit(e);
      this.handleFocus(e);
    }
  };

  private innerOnClick = () => {
    this.setFocus();
    if (this.variant !== 'mail') {
      this.openDropdown();
    }
  };

  private innerOnBlur = async (e: Event) => {
    if (this.changeEmittable()) {
      this.hasFocus = false;
      this.fwBlur.emit(e);
      this.handleBlur(e, {
        value: await this.getSelectedItem(),
      });
    }
  };

  private openDropdown = () => {
    if (!this.isExpanded && this.changeEmittable()) {
      this.popover.show();
    }
  };

  private closeDropdown = () => {
    if (this.isExpanded && this.changeEmittable()) {
      this.popover.hide();
    }
  };

  /**
   * If the dropdown is shown or not
   */
  @State() isExpanded = false;
  @State() hasFocus = false;
  @State() didInit = false;
  @State() searchValue;
  @State() dataSource;
  @State() selectedOptionsState = [];
  @State() isLoading = false;
  @State() focusedOptionId = '';
  /**
   * Label displayed on the interface, for the component.
   */
  @Prop() label = '';
  /**
   * Value of the option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop({ reflect: true, mutable: true }) value: any;
  /**
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';
  /**
   * Type of option accepted as the input value. If a user tries to enter an option other than the specified type, the list is not populated.
   */
  @Prop() type: 'text' | 'number' = 'text';
  /**
   * Text displayed in the list box before an option is selected.
   */
  @Prop() placeholder?: string | null;
  /**
   * Theme based on which the list box is styled.
   */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';
  /**
   * Descriptive or instructional text displayed below the list box.
   */
  @Prop() stateText = '';
  /**
   * If true, the user cannot modify the default value selected. If the attribute's value is undefined, the value is set to true.
   */
  @Prop() readonly = false;
  /**
   * Specifies the select field as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() required = false;
  /**
   * If true, the user must select a value. The default value is not displayed.
   */
  @Prop() forceSelect = true;
  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() disabled = false;
  /**
   * Enables selection of multiple options. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() multiple = false;
  /**
   * Works with `multiple` enabled. Configures the maximum number of options that can be selected with a multi-select component.
   */
  @Prop() max = Number.MAX_VALUE;
  /**
   * The UI variant of the select to be used.
   */
  @Prop() variant: 'button' | 'standard' | 'mail' = 'standard';
  /**
   * Standard is the default option without any graphics other options are icon and avatar which places either the icon or avatar at the beginning of the row.
   * The props for the icon or avatar are passed as an object via the graphicsProps.
   */
  @Prop() optionsVariant: DropdownVariant = 'standard';
  /**
   * Allow to search for value. Default is true.
   */
  @Prop() searchable = true;
  /**
   * Allow to search for value. Default is true.
   */
  @Prop({ reflect: true }) options: any;
  /**
   * Place a checkbox.
   */
  @Prop() checkbox = false;
  /**
   * Default option to be shown if the option doesn't match the filterText.
   */
  @Prop() notFoundText = 'No items Found';
  /**
   * Filter function which takes in filterText and dataSource and return a Promise.
   * Where filter text is the text to filter the value in dataSource array.
   * The returned promise should contain the array of options to be displayed.
   */
  @Prop() search;
  /**
   * Text to be displayed when there is no data available in the select.
   */
  @Prop() noDataText = 'No Data available';
  /**
   * Debounce timer for the search promise function.
   */
  @Prop() debounceTimer = 300;
  /**
   * Array of the options that is displayed as the default selection, in the list box. Must be a valid option corresponding to the fw-select-option components used in Select.
   */
  @Prop({ reflect: true, mutable: true }) selectedOptions = [];
  /**
   * Whether the select width to be same as that of the options.
   */
  @Prop() sameWidth = true;
  /**
   * Placement of the options list with respect to select.
   */
  @Prop() optionsPlacement: PopoverPlacementType = 'bottom';
  /**
   * The variant of tag to be used.
   */
  @Prop() tagVariant: TagVariant = 'standard';
  /**
   * Whether the arrow/caret should be shown in the select.
   */
  @Prop() caret = true;
  /**
   * If the default label prop is not used, then use this prop to pass the id of the label.
   */
  @Prop() labelledBy = '';

  @Prop() handleChange = (_e, _o) => {};
  @Prop() handleBlur = (_e, _o) => {};
  @Prop() handleFocus = (_e?, _o?) => {};

  // Events
  /**
   * Triggered when a value is selected or deselected from the list box options.
   */
  @Event() fwChange: EventEmitter;
  /**
   * Triggered when the list box comes into focus.
   */
  @Event() fwFocus: EventEmitter;
  /**
   * Triggered when the list box loses focus.
   */
  @Event() fwBlur: EventEmitter;

  @Listen('fwHide')
  onDropdownClose() {
    this.clearInput();
    this.isExpanded = false;
    this.multiple && this.selectInput.focus();
  }

  @Listen('fwShow')
  onDropdownOpen() {
    this.isExpanded = true;
  }

  @Listen('fwLoading')
  onLoading(event) {
    this.isLoading = event.detail.isLoading;
    if (this.variant === 'mail' && !this.isLoading) {
      this.selectInput.value && this.openDropdown();
    }
  }

  @Listen('fwChange')
  fwSelectedHandler(selectedItem) {
    if (selectedItem.composedPath()[0].tagName === 'FW-LIST-OPTIONS') {
      this.selectedOptionsState = selectedItem.detail.selectedOptions;
      this.value = selectedItem.detail.value;
      this.renderInput();
      if (!this.multiple || this.variant === 'mail') {
        this.closeDropdown();
      }
      selectedItem.stopImmediatePropagation();
      selectedItem.stopPropagation();
      selectedItem.preventDefault();
      this.fwChange.emit({
        value: this.value,
        selectedOptions: this.selectedOptionsState,
      });
      this.handleChange(selectedItem, {
        value: this.selectedOptionsState,
      });
    }
  }

  // Listen to Tag close in case of multi-select
  @Listen('fwClosed')
  fwCloseHandler(ev) {
    this.value = this.value?.filter((value) => value !== ev.detail.value);
  }

  @Listen('keydown')
  onKeyDown(ev) {
    switch (ev.key) {
      case 'ArrowDown':
        this.innerOnClick();
        this.fwListOptions.setFocus();
        ev.preventDefault();
        ev.stopPropagation();
        break;
      case 'ArrowLeft':
      case 'Backspace':
        if (this.multiple && this.selectInput.value === '') {
          this.focusOnTagContainer();
        }
        break;
      case 'Escape':
        this.innerOnBlur(ev);
        this.closeDropdown();
        break;
      case 'Tab':
        this.closeDropdown();
        break;
    }
  }

  @Listen('fwFocus')
  onOptionFocus(event) {
    if (event.composedPath()[0].tagName === 'FW-SELECT-OPTION') {
      this.focusedOptionId = event.detail.id;
    }
  }

  @Listen('fwBlur')
  onOptionBlur(event) {
    if (event.composedPath()[0].tagName === 'FW-SELECT-OPTION') {
      this.focusedOptionId = '';
    }
  }

  @Watch('dataSource')
  optionsChangedHandler() {
    this.renderInput();
  }

  @Method()
  async getSelectedItem(): Promise<any> {
    return this.fwListOptions.getSelectedOptions();
  }

  @Method()
  async setSelectedValues(values: string | string[]): Promise<any> {
    this.fwListOptions.setSelectedValues(values);
    this.renderInput();
  }

  @Method()
  async setSelectedOptions(options: any[]): Promise<any> {
    this.fwListOptions.setSelectedOptions(options);
    this.renderInput();
  }

  @Method()
  async setFocus(): Promise<any> {
    this.selectInput?.focus();
  }

  tagContainerKeyDown = (ev) => {
    switch (ev.key) {
      case 'Escape':
        this.innerOnBlur(ev);
        this.closeDropdown();
        break;
      case 'ArrowLeft':
        this.tagArrowKeyCounter--;
        if (this.tagArrowKeyCounter >= 0) {
          this.focusOnTag(this.tagArrowKeyCounter);
        } else {
          this.tagArrowKeyCounter = 0;
        }
        ev.stopImmediatePropagation();
        break;
      case 'ArrowRight':
        this.tagArrowKeyCounter++;
        if (this.tagArrowKeyCounter >= this.value?.length) {
          this.selectInput.focus();
        } else {
          this.focusOnTag(this.tagArrowKeyCounter);
        }
        ev.stopImmediatePropagation();
        break;
    }
  };

  focusOnTagContainer() {
    this.tagRefs = [...this.tagContainer.getElementsByTagName('fw-tag')];
    this.tagArrowKeyCounter = this.value?.length - 1;
    this.focusOnTag(this.tagArrowKeyCounter);
  }

  focusOnTag(index) {
    this.tagRefs[index]?.setFocus();
  }

  clearInput() {
    if (!this.multiple && this.value) {
      this.renderInput();
      return;
    }
    this.selectInput.value = '';
  }

  valueExists() {
    return this.multiple ? this.value?.length > 0 : !!this.value;
  }

  onInput() {
    if (this.selectInput.value) {
      this.searchValue = this.selectInput.value.toLowerCase();
      this.variant !== 'mail' && this.openDropdown();
    } else {
      this.variant === 'mail' && this.closeDropdown();
    }
  }

  renderTags() {
    if (this.multiple) {
      return this.selectedOptionsState.map((option) => {
        if (this.value?.includes(option.value)) {
          return (
            <fw-tag
              variant={this.tagVariant}
              graphicsProps={option.graphicsProps}
              text={option.text}
              disabled={option.disabled}
              value={option.value}
              focusable={false}
            />
          );
        }
      });
    }
  }

  renderInput() {
    if (this.selectedOptionsState.length > 0) {
      if (this.selectInput) {
        this.selectInput.value = '';
        this.selectInput.value = this.multiple
          ? this.selectInput.value
          : this.selectedOptionsState[0].text || '';
      }
    } else {
      if (this.selectInput) {
        this.selectInput.value = '';
      }
    }
  }

  componentWillLoad() {
    if (this.variant === 'mail') {
      this.caret = false;
      this.multiple = true;
    }

    //TODO: The below is a rough draft and needs to be optimized for better performance.
    const selectOptions = Array.from(
      this.host.querySelectorAll('fw-select-option')
    );

    // Set value if the selectedOptions is provided
    if (this.selectedOptions.length > 0) {
      this.selectedOptionsState = this.selectedOptions;
      this.value = this.multiple
        ? this.selectedOptions.map((option) => option.value)
        : this.selectedOptions[0].value;
    }

    if (this.multiple) {
      if (this.multiple && typeof this.value === 'string') {
        throw Error('value must be a array of string when multiple is true');
      }
      this.value = this.value?.length > 0 ? this.value : [];
    } else {
      this.value = this.value ? this.value : '';
    }

    const options = selectOptions.map((option) => {
      return {
        html: option.html,
        text: option.html ? option.optionText : option.textContent,
        value: option.value,
        selected:
          (this.multiple
            ? this.value?.includes(option.value)
            : this.value === option.value) || option.selected,
        disabled: option.disabled || this.disabled, // Check if option is disabled or select is disabled
        htmlContent: option.html ? option.innerHTML : '',
      };
    });
    this.dataSource = options.length === 0 ? this.options : options;
    // Set selectedOptions if the value is provided
    if (!this.multiple && this.value && this.selectedOptions.length === 0) {
      this.selectedOptionsState = this.dataSource.filter(
        (option) => this.value === option.value
      );
    } else if (
      this.multiple &&
      this.value?.length !== this.selectedOptions.length
    ) {
      this.selectedOptionsState = this.dataSource.filter((option) =>
        this.value?.includes(option.value)
      );
    }
    if (this.dataSource?.length > 0) {
      // Check whether the selected data in the this.dataSource  matches the value
      const selectedDataSource = this.dataSource.filter(
        (option) => option.selected
      );
      const selectedDataSourceValues = selectedDataSource.map(
        (option) => option.value
      );
      const selected = this.multiple
        ? selectedDataSourceValues
        : selectedDataSourceValues[0];
      if (
        selectedDataSourceValues.length > 0 &&
        JSON.stringify(this.value) !== JSON.stringify(selected)
      ) {
        this.value = selected;
        this.selectedOptionsState = selectedDataSource;
      }
    }
    this.host.addEventListener('focus', this.setFocus);
    this.host.innerHTML = '';

    //Get id
    this.hostId = this.host.id || '';
  }

  componentDidLoad() {
    this.renderInput();
    this.didInit = true;
  }

  disconnectedCallback() {
    this.host.removeEventListener('focus', this.setFocus);
  }

  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);

    return (
      <Host
        aria-disabled={this.disabled}
        class={{
          'has-focus': this.hasFocus,
        }}
      >
        {this.label !== '' ? (
          <label
            id={`${this.hostId}-label`}
            class={{ required: this.required }}
          >
            {this.label}
          </label>
        ) : (
          ''
        )}
        {/* NOTE:: aria-controls is added to div based on ARIA 1.0 but from ARIA 1.1 version this should be
        moved to the input REF- https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html */}
        <div
          class='select-container'
          role='combobox'
          aria-controls={`${this.hostId}-listbox`}
          aria-haspopup='listbox'
          aria-expanded={this.isExpanded}
          aria-owns={`${this.hostId}-listbox`}
        >
          <fw-popover
            distance='8'
            trigger='manual'
            ref={(popover) => (this.popover = popover)}
            same-width={this.sameWidth}
            placement={this.optionsPlacement}
          >
            <div
              slot='popover-trigger'
              class={{
                'input-container': this.variant !== 'button',
                [this.state]: true,
                'select-disabled': this.disabled,
              }}
              onClick={() => this.innerOnClick()}
              onKeyDown={handleKeyDown(this.innerOnClick)}
            >
              {this.variant === 'button' ? (
                //TODO: Make this behavior generic.
                <fw-button
                  id={`${this.hostId}-btn`}
                  show-caret-icon
                  color='secondary'
                  class={
                    this.host.classList.value.includes('month')
                      ? 'fw-button-group__button--first'
                      : 'fw-button-group__button--last'
                  }
                >
                  {this.value}
                </fw-button>
              ) : (
                <Fragment>
                  <div class='input-container-inner'>
                    {this.multiple && (
                      <div
                        onFocus={this.focusOnTagContainer}
                        ref={(tagContainer) =>
                          (this.tagContainer = tagContainer)
                        }
                        onKeyDown={this.tagContainerKeyDown}
                      >
                        {this.renderTags()}
                      </div>
                    )}
                    <input
                      ref={(selectInput) => (this.selectInput = selectInput)}
                      id={`${this.hostId}-input`}
                      class={{
                        'multiple-select': this.multiple,
                      }}
                      autoComplete='off'
                      disabled={this.disabled}
                      name={this.name}
                      placeholder={
                        this.valueExists() ? '' : this.placeholder || ''
                      }
                      readOnly={this.readonly}
                      required={this.required}
                      type={this.type}
                      value=''
                      aria-autocomplete='list'
                      aria-activedescendant={this.focusedOptionId}
                      onInput={() => this.onInput()}
                      onFocus={(e) => this.innerOnFocus(e)}
                      onBlur={(e) => this.innerOnBlur(e)}
                    />
                  </div>
                  {this.isLoading ? (
                    <fw-spinner size='small'></fw-spinner>
                  ) : (
                    this.caret && (
                      <span
                        class={{
                          'dropdown-status-icon': true,
                          'expanded': this.isExpanded,
                        }}
                      >
                        <fw-icon
                          name='chevron-down'
                          color='#264966'
                          size={8}
                          library='system'
                        ></fw-icon>
                      </span>
                    )
                  )}
                </Fragment>
              )}
            </div>
            <fw-list-options
              ref={(fwListOptions) => (this.fwListOptions = fwListOptions)}
              id={`${this.hostId}-listbox`}
              role='listbox'
              aria-labelledby={this.labelledBy || `${this.hostId}-label`}
              notFoundText={this.notFoundText}
              debounceTimer={this.debounceTimer}
              noDataText={this.noDataText}
              search={this.search}
              selectedOptions={this.selectedOptions}
              variant={this.optionsVariant}
              filter-text={this.searchValue}
              options={this.dataSource}
              value={this.value}
              multiple={this.multiple}
              max={this.max}
              checkbox={this.checkbox}
              slot='popover-content'
            ></fw-list-options>
          </fw-popover>
          {this.stateText !== '' ? (
            <span class='help-block'>{this.stateText}</span>
          ) : (
            ''
          )}
        </div>
      </Host>
    );
  }
}
