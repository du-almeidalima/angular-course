import {StatusMessage} from "./status-message";
import {MessageStatus} from "./enums/message-status.enum";

export default class RecipeValidator {

  private static errorMessages = {
    required: new StatusMessage('This field is required.', MessageStatus.ERROR),
    invalidNumber: new StatusMessage('This field should have only numbers.', MessageStatus.ERROR)
  };

  public static getMessage(messageKey: string): StatusMessage{
    if (messageKey in RecipeValidator.errorMessages) {
      return RecipeValidator.errorMessages[messageKey];
    }
  }
}
