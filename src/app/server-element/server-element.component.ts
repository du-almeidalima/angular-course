import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation,
  SimpleChanges,
  DoCheck,
  AfterContentChecked,
  AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // This will remove Angular CSS behaviour and apply it application wilde
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit , AfterContentChecked, AfterViewInit
  , AfterViewChecked, OnDestroy {
  @Input('srvElement')
  public element: {type: string, name: string, content: string};

  @Input()
  public name: string;
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
  }

  // Runs on every change detection run, this is called on every Angular changes check, from everywhere
  ngDoCheck(): void {
    console.log('=== ngDoCheckCalled ===');
  }

  // Runs after the content was projected, remembering it is projected within <ng-content>
  ngAfterContentInit(): void {
    console.log('=== ngAfterContentInit ===');
  }

  // Same as doCheck but for the content, thus, <ng-content>
  ngAfterContentChecked(): void {
    console.log('=== ngAfterContentChecked ===');
  }

  ngAfterViewInit(): void {
    console.log('=== ngAfterViewInit ===');
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
   * So we added the @input name: string to demonstrate that onNgChange is called on every change.
   * But we needed to do this, because the "element" property a object, and object are passed through references, and the reference
   * wouldn't change, even if we changed some value inside of it, thus the ngOnChange of ServerElementComponent wouldn't get triggered
   */
}
