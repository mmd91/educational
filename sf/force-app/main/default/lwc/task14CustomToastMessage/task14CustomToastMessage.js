import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Task14CustomToastMessage extends LightningElement {
  @track title;
  @track message;
  @track variant;
  @track mode;

  toastEventFire(title, msg, variant, mode) {
    const toastEvent = new ShowToastEvent({
      title: title,
      message: msg,
      variant: variant,
      mode: mode
    });
    this.dispatchEvent(toastEvent);
  }

  toastSuccess() {
    this.title = "SUCCESS";
    this.message = "Test toast message!";
    this.variant = "success";
    this.mode = "sticky";
    this.toastEventFire(this.title, this.message, this.variant, this.mode);
  }

  toastInfo() {
    this.title = "INFO";
    this.message = "Test toast message!";
    this.variant = "info";
    this.mode = "sticky";
    this.toastEventFire(this.title, this.message, this.variant, this.mode);
  }

  toastError() {
    this.title = "ERROR";
    this.message = "Test toast message!";
    this.variant = "error";
    this.mode = "sticky";
    this.toastEventFire(this.title, this.message, this.variant, this.mode);
  }
}
