import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectItemIndicator,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@radix-ui/react-select';
import React from 'react';

type FilterSelectorProps = {
	isLoading: boolean;
	selectedCategory: string | null;
	setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
	categories: readonly string[];
};

export const FilterSelector = React.memo((props: FilterSelectorProps) => {
	console.log('Filter rendered');
	return (
		<div>
			<Select
				onValueChange={value =>
					props.setSelectedCategory(value === 'all' ? null : value)
				}
			>
				<SelectTrigger
					className='min-w-1/2 flex items-center justify-between gap-2 rounded-md border border-[#80808053] bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/20'
					disabled={props.isLoading}
				>
					<SelectValue placeholder='Select a category'>
						{props.selectedCategory ?? 'All Categories'}
					</SelectValue>
					<ChevronDownIcon className='w-4 h-4 opacity-80' />
				</SelectTrigger>

				<SelectContent className='min-w-var(--radix-select-trigger-width) z-10 backdrop-blur-2xl'>
					<SelectGroup className='rounded-md border-2 border-[#80808053]'>
						<SelectLabel className='text-gray-700 py-1'>
							Question Categories
						</SelectLabel>

						<SelectItem
							value='all'
							className='flex data-[state=checked]:bg-[#80808053] transition-colors px-3.5'
						>
							All Categories
							<SelectItemIndicator className='ml-auto flex items-center'>
								<CheckIcon className='w-4 h-4 text-white/80' />
							</SelectItemIndicator>
						</SelectItem>

						{props.categories.map((category, index) => (
							<SelectItem
								key={index}
								value={category}
								className='flex data-[state=checked]:bg-[#80808053] transition-colors px-3.5'
							>
								{category}
								<SelectItemIndicator className='ml-auto flex items-center'>
									<CheckIcon className='w-4 h-4 text-white/80' />
								</SelectItemIndicator>
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
});

{
	/* <select
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
</select> */
}
