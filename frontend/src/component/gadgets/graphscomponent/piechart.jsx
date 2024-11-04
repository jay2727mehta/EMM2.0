import React from 'react';
import { Paper } from '@mui/material';
import { PieChart as RePieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const PieChart = () => {
  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <h2>Pie Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RePieChart>
          <Pie dataKey="value" isAnimationActive={false} data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
          <Tooltip />
        </RePieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default PieChart;
