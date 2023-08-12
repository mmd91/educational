import { LightningElement, api, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

import LAST_MODIFIED_DATE_FIELD from "@salesforce/schema/Contact.LastModifiedDate";
import LAST_MODIFIED_BY_ID_FIELD from "@salesforce/schema/Contact.LastModifiedById";

const fields =[LAST_MODIFIED_DATE_FIELD, LAST_MODIFIED_BY_ID_FIELD];
export default class AlertWithDataContact extends LightningElement {
    //Create action button that will show last modified date and last modified by
    @api recordId;
    @wire(getRecord, { recordId: "$recordId", fields })
  contact;

  get lastModifiedDate() {
    return getFieldValue(this.contact.data, LAST_MODIFIED_DATE_FIELD);
  }

  get lastModifiedById() {
    return getFieldValue(this.contact.data, LAST_MODIFIED_BY_ID_FIELD);
  }


   
    showAlert() {
        const message = `Last Modified By ID: ${this.lastModifiedById}\nLast Modified Date: ${this.lastModifiedDate}`;
    window.alert(message);
    console.log('alert')
    }
}