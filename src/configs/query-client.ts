import { QueryCache, QueryClient } from '@tanstack/react-query';

import { notifyError } from '@/errors/notify-error';

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			notifyError((query.meta?.errorMessage as string) ?? error);
		},
	}),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

export default queryClient;
