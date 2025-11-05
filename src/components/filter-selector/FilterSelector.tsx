import React from 'react';

type Props = {
	isLoading: boolean;
	selectedCategory: string | null;
	setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
	categories: readonly string[];
};

export const FilterSelector = React.memo((props: Props) => {
	console.log('Filter rendered');
	return (
		<div>
			<select
				disabled={props.isLoading}
				value={props.selectedCategory ?? 'all'}
				onChange={event => {
					const nextSelectedCategory =
						event.currentTarget.value === 'all'
							? null
							: event.currentTarget.value;

					props.setSelectedCategory(nextSelectedCategory);
				}}
			>
				<option value='all'>All Categories</option>
				{props.categories.map(category => (
					<option key={category} value={category}>
						{category}
					</option>
				))}
			</select>
		</div>
	);
});