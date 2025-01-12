import './Item.sass';
import React from 'react';
import {cn} from '@bem-react/classname';
import Student from '../Student';

export default function StudentListItem({
	className,
	id,
	targetProps
}) {
	return <Student
		className={cn('StudentList', 'Item')({}, [className])}
		{...targetProps}
		id={id}
	/>;
}