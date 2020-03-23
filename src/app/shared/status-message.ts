import {MessageStatus} from "./enums/message-status.enum";

export class StatusMessage {

  message: string;
  status: MessageStatus;


  constructor( message: string, status: MessageStatus) {
    this.message = message;
    this.status = status;
  }
}
