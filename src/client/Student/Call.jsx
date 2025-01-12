import './Call.sass';
import React from 'react';
import {cn} from '@bem-react/classname';
import Button from '../Button';

export default function StudentCall({
	className,
	tel
}) {
	return (
		<Button
			className={cn('Student', 'Call')({}, [className])}
			style="flat"
			onClick={`tel:+${tel}`}
		>
			Contact
		</Button>
	);
}