import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
  QueryFunction,
  MutationKey,
  MutationFunction,
  UseQueryOptions,
  UseMutationOptions,
  InvalidateQueryFilters,
} from "@tanstack/react-query";

export function useRequestProcessor() {
  const queryClient = useQueryClient();

  function useApiQuery(
    queryKey: QueryKey,
    queryFunction: QueryFunction,
    options: UseQueryOptions
  ) {
    return useQuery({
      queryFn: queryFunction,
      ...options,
      queryKey,
    });
  }

  function useApiMutation(
    key: MutationKey,
    mutationFunction: MutationFunction,
    options: UseMutationOptions = {}
  ) {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () =>
        queryClient.invalidateQueries(key as InvalidateQueryFilters),
      ...options,
    });
  }

  return { useApiQuery, useApiMutation };
}
