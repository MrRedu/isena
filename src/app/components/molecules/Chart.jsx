'use client'
import propTypes from 'prop-types'
import { CartesianGrid, Legend, Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export const Chart = ({ data = [], type }) => {
  return (
    <ResponsiveContainer aspect={3} width="100%" height="auto" className={"pr-8"} >
      <AreaChart
        width={400}
        height={200}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey={'value'} name={type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, " ")} stroke="#db598d" fill='#f1b0cd' activeDot={{ r: 4 }} />
      </AreaChart>
    </ResponsiveContainer>
  )
};

Chart.propTypes = {
  data: propTypes.array,
  type: propTypes.string
};