import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ONE_MINUTE_MS } from './consts';
import { MoviesTableQueryParams, MovieTable, QueryContext } from './types';

const moviesKeyFactory = {
  all: [{ scope: 'folders' }],
  getByParams: (params?: MoviesTableQueryParams) => [
    {
      ...moviesKeyFactory.all[0],
      params,
    },
  ],
};

const getMovies = async ({
  queryKey: [{ params }],
}: QueryContext<typeof moviesKeyFactory, 'getByParams'>) => {
  return axios.get<MovieTable>('', { params }).then((res) => res.data);
};

export const useMoviesQuery = ({ params }: { params: MoviesTableQueryParams }) => {
  return useQuery({
    queryKey: moviesKeyFactory.getByParams(params),
    queryFn: getMovies,
    placeholderData: keepPreviousData,
    staleTime: ONE_MINUTE_MS,
  });
};
