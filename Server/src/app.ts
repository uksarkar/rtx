import "reflect-metadata";
import dotenv from "dotenv";

/**
 * configure environments
 */
dotenv.config();

/**
 * Began the application
 */
import { Bootstrapper } from "@Singletons/bootstrapper";
import Container from "typedi";

const bootstrapper = Container.get(Bootstrapper);

bootstrapper.start();
