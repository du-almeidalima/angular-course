import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // First Box
    trigger('divState', [
      state('initial', style({
        backgroundColor: 'pink',
        transform: 'translateX(0)'
      })),
      state('final', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('initial <=> final', animate(300))
    ]),
    // Wild Box
    trigger('wildState', [
      state('initial', style({
        backgroundColor: 'pink',
        transform: 'translateX(0) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      state('final', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      transition('initial => final', animate(300)),
      transition('final => initial', animate(600)),
      transition('shrunken <=> *', [
        // Steps of the animation
        style({ backgroundColor: 'red', borderRadius: 0}),
        animate(500, style( { borderRadius: '50px' })),
        animate(500)
      ]),
    ]),
    // List Trigger
    trigger('firstList', [
      // State set by Angular
      state('in', style({
        opacity: 1,
        color: 'blue',
        transform: 'translateX(0)'
      })),
      /* This will make the transition from when the element don't exist to when it's on the DOM, and actually the state name 'in' doesn't
      Matter.*/
      transition('void => *',
        [
          // Initial Style
          style({
            opacity: 0,
            transform: 'translateX(-150px)'
          }),
          // Final Style (When don't provided it just take the state:in style)
          animate(300)
        ]
      ),
      transition('* => void', [
        // To make 2 animations start at the same time. Useful for different durations
        group([
          animate(800, style({
            opacity: 0,
            transform: 'translateX(500px)'
          })),
          animate(400, style({
            color: 'red'
          }))
        ])
      ])
    ]),
    trigger('secondList', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          // Steps
          style({
            opacity: 0,
            transform: 'translateX(-150px)',
            // Time offset
            offset: 0
          }),
          style({
            opacity: 0.2,
            transform: 'translateX(-100px)',
            // Time offset
            offset: 0.3
          }),
          style({
            opacity: 0.7,
            transform: 'translateX(-50px)',
            // Time offset
            offset: 0.7
          }),
          style({
            opacity: 1,
            transform: 'translateX(0)',
            // Time offset
            offset: 1
          })
        ]))
      ])
    ])
  ]
})
export class AppComponent {
  public itemsArr: string[] = ['Piolho', 'Molho de Chave', 'Paralelepipedo'];
  public boxState = 'initial';
  public wildBoxState = 'initial';
  @ViewChild('f')
  public form: NgForm;

  onSubmit() {
    console.log(this.form.value);
    this.itemsArr.push( this.form.value.item );
    this.form.reset();
  }

  onAnimate() {
    this.boxState = this.boxState === 'initial' ? 'final' : 'initial';
    this.wildBoxState = this.wildBoxState === 'initial' ? 'final' : 'initial';
  }

  onShrink() {
    this.wildBoxState = 'shrunken';
  }

  onItemClick(i: number) {
    this.itemsArr.splice(i, 1);
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
 * In the transition function we can specify the 'from' and 'to' states and how the should happen, in this case, the time length.
 *
 * Also in the transition function we can specify styles during the transition, in the same way as in the state function.
 *
 * EVEN FURTHER! We can specify states during the transition function, by passing an array of animate or style functions
 */

/*
 * List Triggers and State
 * For some cases, angular provides an state for us, this come OOTB just by placing the identifier/name of the trigger into the DOM:
 * - void: The initial state of the pre existing element
 *
 * So for styling those list items, we can just specify the transitions between before void and after void.
 */
