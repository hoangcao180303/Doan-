import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  console.log("nè",cartItems)

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    // if (typeOfAction == "plus") {
    //   let getCartItems = cartItems.items || [];

    //   if (getCartItems.length) {
    //     const indexOfCurrentCartItem = getCartItems.findIndex(
    //       (item) => item.productId === getCartItem?.productId
    //     );

    //     const getCurrentProductIndex = productList.findIndex(
    //       (product) => product._id === getCartItem?.productId
    //     );
    //     const getTotalStock = productList[getCurrentProductIndex].totalStock;


    //     if (indexOfCurrentCartItem > -1) {
    //       const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
    //       if (getQuantity + 1 > getTotalStock) {
    //         toast({
    //           title: `Only ${getQuantity} quantity can be added for this item`,
    //           variant: "destructive",
    //         });

    //         return;
    //       }
    //     }
    //   }
    // }
    const indexOfCurrentCartItem = cartItems.items.findIndex(
      (item) => item.productId === getCartItem?.productId && item.size === getCartItem?.size
    );
  
    const getCurrentProductIndex = productList.findIndex(
      (product) => product._id === getCartItem?.productId
    );
  
    // Lấy thông tin sản phẩm
    const product = productList[getCurrentProductIndex];
  
    // Tìm thông tin tồn kho cho kích thước cụ thể
    const sizeInfo = product?.sizes.find(size => size.size === getCartItem.size);
    const availableStock = sizeInfo ? sizeInfo.quantity : 0; // Tồn kho cho kích thước
  
    if (typeOfAction === "plus") {
      if (indexOfCurrentCartItem > -1) {
        const getQuantity = cartItems.items[indexOfCurrentCartItem].quantity;
        // Kiểm tra số lượng mới có vượt quá không
        if (getQuantity + 1 > availableStock) {
          toast({
            title: `Only ${availableStock} products for this size`,
            variant: "destructive",
          });
          return; // Không thực hiện cập nhật nếu vượt quá số lượng
        }
      }
    }
  
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
        size: getCartItem?.size
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId, size: getCartItem?.size })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        {/* Hiển thị kích thước nếu có */}
        {cartItem?.size && (
          <p className="text-sm text-gray-500">Size: {cartItem.size}</p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
