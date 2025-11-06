import type { Question } from '@/types/Question';

export function getChartData(
	questions: readonly Question[],
	key: 'difficulty' | 'category'
): { name: string; value: number }[] {
	const counts: Record<string, number> = {};

	questions.forEach(q => {
		const k = q[key];
		counts[k] = (counts[k] || 0) + 1;
	});

	return Object.entries(counts).map(([name, value]) => ({ name, value }));
}
