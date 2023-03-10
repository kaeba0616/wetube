import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";
import { async } from "regenerator-runtime";

export const home = async (req, res) => {
  // try {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  // console.log("error", error);
  // console.log("videos", videos);
  res.render("home", { pageTitle: "Home", videos }); // return 써도됨
  // } catch {
  //   res.render("server-error"); // return 써도됨
  // }
};
export const watch = async (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");

  // console.log(video);
  // console.log("Show Video", id);
  // console.log(req.params);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video }); //pug 파일 명과 같아야된다. - 띄어쓰기 x 대문자 x
};

export const getEdit = async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit: `, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id }); // true, false - filter parameter 존재
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    //id, {attribute}
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  video.title = title;
  video.description = description;
  video.hashtags = hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
  await video.save();
  req.flash("success", "Changes saved.");
  return res.redirect(`/videos/${id}`);
  //다른 url로 이동할수 있도록 만들기
};

export const getUpload = (req, res) => {
  // console.log(req.body);
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video.");
    return res.status(403).redirect("/");
  }
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  //delete video
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  console.log("should search for", keyword);
  if (keyword) {
    // if undefined - false
    //search
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"), // i 대소문자 구분 없게 하기 ,`^${keyword}` ,`${keyword}$`
        //$gt: 3
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};
// export default trending; -> 하나만 export

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }

  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const {
    session: {
      user: { _id: userId },
    },
    params: { id: commentId },
  } = req;

  const comment = await Comment.findById(commentId).populate("owner");
  const videoId = comment.video;

  if (String(userId) !== String(comment.owner._id)) {
    return res.sendStatus(404);
  }
  const video = await Video.findById(videoId);
  if (!video) {
    return res.sendStatus(404);
  }

  video.comments.splice(video.comments.indexOf(commentId), 1);
  await video.save();
  await Comment.findByIdAndDelete(commentId);

  return res.sendStatus(200);
};
