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

type FilterSelectorProps<T extends string> = {
	isLoading: boolean;
	selectedValue: T | null;
	setSelectedValue: React.Dispatch<React.SetStateAction<T | null>>;
	label: string;
	options: readonly T[];
};

function FilterSelectorInner<T extends string>({
	isLoading,
	selectedValue,
	setSelectedValue,
	label,
	options,
}: FilterSelectorProps<T>) {
	return (
		<div>
			<Select
				onValueChange={value =>
					setSelectedValue(value === 'all' ? null : (value as T))
				}
			>
				<SelectTrigger
					className='min-w-1/2 flex items-center justify-between gap-2 rounded-md border border-[#80808053] bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/20'
					disabled={isLoading}
				>
					<SelectValue placeholder={`Select ${label}`}>
						{selectedValue ?? `All ${label}`}
					</SelectValue>
					<ChevronDownIcon className='w-4 h-4 opacity-80' />
				</SelectTrigger>

				<SelectContent
					position='popper'
					className='min-w-var(--radix-select-trigger-width) z-10 backdrop-blur-2xl text-white'
				>
					<SelectGroup className='rounded-md border-2 border-[#80808053]'>
						<SelectLabel className='text-gray-700 p-1'>{label}</SelectLabel>

						<SelectItem
							value='all'
							className='flex data-[state=checked]:bg-[#80808053] transition-colors px-3.5'
						>
							All {label}
							<SelectItemIndicator className='ml-auto flex items-center'>
								<CheckIcon className='w-4 h-4 text-white/80' />
							</SelectItemIndicator>
						</SelectItem>

						{options.map((option, index) => (
							<SelectItem
								key={index}
								value={option}
								className='flex data-[state=checked]:bg-[#80808053] transition-colors px-3.5'
							>
								{option.charAt(0).toUpperCase() + option.slice(1)}
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
}

export const FilterSelector = React.memo(
	FilterSelectorInner
) as typeof FilterSelectorInner;
