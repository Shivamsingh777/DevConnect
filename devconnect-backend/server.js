const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const projectRoutes = require("./routes/project");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://preeminent-caramel-e9942a.netlify.app"],
    credentials: true,
  })
);app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);
app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false
    })
})
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
}).catch(err => console.log(err));
