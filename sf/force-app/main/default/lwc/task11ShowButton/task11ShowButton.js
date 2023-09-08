import { LightningElement, wire, api } from "lwc";
import Id from "@salesforce/user/Id";

import { getRecord, getFieldValue } from "lightning/uiRecordApi";

export default class MyComponent extends LightningElement {
  @api recordId;
  userId = Id;

  @wire(getRecord, { recordId: "$recordId", fields: "Contact.OwnerId" })
  contact;

  get valueOfField() {
    const fieldValue = getFieldValue(this.contact.data, "Contact.OwnerId");
    console.log("Contact OWNER:" + fieldValue);
    return fieldValue;
  }

  get isCurrentUserOwner() {
    return this.valueOfField === this.userId;
  }
}
