const express = require("express");
const path = require("path");

const app = express();
app.use("/js", express.static(path.resolve(__dirname, "./public/js")));
app.use("/css", express.static(path.resolve(__dirname, "./public/css")));
app.set("view engine", "ejs");

//credentials 💳

const Username = "voldemort";
const Password = "vol123";
const Port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/welcome", (req, res) => {
  const result = req.query;
  result.uname === Username &&
    result.psw === Password &&
    res.render("weldom", {
      username: result.uname,
      pass: result.psw,
      status: 200,
    });

  if (result.uname !== Username && result.psw === Password) {
    return res.render("error", {
      curusername: "username: " + result.uname,
      message: ` Username is incorrect plz try again..`,
      status: 401,
    });
  }
  if (result.psw !== Password && result.uname === Username) {
    return res.render("error", {
      curusername: "password: " + result.psw,
      message: ` Password is incorrect plz try again..`,
      status: 401,
    });
  }
  if (result.psw !== Password && result.uname !== Username) {
    return res.render("error", {
      curusername:
        "username: " + result.uname + " & " + "password: " + result.psw,

      message: `Username and Password is incorrect plz try again..`,
      status: 401,
    });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(Port, () => {
  console.log("server is listening on port 8000....");
});
