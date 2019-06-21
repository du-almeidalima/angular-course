import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // This will remove Angular CSS behaviour and apply it application wilde
})
export class ServerElementComponent implements OnInit {
  @Input('srvElement')
  public element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit() {
  }

}

/** In the server-element.component.html we're trying to access a js object "element", but it doesn't exists in our ts file yet.
 *  So lets create this property "element" in our class !
 *
 *  But, this property is still only accessible only inside this component :c
 *  In Angular, we need to explicitly say that a property is allowed to be accessible by parents components
 *  To do this, we need to add a Decorator to the property: "@Input()" and import it
 *
 *  NOTE: This property "element" will only be visible by the component that is implementing this component (ServerElementComponent)
 *  through the selector "app-server-element"
 *
 *  NOTE: We can also expose our property/field 'element' with an alias, as shown above
 *
 *  NOTE: When a property/field is declared with the decorator @Input() you don't need to initialize it on constructor
 *
 *  View Encapsulation: Angular enforces a way of each component has its own CSS style applied to it, but how does Angular does that?
 *  It actually create attributes, that can be seen on the inspection tool, to identify the component html, so its CSS is only applied
 *  to it. We can change this behaviour in the @Component decorator by adding the "encapsulation" property and with the "ViewEncapsulation"
 *  value
*/
