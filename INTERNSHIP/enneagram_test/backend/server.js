const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const cors = require("cors");
const sequelize = require("./database/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const moment = require("moment-timezone");

const allowedOrigins = ["http://localhost:3000","http://localhost:3001"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
};
const myTimeZone = "Asia/Beirut";

const app = express();

app.use(cors(corsOptions));
// Require route files
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const questionRoutes = require("./routes/questionRoutes");
const authRoutes = require("./routes/authRoutes");
const answerRoutes = require("./routes/answerRoutes");
// morgan configuration start
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

morgan.token("type", function (req, res) {
  return res.statusMessage;
});
morgan.token("localDate", function (req, res) {
  return moment().tz(myTimeZone).format("YYYY-MM-DD HH:mm:ss");
});
app.use(
  morgan(":localDate :method :url :status :type", { stream: accessLogStream })
);
app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:3001"], // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specified HTTP methods
    credentials: true, // Allow including cookies and HTTP authentication
    optionsSuccessStatus: 204, // Set the status code for successful preflight requests
  })
);
//app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT;

sequelize
  .sync({
    force: false,
    alter: false,
  })
  .then(() => console.log("sync Successfully"))
  .catch((err) => {
    console.log("Failed to Sync");
    console.log({ ...err });
  });
// Use routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
