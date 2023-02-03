// import "./db"; // mongo에 연결!!
// import "./models/Video";
// import "./models/Users";
// import "./models/Coments";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter"; //global 말고 다른 것으로 사용해도 된다. exprot default
import videoRouter from "./routers/videoRouter"; // export default 값은 이름이 바뀔수 있지만 여러 개를  export를 하면 이름을 제대로 써야된다.
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

// console.log(process.cwd());

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); // process.cwd() 위치를 찾아주기 위해서 설정함 - pug가 여기 있음을 알려줌
app.use(logger);
app.use(express.urlencoded({ extended: true }));
//- form를 javascript로 바꿔서 쓸수 있도록 설정
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false, // ???????
    saveUninitialized: false, //변경될때만 cookie를 보냄
    // cookie: {
    //   maxAge: 20000,
    // },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
); //session middleware

app.get("/add-one", (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id}\n${req.session.potato}`);
});

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
