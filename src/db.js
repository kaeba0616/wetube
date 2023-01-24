import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
  // 오래된것들 처리하기
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
}); //wetube or nameofDB

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
