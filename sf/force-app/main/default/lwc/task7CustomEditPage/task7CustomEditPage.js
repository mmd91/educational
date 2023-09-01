import { LightningElement, api } from 'lwc';  
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import DEPARTMENT_FIELD from '@salesforce/schema/Contact.Department';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import MAILING_ADDRESS_FIELD from '@salesforce/schema/Contact.MailingAddress';
import LANGUAGES_FIELD from '@salesforce/schema/Contact.Languages__c';

export default class Task7CustomEditPage extends NavigationMixin(LightningElement) {
    nameField = NAME_FIELD;
    emailField = EMAIL_FIELD;
    departmentField =DEPARTMENT_FIELD;
    phoneField = PHONE_FIELD;
    mailingAddresslField = MAILING_ADDRESS_FIELD;
    languageslField = LANGUAGES_FIELD;

    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;
    contactId;
    handleSuccess(event) {
        this.contactId = event.detail.id;
        // Show a toast message
        const eve = new ShowToastEvent({
            title: 'Success',
            message: 'Contact has been saved',
            variant: 'success',
        });
        this.dispatchEvent(eve);
        // Navigate to the Contact page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.contactId,
                objectApiName: 'Contact',
                actionName: 'view'
            },
        });
    }

    navigateToContact(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Contact',
                actionName: 'view'
            },
        });
    }
  
   
}
