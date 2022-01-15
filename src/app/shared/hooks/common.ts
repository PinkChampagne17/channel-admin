import { QueryFunction, useQuery, UseQueryResult } from "react-query";

export function useQueryWithFunctionName<T>(
  fn: QueryFunction<T, string>
): UseQueryResult<T, unknown> {
  return useQuery(fn.name, fn);
}
