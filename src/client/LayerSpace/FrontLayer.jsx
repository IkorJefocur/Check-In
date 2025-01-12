import './FrontLayer.sass';
import React, {useRef, useEffect} from 'react';
import {cn} from '@bem-react/classname';

export default function LayerSpaceFrontLayer({
	className,
	setElement
}) {
	const element = useRef();
	useEffect(() => {
		setElement(element.current);
	}, [setElement]);

	return <div
		ref={element}
		className={cn('LayerSpace', 'FrontLayer')({}, [className])}
	/>;
}