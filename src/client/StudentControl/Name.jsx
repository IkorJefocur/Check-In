import './Name.sass';
import React from 'react';
import {cn} from '@bem-react/classname';
import Text from '../Text';

export default function StudentControlName({
	className,
	firstname,
	lastname
}) {
	return (
		<Text
			className={cn('StudentControl', 'Name')({}, [className])}
			size="lg"
			accent="normal"
		>
			{firstname} {lastname}
		</Text>
	);
}