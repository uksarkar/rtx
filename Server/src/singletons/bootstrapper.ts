import express, { Application } from "express";
import Container, { Inject, Service } from "typedi";
import { useExpressServer } from "routing-controllers";
import { APPLICATION_CONTROLLER_PATHS } from "@Configs/controllers-config";
import {
  APPLICATION_CORS,
  APPLICATION_HOST,
  APPLICATION_PORT
} from "@Configs/app-configs";
import DBClient from "./DBClient";

@Service()
export class Bootstrapper {
  private _app: Application;

  constructor(
    @Inject(APPLICATION_PORT) private _port: number,
    @Inject(APPLICATION_HOST) private _host: string,
    @Inject(APPLICATION_CONTROLLER_PATHS) private _controllers: string[],
    @Inject(APPLICATION_CORS) private _cors: string | string[]
  ) {
    this._app = express();
    this.init();
  }

  get app(): Application {
    return this._app;
  }

  /**
   * Start the server
   */
  start(): void {
    try {
      this._app.listen(this._port, this._host, () => {
        console.log(
          `Application is running at http://${this._host}:${this._port}`
        );
      });
    } catch (error) {
      Container.get(DBClient).disconnect();
      console.log(error);
    }
  }

  private init(): void {
    useExpressServer(this._app, {
      controllers: this._controllers,
      cors: {
        origin: (
          origin: string,
          callback: (err: Error | null, allowed?: boolean) => void
        ) => {
          if (
            (typeof this._cors === "string" &&
              (this._cors === "*" || origin === this._cors)) ||
            this._cors.includes(origin)
          ) {
            callback(null, true);
            return;
          }

          callback(new Error("Not allowed."));
        }
      }
    });
  }
}
