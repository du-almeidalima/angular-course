import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'] <- External styling
  styles: [
    ` h5 {color: tomato} `
  ]
})
export class AppComponent {
  name = "Duzinho's app";
}

/**
 * The same approach we use to "templateUrl" we can use to styleUrls, but note that it accepts more than on, that's why it's an array
 */
