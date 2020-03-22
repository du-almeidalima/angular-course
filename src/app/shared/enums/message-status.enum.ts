import {MessageSeverity} from "./message-severity.enum";

export enum MessageStatus {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  INFO = "INFO"
}

export namespace MessageStatus {
  export function messageStatusToSeverity(messageStatus: MessageStatus): MessageSeverity {
    switch (messageStatus) {
      case MessageStatus.ERROR:
        return MessageSeverity.DANGER;
      case MessageStatus.WARNING:
        return MessageSeverity.WARNING;
      case MessageStatus.SUCCESS:
        return MessageSeverity.SUCCESS;
      case MessageStatus.INFO:
        return MessageSeverity.INFO;
    }
  }
}
