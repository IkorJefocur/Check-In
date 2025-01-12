import './Info.sass';
import React from 'react';
import {cn} from '@bem-react/classname';
import Button from '../Button';
import Popup from '../Popup';
import StudentInfoBlock from '../StudentInfo';
import StudentControl from '../StudentControl';

export default function StudentInfo({
	className,
	id,
	infoProps,
	controlProps
}) {
	return (
		<Popup
			className={cn('Student', 'Info')({}, [className])}
			toggle={(active, _, activate) =>
				<Button
					style="flat"
					padding="big"
					alignContent="stretch"
					active={active}
					onClick={activate}
				>
					<StudentInfoBlock {...infoProps} id={id} />
				</Button>
			}
		>
			<StudentControl {...controlProps} id={id} />
		</Popup>
	);
}