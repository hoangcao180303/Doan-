import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Hiển thị đánh giá trung bình từ một API
const OverallAverageRating = () => {
    const [averageRating, setAverageRating] = useState(0);    //Lưu điểm đánh giá trung bình.
    const [totalRatings, setTotalRatings] = useState(0);     // totalRatings: Lưu tổng số lượt đánh giá.
    const [loading, setLoading] = useState(true);           // Xác định xem dữ liệu đã tải xong chưa.
    const [error, setError] = useState(null);              // error: Lưu lỗi nếu có vấn đề khi gọi API.

    useEffect(() => {
        const fetchOverallAverageRating = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/admin/reviews/overall-average-rating'); // Đảm bảo đường dẫn đúng
                setAverageRating(response.data.overallAverageRating); // Lưu số sao trung bình vào state
                setTotalRatings(response.data.totalRatings); // Lưu tổng số lượt đánh giá vào state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // // Kết thúc tải dữ liệu
            }
        };

        fetchOverallAverageRating();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
//  Hiển thị số sao trung bình và tổng số đánh giá
    return (
        // <div className="p-4 bg-white shadow rounded-lg">
        //     <h2 className="text-2xl font-semibold">Đánh giá: <span className="text-blue-600">{averageRating}</span> ({totalRatings} lượt đánh giá)</h2>
        // </div>
        <div className='w-56 justify-center flex flex-row rounded-lg'>
            <div className="flex flex-col items-center">
                <div className="text-gray-400 text-sm mb-2">Rate</div>
                <div className="text-3xl font-bold text-blue-600">{averageRating}/{totalRatings}</div>
            </div>
        </div>
    );
};

export default OverallAverageRating;