import './Toggle.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function PopupToggle({
	children,
	className,
	activate
}) {
	return (
		<button
			className={cn('Popup', 'Toggle')({}, [className])}
			onClick={activate}
		>
			{children}
		</button>
	);
}