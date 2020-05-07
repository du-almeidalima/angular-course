import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public itemsArr: string[] = [];
  @ViewChild('f') form: NgForm;

  onSubmit() {
    console.log(this.form.value);
    this.itemsArr.push( this.form.value.item );
    this.form.reset();
  }
}
