import { LightningElement } from "lwc";

export default class Task16RecordPickerAccount extends LightningElement {
  filter = {
    criteria: [
      {
        fieldPath: "Name",
        operator: "like",
        value: "%a%"
      }
      //   {
      //     fieldPath: "Name",
      //     operator: "contains",
      //     value: "%A%"
      //   }
    ]
    // filterLogic: "(1 OR 2)"
  };
}
