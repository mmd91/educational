import { LightningElement, api, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

import LAST_MODIFIED_DATE_FIELD from "@salesforce/schema/Contact.LastModifiedDate";
import LAST_MODIFIED_BY_ID_FIELD from "@salesforce/schema/Contact.LastModifiedById";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

// "Create action button that will show last modified date and last modified by.
//When modified by up to 24 hours - green
//When between 1 day and 1 week - Yellow
//All older - Red"

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

  get message() {
    return `Last Modified By ID: ${this.lastModifiedById}\nLast Modified Date: ${this.lastModifiedDate}`;
    
}
getToastVariant() {
    const modifiedDate = new Date(this.lastModifiedDate);
    const now = new Date();

    const timeDifference = now - modifiedDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (daysDifference <= 1) {
        return "success"; 
    } else if (daysDifference <= 7) {
        return "warning"; 
    } else {
        return "error";
    }
}



  showNotification() {
    const variant = this.getToastVariant();
    const evt = new ShowToastEvent({
   
      message: this.message,
      variant: variant,
    });
    this.dispatchEvent(evt);
  }

}