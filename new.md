- morgan -> Node.js 웹 서버에 들어오는 요청을, 명령창(Shell)에 출력해주는 Node.js 패키지

- mongoDB를 Node.js로 작성하기 위해서 Mo
  CRUD

create
Read
Update
Delete

callback function

savem create -> new object save / video model create
database 와 html에 max, min 변형 설정 해줘서 보안 구축하기

- 존재하지않는 비디오를 접을 할때
- ??
- remove vs delete?
- findIdAndDelete -> findOneAndDelete

welcome 포함하는 전체
welcome$ 끝
^welcome 시작
-> regexp

- hash

- node.bcrypt.js (npm)
- rainbow table
- hashing을 많이 하면 할수록 보안이 좋아짐 (saltRound - hash 횟수)
- sha256: hashing 해보는 사이트
- hashing function : deterministic function (Computer Science)

- `$or` 각 조건이 true일 떄 실행

status code
200 OK - history에 기록 됨
400 Bad Request - history에 기록 안됨
404

how to remember user

- use cookie
  session
- memory,history between browser and backend(localhost)
  cookie
- 백엔드에서 요청을 보내는 유저에게 id(value)를 보내는 것 - 유저가 사용하는 browser 아이디를 주는 것
- req.locals -> pug express 서로 다른 작업없이 접근 가능
- pug template에 import되어있음
- localmiddleware의 순서가 중요
  -session을 포함하기 떄문

-session (middleware)

- backend가 browser에 cookie를 보냄
- cookie와 requests를 같이 보냄
- session Id (browser 마다 다르게 보냄)
- backend 는 현재 사용하는 session Id를 알고있음
- backend와 cookie에 저장된다.

- \*\*session id => save in the Cookie
- \*\*session data => save in server-side(backend)

1. middleware 생성: app.use(session{~~~}) (express-session)

- 백엔드와 소통할 때마다 브라우저에 cookie를 전송함

- Cookie: 백엔드가 브라우저에게 주는 정보
- 매번 백엔드에 req를 할 때에 브라우저는 알아서 cookie를 같이 보냄
- Cookie에 넣는 정보
- session ID

- backend

- session id를 관리하는 곳이다.
- 서버 restart -> session store restart

- http

- stateless

- 브라우저 vs 웹서버
- 브라우저
- sessionId를 가지고있는 Cookie가 있고
- 웹서버
- req.sessionID
- req.session
- '웹서버의' session object이다
- session 안에 logged와 user가 존재, cookie도 존재
- 브라우저 마다 object가 다르다
- session

- 처음 실행시 할 때 session id를 얻는다.

- .env (dotenv)

- dotenv/config;

- web application flow to authrize

1. Users are redirected to request their GitHub identity

2. Users are redirected back to your site by GitHub

3. Your app accesses the API with the user's access token

- node-fetch ????

- javascript != nodeJS

- rest api vs graphql ???

- multer
  DB - 파일 저장 x but 파일 주소 저장
  file - 파일 저장
  negative
- 서버에 저장되어서 서버를 다시 시작하면 그전에 저장되있던 파일들은 날라간다.
- express - static files
- mongoose
- populate - ref한 object의 값을 가져옴

## bugfix

- video save 할때마다 hash를 하기 때문에 hash값이 계속해서 달라진다
- 즉, 로그인 안됨
- if(this.isModified("password"))

## Webpack

- babel과 비슷한 효과
- 모든 web browser가 읽을 수 있도록 만들어주는 것
- newly JS, SCSS -> oldly JS, CSS
- GULP free course -> similiar webpack
- almost FrameWork contains Webpack
- path.resolve(\_\_dirname, "assets", "js")
