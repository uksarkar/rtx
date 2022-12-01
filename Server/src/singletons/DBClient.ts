import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service()
export default class DBClient {
  private _client: PrismaClient;

  constructor() {
    this._client = new PrismaClient();
  }

  get client(): PrismaClient {
    return this._client;
  }

  get user() {
    return this._client.user;
  }

  get post() {
    return this._client.post;
  }

  disconnect(): void {
    this._client.$disconnect();
  }
}
