// const fakeUser = {
//   username: "Nicolas",
//   loggedIn: false,
// };

let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", {
    pageTitle: "Home",
    // potato: "tomato",
    // fakeUser: fakeUser,
    videos,
  });
}; //res.render(views name, variable)

export const watch = (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  const video = videos[id - 1];
  console.log("Show Video", id);
  // console.log(req.params);
  return res.render("watch", { pageTitle: `Watching : ${video.title}`, video }); //pug 파일 명과 같아야된다. - 띄어쓰기 x 대문자 x
};

export const getEdit = (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing : ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
  //다른 url로 이동할수 있도록 만들기
};
export const search = (req, res) => res.send("Search");
// export const deleteVideo = (req, res) => {
//   console.log(req.params);
//   return res.send("Delete Video");
// };
// export const upload = (req, res) => res.send("Upload");

// export default trending; -> 하나만 export
export const getUpload = (req, res) => {
  console.log(req.body);
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
