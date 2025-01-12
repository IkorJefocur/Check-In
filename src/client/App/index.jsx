import './index.sass';
import React, {useMemo} from 'react';
import {cn} from '@bem-react/classname';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import LayerSpace from '../LayerSpace';
import Content from './Content';

export default function App() {
	const queryClient = useMemo(() => new QueryClient(), []);

	return (
		<QueryClientProvider client={queryClient}>
			<LayerSpace
				mix={({className, children}) =>
					<main className={cn('App')({}, [className])}>{children}</main>
				}
			>
				<Content page="home" />
			</LayerSpace>
		</QueryClientProvider>
	);
}