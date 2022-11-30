import PaginatedResponse from "@Contracts/interfaces/PaginatedResponse";
import { isNumber, toNumber } from "lodash";

export default class PaginationProvider<T> {
  private _total = 0;

  constructor(private _page: number, private _limit: number) {}

  get page(): number {
    return this._page;
  }

  get limit(): number {
    return this._limit;
  }

  get offset(): number {
    return this._limit * (this._page - 1);
  }

  get total(): number {
    return this._total;
  }

  setTotal(num: number): this {
    this._total = num;
    return this;
  }

  toResponse(data: Array<T>, total?: number): PaginatedResponse<T> {
    if (isNumber(total)) this._total = total;

    return {
      page: this.page,
      limit: this.limit,
      total: this._total,
      data
    };
  }

  static fromQuery<T>(query: {
    limit?: number | string;
    page?: number | string;
  }) {
    const { page = 1, limit = 10 } = query;
    return new this<T>(toNumber(page), toNumber(limit));
  }
}
