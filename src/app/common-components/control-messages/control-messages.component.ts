import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import StatusMessages from '../../shared/status-messages';
import {MessageStatus} from '../../shared/enums/message-status.enum';
import RecipeValidator from '../../shared/recipe-validator';

interface statusMessagesDTO {
  messageType: MessageStatus;
  messages: string[];
}

@Component({
  selector: 'app-control-messages',
  template: `
    <style>
      div {
        background-color: #ffeaec;
        border: 1px solid tomato;
      }
      div p {
        color: tomato;
      }
    </style>
    <div *ngFor="let messagesStatus of messages"
         class="alert" [ngClass]="getMessageClass(messagesStatus.messageType)" role="alert">
      <p *ngFor="let message of messagesStatus.messages"> {{message}} </p>
    </div>
  `
})
export class ControlMessagesComponent implements OnInit, OnDestroy {

  private conSub: Subscription;

  public messages: statusMessagesDTO[] = [];

  @Input()
  public control: AbstractControl;

  constructor() { }

  ngOnInit(): void {

    if (this.control) {
      this.conSub = this.control.statusChanges.subscribe(conData => {

        switch (conData) {
          case 'INVALID':
            if (this.control.errors && this.control.touched) {
              Object.keys(this.control.errors).forEach(errorKey => {
                this.mapMessage(RecipeValidator.getMessage(errorKey));
              });
            }
            break;
          case 'VALID':
            this.messages = [];
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.conSub.unsubscribe();
  }

  public getMessageClass(status: MessageStatus): string {
    switch (status) {
      case MessageStatus.ERROR:   return 'alert-danger';
      case MessageStatus.INFO:    return 'alert-info';
      case MessageStatus.SUCCESS: return 'alert-success';
      case MessageStatus.WARNING: return 'alert-warning';
    }
  }

  private mapMessage(statusMessage: StatusMessages) {
    // Checking if there is a message of this type
    if (this.messages.find( item => item.messageType === statusMessage.status )) {
      this.messages.find(item => item.messageType === statusMessage.status)
        .messages.push(statusMessage.message)
    } else {
      this.messages.push({
        messageType: statusMessage.status,
        messages: [statusMessage.message]
      });
    }
  }
}
