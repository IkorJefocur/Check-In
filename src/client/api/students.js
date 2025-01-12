import {request, useListQuery, useListItemQuery} from '.';

const key = id => id != null ? ['students', id] : ['students'];
export default key;

export function useGetStudents(options) {
	return useListQuery(
		key(), student => student.id, () => request('students/'), options
	);
}

export function useGetStudent(id, options) {
	return useListItemQuery(
		key(), key(id), id, () => request(`students/${id}`), options
	);
}