import './index.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function Container({
	children,
	className,
	domRef,
	positioning
}) {
	return (
		<div
			ref={domRef}
			className={cn('Container')({positioning}, [className])}
		>
			{children}
		</div>
	);
}