import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Task15CustomToastDuration extends LightningElement {
  @track title;
  @track message;
  @track variant;
  @track mode;

  toastEventFire(title, msg, variant, mode) {
    const toastEvent = new ShowToastEvent({
      title: title,
      message: msg,
      variant: variant,
      mode: mode,
      duration: 3000
    });
    this.dispatchEvent(toastEvent);
  }

  toastSuccess() {
    this.title = "SUCCESS";
    this.message = "Test toast message!";
    this.variant = "success";
    this.mode = "dismissable";
    this.toastEventFire(this.title, this.message, this.variant, this.mode);
  }
}
