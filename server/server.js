const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminReviewsRouter = require("./routes/admin/review-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
// const shopRecommendationRouter = require("./routes/shop/recommendation-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");



mongoose
  .connect("mongodb+srv://Cao:cao12345@cluster0.q2w0h.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173", // Địa chỉ của client
        methods: ["GET", "POST"]
    }
});


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/reviews", adminReviewsRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
// app.use("/api/shop/recommendation", shopRecommendationRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow requests from your frontend's origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
  next();
});

const users = {}; // Lưu trữ người dùng
const messages = []; // Lưu trữ tin nhắn

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Khi người dùng hoặc admin kết nối
    socket.on('register', (username, role) => {
        users[socket.id] = { username, role }; // Lưu tên người dùng và vai trò
        console.log(`User registered: ${username}, Role: ${role}`);
        
        // Gửi lại lịch sử tin nhắn cho người dùng mới
        socket.emit('chat history', messages);
    });

    socket.on('chat message', (msg) => {
        const messageData = { msg, user: users[socket.id].username, role: users[socket.id].role };
        messages.push(messageData); // Lưu tin nhắn vào lịch sử

        // Gửi tin nhắn đến admin hoặc tất cả người dùng
        if (users[socket.id].role === 'user') {
            socket.broadcast.emit('chat message', messageData); // Gửi đến admin
        } else {
            io.emit('chat message', messageData); // Gửi đến tất cả người dùng
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete users[socket.id]; // Xóa người dùng khi ngắt kết nối
    });
});

const PORT = process.env.PORT || 5001;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// Khởi động server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



