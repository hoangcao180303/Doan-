import { useEffect, useState } from "react";
import axios from "axios";
import ShoppingProductTile from "./product-tile";
import { useDispatch } from "react-redux";
import { fetchProductDetails } from "@/store/shop/products-slice";

const ProductSuggestionsApriori = ({ orderId, handleGetProductDetails }) => {
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (orderId) {
        try {
          const response = await fetch(`http://localhost:7777/suggest?order_id=${orderId}`);
          const data = await response.json();

          // Kiểm tra kiểu dữ liệu của data
          console.log("Dữ liệu nhận được:", data);
          if (Array.isArray(data)) {
            // Chỉ thực hiện nếu data là mảng
            const products = await Promise.all(
              data.map(async (id) => {
                const res = await axios.get(`http://localhost:5001/api/shop/products/get/${id}`);
                console.log("Thông tin sản phẩm:", res.data); 
                return res.data;
              })
            );

            setSuggestions(products);
          } else {
            console.error("Dữ liệu không phải là mảng:", data);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      }
    };

    fetchSuggestions();
  }, [orderId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gợi ý sản phẩm</h2>
      {suggestions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {suggestions.map((suggestion) => (
            <ShoppingProductTile
              key={suggestion.id} // Đảm bảo rằng 'id' là thuộc tính đúng của sản phẩm
              handleGetProductDetails={handleGetProductDetails}
              product={suggestion.data}
            />
          ))}
        </div>
      ) : (
        <p>Không có sản phẩm gợi ý nào.</p>
      )}
    </div>
  );
};

export default ProductSuggestionsApriori;