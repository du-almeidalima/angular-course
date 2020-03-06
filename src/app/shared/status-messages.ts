import {MessageStatus} from "./enums/message-status.enum";

export default class StatusMessages {

  status: MessageStatus;
  message: string;


  constructor( message: string, status: MessageStatus) {
    this.status = status;
    this.message = message;
  }
}
