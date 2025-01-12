import './Popup.sass';
import React, {
	useState, useContext, useRef, useLayoutEffect, useCallback
} from 'react';
import {createPortal} from 'react-dom';
import {cn} from '@bem-react/classname';
import Container from '../Container';
import MainLayer, {Context} from './MainLayer';
import Content from './PopupContent';

export default function LayerSpacePopup({
	className,
	toggle,
	toggleCn,
	content,
	calculatePosition
}) {
	const {frontLayer, setCurrentComponent, nesting} = useContext(Context);
	const [active, setActive] = useState(false);
	const [{
		top, right, bottom, left, tip, horizontalPosition, verticalPosition
	}, setPosition] = useState({});

	const element = useRef();
	const toggleElement = useRef();

	const activate = useCallback(makeActive => {
		if (typeof makeActive === 'function')
			makeActive = makeActive(active);
		if (typeof makeActive !== 'boolean')
			makeActive = !active;
		if (!active && makeActive)
			setCurrentComponent(() => setActive(false));
		if (active && !makeActive)
			setCurrentComponent();
		setActive(makeActive);
	}, [active, setCurrentComponent]);

	useLayoutEffect(() => {
		if (active)
			setPosition(calculatePosition(
				frontLayer.getBoundingClientRect(),
				toggleElement.current.getBoundingClientRect(),
				element.current.getBoundingClientRect()
			));
	}, [active, frontLayer, calculatePosition]);

	const popupCn = cn('LayerSpace', 'Popup');
	return (
		<MainLayer className={className} embed={true}>
			<Container domRef={toggleElement}>
				{toggle(active, tip, activate)}
			</Container>
			{createPortal(
				<div
					className={popupCn({horizontalPosition, verticalPosition})}
					style={{
						[`--${popupCn()}_top`]: top,
						[`--${popupCn()}_right`]: right,
						[`--${popupCn()}_bottom`]: bottom,
						[`--${popupCn()}_left`]: left,
						[`--${popupCn()}_nesting`]: nesting
					}}
				>
					<Content domRef={element}>
						{content(active, tip, activate)}
					</Content>
				</div>,
				frontLayer
			)}
		</MainLayer>
	);
}