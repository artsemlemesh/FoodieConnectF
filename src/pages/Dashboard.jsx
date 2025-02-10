import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { axiosClient } from '../utils/axiosClient';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get('/reviews/dashboard/');
      setDashboardData(response.data);
    };
    fetchData();
  }, []);

  const data = [
    { name: 'Total Orders', value: dashboardData?.orders_count || 0 },
    { name: 'Total Revenue', value: dashboardData?.total_revenue || 0 },
  ];
  const count = useSelector((state) => state.cart?.pageViewCount || 0); // Default to 0 if undefined
  const totalCount = useSelector((state) => state.cart?.totalViews || 0); // Default to 0 if undefined

  const pageViews = [
    { page: 'Today views', views: count }, // Replace with dynamic data from Redux
    { page: 'Total views', views: totalCount },
    { page: 'Product Page', views: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Restaurant Dashboard</h2>
      {dashboardData ? (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <p>Loading data...</p>
      )}
      <BarChart width={500} height={300} data={pageViews}>
        <XAxis dataKey="page" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="views" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default Dashboard;
