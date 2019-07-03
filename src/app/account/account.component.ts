import { Component, EventEmitter, Input, Output } from '@angular/core';
import {LogService} from '../services/log.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor() {}

  onSetTo(status: string) {
    this.statusChanged.emit({id: this.id, newStatus: status});

    const logService = new LogService();
    logService.logStatus(status);
  }
}
