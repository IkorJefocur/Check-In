import React, {useMemo} from 'react';
import {cn} from '@bem-react/classname';
import {useGetStudents} from '../api/students';
import {useGetStudentsPermissions} from '../api/studentsPermissions';
import Item from './Item';

const emptyFilter = () => true;
const alphabeticSort = (a, b) => a.firstname.localeCompare(b.firstname);

export default function StudentList({
	className,
	filter = emptyFilter,
	sort = alphabeticSort,
	itemProps = {}
}) {
	const {isSuccess: isPermsSuccess, data: perms} = useGetStudentsPermissions();
	const {isSuccess, data: justStudents} = useGetStudents({
		enabled: isPermsSuccess
	});
	const students = useMemo(() =>
		isSuccess && Object.values(justStudents)
			.map(student => ({permission: perms[student.id] || null, ...student}))
			.filter(filter).sort(sort)
	, [isSuccess, justStudents, perms, filter, sort]);

	return (
		<section className={cn('StudentList')({}, [className])}>
			{isSuccess && students.map(({id}) =>
				<Item key={id} id={id} targetProps={itemProps} />
			)}
		</section>
	);
}