import { LightningElement, api } from "lwc";

export default class Task14CustomToastMessage extends LightningElement {
  toastStyle = "";
  toastMessage = '"This is a message"';
  @api autoCloseTime = 5000;
  closeTimeout;

  showSuccessToast() {
    this.toastStyle = "success";
    this.toastMessage = '"This is a success message"';
    this.template.querySelector("c-task14-custom-toast").show();
  }

  showWarningToast() {
    this.toastStyle = "warning";
    this.toastMessage = '"This is a warning message"';
    this.template.querySelector("c-task14-custom-toast").show();
    this.setCloseTimeout();
  }

  showErrorToast() {
    this.toastStyle = "error";
    this.toastMessage = '"This is a error message"';
    this.template.querySelector("c-task14-custom-toast").show();
  }

  setCloseTimeout() {
    // Clear the existing timeout if there is one
    // if (this.closeTimeout) {
    //   clearTimeout(this.closeTimeout);
    // }

    // Set a new timeout to close the toast

    let _self = this;

    setTimeout(() => {
      _self.template.querySelector("c-task14-custom-toast").closeToast();
      // _self.showErrorToast();
    }, 3000);

    // this.closeTimeout = setTimeout(this.closeToast, 3000);
  }

  @api closeToast() {
    this.template.querySelector("c-task14-custom-toast").closeToast();
  }
}
