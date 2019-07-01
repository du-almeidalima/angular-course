import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  @HostBinding('style.display') fontSize: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

  }

  @HostListener('mouseenter')
  public mouseOver() {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'darkblue');
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white');
    this.fontSize = 'none';
  }

  @HostListener('mouseleave')
  public mouseLeave() {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'tomato');
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
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
 *
 * @HostListener: Listen to an event to the DOM element this directive is sitting, also it passes metadata
 * In order for it to work we need to pass 1 - 2 arguments, {name: 'event' }
 *
 * @HostBinding: Basically binds this host (element that this directive is sitting on) properties to this Directive property, allowing us
 * to change then.
 * Note: We didn't need to make use of Renderer2
 */
