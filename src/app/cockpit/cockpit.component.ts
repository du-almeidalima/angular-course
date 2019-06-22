import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
    templateUrl: './cockpit.component.html',
    selector: 'app-cockpit'
})
export class CockpitComponent {
  // Event emitters
  @Output()
  public serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  @Output('bpCreated')
  public blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  // Properties
  @ViewChild('serverContentInput', {static: false})
  public serverContentInput: ElementRef;

  onAddServer(nameInput: HTMLInputElement) {
    console.log(this.serverContentInput);
    this.serverCreated.emit({
        serverName: nameInput.value,
        serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
        serverName: nameInput.value,
        serverContent: this.serverContentInput.nativeElement.value
    });
  }
}

/**
 * For us to be able to get that reference in the template ("serverContentInput") we can use ViewChild
 * @ViewChild requires 2 arguments for Angular 8, one of them is the selector, and there is where we can pass our reference!
 *
 * NOTE: We could also pass another component to this selector
 * NOTE: The "serverContentInput" property of our CockpitComponent will hold not the element but a reference to it!
 * NOTE: You shouldn't change the element directly through there reference, e.g. serverContent.nativeElement.value = 'something'
*/
