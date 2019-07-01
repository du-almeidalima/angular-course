import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  @Input()
  public set appUnless(condition: boolean) {

    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}

/**
 * Here we're building our custom Structural Directive, the idea is to be the opposite of the ngIf directive.
 * It will receive an input or data from outside.
 * We need it to execute a method every time it changes, what we can do is place "set" before the property. Which is a method that gets
 * executed whenever the property changes. this is basically a setter method
 *
 * Note: "unless" still is a property
 *
 * Summarizing, whenever this property changes its value, it'll execute the function, and the function will take a condition as a parameter
 * and asses it, if false it'll display and if true hide the host
 *
 * Remembering that when we put * in front of a directive angular will convert it to a ng-template, so, similar to how we get an element
 * that the Directive is sitting on, we can get the Template that the directive is sitting on by using "TemplateRef". Now we need to pass
 * another information, where should this render the template?
 * We can specify that using the "ViewContainerRef".
 *
 * This ViewContainerRef is just a container, we can pass views/templates to it, and then Angular will render it to the DOM, in this case
 * , you can also look in the doc, we're passing a ViewTemplate so it can create an view, using the createEmbeddedView
 *
 * IMPORTANT
 * THE PROPERTY MUST HAVE THE SAME NAME AS THE SELECTOR SO WE CAN CALL IT USING THE SELECTOR NAME
 */
