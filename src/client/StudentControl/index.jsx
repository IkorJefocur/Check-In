import './index.sass';
import React, {useState} from 'react';
import {cn} from '@bem-react/classname';
import {useGetStudent} from '../api/students';
import {
	useGetStudentPermission, useStudentPermissionTimer
} from '../api/studentsPermissions';
import Name from './Name';
import Tel from './Tel';
import Status from './Status';
import PermissionChoice from './PermissionChoice';
import PermissionInfo from './PermissionInfo';
import Timer from './Timer';
import Extend from './Extend';
import Reset from './Reset';

export default function StudentControl({
	className,
	id
}) {
	const {isSuccess: studentSuccess, data: {
		firstname, lastname, tel
	} = {}} = useGetStudent(id);
	const {isSuccess: statusSuccess, data: status} = useGetStudentPermission(id);
	const {permissionId} = status || {};
	const timer = useStudentPermissionTimer(id);

	return studentSuccess && statusSuccess ? (
		<article
			className={cn('StudentControl')({onCampus: !status}, [className])}
		>
			<Name firstname={firstname} lastname={lastname} />
			<Tel tel={tel} callButton={true} />
			<Status onCampus={!status} />
			{status
				? <>
					{timer && <Timer timer={timer} />}
					<PermissionInfo id={permissionId} />
					<Extend id={id} />
					<Reset id={id} />
				</>
				: <PermissionChoice id={id} />
			}
		</article>
	) : <></>;
}