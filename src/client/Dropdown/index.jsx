import './index.sass';
import React, {useRef, useCallback} from 'react';
import {cn} from '@bem-react/classname';
import Popup from '../LayerSpace/Popup';
import Toggle from './Toggle';
import Item from './Item';

export default function Dropdown({
	className,
	toggleContent,
	items,
	onSelect
}) {
	return <Popup
		className={className}
		toggle={(active, onTop, activate) =>
			<Toggle {...{active, onTop, activate}}>
				{toggleContent}
			</Toggle>
		}
		content={(active, onTop, activate) =>
			<DropdownContent {...{
				active, onTop, activate, items, onSelect
			}} />
		}
		calculatePosition={calculatePosition}
	/>;
}

function DropdownContent({
	active,
	onTop,
	activate,
	items,
	onSelect
}) {
	const wasActiveOnce = useRef(false);
	if (active)
		wasActiveOnce.current = true;

	const select = useCallback(name => {
		onSelect(name);
		activate(false);
	}, [activate, onSelect]);

	return (
		<ul className={cn('Dropdown')({active, onTop})}>
			{wasActiveOnce && items.map(({key, content, selected}) =>
				<Item key={key} name={key} selected={selected} onSelect={select}>
					{content}
				</Item>
			)}
		</ul>
	);
}

function calculatePosition(layer, toggle) {
	const
		top = toggle.top - layer.top,
		bottom = layer.bottom - toggle.bottom;
	const onTop = top > bottom;

	return {
		verticalPosition: 'offset',
		top: !onTop && `${(toggle.bottom - layer.top) / layer.height * 100}%`,
		bottom: onTop && `${(layer.bottom - toggle.top) / layer.height * 100}%`,
		horizontalPosition: 'center',
		left: `${
			(toggle.left + toggle.width / 2 - layer.left) / layer.width
		* 100}%`,
		tip: onTop
	};
}