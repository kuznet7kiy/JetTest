import * as React from 'react';
import { BarChart } from './components/bar-chart/BarChart';
import { getChartData } from './components/bar-chart/utils/getChartData';
import { FilterSelector } from './components/filter-selector/FilterSelector';
import { useQuestionsQuery } from './hooks/useQuestionsQuery';

export const App = React.memo(() => {
	const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
		null
	);

	const { questions, isLoading, isError, error } = useQuestionsQuery();

	const categories: readonly string[] = React.useMemo(() => {
		const categories = questions.map(question => question.category);
		return Array.from(new Set(categories)).toSorted((a, b) =>
			a.localeCompare(b)
		);
	}, [questions]);

	const filteredQuestions = React.useMemo(() => {
		if (!selectedCategory) return questions;
		return questions.filter(q => q.category === selectedCategory);
	}, [questions, selectedCategory]);

	const difficultyData = React.useMemo(
		() => getChartData(filteredQuestions, 'difficulty'),
		[filteredQuestions]
	);

	const categoryData = React.useMemo(
		() => getChartData(questions, 'category'),
		[questions]
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
					<div className='gap-10 flex flex-row justify-between mt-10 mb-4'>
						<span className='text-[#666668] text-2xl font-medium'>
							Distribution By Difficulty
						</span>
						<FilterSelector
							isLoading={isLoading}
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
							categories={categories}
						/>
					</div>
					<div className='w-full gap-10 max-w-[1400px]'>
						<div className='flex align-middle'>
							<BarChart
								data={difficultyData}
								barName='Questions by Difficulty'
								type='difficulty'
							/>
						</div>
					</div>

					<div className='flex flex-col justify-between mt-10 mb-4'>
						<span className='text-[#666668] text-2xl font-medium text-center'>
							Distribution By Category
						</span>
						<div className='flex'>
							<span className='text-[#666668] text-md font-medium'>
								(Total Questions: {questions.length}
							</span>
							space
							<span className='text-[#666668] text-md font-medium'>
								Total Categories: {categories.length})
							</span>
						</div>
					</div>

					<div className='w-full gap-10 max-w-[1400px] pb-10'>
						<div className='flex align-middle'>
							<BarChart
								data={categoryData}
								barName='Number of Questions'
								type='category'
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
});
