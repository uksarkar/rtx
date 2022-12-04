import Container, { Token } from "typedi";

const APPLICATION_PORT = new Token<number>("port");
const APPLICATION_HOST = new Token<string>("host");
const APPLICATION_CORS = new Token<string | string[]>("cors");

const cors = process.env.ALLOWED_ORIGINS?.includes(",")
  ? process.env.ALLOWED_ORIGINS.split(",")
  : process.env.ALLOWED_ORIGINS || "*";

Container.set(APPLICATION_PORT, process.env.APP_PORT || 3000);
Container.set(APPLICATION_HOST, process.env.APP_HOST || "localhost");
Container.set(APPLICATION_CORS, cors);

export { APPLICATION_HOST, APPLICATION_PORT, APPLICATION_CORS };
