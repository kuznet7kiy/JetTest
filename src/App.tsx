import * as React from 'react';
import { BarChart } from './components/bar-chart/BarChart';
import { FilterSelector } from './components/filter-selector/FilterSelector';
import { useQuestionsQuery } from './hooks/useQuestionsQuery';

export const App = React.memo(() => {
	const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
		null
	);

	const { questions, isLoading, isError, error } = useQuestionsQuery();

	const categories: readonly string[] = React.useMemo(() => {
		const categories = questions.map(question => question.category);

		const uniqueCategories = new Set(categories);

		return Array.from(uniqueCategories).toSorted((categoryA, categoryB) =>
			categoryA.localeCompare(categoryB)
		);
	}, [questions]);

	const chartData: [string, number][] = React.useMemo(() => {
		const counts: Record<string, number> = {};

		questions.forEach(q => {
			counts[q.category] = (counts[q.category] || 0) + 1;
		});

		return Object.entries(counts); // [category, count]
	}, [questions]);

	type ChartItem = {
		name: string;
		value: number;
	};

	const chartDataObjects: ChartItem[] = chartData.map(([name, value]) => ({
		name,
		value,
	}));

	// const filteredQuestions = React.useMemo(() => {
	// 	if (selectedCategory == null) {
	// 		return questions;
	// 	}

	// 	return questions.filter(question => question.category === selectedCategory);
	// }, [questions, selectedCategory]);

	return (
		<div className='container'>
			<h1 className='header1'>
				Welcome To Open Trivia DB
				<br />
				Visualization Tool
			</h1>
			{isLoading ? (
				<span>Loading...</span>
			) : isError ? (
				<span>
					{error !== null ? error.message : 'An unknown error occurred.'}
				</span>
			) : (
				<>
					<div className='w-full flex flex-col items-center'>
						<span>
							Total questions: {questions.length}
							<br />
							Total Categories: {categories.length}
						</span>
						<FilterSelector
							isLoading={isLoading}
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
							categories={categories}
						/>
					</div>
					<div className='w-full gap-10 max-w-[1400px] mt-10'>
						<div className='flex align-middle'>
							<BarChart data={chartDataObjects}/>
						</div>

						<div className='bg-blue-500 p-5'>Item 2</div>
					</div>
				</>
			)}
		</div>
	);
});
