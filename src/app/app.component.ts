import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public numbersArray: number[] = [];

  // Handler for numberChanged event triggered from GameControl Component
  public onNumberUpdate(event): void {
    this.numbersArray.push(event);
  }
}
