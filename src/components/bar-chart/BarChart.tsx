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

		const isMobile = window.innerWidth < 920;
		const xAxisAngle = type === 'category' ? (isMobile ? -45 : -25) : 0;
		const xAxisHeight = type === 'category' ? (isMobile ? 90 : 125) : 50;
		const xAxisFontSize = isMobile ? 6 : 12;

		return (
			<div className='w-full h-112 sm:h-128 bg-transparent rounded-lg border-2 border-[#3a3a3c] px-2 sm:px-4 pt-2 sm:pt-0 pb-10 sm:pb-8'>
				<ResponsiveContainer width='100%' height='100%'>
					<ReBarChart
						data={sortedData}
						margin={{
							top: 20,
							right: 20,
							left: type === 'category' ? (isMobile ? 0 : 100) : 0,
							bottom: type === 'category' ? (isMobile ? 0 : 10) : -10,
						}}
					>
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
							angle={xAxisAngle}
							textAnchor={type === 'category' ? 'end' : 'middle'}
							height={xAxisHeight}
							tick={{ fontSize: xAxisFontSize }}
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
							cursor={false}
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
						<Legend
							layout='horizontal'
							verticalAlign='bottom'
							align='center'
							wrapperStyle={{
								color: '#fff',
								fontSize: isMobile ? 10 : 12,
								marginTop: 10,
							}}
						/>
					</ReBarChart>
				</ResponsiveContainer>
			</div>
		);
	}
);
