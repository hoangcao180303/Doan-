// src/RevenueChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Đăng ký tất cả các thành phần của Chart.js
Chart.register(...registerables);

const RevenueChart = () => {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [timePeriod, setTimePeriod] = useState('monthly'); // Giá trị mặc định là 'monthly'

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/admin/orders/revenue/${timePeriod}`);
                const result = await response.json();
                
                const labels = result.map(item => {
                    if (timePeriod === 'monthly') return ` ${item._id}`;
                    if (timePeriod === 'daily') return ` ${item._id}`;
                    return ` ${item._id}`;
                });
                const revenues = result.map(item => item.totalRevenue);

                setData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Revenue',
                            data: revenues,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderWidth: 2,
                            fill: true,
                        },
                    ],
                });
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchRevenueData();
    }, [timePeriod]);

    const handleTimePeriodChange = (event) => {
        setTimePeriod(event.target.value);
    };

    return (
        <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Revenue Chart</h2>
        <select 
            value={timePeriod} 
            onChange={handleTimePeriodChange} 
            className="mb-4 p-2 border rounded"
        >
            <option value="monthly">Month</option>
            <option value="daily">Day</option>
            <option value="yearly">Year</option>
        </select>
        <div className="bg-white shadow-md rounded-lg p-4">
            <Bar data={data} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>
    </div>
    );
};

export default RevenueChart;