import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';


export default class ExportAccountToCSV extends LightningElement {
   //Export all standard fileds of object to csv

    exportToCSV() {
        const accounts = [['test1','fieldName'],['0']];

       
       let csvContent='';
        accounts.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        this.downloadCSV(csvContent, 'accounts.csv');
    }

    downloadCSV(csvData, fileName) {
        const blob = new Blob([csvData], { data: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        // link.href = URL.createObjectURL(blob);
        let bomEncoding = "%EF%BB%BF"; // Set Byte Order Mark, so special chars get rendered correctly in Excel
        link.href = "data:text/csv;charset=utf-8," + bomEncoding + encodeURI(csvData);
        link.target = '_blank';
        link.download = fileName;
        link.click();
    }
}
