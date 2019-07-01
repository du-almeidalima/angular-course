import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  onlyOdd = false;
  dummyValue = 0;
}

/**
 * Imagine that we wanted to display something for specif values from dummyValue, we could use ngSwitch, take a look on app.compent.html
*/
