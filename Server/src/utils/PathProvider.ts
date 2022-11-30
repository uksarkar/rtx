import { join } from "path";

export default class PathProvider {
  private static get base(): string {
    return process.env.NODE_ENV === "production" ? "dist" : "src";
  }

  static basePath(...to: string[]): string {
    return join(process.cwd(), this.base, ...to);
  }

  static controllersPath(to: string = ""): string {
    return this.basePath("/request/controllers", to);
  }

  static middlewaresPath(to: string = ""): string {
    return this.basePath("/request/middlewares", to);
  }

  static publicPath(to: string = ""): string {
    return this.basePath("/public", to);
  }
}
