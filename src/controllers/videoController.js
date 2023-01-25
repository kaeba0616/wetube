import Video from "../models/Video";

export const home = async (req, res) => {
  // try {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
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
  const video = await Video.findById(id);
  console.log(video);
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
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit: `, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id }); // true, false - filter parameter 존재
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
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
  return res.redirect(`/videos/${id}`);
  //다른 url로 이동할수 있도록 만들기
};

export const getUpload = (req, res) => {
  // console.log(req.body);
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
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
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
// export default trending; -> 하나만 export
