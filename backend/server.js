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
import bodyParser from 'body-parser';
import dynamicUiRouter from "./routes/dynamicUiRoute.js";
import popupRouter from "./routes/popupRoute.js";
// import adminrouter from "./routes/admin.route.js";
 
const app = express();  
connectDB();
 
const allowedOrigins = ["http://localhost:5174","http://localhost:5173","https://loan-project-admin.vercel.app","https://loan-project-flame.vercel.app","https://digitalfinserv.in"];

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


// app.use(express.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Alternative method if you're using express.json() directly:
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use("/api/user", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRoutes);
app.use("/api/events", eventRoute);
app.use("/api/bank",bankRoute); 
app.use("/api/loan",loanApplicationRouter)
app.use("/api/ui",dynamicUiRouter)
app.use("/api/popup",popupRouter)
// app.use("/api/admin",adminrouter)

app.get("/", (req, res) => {
    res.send("BACKEND WORKING");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// export default app;
