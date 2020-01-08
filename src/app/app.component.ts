import {Component, ElementRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f', { static: true })
  private littleForm: ElementRef;
  // public onSubmit(form: NgForm): void {
  //   console.log(form);
  // }

  public onSubmit() {
    console.log(this.littleForm);
  }
}
