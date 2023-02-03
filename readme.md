# Wetube Reloaded

global router

/ -> Home
/join -> Join
/login -> Login
/search -> Search
-> 규칙 예외부분들!!! = url을 줄이기 위함

users router

/users/:id -> See User
/users/logout -> Log out
/users/edit -> Edit MY Profile

<!-- /users/edit -> Edit Profile -->

/users/delete -> Delete MY Profile

video router

/videos/:id -> See Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video

<!-- /videos/comments -> Comment on a video
/videos/comments/delete ->Delete A Comment of a Video -->
