import React from 'react';
import {
	Bar,
	CartesianGrid,
	Legend,
	BarChart as ReBarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

type ChartItem = {
	name: string;
	value: number;
};

type BarChartProps = {
	data: ChartItem[];
};

export const BarChart = React.memo(({ data }: BarChartProps) => {
	return (
		<div className='w-full h-64 bg-gray-800 rounded-lg p-4'>
			<ResponsiveContainer width='100%' height='100%'>
				<ReBarChart
					data={data}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid
						horizontal={true}
						vertical={false}
						strokeDasharray='3'
						stroke='#444'
					/>
					<XAxis dataKey='name' stroke='#fff' />
					<YAxis stroke='#fff' />
					<Tooltip
						contentStyle={{ backgroundColor: '#222', borderRadius: '5px' }}
					/>
					<Legend wrapperStyle={{ color: '#fff' }} />
					<Bar dataKey='value' fill='#4f46e5' />
				</ReBarChart>
			</ResponsiveContainer>
		</div>
	);
});
