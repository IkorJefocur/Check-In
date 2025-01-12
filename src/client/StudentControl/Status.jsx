import './Status.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function StudentControlStatus({
	className,
	onCampus
}) {
	return (
		<span className={
			cn('StudentControl', 'Status')({onCampus}, [className])
		}>
			{onCampus ? 'ON CAMPUS' : 'OUT OF CAMPUS'}
		</span>
	);
}