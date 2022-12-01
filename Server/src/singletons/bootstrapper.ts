import express, { Application } from "express";
import Container, { Inject, Service } from "typedi";
import { useExpressServer } from "routing-controllers";
import { APPLICATION_CONTROLLER_PATHS } from "@Configs/controllers-config";
import { APPLICATION_HOST, APPLICATION_PORT } from "@Configs/app-configs";
import DBClient from "./DBClient";

@Service()
export class Bootstrapper {
  private _app: Application;

  constructor(
    @Inject(APPLICATION_PORT) private _port: number,
    @Inject(APPLICATION_HOST) private _host: string,
    @Inject(APPLICATION_CONTROLLER_PATHS) private _controllers: string[]
  ) {
    this._app = express();
  }

  /**
   * Start the server
   */
  start() {
    try {
      this.init();

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
      controllers: this._controllers
    });
  }
}
