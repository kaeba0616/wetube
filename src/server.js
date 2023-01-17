import express, { application } from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter"; //global 말고 다른 것으로 사용해도 된다. exprot default
import videoRouter from "./routers/videoRouter"; // export default 값은 이름이 바뀔수 있지만 여러 개를  export를 하면 이름을 제대로 써야된다.
import userRouter from "./routers/userRouter";

//  const express = require("express");

//  const app = express();

const PORT = 4000;

console.log(process.cwd());

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); // process.cwd() 위치를 찾아주기 위해서 설정함 - pug가 여기 있음을 알려줌
app.use(logger);
app.use(express.urlencoded({ extended: true }));
//- form를 javascript로 바꿔서 쓸수 있도록 설정
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// const privateMiddleware = (req, res, next) => {
//   const url = req.url;
//   if (url === "/protected") {
//     return res.send("<h1>Not Allowed </h1>");
//   }
//   console.log("Allowed, you may continue.");
//   next();
// };

// const handleLogin = (req, res, next) => {
//   return res.send({ message: "Login here.</h1>" });
// };

// const handleProtected = (req, res) => {
//   return res.send("Welcome to the private lounge.");
// };

// app.use(logger); // use가 먼저 와야됨
// app.use(privateMiddleware);

// app.get("/", handleHome); // handleHome-> finalware / all controller can be middleware
// app.get("/protected", handleProtected);
// app.get("/login", handleLogin);

//button.addEventListener("click",handleClick) - vanilar
// req request object, res response object - can replace res, req to banana, lemon
// home get request -> express handleHome put req, res
const handleListening = () =>
  console.log(`Server listening on ports httsp://localhost:${PORT}`);

app.listen(PORT, handleListening); //Vanlia

// app.listen(4000, () => console.log("Server listening on port 4000"));
