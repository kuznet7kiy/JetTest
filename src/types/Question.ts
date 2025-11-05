import { type } from 'arktype';

export const Question = type({
	type: "'multiple' | 'boolean'",
	difficulty: "'easy' | 'medium' | 'hard'",
	category: 'string',
	question: 'string',
	correct_answer: 'string',
	incorrect_answers: 'string[]',
});

export type Question = typeof Question.infer;
