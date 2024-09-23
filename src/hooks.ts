import { useMemo } from 'react';
import qs from 'qs';
import { useSearchParams } from 'react-router-dom';

export const useFiltersParams = <T = qs.ParsedQs>() => {
  const [params] = useSearchParams();
  const paramsObject = qs.parse(params.toString(), { ignoreQueryPrefix: true });

  const getParams = useMemo(() => {
    return Object.keys(paramsObject).reduce((acc, key) => {
      acc[key] = paramsObject[key];
      return acc;
    }, {} as qs.ParsedQs);
  }, [paramsObject]);

  return {
    getParams,
  } as {
    getParams: T;
  };
};
