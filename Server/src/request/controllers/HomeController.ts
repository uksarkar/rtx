// import PathProvider from "@Utils/PathProvider";
import { Get } from "routing-controllers";

export default class HomeController {
  @Get()
  // @Render(PathProvider.publicPath("/index.html"))
  index() {
    return "Using for API only";
  }
}
