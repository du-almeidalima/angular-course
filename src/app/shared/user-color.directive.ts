import {Directive, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Directive({selector: '[appUserColor]'})
export class UserColorDirective implements OnInit {

  // Properties
  @Input()
  private bgColor = 'white';

  @Input()
  private hoverColor = 'none';

  @HostBinding('style.backgroundColor')
  private hostBgColor: string;

  @HostBinding('style.transition')
  private hostTransition = 'background-color 0.4s';

  ngOnInit(): void {
    this.hostBgColor = this.bgColor;
  }

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    this.hostBgColor = this.hoverColor;
  }

  @HostListener('mouseleave')
  private onMouseLeave(): void {
    this.hostBgColor = this.bgColor;
  }
}
