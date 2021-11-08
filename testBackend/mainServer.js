const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test Profile

var profile = null;

// Profile Page

app.get("/getProfile", (req, res) => {
  res.json(profile);
});

app.post("/editProfile", (req, res) => {
  profile = req.body;
  res.status(204).send();
});

// Login + Registration

//gives uid from firebase along with other information to MongoDB
app.post("/registerUsr", (req, res) => {
  profile = req.body;
  console.log(profile);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
