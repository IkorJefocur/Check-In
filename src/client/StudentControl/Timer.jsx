import './Timer.sass';
import React from 'react';
import {cn} from '@bem-react/classname';
import Container from '../Container';
import Text from '../Text';
import Time from '../Time';

export default function StudentControlTimer({
	className,
	timer
}) {
	const {days, hours, minutes, seconds, isRunning} = timer;

	return (
		<Container
			className={cn('StudentControl', 'Timer')({}, [className])}
			positioning="vertical"
		>
			<Text size="lg">Time left:</Text>
			{isRunning
				? <Text weight="bold" accent="on">
					<Time {...{days, hours, minutes, seconds}} />
				</Text>
				: <Text weight="bold" accent="off">Over</Text>
			}
		</Container>
	);
}