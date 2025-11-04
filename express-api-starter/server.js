import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));