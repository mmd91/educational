import { api, LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const columns = [
    { label: 'Label', fieldName: 'apiName' },
    { label: 'Value', fieldName: 'value' },
    
];


export default class RecordLayout extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api flexipageRegionWidth;

    objectInfo = {};
    objectInfoFields = [];
    objectFieldNames = [];

    col = columns;
   

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
        this.objectFieldNames.forEach(fieldName=>{
            let fieldValue = getFieldValue(this.recordData,fieldName);
            filedsWithValues.push({apiName:fieldName, value:fieldValue });
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

    
   
}