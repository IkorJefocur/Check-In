import './PermissionInfo.sass';
import React from 'react';
import {cn} from '@bem-react/classname';
import {useGetPermission} from '../api/permissions';
import Container from '../Container';
import Text from '../Text';

export default function StudentControlPermissionInfo({
	className,
	id
}) {
	const {isSuccess, data: {name} = {}} = useGetPermission(id);

	return isSuccess && (
		<Container
			className={cn('StudentControl', 'PermissionInfo')({}, [className])}
			positioning="vertical"
		>
			<Text size="lg">Location:</Text>
			<Text weight="bold" accent="normal">{name}</Text>
		</Container>
	);
}