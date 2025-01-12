import {useState} from 'react';
import useTimer from '../useTimer';
import {
	request, timestamp,
	useListQuery, useListItemQuery, useListMutation, useListDeletion
} from '.';

const key = id => id != null
	? ['students', id, 'permission']
	: ['students', 'permissions'];
export default key;
const id = perm => perm.studentId;

function parse({studentId, permissionId, start, finish}) {
	return {
		studentId, permissionId,
		start: timestamp(start),
		finish: timestamp(finish)
	};
}

export function useGetStudentsPermissions(options) {
	return useListQuery(
		key(), id,
		() => request('students/permissions/').then(perms => perms.map(parse)),
		options
	);
}

export function useGetStudentPermission(id, options) {
	return useListItemQuery(
		key(), key(id), id,
		() => request(`students/${id}/permission`).then(parse)
			.catch(error => error === 404 ? null : Promise.reject(error)),
		() => null,
		options
	);
}

export function usePutStudentPermission(options) {
	return useListMutation(
		key(), key, id,
		perm => request(`students/${id(perm)}/permission`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(perm)
		}).then(parse),
		options
	);
}

export function useDeleteStudentPermission(options) {
	return useListDeletion(
		key(), key,
		id => request(`students/${id}/permission`, {
			method: 'DELETE'
		}).then(() => id),
		options
	);
}

export function useStudentPermissionTimer(id, options) {
	const [isFinished, setFinished] = useState(false);
	const {isSuccess, data: perm} = useGetStudentPermission(id, options);

	const timer = useTimer({
		expiryTimestamp: perm && perm.finish,
		setExpired: setFinished
	});

	return isSuccess && perm ? timer : null;
}