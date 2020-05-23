const express = require("express");
const app = express();
const connectDB = require("./config/db");

const PORT = process.env.PORT | "5000";

//Connect Mongo DB
connectDB();

//Default
app.get("", (req, res) => {
  res.json({ msg: "Welcome to the Contact Keeper" });
});

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
