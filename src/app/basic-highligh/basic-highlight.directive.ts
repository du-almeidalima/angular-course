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
 * Event though our directive works, it's not a good practice to access our element directly, because Angular is also able to render our
 * templates without a DOM, thus this won't work, like when using service workers.
 * So we can make use of a tool for this, the Renderer
 *
 * Note: we can generate a new directive with the command "ng generate directive"
 *
 * This lecture will continue in the "better-highlight" directive
 */
