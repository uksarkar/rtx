import DBClient from "@Singletons/DBClient";
import Logger from "@Singletons/Logger";
import { isNumber } from "lodash";
import { NotFoundError } from "routing-controllers";
import Container from "typedi";

export default abstract class BaseController {
  protected readonly db: DBClient;
  protected readonly logger: Logger;
  protected abstract notFoundMessage: string;

  constructor() {
    this.db = Container.get(DBClient);
    this.logger = Container.get(Logger);
  }

  protected throwNotFound(): never {
    throw new NotFoundError(this.notFoundMessage);
  }

  protected ensureValidId(id: number): void {
    if (!isNumber(id)) this.throwNotFound();
  }
}
