import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderCount = () => {
    const [orderCount, setOrderCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderCount = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/admin/orders/count'); // Gọi API đếm số đơn hàng
                setOrderCount(response.data.data); // Lưu số lượng đơn hàng vào state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderCount();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        // <div className="p-4 bg-white shadow rounded-lg">
        //     <h2 className="text-2xl font-semibold">Số đơn đặt hàng: <span className="text-blue-600">{orderCount}</span></h2>
        // </div>
        <div className=" w-56 flex flex-col items-center">
            <div className="text-gray-400 text-sm mb-2">Total Orders</div>
            <div className="text-3xl font-bold text-blue-600">{orderCount}</div>
        </div>
    );
};

export default OrderCount;