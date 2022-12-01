import BaseController from "@Contracts/BaseController";
import IPaginationRequest from "@Contracts/interfaces/IPaginationRequest";
import { Post as PostModel } from "@prisma/client";
import { CreatePostDTO } from "@Schemas/dtos/PostDtos";
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

@JsonController("/posts")
export default class PostController extends BaseController {
  protected notFoundMessage: string = "The post was not found.";

  @Get("/")
  async index(@QueryParams() query: IPaginationRequest) {
    const pagination = PaginationProvider.fromQuery<PostModel>(query);

    const posts = await this.db.post
      .findMany({
        take: pagination.limit,
        skip: pagination.offset
      })
      .catch(e => console.error(e));

    const total = await this.db.post.count().catch(e => console.error(e));

    return pagination.toResponse(posts || [], total || 0);
  }

  @Post("/")
  @HttpCode(201)
  async store(@Body() body: CreatePostDTO) {
    const post = this.db.post
      .create({ data: body })
      .catch(e => console.error(e));

    if (!post) throw new HttpError(501, "Unable to create post.");

    return post;
  }

  @Patch("/:id")
  async update(
    @Param("id") id: number,
    @Body({ validate: { skipMissingProperties: true } }) body: CreatePostDTO
  ) {
    this.ensureValidId(id);

    const post = this.db.post
      .update({ data: body, where: { id } })
      .catch(e => console.info(e));

    if (!post) this.throwNotFound();

    return post;
  }

  @Get("/:id")
  async show(@Param("id") id: number) {
    this.ensureValidId(id);

    const post = await this.db.post
      .findUnique({ where: { id }, include: { user: true } })
      .catch(e => console.info(e));

    if (!post) this.throwNotFound();

    return post;
  }

  @Delete("/:id")
  async destroy(@Param("id") id: number) {
    this.ensureValidId(id);

    const post = await this.db.post
      .delete({ where: { id } })
      .catch(e => console.info(e));

    if (!post) this.throwNotFound();

    return {
      success: true,
      message: "The post was deleted.",
      data: post
    };
  }
}
