import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalIncome = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalIncome = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/admin/orders/total-income'); // Đảm bảo đường dẫn đúng
                setTotalIncome(response.data.data); // Lưu tổng số lượng đã bán vào state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTotalIncome();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="w-56 flex flex-col items-center">
          <div className="text-gray-400 text-sm mb-2">Revenue</div>
          <div className="text-3xl font-bold text-blue-600">${totalIncome}</div>
        </div>
    );
};

export default TotalIncome;