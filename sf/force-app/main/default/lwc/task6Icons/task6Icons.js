import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import LAST_MODIFIED_DATE_FIELD from '@salesforce/schema/Contact.LastModifiedDate';

const fields = [LAST_MODIFIED_DATE_FIELD];

export default class IconBasedOnModifiedDate extends LightningElement {
    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields }) contact;

    get iconName() {
        const modifiedDate = new Date(getFieldValue(this.contact.data, LAST_MODIFIED_DATE_FIELD));
        const now = new Date();

        const timeDifference = now - modifiedDate;
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        if (hoursDifference <= 24) {
            return 'action:approval'; 
        } else if (daysDifference <= 7) {
            return 'action:new_campaign'; 
        } else {
            return 'action:close';
        }
    }
}
