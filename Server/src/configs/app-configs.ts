import Container, { Token } from "typedi";

const APPLICATION_PORT = new Token<number>("port");
const APPLICATION_HOST = new Token<string>("host");

Container.set(APPLICATION_PORT, process.env.APP_PORT || 3000);
Container.set(APPLICATION_HOST, process.env.APP_HOST || "localhost");

export { APPLICATION_HOST, APPLICATION_PORT };
