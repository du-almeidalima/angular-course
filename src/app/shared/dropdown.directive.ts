import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from "@angular/core";

@Directive({ selector: '[appDropdown]'})
export class DropdownDirective {

  @Input()
  public dropdownMenu: HTMLDivElement;

  private show = false;

  constructor(private renderer: Renderer2){}

  @HostListener('click')
  public onClick(){
    if (!this.show) {
      this.renderer.addClass(this.dropdownMenu, 'show');
      this.show = !this.show;
    } else {
      this.renderer.removeClass(this.dropdownMenu, 'show');
      this.show = !this.show;
    }
  }

}

// This is a directive to enable Bootstrap dropdown
