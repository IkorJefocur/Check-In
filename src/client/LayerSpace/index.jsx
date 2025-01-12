import './index.sass';
import React, {useState} from 'react';
import {cn} from '@bem-react/classname';
import MainLayer from './MainLayer';
import FrontLayer from './FrontLayer';

export default function LayerSpace({
	children,
	className,
	mix
}) {
	const [frontLayer, setFrontLayer] = useState();

	className = cn('LayerSpace')({}, [className]);
	const content = <>
		{frontLayer &&
			<MainLayer frontLayer={frontLayer}>{children}</MainLayer>
		}
		<FrontLayer setElement={setFrontLayer} />
	</>;

	return mix
		? mix({className, children: content})
		: <div className={className}>{content}</div>;
}