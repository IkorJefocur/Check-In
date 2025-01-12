import './PopupContent.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function LayerSpacePopupContent({
	children,
	className,
	domRef
}) {
	return (
		<div
			ref={domRef}
			className={cn('LayerSpace', 'PopupContent')({}, [className])}
		>
			{children}
		</div>
	);
}