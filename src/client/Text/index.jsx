import './index.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function Text({
	children,
	className,
	align,
	size,
	italic,
	weight,
	accent
}) {
	return <span className={
		cn('Text')({align, size, italic, weight, accent}, [className])
	}>{children}</span>;
}