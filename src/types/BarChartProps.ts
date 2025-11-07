import { type } from 'arktype';

export const ChartItem = type({
	name: 'string',
	value: 'number',
});

export const BarChartProps = type({
	data: [ChartItem],
	barName: 'string',
	type: "'difficulty'|'category'?",
});

export type BarChartPropsType = typeof BarChartProps.infer;
