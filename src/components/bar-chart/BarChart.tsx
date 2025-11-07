import type { BarChartPropsType } from '@/types/BarChartProps';
import React from 'react';
import {
	Bar,
	CartesianGrid,
	Cell,
	Legend,
	BarChart as ReBarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const difficultyColors: Record<string, string> = {
	easy: '#22c55e',
	medium: '#facc15',
	hard: '#ef4444',
};

export const BarChart = React.memo(
	({ data, barName, type = 'category' }: BarChartPropsType) => {
		const sortedData = [...data].sort((a, b) => b.value - a.value);

		return (
			<div className='w-full h-128 bg-transparent rounded-lg border-2 border-[#3a3a3c] px-4 pt-0 pb-8'>
				<ResponsiveContainer width='100%' height='100%'>
					<ReBarChart
						data={sortedData}
						margin={{
							top: 20,
							right: 30,
							left: type === 'category' ? 100 : -10,
							bottom: -10,
						}}
					>
						<Legend
							wrapperStyle={{
								color: '#fff',
								display: 'flex',
								justifyContent: 'center',
								position: 'relative',
								marginBottom: 15,
							}}
						/>
						<CartesianGrid
							horizontal
							vertical={false}
							strokeDasharray='3'
							stroke='#444'
						/>
						<XAxis
							dataKey='name'
							stroke='#666668'
							interval={0}
							angle={type === 'category' ? -25 : 0}
							textAnchor={type === 'category' ? 'end' : 'middle'}
							height={type === 'category' ? 150 : 50}
						/>
						<YAxis
							stroke='#666668'
							allowDecimals={false}
							domain={[0, 'dataMax']}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: '#19191c',
								borderRadius: '5px',
								color: '#666668',
							}}
						/>
						<Bar
							dataKey='value'
							name={barName}
							fill={type !== 'difficulty' ? '#48e054' : '#666668'}
						>
							{type === 'difficulty' &&
								sortedData.map(entry => (
									<Cell
										key={entry.name}
										fill={difficultyColors[entry.name] || '#48e054'}
									/>
								))}
						</Bar>
					</ReBarChart>
				</ResponsiveContainer>
			</div>
		);
	}
);
