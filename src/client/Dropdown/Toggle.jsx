import './Toggle.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function DropdownToggle({
	children,
	className,
	active,
	onTop,
	activate
}) {
	return (
		<button
			className={cn('Dropdown', 'Toggle')({active, onTop}, [className])}
			onClick={activate}
		>
			{children}
		</button>
	);
}