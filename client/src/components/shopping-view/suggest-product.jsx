import { useEffect, useState } from "react";
import axios from "axios";
import ShoppingProductTile from "./product-tile";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchProductDetails,
} from "@/store/shop/products-slice";

const ProductSuggestions = ({ productId, handleGetProductDetails }) => {
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  

  function handleGetProductDetails(getCurrentProductId) {
    
    dispatch(fetchProductDetails(getCurrentProductId));
    
  }

  useEffect(() => {
    const fetchSuggestions = async () => {
      console.log("Fetching suggestions for Product ID:", productId);
      const response = await axios.get(`http://localhost:5555/api?_id=${productId}`);
      setSuggestions(response.data["Sản phẩm gợi ý"]); 
    };

    if (productId) {
      fetchSuggestions();
    }
  }, [productId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gợi ý sản phẩm</h2>
      {suggestions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {suggestions.map((suggestion ) => (
            <ShoppingProductTile
            key={suggestion.id}
            handleGetProductDetails={handleGetProductDetails}
            product={suggestion}
          />
          ))}
        </div>
      ) : (
        <p>Không có sản phẩm gợi ý nào.</p>
      )}
    </div>
  );
};

export default ProductSuggestions;