import './Label.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function LayoutLabel({
	children,
	className
}) {
	return (
		<h1 className={cn('Layout', 'Label')({}, [className])}>
			{children}
		</h1>
	);
}