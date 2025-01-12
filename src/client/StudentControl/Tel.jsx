import './Tel.sass';
import React from 'react';
import {cn} from '@bem-react/classname';
import Text from '../Text';
import Button from '../Button';

export default function StudentControlTel({
	className,
	tel,
	callButton = false
}) {
	const telCn = cn('StudentControl', 'Tel');

	return callButton ? (
		<Button
			className={telCn({}, [className])}
			style="text"
			onClick={`tel:${tel}`}
		>
			{tel}
		</Button>
	) : (
		<Text
			className={telCn({simple: true}, [className])} accent="normal">
			{tel}
		</Text>
	);
}
