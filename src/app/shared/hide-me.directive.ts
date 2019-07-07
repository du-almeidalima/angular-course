import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({selector: '[appHideMe]'})
export class HideMeDirective {

  constructor(private viewRef: ViewContainerRef, private tempRef: TemplateRef<any>) {}

  @Input()
  private set appHideMe(condition: boolean) {

    if (condition) {
      this.viewRef.clear();
    } else {
      this.viewRef.createEmbeddedView(this.tempRef);
    }
  }
}
