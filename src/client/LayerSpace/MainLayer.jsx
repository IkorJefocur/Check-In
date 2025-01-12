import './MainLayer.sass';
import React, {
	createContext, useContext, useRef, useEffect, useCallback
} from 'react';
import {cn} from '@bem-react/classname';

export default function LayerSpaceMainLayer({
	children,
	className,
	embed,
	frontLayer
}) {
	const {
		frontLayer: parentFrontLayer, nesting, children: layerSiblings
	} = useContext(Context);
	const activeComponent = useRef(() => {});
	const {current: layerChildren} = useRef(new Set());

	const setCurrentComponent = useCallback((close = () => {}) => {
		for (const close of layerChildren)
			close();
		activeComponent.current();
		activeComponent.current = close;
	}, [layerChildren]);

	const closeComponentOnInteract = useCallback(event => {
		if (!preventedCloseEvents.has(event))
			setCurrentComponent();
		preventedCloseEvents.add(event);
	}, [setCurrentComponent]);

	useEffect(() => {
		const close = () => activeComponent.current();
		layerSiblings.add(close);
		return () => layerSiblings.delete(close);
	}, [layerSiblings]);

	return (
		<Context.Provider value={{
			setCurrentComponent,
			frontLayer: frontLayer || parentFrontLayer,
			nesting: nesting + 1,
			children: layerChildren
		}}>
			<div
				className={cn('LayerSpace', 'MainLayer')(
					{independent: !embed}, [className]
				)}
				onClick={closeComponentOnInteract}
			>
				{children}
			</div>
		</Context.Provider>
	);
}

export const Context = createContext({
	frontLayer: null,
	setCurrentComponent: () => {},
	nesting: 0,
	children: new Set()
});

const preventedCloseEvents = new WeakSet();