import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    templateUrl: './cockpit.component.html',
    selector: 'app-cockpit'
})
export class CockpitComponent {
    // Event emitters
    @Output() public serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
    @Output('bpCreated') public blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

    // Properties / Fields
    public newServerName = '';
    public newServerContent = '';

    onAddServer() {
      this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
    }

    onAddBlueprint() {
      this.blueprintCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
    }
}

/**
 * What if we wanted to pass data upwards, from the child component to the parent component whenever some event happened ?
 * One way of doing this is declaring a function in the child component that will call the parent component passing the values.
 * In this case, we'll add 2 functions or events that when triggered, will call the AppComponent functions and will pass data.
 *
 * NOTE: to make something an event that can get triggered, we need to assign it as an "EventEmitter"
 * Pass the generics of what kind of data it will emit "<>"
 * Then, just call the constructor by placing () at the end
 *
 * The "EventEmitter" is an object in the Angular framework that allows you to emit you own events
 *
 * FINALLY, we've created the event, assigned the type of data it'll emit, now we just need to say when it will be triggered
 * We can do this by adding this property to a function or a routine just like in the example above
 * Also, we need to say the data that this event will pass
 *
 * LAST OF ALL, the same way we used @Input inform Angular that the property "element" of server-element would receive a value from
 * "outside", we also need inform Angular that this property ("serverCreated", "blueprintCreated") will send data to outside
 * We can do this by adding the Decorator @Output, and we can also assign an alias to it, just like in @Input
*/
