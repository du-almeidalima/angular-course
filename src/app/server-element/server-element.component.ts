import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
  @Input() public element: {type: string, name: string, content: string}
  constructor() { }

  ngOnInit() {
  }

}

/** In the server-element.component.html we're trying to access a js objetc "element", but it doesn't exists in our ts file yet.
 *  So lets create this property "element" in our class !
 * 
 *  But, this property is still only accessible only inside this component :c
 *  In Angular, we need to explicity say that a property is allowed to be accessible by parents components
 *  To do this, we need to add a Decorator to the property: "@Input()" and import it
 * 
 *  NOTE: This property "element" will only be visible by the component that is implementing this component (ServerElementComponent) through the selector
 *  "app-server-element"
*/