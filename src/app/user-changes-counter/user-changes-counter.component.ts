import {Component, OnInit} from '@angular/core';
import {ChangeCounterService} from '../services/change-counter.service';

@Component({
  selector: 'app-user-changes-counter',
  templateUrl: './user-changes-counter.component.html',
  styles: ['div{min-height: 40px; padding-top: 8px;}']
})
export class UserChangesCounterComponent implements OnInit {

  private activeChanges = 0;
  private inactiveChanges = 0;

  constructor(private changeCounterService: ChangeCounterService) {
    this.changeCounterService.changeStatus.subscribe(
      (newStatus: string) => {
        newStatus === 'activated' ? this.activeChanges++ : this.inactiveChanges++;
      }
    );
  }

  ngOnInit() {
  }

}

/** Here we're subscribing to the ChangeCounterService so whenever it changes something this component will display it.
 * The subscribe() receives an arrow function with the value that the event is emitting
 */
