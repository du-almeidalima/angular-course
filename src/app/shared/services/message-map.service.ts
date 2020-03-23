import {Injectable} from '@angular/core';
import {StatusMessage} from "../status-message";
import {MessageStatus} from "../enums/message-status.enum";

// @ts-ignore
import jsonMessages from '../status-messages.json';

@Injectable({providedIn: 'root'})
export class MessageMapService {
  public mapMessage(messageCode: string): StatusMessage {
    const message = jsonMessages.find(m => m.messageCode === messageCode);

    if (message !== undefined) {
      return new StatusMessage(message.message, MessageStatus[message.severity.toString()])
    } else{
      return new StatusMessage('Something wrong happened', MessageStatus.WARNING);
    }
  }
}
