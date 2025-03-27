import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalSoldQuantity = () => {
    const [totalSold, setTotalSold] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalSoldQuantity = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/admin/products/sold-quantities'); // Đảm bảo đường dẫn đúng
                setTotalSold(response.data.totalSold); // Lưu tổng số lượng đã bán vào state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTotalSoldQuantity();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        // <div className="p-4 bg-white shadow rounded-lg">
        //     <h2 className="text-2xl font-semibold">Số sản phẩm đã bán: <span className="text-blue-600">{totalSold}</span></h2>
        // </div>
        <div className="w-56 flex flex-col items-center">
          <div className="text-gray-400 text-sm mb-2">
          Number of products sold</div>
          <div className="text-3xl font-bold text-blue-600">{totalSold}</div>
        </div>
    );
};

export default TotalSoldQuantity;