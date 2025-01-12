import './Content.sass';
import React, {useCallback} from 'react';
import {cn} from '@bem-react/classname';
import Layout from '../Layout';
import Column from '../Layout/Column';
import Label from '../Layout/Label';
import Container from '../Container';
import StudentList from '../StudentList';

export default function AppContent({
	className,
	page
}) {
	const Page = pages[page];

	return (
		<Layout className={cn('App', 'Content')({page}, [className])}>
			<Page />
		</Layout>
	);
}

const pages = {
	home: AppContentPageHome
};

function AppContentPageHome() {
	return <>
		<Column>
			<Label>All students</Label>
			<Container positioning="scroll"><StudentList /></Container>
		</Column>
		<Column>
			<Label>Students out of campus</Label>
			<Container positioning="scroll"><StudentList
				filter={useCallback(({permission}) => permission, [])}
				sort={useCallback((a, b) =>
					a.permission.finish - b.permission.finish
				, [])}
				itemProps={{verboseStatus: true}}
			/></Container>
		</Column>
		<Column>
			<Label>Students on campus</Label>
			<Container positioning="scroll"><StudentList
				filter={useCallback(({permission}) => !permission, [])}
			/></Container>
		</Column>
	</>;
}