import { LightningElement, api } from "lwc";

export default class CheckboxGroupButton extends LightningElement {
  _options = [];
  _value = [];

  @api
  set value(value) {
    this._value = [...value];
  }

  get value() {
    return this._value;
  }

  @api
  set options(value) {
    this._options = value;
  }

  get options() {
    return this._options.map((option) => {
      return {
        ...option,
        checked: this.value.includes(option.value)
      };
    });
  }

  handleChange(event) {
    const selectedValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Додати значення до масиву
      this._value = [...this._value, selectedValue];
    } else {
      // Видалити значення з масиву
      this._value = this._value.filter((value) => value !== selectedValue);
    }

    // Відправити подію про зміну значення
    this.dispatchEvent(
      new CustomEvent("change", { detail: { value: this._value } })
    );
  }
}
