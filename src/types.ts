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

export type MovieTable =
  | {
      Response: 'True';
      Title: string;
      Year: string;
      Country: string;
      Type: string;
    }
  | {
      Response: 'False';
      Error: string;
    };

export type MoviesTableQueryParams = {
  type?: string;
};
