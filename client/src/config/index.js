export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type:"email"
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
//Cấu hình form đăng ký (registerFormControls)


export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
//Cấu hình form đăng nhập (loginFormControls)

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
    readOnly: true
  },
];
//Cấu hình form thêm sản phẩm (addProductFormElements)
//Định nghĩa các trường nhập cho form thêm sản phẩm vào hệ thống.

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];
//Cấu hình menu điều hướng (shoppingViewHeaderMenuItems)
//Cấu hình danh sách menu cho người dùng đã đăng nhập.
export const unAuthShoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/search",
  },
];
//Cấu hình menu cho người dùng chưa đăng nhập (unAuthShoppingViewHeaderMenuItems)
//Tác dụng: Menu điều hướng cho người dùng chưa đăng nhập.

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};
//Cấu hình danh mục sản phẩm (categoryOptionsMap)

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};
//Cấu hình thương hiệu sản phẩm (brandOptionsMap)

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};
//Cấu hình bộ lọc sản phẩm (filterOptions)


export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];
//Cấu hình sắp xếp sản phẩm (sortOptions)

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
//Cấu hình địa chỉ (addressFormControls)
