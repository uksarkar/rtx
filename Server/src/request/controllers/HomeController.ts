import PathProvider from "@Utils/PathProvider";
import { Get, JsonController, Render } from "routing-controllers";

@JsonController("/")
export default class HomeController {
  @Get()
  @Render(PathProvider.publicPath("/index.html"))
  index() {
    return {};
  }
}
