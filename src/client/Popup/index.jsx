import './index.sass';
import React, {useRef} from 'react';
import {cn} from '@bem-react/classname';
import PopupSpace from '../LayerSpace/Popup';
import Toggle from './Toggle';

export default function Popup({
	children,
	className,
	toggle
}) {
	const wasActiveOnce = useRef(false);

	return <PopupSpace
		className={className}
		toggle={typeof toggle === 'function'
			? toggle
			: (_, __, activate) => <Toggle activate={activate}>{toggle}</Toggle>
		}
		content={(active, side) => {
			if (active)
				wasActiveOnce.current = true;
			return (
				<section className={
					cn('Popup')({active, side})
				}>
					{wasActiveOnce.current && children}
				</section>
			);
		}}
		calculatePosition={calculatePosition}
	/>;
}

const TOP = 'top', RIGHT = 'right', BOTTOM = 'bottom', LEFT = 'left';

function calculatePosition(layer, toggle) {
	const availableSpace = {
		[TOP]: toggle.top - layer.top,
		[RIGHT]: layer.right - toggle.right,
		[BOTTOM]: layer.bottom - toggle.bottom,
		[LEFT]: toggle.left - layer.left
	};
	const [side] = [RIGHT, LEFT, BOTTOM, TOP].reduce(([maxPos, max], pos) =>
		availableSpace[pos] > max ? [pos, availableSpace[pos]] : [maxPos, max]
	, [RIGHT, 0]);

	const
		offset = (layerCorner, toggleCorner, layerSize, mod, reverse) => ({
			[mod]: 'offset',
			[layerCorner]: `${(
				reverse
					? layer[layerCorner] - toggle[toggleCorner]
					: toggle[toggleCorner] - layer[layerCorner]
			) / layer[layerSize] * 100}%`
		}),
		center = (corner, size, mod) => ({
			[mod]: 'center',
			[corner]: `${
				(toggle[corner] + toggle[size] / 2 - layer[corner]) / layer[size]
			* 100}%`
		});
	const positions = {
		[TOP]: () => ({
			...offset('bottom', 'top', 'height', 'verticalPosition', true),
			...center('left', 'width', 'horizontalPosition')
		}),
		[RIGHT]: () => ({
			...offset('left', 'right', 'width', 'horizontalPosition'),
			...center('top', 'height', 'verticalPosition')
		}),
		[BOTTOM]: () => ({
			...offset('top', 'bottom', 'height', 'verticalPosition'),
			...center('left', 'width', 'horizontalPosition')
		}),
		[LEFT]: () => ({
			...offset('right', 'left', 'width', 'horizontalPosition', true),
			...center('top', 'height', 'verticalPosition')
		})
	};

	return {...positions[side](), tip: side};
}