import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import ApiError from "./utils/apiError.js";
import globalError from "./middlewares/errorMiddleware.js";
// Routes
import categoryRoute from "./routes/category.route.js";
import subCategoryRoute from "./routes/subCategory.route.js";
import brandRoute from "./routes/brand.route.js";

dotenv.config({ path: "config.env" });

// database connection
dbConnection();

const app = express();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handler middleware
app.use(globalError);
const port = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Hello World! 1"));
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// Handle rejection outside express

process.on("unhandledRejection", (err) => {
  console.error(`UnhandleRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("shutting down....");
    process.exit(1);
  });
});
