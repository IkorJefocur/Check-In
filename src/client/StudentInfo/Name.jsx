import './Name.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function StudentInfoName({
	className,
	firstname,
	lastname
}) {
	return (
		<span className={cn('StudentInfo', 'Name')({}, [className])}>
			{`${firstname} ${lastname}`}
		</span>
	);
}