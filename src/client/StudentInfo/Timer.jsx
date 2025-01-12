import './Timer.sass';
import React from 'react';
import {cn} from '@bem-react/classname';
import Time from '../Time';

export default function StudentInfoTimer({
	className,
	timer
}) {
	const {days, hours, minutes, seconds} = timer;
	return <Time
		className={cn('StudentInfo', 'Timer')({}, [className])}
		{...{days, hours, minutes, seconds}}
	/>;
}