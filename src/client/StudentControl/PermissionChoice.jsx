import './PermissionChoice.sass';
import React, {useCallback} from 'react';
import {cn} from '@bem-react/classname';
import {useGetPermissions} from '../api/permissions';
import {usePutStudentPermission} from '../api/studentsPermissions';
import Dropdown from '../Dropdown';
import Container from '../Container';
import Text from '../Text';
import Time from '../Time';

export default function StudentControlPermissionChoice({
	className,
	id
}) {
	const {isSuccess, data: perms} = useGetPermissions();

	const {mutate} = usePutStudentPermission();
	const putPermission = useCallback(permissionId => {
		mutate({studentId: id, permissionId});
	}, [id, mutate]);

	return isSuccess && <Dropdown
		className={cn('StudentControl', 'PermissionChoice')({}, [className])}
		toggleContent="Give permission"
		items={Object.values(perms).map(({id, name, duration, finish}) => ({
			key: id,
			content:
				<Container positioning="corners">
					<Text weight="bold" accent="normal">{name}</Text>
					<Text size="sm" accent="low">
						{duration && <Time seconds={duration} />}
						{duration && finish && " / "}
						{finish && <>before <Time seconds={finish} /></>}
					</Text>
				</Container>
		}))}
		onSelect={putPermission}
	/>;
}