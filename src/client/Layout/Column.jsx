import './Column.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function LayoutColumn({
	children,
	className
}) {
	return (
		<section className={cn('Layout', 'Column')({}, [className])}>
			{children}
		</section>
	);
}