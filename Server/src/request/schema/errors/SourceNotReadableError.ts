import { HttpError } from "routing-controllers";

export default class SourceNotReadableError extends HttpError {
  constructor(message: string = "Source not readable") {
    super(503, message);
  }
}
