import './index.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function Layout({
	children,
	className
}) {
	return <div className={cn('Layout')({}, [className])}>{children}</div>;
}