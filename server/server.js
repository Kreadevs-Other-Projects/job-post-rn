require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoute = require("./routes/authRoute");
const jobsRoute = require("./routes/jobRoute");
const appsRoute = require("./routes/applicationRoute");
const employerRoute = require("./routes/employerRoutes");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json({ limit: "20mb" }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

connectDB(process.env.MONGO_URI);

app.use("/api/auth", authRoute);
app.use("/api/jobs", jobsRoute);
app.use("/api/applications", appsRoute);
app.use("/api/employer", employerRoute);

app.get("/", (req, res) => res.send("Real Estate API is running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
