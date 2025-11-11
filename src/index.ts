import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { getEnvVariable } from "./utils/helpers";
import cookieParser from "cookie-parser";
import pdfRoute from "./routes/pdfRoute";
import { setupSwagger } from "./config/swagger";
const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Middlewares
app.use(cors({
  origin: [
    getEnvVariable('FRONT_END_URL')
  ],
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

setupSwagger(app);


app.get("/", async (_req, res) => {
  res.send("Hai there, API is running...");
});
app.use("/api/pdf", pdfRoute);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
