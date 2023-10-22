import { LightningElement, api } from "lwc";

export default class Task14CustomToast extends LightningElement {
  @api message;
  @api type;
  toastVisible = false;

  get toastClass() {
    let classList = "slds-notify slds-notify_toast ";
    if (this.type === "success") {
      classList = classList + " slds-theme_success";
    }
    if (this.type === "warning") {
      classList = classList + " slds-theme_warning";
    }
    if (this.type === "error") {
      classList = classList + " slds-theme_error";
    }

    return classList;
  }

  @api closeToast() {
    this.toastVisible = false;
  }

  @api show() {
    this.toastVisible = true;
  }
}
