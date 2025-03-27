import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";
import AdminReviewsSlice from "./admin/review-slice"


import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice";


const store = configureStore({
  reducer: {
    auth: authReducer, // Quản lý xác thực

    adminProducts: adminProductsSlice,  // Quản lý sản phẩm admin
    adminOrder: adminOrderSlice,        // Quản lý đơn hàng admin
    adminReview: AdminReviewsSlice,     // Quản lý đánh giá admin


    shopProducts: shopProductsSlice,     // Quản lý sản phẩm khách hàng
    shopCart: shopCartSlice,             // Quản lý giỏ hàng
    shopAddress: shopAddressSlice,       // Quản lý địa chỉ giao hàng
    shopOrder: shopOrderSlice,           // Quản lý đơn hàng khách hàng
    shopSearch: shopSearchSlice,         // Quản lý tìm kiếm sản phẩm
    shopReview: shopReviewSlice,         // Quản lý đánh giá sản phẩm

    commonFeature: commonFeatureSlice,   // Trạng thái chung
  },
});

export default store;