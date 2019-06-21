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
