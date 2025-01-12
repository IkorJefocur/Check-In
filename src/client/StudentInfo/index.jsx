import './index.sass';
import React from 'react';
import {cn} from '@bem-react/classname';
import {useGetStudent} from '../api/students';
import {
	useGetStudentPermission, useStudentPermissionTimer
} from '../api/studentsPermissions';
import Status from './Status';
import Name from './Name';
import Timer from './Timer';

export default function StudentInfo({
	className,
	id,
	verboseStatus
}) {
	const {isSuccess: studentSuccess, data: {
		firstname, lastname, tel
	} = {}} = useGetStudent(id);
	const {isSuccess: permSuccess, data: perm} = useGetStudentPermission(id);
	const timer = useStudentPermissionTimer(id);

	return studentSuccess && permSuccess && (
		<article className={cn('StudentInfo')({}, [className])}>
			<Status onCampus={!perm} />
			{verboseStatus && timer &&
				<Timer timer={timer} />
			}
			<Name firstname={firstname} lastname={lastname} />
		</article>
	);
}