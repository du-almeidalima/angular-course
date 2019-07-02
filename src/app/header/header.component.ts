import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output()
  public linkClicked = new EventEmitter<string>();

  public onLinkClick(link: string){

    this.linkClicked.emit(link);
  }
}
