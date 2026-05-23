import { useQueryClient } from '@tanstack/react-query';

const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  return {
    invalidateQueryKey: (queryKey: string) =>
      queryClient.invalidateQueries({ queryKey: [queryKey] }),

    invalidateQueryKeys: (queryKeys: string[]) =>
      queryClient.invalidateQueries({ queryKey: queryKeys }),

    invalidateAllQueryKeys: () => queryClient.invalidateQueries(),
  };
};

export default useInvalidateQueries;
