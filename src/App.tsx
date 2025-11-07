import * as React from 'react';
import { BarChart } from './components/bar-chart/BarChart';
import { getChartData } from './components/bar-chart/utils/getChartData';
import { FilterSelector } from './components/filter-selector/FilterSelector';
import { useQuestionsQuery } from './hooks/useQuestionsQuery';

export const App = React.memo(() => {
	const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
		null
	);
	const [selectedDifficulty, setSelectedDifficulty] = React.useState<
		'easy' | 'medium' | 'hard' | null
	>(null);

	const { questions, isLoading, isError, error } = useQuestionsQuery();

	const categories = React.useMemo(() => {
		const categories = questions.map(q => q.category);
		return Array.from(new Set(categories)).sort((a, b) => a.localeCompare(b));
	}, [questions]);

	const questionsByCategory = React.useMemo(() => {
		return selectedCategory
			? questions.filter(q => q.category === selectedCategory)
			: questions;
	}, [questions, selectedCategory]);

	const questionsByDifficulty = React.useMemo(() => {
		return selectedDifficulty
			? questions.filter(q => q.difficulty === selectedDifficulty)
			: questions;
	}, [questions, selectedDifficulty]);

	const difficultyData = React.useMemo(
		() => getChartData(questionsByCategory, 'difficulty'),
		[questionsByCategory]
	);

	const categoryData = React.useMemo(
		() => getChartData(questionsByDifficulty, 'category'),
		[questionsByDifficulty]
	);

	return (
		<div className='container'>
			<header className='Header'>
				<h1 className='h1'>Trivia DB Visualization Tool</h1>
			</header>

			{isLoading ? (
				<span>Loading...</span>
			) : isError ? (
				<span>{error?.message ?? 'An unknown error occurred.'}</span>
			) : (
				<div className='content'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-10 mb-4 w-full max-w-[1400px]'>
						<span className='text-[#666668] text-2xl font-medium'>
							Distribution By Difficulty
						</span>

						<FilterSelector
							isLoading={isLoading}
							selectedValue={selectedCategory}
							setSelectedValue={setSelectedCategory}
							label='Categories'
							options={categories}
						/>
					</div>

					<div className='w-full max-w-[1400px]'>
						<BarChart
							data={difficultyData}
							barName='Questions by Difficulty'
							type='difficulty'
						/>
					</div>

					<div className='flex flex-col md:flex-row md:justify-between gap-4 mt-10 mb-4 w-full items-center max-w-[1400px]'>
						<div className='flex flex-col items-center md:items-start'>
							<span className='text-[#666668] text-2xl font-medium text-center md:text-left'>
								Distribution By Category
							</span>
							<div className='flex flex-col md:flex-row justify-center md:justify-start gap-2 text-[#666668] text-md font-medium mt-1'>
								<span>• Total Questions: {questionsByCategory.length}</span>
								<span>• Total Categories: {categories.length}</span>
							</div>
						</div>

						<FilterSelector
							isLoading={isLoading}
							selectedValue={selectedDifficulty}
							setSelectedValue={setSelectedDifficulty}
							label='Difficulties'
							options={['easy', 'medium', 'hard'] as const}
						/>
					</div>

					<div className='w-full max-w-[1400px] pb-10'>
						<BarChart
							data={categoryData}
							barName='Number of Questions'
							type='category'
						/>
					</div>
				</div>
			)}
		</div>
	);
});
