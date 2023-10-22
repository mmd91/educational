import { LightningElement } from "lwc";

export default class Task13CustomRadioButton extends LightningElement {
  value = "";
  get options() {
    return [
      { label: "Sales", value: "option1" },
      { label: "Force", value: "option2" }
    ];
  }
}
//
//
