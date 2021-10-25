const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test Profile

const profile = {
  name: "Johan",
  email: "jsky2033@gmail.com",
  password: "123",
};

const profileShow = {
  name: "Johan",
  email: "jsky2033@gmail.com",
};

// Profile Page

app.post("/editProfile", (req, res) => {
  console.log(req.body);
  res.status(204).send();
});

// Login + Registration

// user actions

app.post("/editProfile", (req, res) => {
  console.log(req.body);
  res.status(204).send();
});

app.post("/loginUsr", (req, res) => {
  if (req.body.password === profile.password) {
    res.status(204).send();
  } else {
    res.status(401).send();
  }
});

app.post("/registerUsr", (req, res) => {
  res.status(204).send();
});

//user data retrieval

app.get("/getUsrData", (req, res) => {
  res.json(profileShow);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
