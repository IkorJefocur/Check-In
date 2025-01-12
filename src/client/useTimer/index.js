import {useRef, useEffect, useMemo, useCallback} from 'react';
import {useTimer as usePureTimer} from 'react-timer-hook';

export default function useTimer({
	expiryTimestamp, setExpired = noop, ...options
}) {
	if (!expiryTimestamp)
		expiryTimestamp = placeholderDate;
	const onExpire = useCallback(() => setExpired(true), [setExpired]);

	const {isRunning, restart, ...timer} = usePureTimer({
		expiryTimestamp, onExpire
	});
	const restartRef = useRef(restart);

	useEffect(() => {
		setExpired(false);
		restartRef.current(expiryTimestamp);
	}, [expiryTimestamp, setExpired]);

	const expiredOnStart = useMemo(() =>
		expiryTimestamp <= Date.now()
	, [expiryTimestamp]);
	return {isRunning: expiredOnStart ? false : isRunning, restart, ...timer};
}

const noop = () => {};
const placeholderDate = new Date(Date.now() - 1000);