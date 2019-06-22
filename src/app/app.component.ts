import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{type: 'server', name: 'I Will dominate you!', content: 'I\'m a server!'}];

  public onServerAdded(serverData: {serverName: string, serverContent: string}) {

    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  public onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {

    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  public onChangeFirst(): void {
    // Just a function to change the name of the first element to prove that ngOnChange is always called
    this.serverElements[0].name = 'Changed!';
  }

  public onDestroyFirst(): void{
    // Just a function to simulates a destruction of a component
    this.serverElements.splice(0, 1);
  }
}
