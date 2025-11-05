import * as React from 'react';
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
						Data loaded. Total questions: {questions.length}. Categories:{' '}
						{categories.length}
					</span>
					<div>
						<select
							disabled={isLoading}
							value={selectedCategory ?? 'all'}
							onChange={event => {
								const nextSelectedCategory =
									event.currentTarget.value === 'all'
										? null
										: event.currentTarget.value;

								setSelectedCategory(nextSelectedCategory);
							}}
						>
							<option value='all'>All Categories</option>
							{categories.map(category => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
					<div>
						{filteredQuestions.map((question, index) => (
							<div
								key={index}
								style={{
									marginBottom: '16px',
									padding: '8px',
									border: '1px solid #ccc',
								}}
							>
								<div>
									<strong>Category:</strong> {question.category}
								</div>
								<div>
									<strong>Difficulty:</strong> {question.difficulty}
								</div>
								<div>
									<strong>Question:</strong> <span>{question.question}</span>
								</div>
								<div>
									<strong>Correct Answer:</strong>
									<span>{question.correct_answer}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
});
