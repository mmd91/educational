import { LightningElement, api, wire } from "lwc";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";

export default class ExportAccountToCSV extends LightningElement {
  //Export all standard fileds of object to csv
  @api recordId;
  @api objectApiName;
  @api flexipageRegionWidth;

  objectInfo = {};
  objectInfoFields = [];
  objectFieldNames = [];
  objectFields = [];
  draftValues = [];

  @wire(getObjectInfo, { objectApiName: "$objectApiName" })
  proccesObjectInfo(wiredData) {
    if (wiredData.data) {
      this.objectInfo = wiredData.data;
      console.log(this.objectInfo);
      this.objectInfoFields = Object.values(this.objectInfo.fields);
      this.objectFieldNames = this.objectInfoFields.map(
        (field) => this.objectApiName + "." + field.apiName
      );
      console.log(JSON.stringify(this.objectFieldNames));
    }
  }

  recordData;
  @wire(getRecord, {
    recordId: "$recordId",
    fields: [],
    optionalFields: "$objectFieldNames"
  })
  proccesRecordData(wiredData) {
    if (wiredData.data) {
      this.recordData = wiredData.data;
      console.log("recordData");
      console.log(JSON.stringify(this.recordData));
      this.processData();
    }

    if (wiredData.error) {
      console.log("error:");
      console.log(wiredData.error);
    }
  }

  data = [];
  processData() {
    let filedsWithValues = [];
    let myId = 0;
    this.objectFieldNames.forEach((fieldName) => {
      let fieldValue = getFieldValue(this.recordData, fieldName);
      filedsWithValues.push({
        apiName: fieldName,
        value: fieldValue,
        id: myId
      });
      myId = myId + 1;
    });

    this.data = filedsWithValues;
  }

  exportToCSV() {
    const accounts = [];
    // [["test1", "fieldName"], ["0"]];
    accounts.push(this.objectFields.map((field) => field.fieldApiName));

    let csvContent = "";
    accounts.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    this.downloadCSV(csvContent, "accounts.csv");
  }

  downloadCSV(csvData, fileName) {
    const blob = new Blob([csvData], { data: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    let bomEncoding = "%EF%BB%BF"; // Set Byte Order Mark, so special chars get rendered correctly in Excel
    link.href =
      "data:text/csv;charset=utf-8," + bomEncoding + encodeURI(csvData);
    link.target = "_blank";
    link.download = fileName;
    link.click();
  }
}
