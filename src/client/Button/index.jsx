import './index.sass';
import React from 'react';
import {cn} from '@bem-react/classname';

export default function Button({
	children,
	className,
	semanticTag = typeof children !== 'object',
	style,
	padding,
	alignContent,
	active,
	onClick
}) {
	const Component = typeof onClick === 'string'
		? 'a'
		: semanticTag ? 'button' : 'div';
	const mods = {style, padding, alignContent, active};

	return (
		<Component
			className={cn('Button')(mods, [className])}
			href={typeof onClick === 'string' ? onClick : undefined}
			onClick={typeof onClick === 'function' ? onClick : undefined}
		>
			{children}
		</Component>
	);
}