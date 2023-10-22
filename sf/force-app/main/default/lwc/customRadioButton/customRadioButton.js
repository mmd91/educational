import { LightningElement, api } from "lwc";

export default class CustomRadioButton extends LightningElement {
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
    if (event.target.checked) {
      this.value.push(event.target.value);
    } else {
      this.value = this.value.filter((v) => {
        return v !== event.target.value;
      });
    }

    this.dispatchEvent(
      new CustomEvent("change", { detail: { value: this.value } })
    );
  }
}
