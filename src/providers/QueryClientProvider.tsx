import { QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { queryClient } from './queryClient';

type Props = {
	readonly children: React.ReactNode;
};

export const QueryClientProvider = React.memo((props: Props) => {
	return (
		<BaseQueryClientProvider client={queryClient}>
			{props.children}
		</BaseQueryClientProvider>
	);
});
