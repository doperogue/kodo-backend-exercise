export interface PaginationInterface<T> {
  items: T[];
  perPage: number;
  page: number;
  total: number;
}
