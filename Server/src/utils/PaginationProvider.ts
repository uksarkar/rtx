import PaginatedResponse from "@Contracts/interfaces/PaginatedResponse";
import { isInteger, isNumber, toNumber } from "lodash";

export default class PaginationProvider<T> {
  private readonly _maxLimit = 1000;
  private readonly _minLimit = 10;

  private _total = 0;
  private _page: number;
  private _limit: number;

  constructor(page?: number | string, limit?: number | string) {
    this._page = Math.max(this.toInteger(page, 1), 1);
    this._limit = Math.max(
      this.toInteger(limit, this._minLimit),
      this._minLimit
    );
  }

  get page(): number {
    return this._page;
  }

  get limit(): number {
    return Math.min(this._limit, this._maxLimit);
  }

  get offset(): number {
    return this._limit * Math.max(this._page - 1, 0);
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
    const { page, limit } = query;
    return new this<T>(page, limit);
  }

  private toInteger(val?: number | string, back?: number): number {
    return isInteger(toNumber(val)) ? toNumber(val) : back || 0;
  }
}
