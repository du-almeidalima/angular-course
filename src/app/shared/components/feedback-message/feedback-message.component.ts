import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from "@angular/core";
import {FeedbackMessage} from "../../models/message-feedback";

@Component({
  selector: 'app-feedback-message',
  template: `
    <div class="alert alert-dismissible fade show mt-2" [ngClass]="message.severity" role="alert" #alertContainer>
      <strong *ngIf="message.title">{{message.title}}</strong> {{message.message}}
      <button (click)="closeAlert()" type="button" class="close no-outline" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `
})
export class FeedbackMessageComponent {
  @Input() public message: FeedbackMessage;
  @Output()public messageDismiss: EventEmitter<void> = new EventEmitter();

  @ViewChild('alertContainer')
  public alertContainer: ElementRef;

  constructor(private renderer2: Renderer2) {}

  public closeAlert(): void {
    this.renderer2.removeClass(this.alertContainer.nativeElement, 'show');
    setTimeout(() => {
      this.messageDismiss.emit()
    }, 150)
  }
}

