import {Component, Input} from '@angular/core';
import {Post} from '../app.component';

@Component({
  selector: 'app-card',
  styles: ['.media-title { display: inline-block }'],
  template: `
    <div class="box" style="margin-top: 10px;">
      <div class="media">
        <div class="media-content">
            <div class="content">
              <div class="media-title has-text-weight-bold">{{post.title}}</div>
              <p>{{post.body}}</p>
            </div>
        </div>
      </div>
    </div>
  `
})
export class CardComponent {

  @Input() public post: Post;
  constructor() { }

}
