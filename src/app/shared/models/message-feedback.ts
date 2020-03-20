import {MessageSeverity} from "../enums/message-severity.enum";

export interface FeedbackMessage {
  title?: string;
  message: string;
  severity: MessageSeverity
}
