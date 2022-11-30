import PathProvider from "@Utils/PathProvider";
import Container, { Token } from "typedi";

const APPLICATION_CONTROLLER_PATHS = new Token<string[]>("controllers");

/**
 * Provide the controllers path, it can be absolute path or directory pattern
 *
 * @var {Array<string>}
 */
const paths = [PathProvider.controllersPath("/**/*Controller.ts")];

Container.set(APPLICATION_CONTROLLER_PATHS, paths);
export { APPLICATION_CONTROLLER_PATHS };
