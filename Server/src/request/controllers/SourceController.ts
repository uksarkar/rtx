import {
  Get,
  HttpError,
  JsonController,
  Param,
  QueryParams
} from "routing-controllers";
import IPaginationRequest from "@Contracts/interfaces/IPaginationRequest";
import PaginationProvider from "@Utils/PaginationProvider";
import axios, { AxiosError } from "axios";
import SourceNotReadableError from "@Schemas/errors/SourceNotReadableError";

@JsonController("/")
export default class SourceController {
  private readonly sourceBaseUrl: string;

  constructor() {
    this.sourceBaseUrl = process.env.SOURCE_API || "";
  }

  private get sourceSearchUrl(): string {
    return `${this.sourceBaseUrl}/facts/random`;
  }

  @Get("fromSource")
  async index(@QueryParams() query: IPaginationRequest) {
    const pagination = PaginationProvider.fromQuery(query);
    const url =
      this.sourceSearchUrl +
      `?page=${pagination.page}&limit=${pagination.limit}`;

    return pagination.toResponse(await this.fetchData(url));
  }

  @Get("fromSource/:id")
  async show(@Param("id") id: string) {
    const url = this.sourceBaseUrl + `facts/${id}`;

    return this.fetchData(url);
  }

  private async fetchData(url: string) {
    try {
      return (await axios.get(url)).data;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        throw new SourceNotReadableError();
      }

      throw new HttpError(500, "Server error.");
    }
  }
}
