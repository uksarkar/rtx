import PathProvider from "@Utils/PathProvider";
import { join } from "path";

describe("Unit:PathProvider", () => {
  it("get base path", () => {
    const basePath = join(process.cwd(), "/src");
    const providerBasePath = PathProvider.basePath();

    expect(providerBasePath).toEqual(basePath);
  });

  it("get controllers path", () => {
    const controllersPath = join(process.cwd(), "/src/request/controllers");
    const providerControllersPath = PathProvider.controllersPath();

    expect(providerControllersPath).toEqual(controllersPath);
  });

  it("get middlewares path", () => {
    const middlewaresPath = join(process.cwd(), "/src/request/middlewares");
    const providermiddlewaresPath = PathProvider.middlewaresPath();

    expect(providermiddlewaresPath).toEqual(middlewaresPath);
  });

  it("get public path", () => {
    const publicPath = join(process.cwd(), "/src/request/public");
    const providerPublicPath = PathProvider.publicPath();

    expect(providerPublicPath).toEqual(publicPath);
  });

  it("custom path from the base", () => {
    const unknown = join(process.cwd(), "/src/unknown");
    const providerUnknown = PathProvider.basePath("/unknown");

    expect(providerUnknown).toEqual(unknown);
  });
});
