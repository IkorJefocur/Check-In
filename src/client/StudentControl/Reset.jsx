import './Reset.sass';
import React, {useCallback} from 'react';
import {cn} from '@bem-react/classname';
import {useDeleteStudentPermission} from '../api/studentsPermissions';
import Button from '../Button';

export default function StudentControlReset({
	className,
	id
}) {
	const {mutate} = useDeleteStudentPermission();
	const deletePermission = useCallback(() => {
		mutate(id);
	}, [id, mutate]);

	return (
		<Button
			className={cn('StudentControl', 'Reset')({}, [className])}
			style="backgrounded"
			onClick={deletePermission}
		>
			Reset
		</Button>
	);
}