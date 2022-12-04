import { Service } from "typedi";

@Service()
export default class Logger {
  private isTest: boolean;

  constructor() {
    this.isTest = process.env.NODE_ENV === "test";
  }

  alert(message: string, data?: object) {
    if (this.isTest) return;

    console.warn(message);
  }

  info(message: string, data?: object) {
    if (this.isTest) return;

    console.info(message);
  }

  error(message: string, data?: object) {
    if (this.isTest) return;

    console.error(message);
  }
}
