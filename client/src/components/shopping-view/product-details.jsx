
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState,useRef  } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import ProductSuggestions from "./suggest-product";
import { useNavigate } from "react-router-dom";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const dispatch = useDispatch();
  const { user} = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dialogContentRef = useRef(null);

  useEffect(() => {
    if (open && dialogContentRef.current) {
      setTimeout(() => {
        dialogContentRef.current.scrollTo(0, 0);
      }, 0);
    }
  }, [open]);
  
  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  
  function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (!user || !user.id) {
      toast({
          title: "You must be logged in to add items to your cart.",
          variant: "destructive",
      });
      navigate("/auth/login"); // Chuyển hướng đến trang đăng nhập
      return;
  }
    // if (!selectedSize) {
    //   toast({
    //     title: "Please select a size!",
    //     variant: "destructive",
    //   });
    //   return;
    // }
  
    let getCartItems = cartItems.items || [];
  
    // Tìm sản phẩm với productId và size tương ứng trong giỏ hàng
    const existingItemIndex = getCartItems.findIndex(
      (item) => item.productId === getCurrentProductId && item.size === selectedSize
    );
  
    if (existingItemIndex > -1) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng
      const existingItem = getCartItems[existingItemIndex];
      const updatedQuantity = existingItem.quantity + 1;
  
      // Kiểm tra tồn kho
      if (updatedQuantity > getTotalStock) {
        toast({
          title: `Only ${getTotalStock} quantity can be added for this item`,
          variant: "destructive",
        });
        return;
      }
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
      dispatch(
        addToCart({
          userId: user.id,
          productId: getCurrentProductId,
          size: selectedSize,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user.id));
          toast({
            title: "Product is added to cart",
          });
        }
      });
    }
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
    setSelectedSize("")
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    setSelectedSize("")
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, "reviews");
  console.log(productDetails);
  

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent ref={dialogContentRef} className="max-w-[100vw] sm:max-w-[90vw] lg:max-w-[80vw] max-h-[95vh] overflow-auto">
        <div className="grid grid-cols-2 gap-8 sm:p-12 max-w-[100vw] sm:max-w-[95vw] lg:max-w-[90vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className=" w-full"
            style={{height: 600, width: 500}}
          />
        </div>
        <div className="max-h-[80vh] overflow-y-auto">
          <div>
            <DialogTitle className="text-3xl font-extrabold" id="product-title">{productDetails?.title}</DialogTitle>
            {/* <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1> */}
            <DialogDescription className="text-muted-foreground text-2xl mb-5 mt-4" id="product-description">{productDetails?.description}</DialogDescription>
            {/* <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p> */}
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="mt-5">
              <label className="block text-lg font-bold mb-2">Select Size:</label>
              <div className="flex gap-2">
                {productDetails?.sizes.map((sizeItem, index) => (
                  <div
                    key={index}
                    onClick={() => sizeItem.quantity > 0 && setSelectedSize(sizeItem.size)}
                    className={`border p-2 rounded cursor-pointer ${selectedSize === sizeItem.size ? "bg-gray-500 text-white" : "bg-white"} ${sizeItem.quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    title={sizeItem.quantity === 0 ? "Out of stock" : ""}
                  >
                    {sizeItem.size} - {sizeItem.quantity}
                  </div>
                ))}
              </div>
            </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock,
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        </div>
        {/* <ProductSuggestions 
          productId={productDetails?._id}  */}
        {/* /> */}
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
