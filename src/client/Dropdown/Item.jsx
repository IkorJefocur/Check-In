import './Item.sass';
import React, {useCallback} from 'react';
import {cn} from '@bem-react/classname';

export default function DropdownItem({
	children,
	className,
	name,
	selected,
	onSelect
}) {
	const select = useCallback(() => {
		onSelect(name);
	}, [name, onSelect]);

	return (
		<li
			className={cn('Dropdown', 'Item')({selected}, [className])}
			onClick={select}
		>
			{children}
		</li>
	);
}