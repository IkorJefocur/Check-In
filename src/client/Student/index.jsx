import './index.sass';
import React, {useState} from 'react';
import {cn} from '@bem-react/classname';
import useTimer from '../useTimer';
import {useGetStudent} from '../api/students';
import {useStudentPermissionTimer} from '../api/studentsPermissions';
import Info from './Info';
import Call from './Call';

export default function Student({
	className,
	id,
	verboseStatus,
	infoProps,
	controlProps
}) {
	const {isSuccess, data: {tel} = {}} = useGetStudent(id);
	const timer = useStudentPermissionTimer(id);

	return (
		<div className={cn('Student')({}, [className])}>
			<Info
				infoProps={{...infoProps, verboseStatus}}
				{...{id, controlProps}}
			/>
			{verboseStatus && isSuccess && timer && !timer.isRunning &&
				<Call tel={tel} />
			}
		</div>
	);
}