import { useQuery } from '@tanstack/react-query';
import { type } from 'arktype';
import he from 'he';
import { Question } from '../types/Question';

/**
 * Schema for the entire response from the questions API
 */
const ResponseSchema = type({
	response_code: 'number',
	results: Question.array(),
});

export function useQuestionsQuery(): {
	readonly questions: readonly Question[];
	readonly isLoading: boolean;
	readonly isError: boolean;
	readonly error: Error | null;
} {
	const query = useQuery({
		queryKey: ['questions'] as const,
		queryFn: async () => {
			const response = await fetch('https://opentdb.com/api.php?amount=50', {
				method: 'GET',
			});

			if (!response.ok) {
				throw new Error('Something went wrong while fetching questions.');
			}

			const data = await response.json();

			// Validate the response data
			const validatedData = ResponseSchema(data);

			if (validatedData instanceof type.errors) {
				throw new Error('Failed to validate questions response.');
			}

			const questions: readonly Question[] = validatedData.results.map(
				question => ({
					type: question.type,
					category: he.decode(question.category),
					difficulty: question.difficulty,
					question: he.decode(question.question),
					correct_answer: he.decode(question.correct_answer),
					incorrect_answers: question.incorrect_answers.map(answer =>
						he.decode(answer)
					),
				})
			);

			return questions;
		},
	});

	return {
		questions: query.data ?? ([] as const),
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
	};
}
