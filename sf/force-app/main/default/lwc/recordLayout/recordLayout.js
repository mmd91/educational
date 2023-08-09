import { api, LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getRecord, getFieldValue, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Label', fieldName: 'apiName' },
    { label: 'Value', fieldName: 'value', editable: true },
    
];


export default class RecordLayout extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api flexipageRegionWidth;

    objectInfo = {};
    objectInfoFields = [];
    objectFieldNames = [];

    col = columns;
    draftValues = [];
   

    @wire(getObjectInfo, { objectApiName: '$objectApiName'})
    proccesObjectInfo(wiredData) {
        if (wiredData.data){
            this.objectInfo=wiredData.data;
            console.log(this.objectInfo);
            this.objectInfoFields = Object.values(this.objectInfo.fields);          
            this.objectFieldNames = this.objectInfoFields.map(field=>this.objectApiName +'.'+ field.apiName);
            console.log(JSON.stringify(this.objectFieldNames));
        }
    }

    recordData;
    @wire(getRecord, { recordId: '$recordId',fields:[], optionalFields:'$objectFieldNames' })
    proccesRecordData(wiredData) {
        if (wiredData.data){           
            this.recordData = wiredData.data;
            console.log('recordData');
            console.log(JSON.stringify(this.recordData));
            this.processData();
        }

        if (wiredData.error){
            console.log('error:');
            console.log(wiredData.error);
        }
    }
    
    data = [];
    processData(){
        let filedsWithValues = [];
        let myId=0;
        this.objectFieldNames.forEach(fieldName=>{
            let fieldValue = getFieldValue(this.recordData,fieldName);
            filedsWithValues.push({apiName:fieldName, value:fieldValue, id: myId});
            myId= myId+1;
        });

        this.data = filedsWithValues;
    }

    filterValue = '';
    handleChange(event) {
        this.filterValue = event.detail.value;
    }
  
    
    get filteredData(){
        if (this.filterValue){
            return this.data.filter(item=>item.apiName.toLowerCase().includes(this.filterValue.toLowerCase()));
        } else {
            return this.data;
        }
       
    }



  
    async handleSave(event) {
      // Convert datatable draft values into record objects
      let records = event.detail.draftValues.slice().map((draftValue) => {
        const fields = Object.assign({}, draftValue);
        let rowId = fields.id;
        let columnName = this.data.find(row => row.id== rowId);
        fields[columnName.apiName]=fields.value;
        fields.id= this.recordId;
        return { fields };
      });
  
      // Clear all datatable draft values
      this.draftValues = [];
      console.log(JSON.stringify(records));
      try {
        // Update all records in parallel thanks to the UI API
        const recordUpdatePromises = records.map((record) => updateRecord(record));
        await Promise.all(recordUpdatePromises);
  
        // Report success with a toast
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: "Account updated",
            variant: "success",
          })
        );
  
        // Display fresh data in the datatable
        await refreshApex(this.recordData);
      } catch (error) {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error updating or reloading contacts",
            message: error.body.message,
            variant: "error",
          }),
        );
        }
    
        
   
}
}