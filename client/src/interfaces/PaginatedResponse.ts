export default interface PaginatedResponse<T> {
  total: number;
  limit: number;
  page: number;
  data: Array<T>;
}
