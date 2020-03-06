import StatusMessages from "./status-messages";
import {MessageStatus} from "./enums/message-status.enum";

export default class RecipeValidator {

  private static errorMessages = {
    required: new StatusMessages('This field is required.', MessageStatus.ERROR),
    invalidNumber: new StatusMessages('This field should have only numbers.', MessageStatus.ERROR)
  };

  public static getMessage(messageKey: string): StatusMessages{
    if (messageKey in RecipeValidator.errorMessages) {
      return RecipeValidator.errorMessages[messageKey];
    }
  }
}
