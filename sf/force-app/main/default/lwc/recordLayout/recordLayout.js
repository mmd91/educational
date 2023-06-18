import { api, LightningElement } from 'lwc';

export default class RecordLayout extends LightningElement {
    @api recordId;
    @api objectApiName;
}