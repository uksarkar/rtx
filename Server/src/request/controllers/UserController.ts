import { PrismaClient } from "@prisma/client";
import IPaginationRequest from "@Contracts/interfaces/IPaginationRequest";
import PaginationProvider from "@Utils/PaginationProvider";
import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Patch,
  Post,
  QueryParams
} from "routing-controllers";

const prisma = new PrismaClient();

@JsonController("/users")
export default class UserController {
  @Get("/")
  async index(@QueryParams() query: IPaginationRequest) {
    const pagination = PaginationProvider.fromQuery(query);

    const users = await prisma.user.findMany({
      take: pagination.limit,
      skip: pagination.offset
    });

    return pagination.toResponse(users, await prisma.user.count());
  }

  @Post("/")
  @HttpCode(201)
  async store(@Body() body: { firstname: string; lastname: string }) {
    return prisma.user.create({ data: body });
  }

  @Patch("/:id")
  async update(
    @Param("id") id: number,
    @Body() body: { firstname?: string; lastname?: string }
  ) {
    return prisma.user.update({ data: body, where: { id } });
  }

  @Get("/:id")
  async show(@Param("id") id: number) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundError("The user not found.");

    return user;
  }

  @Delete("/:id")
  async destroy(@Param("id") id: number) {
    const user = await prisma.user.delete({ where: { id } });

    if (!user) throw new NotFoundError("The user not found.");

    return {
      success: true,
      message: "The user deleted."
    };
  }
}
