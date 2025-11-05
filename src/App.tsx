import * as React from 'react';
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

	const filteredQuestions = React.useMemo(() => {
		if (selectedCategory == null) {
			return questions;
		}

		return questions.filter(question => question.category === selectedCategory);
	}, [questions, selectedCategory]);

	return (
		<div>
			{isLoading ? (
				<span>Loading...</span>
			) : isError ? (
				<span>
					{error !== null ? error.message : 'An unknown error occurred.'}
				</span>
			) : (
				<div>
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
			)}
		</div>
	);
});
