import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Task15CustomToastDuration extends LightningElement {
  @track title;
  @track message;
  @track variant;
  @track mode;

  toastEventFire(title, msg, variant, mode, duration) {
    const toastEvent = new ShowToastEvent({
      title: title,
      message: msg,
      variant: variant,
      mode: mode,
      duration: duration
    });
    this.dispatchEvent(toastEvent);
  }

  toastSuccess() {
    this.title = "SUCCESS";
    this.message = "Test toast message!";
    this.variant = "success";
    this.mode = "dismissible";
    const duration = 10000;
    this.toastEventFire(
      this.title,
      this.message,
      this.variant,
      this.mode,
      duration
    );
  }
}
