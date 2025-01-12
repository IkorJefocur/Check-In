import './Status.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function StudentInfoStatus({
	className,
	onCampus
}) {
	return <div className={
		cn('StudentInfo', 'Status')({onCampus}, [className])
	} />;
}