import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white');
  }
}

/**
 * Event though our directive works, it's not a good practice to access our element directly, because Angular is also able to render our
 * templates without a DOM, thus this won't work, like when using service workers.
 * So we can make use of a tool for this, the Renderer
 *
 * So instead of accessing the element directly, we use the renderer to make changes on the element
 * for the "setStyle" method the syntax is
 * (elementReference, style, the value,flags(optional)) -> flags are css flags like !important
 *
 * Note: we can generate a new directive with the command "ng generate directive"
 */
