import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Button } from "@/components/ui/button";

function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderDetails, isLoading } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
    }
    return () => {
      dispatch(resetOrderDetails());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg mb-4">Không tìm thấy thông tin đơn hàng</p>
        <Button onClick={() => navigate(-1)}>Quay lại</Button>
      </div>
    );
  }

  const cartItems = orderDetails.cartItems || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Order Information */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label>{orderDetails._id}</Label>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label>{orderDetails.orderDate?.split("T")[0]}</Label>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label>${orderDetails.totalAmount}</Label>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Payment method</p>
              <Label>{orderDetails.paymentMethod}</Label>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Label>{orderDetails.paymentStatus}</Label>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Order Status</p>
              <Label>
                <Badge
                  className={`py-1 px-3 ${
                    orderDetails.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : orderDetails.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-black"
                  }`}
                >
                  {orderDetails.orderStatus}
                </Badge>
              </Label>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Chi tiết sản phẩm</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Title</th>
                    <th className="text-left py-2">Size</th>
                    <th className="text-left py-2">Quantity</th>
                    <th className="text-left py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.productId} className="border-b">
                      <td className="py-2">{item.title}</td>
                      <td className="py-2">{item.size}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Separator />

          {/* Shipping Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Thông tin giao hàng</h2>
            <div className="grid gap-2 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails.addressInfo?.address}</span>
              <span>{orderDetails.addressInfo?.city}</span>
              <span>{orderDetails.addressInfo?.pincode}</span>
              <span>{orderDetails.addressInfo?.phone}</span>
              <span>{orderDetails.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage; 