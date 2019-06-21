import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    templateUrl: './cockpit.component.html',
    selector: 'app-cockpit'
})
export class CockpitComponent {
    // Event emitters
    @Output() public serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
    @Output('bpCreated') public blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

    onAddServer(nameInput: HTMLInputElement, contentInput: HTMLInputElement) {

      this.serverCreated.emit({
          serverName: nameInput.value,
          serverContent: contentInput.value
      });
    }

    onAddBlueprint(nameInput: HTMLInputElement, contentInput: HTMLInputElement) {
      this.blueprintCreated.emit({
          serverName: nameInput.value,
          serverContent: contentInput.value
      });
    }
}
