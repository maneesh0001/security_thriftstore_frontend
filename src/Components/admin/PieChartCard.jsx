import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PieChartCard = ({ title, description, data = [] }) => {  // Default to empty array if data is missing or invalid
    // Custom Label for Pie Chart slices
    const CustomLabel = ({ cx, cy, midAngle, outerRadius, payload }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 25;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill={payload.color}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-sm font-medium"
            >
                {`${payload.name}: ${payload.value}%`}
            </text>
        );
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
            <div className="mt-4" style={{ width: '100%', height: 300 }}>
                {/* If no valid data is passed, show a fallback message */}
                {data.length === 0 ? (
                    <p className="text-center text-gray-500">No data available</p>
                ) : (
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={<CustomLabel />}
                                outerRadius="80%"
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default PieChartCard;
