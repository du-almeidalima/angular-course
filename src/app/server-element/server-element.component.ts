import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation,
  SimpleChanges,
  DoCheck,
  AfterContentChecked,
  AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // This will remove Angular CSS behaviour and apply it application wilde
})
export class ServerElementComponent implements
    OnInit, OnChanges, DoCheck, AfterContentInit , AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  // Properties
  @Input('srvElement')
  public element: {type: string, name: string, content: string};

  @Input()
  public name: string;

  @ViewChild('divHeadingElement', {static: false})
  public headingElement: ElementRef;

  @ContentChild('htmlParagraphElement', {static: false})
  public paragraphContentElement: ElementRef;
  // Runs while building your class
  constructor() { console.log('=== Constructor was called ==='); }

  // Runs before ngOnInit
  ngOnChanges(changes: SimpleChanges): void {
    // It's very useful if you want to do something with the previous value of a change
    console.log('=== ngOnChanges was called ===');
    console.log(changes);
  }

  // Runs after the component was completely built
  ngOnInit(): void {
    console.log('=== ngOnInit was called ===');

    // Trying to access @ViewChild in ngOnInit
    try {
      console.log('@ViewChild headingElement on ngOnInit: ', this.headingElement.nativeElement.textContent);
    } catch (e) {
      console.log('Tried to access @ViewChild headingElement, before it is initialized, error message: ', e.message);
    }

    // Trying to access @ContentChild in ngOnInit
    try {
      console.log('@ContentChild paragraphContentElement on ngOnInit: ', this.paragraphContentElement.nativeElement.textContent);
    } catch (e) {
      console.log('Tried to access @ContentChild paragraphContentElement, before it is initialized, error message: ', e.message);
    }
  }

  // Runs on every change detection run, this is called on every Angular changes check, from everywhere
  ngDoCheck(): void {
    console.log('=== ngDoCheckCalled ===');
  }

  // Runs after the content was projected, remembering it is projected within <ng-content>
  ngAfterContentInit(): void {
    console.log('=== ngAfterContentInit ===');
    console.log('now accessing @ContentChild htmlParagraphElement ngAfterContentInit: ',
      this.paragraphContentElement.nativeElement.textContent);
  }

  // Same as doCheck but for the content, thus, <ng-content>
  ngAfterContentChecked(): void {
    console.log('=== ngAfterContentChecked ===');
  }

  ngAfterViewInit(): void {
    console.log('=== ngAfterViewInit ===');
    console.log('now accessing @ViewChild headingElement ngAfterViewInit: ', this.headingElement.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('=== ngAfterViewChecked ===');
  }

  // Runs when component dies
  ngOnDestroy(): void {
    // This is interesting, because Angular recognizes automatically when the component is not rendered after a change and then call this
    // method
    console.log('=== ngOnDestroy ===');
  }

  /**
   * If we want to get a reference / HTML Element from a HTML that is being projected into our component, that being, it's not there in the
   * component template
   * We can make use of @ContentChild, that works just like the @ViewChild but for projections
   */
}
