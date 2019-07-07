import {EventEmitter, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ChangeCounterService {

  public changeStatus = new EventEmitter<string>();

  public userStatusChanged( newStatus: string ) {

    this.changeStatus.emit(newStatus);
  }
}
