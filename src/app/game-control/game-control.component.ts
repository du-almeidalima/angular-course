import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  // Properties
  private interval: number;
  public num: number;

  // Events
  @Output()
  public numberChanged = new EventEmitter<number>();

  constructor() {
    this.num = 0;
  }

  ngOnInit() {
    this.numberChanged.emit(this.num);
  }

  public onStartBtnClick(): void {
    this.interval = setInterval(() => {
      // Incrementing the number
      this.numberChanged.emit(this.num + 1);
      this.num++;
    }, 333);
  }

  public onStopBtnClick(): void {
    clearInterval(this.interval);
  }
}
