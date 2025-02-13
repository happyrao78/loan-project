import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import jobRouter from "./routes/jobRoute.js";
import applicationRoutes from "./routes/applicationRoute.js";
import eventRoute from "./routes/eventRoute.js";
import bankRoute from "./routes/bankRoute.js";
import loanApplicationRouter from "./routes/loanApplication.route.js";

const app = express();
connectDB();

const allowedOrigins = ["http://localhost:5174","http://localhost:5173"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, 
}));


app.use(express.json());


app.use("/api/user", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRoutes);
app.use("/api/events", eventRoute);
app.use("/api/bank",bankRoute); 
app.use("/api/loan",loanApplicationRouter)

app.get("/", (req, res) => {
    res.send("BACKEND WORKING");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// export default app;
