import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {

  // Remember, this is a convenient syntax TypeScript gives to decelerate a property and assign it
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
    this.elementRef.nativeElement.style.color = 'white';
  }
}

/**
 * To create a directive we simple create a folder and put it into it, following the namespace
 * "directiveName.directive.ts"
 *
 * To make it a Directive, just like then component we need to assign a decorator on it.
 * We also need to pass a object to it, just like the Component decorator:
 * {
 *     selector(mandatory): '...'
 * }
 *
 * Note: I've add square brackets on it so it will be recognized whenever we add appBasicHighlight without square brackets to an element
 *
 * We can get access to the element our directive is sitting on natively by Angular, we can inject this element
 * We did it here by assigning the constructor and a property, using the convenient syntax of TypeScript. Angular now will try to find
 * something to instantiate on this property (Injection), and will instantiate the element this Directive is on, thus giving us access
 *
 * FINALLY, to being able to use, we need to inform Angular that we have a new Directive, just like the component, in a module
 */
