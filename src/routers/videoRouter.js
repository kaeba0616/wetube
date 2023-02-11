import express from "express";
import {
  watch,
  getEdit,
  // upload,
  postEdit,
  // deleteVideo,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter.route("/:id([0-9a-f]{24})").get(watch); //id 가 아니라 potato가 되도된다. 다른거 가능
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit); // HTTP 2개 이상일때 route사용
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteVideo);
// videoRouter.get("/:id(\\d+)/edit", getEdit); // 12321331 - :id 대신 넣어된다.
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(videoUpload.fields([{ name: "video" }, { name: "thumb" }]), postUpload);
// videoRouter.get("/upload", getUpload);
// videoRouter.post("/upload", postUpload);

//videoRouter.get("/:id(\\d+)/delete", deleteVideo);  :id 변수라는 것을 알려주는 것이다.
// (\\d+ ) 만 있어도 숫자가 가능하지만 , id를 붙인 이유는 id값을 controller에서 사용하기 때문이다.
//videoRouter.get("/upload", upload); // id 보다 위에 안두면 express는 위에서 부터 읽기 때문에 ":id" 를 먼저 보기 떄문에 upload를 변수 값으로 인식함
export default videoRouter;
// [0-9a-f]{24}
