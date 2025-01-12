import {request, useListQuery, useListItemQuery} from '.';

const key = id => id != null ? ['permissions', id] : ['permissions'];
export default key;

export function useGetPermissions(options) {
	return useListQuery(
		key(), perm => perm.id, () => request('permissions/'), options
	);
}

export function useGetPermission(id, options) {
	return useListItemQuery(
		key(), key(id), id, () => request(`permissions/${id}`), options
	);
}