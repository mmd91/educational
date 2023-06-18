import { LightningElement, api } from 'lwc';


export default class QuickActionWithoutUI extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api invoke() {
        console.log("The Record ID is: " + this.recordId +  "  The Object is: " + this.objectApiName);
      }
    }
