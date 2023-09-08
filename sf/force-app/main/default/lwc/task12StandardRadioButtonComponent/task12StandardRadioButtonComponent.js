import { LightningElement } from "lwc";

export default class task12StandardRadioButtonComponent extends LightningElement {
  value = "";

  get options() {
    return [
      { label: "Sales", value: "option1" },
      { label: "Force", value: "option2" }
    ];
  }
}
