import React, {useMemo} from 'react';
import {cn} from '@bem-react/classname';

export default function Time({
	className,
	...props
}) {
	const {days, hours, minutes, seconds} = useMemo(() =>
		normalizeTime(props.days, props.hours, props.minutes, props.seconds)
	, [props.days, props.hours, props.minutes, props.seconds]);

	let start = [days, hours, minutes, seconds]
		.findIndex(count => count !== 0);
	if (start === -1)
		start = 2;

	const text = `${
		start === 0 ? `${days} day${days > 1 ? 's' : ''} + ` : ''
	}${
		start <= 1 ? `${hours}:` : ''
	}${
		minutes <= 9 ? `0${minutes}:` : `${minutes}:`
	}${
		seconds <= 9 ? `0${seconds}` : seconds
	}`;

	return <time className={cn('Time')({}, [className])}>{text}</time>;
}

function normalizeTime(days = 0, hours = 0, minutes = 0, seconds = 0) {
	minutes += Math.floor(seconds / 60);
	seconds %= 60;
	hours += Math.floor(minutes / 60);
	minutes %= 60;
	days += Math.floor(hours / 24);
	hours %= 24;
	return {days, hours, minutes, seconds};
}