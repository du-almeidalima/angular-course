import { Component } from "@angular/core";

@Component({
    templateUrl: './cockpit.component.html',
    selector: 'app-cockpit'
})
export class Cockpit {

    public newServerName = '';
    public newServerContent = '';

    onAddServer() {
        // this.serverElements.push({
        //   type: 'server',
        //   name: this.newServerName,
        //   content: this.newServerContent
        // });
    }
    
    onAddBlueprint() {
        // this.serverElements.push({
        //     type: 'blueprint',
        //     name: this.newServerName,
        //     content: this.newServerContent
        // });
    }
}