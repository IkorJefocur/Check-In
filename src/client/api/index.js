import {
	useQuery as usePureQuery,
	useQueries as usePureQueries,
	useMutation as usePureMutation,
	useQueryClient
} from '@tanstack/react-query';

export const baseOptions = {
	networkMode: 'always',
	refetchOnMount: false,
	refetchOnReconnect: false,
	staleTime: Infinity
};

export async function request(url, options) {
	const response = await fetch(`/api/${url}`, options);
	return response.ok ? response.json() : Promise.reject(response.status);
}

export function timestamp(value) {
	return new Date(value * 1000);
}

export function useQuery(key, queryFn, options = {}) {
	return usePureQuery(key, queryFn, {...baseOptions, ...options});
}

export function useQueries({queries, ...options}) {
	return usePureQueries({
		queries: queries.map(query => ({...baseOptions, ...query})),
		...options
	});
}

export function useMutation(mutationFn, options = {}) {
	return usePureMutation(mutationFn, {...baseOptions, ...options});
}

export function useListQuery(
	listKey, itemId, queryFn, options
) {
	const client = useQueryClient();

	return useQuery(listKey, async context => {
		const list = await queryFn(context);
		return Object.fromEntries(list.map(item => [itemId(item), item]));
	}, options);
}

export function useListItemQuery(
	listKey, itemKey, itemId, queryFn, placeholder, options
) {
	if (typeof placeholder === 'object') {
		options = placeholder;
		placeholder = null;
	}

	const client = useQueryClient();

	return useQuery(itemKey, async context => {
		const list = client.getQueryData(listKey);
		if (!list)
			return queryFn(context);

		return itemId in list
			? list[itemId]
			: placeholder ? placeholder(context) : Promise.reject(404);
	}, options);
}

export function useListMutation(
	listKey, itemKey, itemId, mutationFn, options
) {
	const client = useQueryClient();

	return useMutation(async variables => {
		const item = await mutationFn(variables);

		client.setQueryData(itemKey(itemId(item)), item);
		if (client.getQueryState(listKey))
			client.setQueryData(listKey, list => ({
				...list, [itemId(item)]: item
			}));
	}, options);
}

export function useListDeletion(
	listKey, itemKey, mutationFn, options
) {
	const client = useQueryClient();

	return useMutation(async variables => {
		const id = await mutationFn(variables);

		if (client.getQueryState(listKey))
			client.setQueryData(listKey, list => {
				list = {...list};
				delete list[id];
				return list;
			});
		client.resetQueries(itemKey(id));
	});
}