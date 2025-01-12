import './Extend.sass';
import React, {useCallback} from 'react';
import {cn} from '@bem-react/classname';
import {
	useGetStudentPermission, usePutStudentPermission
} from '../api/studentsPermissions';
import Button from '../Button';

export default function StudentControlExtend({
	className,
	id
}) {
	const {isSuccess, data: {
		studentId, permissionId
	} = {}} = useGetStudentPermission(id);

	const {mutate} = usePutStudentPermission();
	const extendPermission = useCallback(() => {
		mutate({studentId, permissionId});
	}, [studentId, permissionId, mutate]);

	return isSuccess && (
		<Button
			className={cn('StudentControl', 'Extend')({}, [className])}
			style="backgrounded"
			onClick={extendPermission}
		>
			Extend
		</Button>
	);
}