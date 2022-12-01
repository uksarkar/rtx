import IPaginationRequest from "@Contracts/interfaces/IPaginationRequest";
import PaginationProvider from "@Utils/PaginationProvider";
import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpError,
  JsonController,
  Param,
  Patch,
  Post,
  QueryParams
} from "routing-controllers";
import { CreateUserDTO } from "@Schemas/dtos/UserDtos";
import { Post as PostModel, User } from "@prisma/client";
import BaseController from "@Contracts/BaseController";

@JsonController("/users")
export default class UserController extends BaseController {
  protected notFoundMessage: string = "The user was not found.";

  @Get("/")
  async index(@QueryParams() query: IPaginationRequest) {
    const pagination = PaginationProvider.fromQuery<User>(query);

    const users = await this.db.user
      .findMany({
        take: pagination.limit,
        skip: pagination.offset
      })
      .catch(e => console.error(e));

    const total = await this.db.user.count().catch(e => console.error(e));

    return pagination.toResponse(users || [], total || 0);
  }

  @Post("/")
  @HttpCode(201)
  async store(@Body() body: CreateUserDTO) {
    const user = this.db.user
      .create({ data: body })
      .catch(e => console.error(e));

    if (!user) throw new HttpError(501, "Unable to create user.");

    return user;
  }

  @Patch("/:id")
  async update(
    @Param("id") id: number,
    @Body({ validate: { skipMissingProperties: true } }) body: CreateUserDTO
  ) {
    this.ensureValidId(id);

    const user = this.db.user
      .update({ data: body, where: { id } })
      .catch(e => console.info(e));

    if (!user) this.throwNotFound();

    return user;
  }

  @Get("/:id")
  async show(@Param("id") id: number) {
    this.ensureValidId(id);

    const user = await this.db.user
      .findUnique({ where: { id } })
      .catch(e => console.info(e));

    if (!user) this.throwNotFound();

    return user;
  }

  @Get("/:id/posts")
  async posts(
    @Param("id") id: number,
    @QueryParams() query: IPaginationRequest
  ) {
    this.ensureValidId(id);

    const pagination = new PaginationProvider<PostModel>(
      query.page,
      query.limit
    );

    const user = await this.db.user.findUnique({
      where: {
        id
      },
      include: {
        posts: {
          skip: pagination.offset,
          take: pagination.limit
        }
      }
    });

    const total = await this.db.post.count({
      where: {
        user_id: id
      }
    });

    if (!user) this.throwNotFound();

    return pagination.toResponse(user.posts, total);
  }

  @Delete("/:id")
  async destroy(@Param("id") id: number) {
    this.ensureValidId(id);

    const user = await this.db.user
      .delete({ where: { id } })
      .catch(e => console.info(e));

    if (!user) this.throwNotFound();

    return {
      success: true,
      message: "The user was deleted.",
      data: user
    };
  }
}
