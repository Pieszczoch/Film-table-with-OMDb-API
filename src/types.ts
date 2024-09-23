import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

export type QueryContext<
  keys extends { [K: string]: QueryKey | ((...params: any[]) => QueryKey) },
  mode extends keyof keys,
> = keys[mode] extends (...params: any[]) => QueryKey
  ? QueryFunctionContext<ReturnType<keys[mode]>>
  : keys[mode] extends QueryKey
    ? QueryFunctionContext<keys[mode]>
    : never;

export type Pagination<T> = {
  data: T;
  hasNextPage: boolean;
};

export type MoviesTable = {
  title: string;
  year: string;
  rated: string;
  released: string;
  genre: string;
  country: string;
};

export type MoviesTableQueryParams = {
  type?: string;
};
