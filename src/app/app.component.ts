import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('divState', [
      state('initial', style({
        backgroundColor: 'pink',
        transform: 'translateX(0)'
      })),
      state('final', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('initial => final', animate(300)),
      transition('final => initial', animate(600))
    ])
  ]
})
export class AppComponent {
  public itemsArr: string[] = [];
  public boxState = 'initial';
  @ViewChild('f')
  public form: NgForm;

  onSubmit() {
    console.log(this.form.value);
    this.itemsArr.push( this.form.value.item );
    this.form.reset();
  }

  onAnimate() {
    this.boxState = this.boxState === 'initial' ? 'final' : 'initial';
  }
}

/*
 * The animation is a transition from one state to another.
 * In Angular, we can use the "animations" property in our @Component decorator to define our animations.
 * This property will take an array of triggers. Each Animations has a trigger.
 *  - Trigger: Is a function that we can define a name and we can place it into the DOM so Angular will trigger an Animation based on a
 * state.
 *
 * The trigger function take an array of State as second argument. Each state will have an identifier and the corresponding style, which is
 * also a function that receives an object CSS alike.
 *  - State: Is also a function, that takes an identifier and the style of this particular state
 *
 * Now with the Trigger created, each state of this trigger and each state styles, we can switch between those states by changing their
 * condition/variable etc...
 */

/*
 * The State Transition
 *
 * With the Trigger, State and Styles we already can switch, but there's another property of the Trigger function, the "transition". This
 * property tells how the transition should occur.
 * In the transition function we can specify the 'from' and 'to' states and how the should happen, in this case, the time length
 */
