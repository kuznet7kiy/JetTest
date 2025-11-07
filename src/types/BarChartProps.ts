import { type } from 'arktype';

export const ChartItem = type({
	name: 'string',
	value: 'number',
});

export type ChartItemType = typeof ChartItem.infer;

export type BarChartPropsType = {
	data: ChartItemType[];
	barName: string;
	type?: 'difficulty' | 'category';
};
