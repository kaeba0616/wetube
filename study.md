main -?

scripts -> 명령어 compression (npm run "command")
-> package.json 있는 곳에서만 가능

node_modules -> 'npm i' 한 파일들 모아둔 폴더
package.json dependencies{} -> express를 쓸때 필요한 package들이다 - do install = npm i ' ' automatically add a line - need
devDependencies - 개발자들을 위한 Dependency

- do not install -for better (--save-dev) ->지우고해도 devDependencies로 옮기기만 하면된다.

npm i express가 아니라 npm i 만 해도 필요한 can install modules by oneself
npm package.json을 보고 설치해준다. => node_modules을 추가하지말고 나머지만 공유해서 npm i를 하면됨 (package.json)

package-lock.json -> 같은 버전으로 설치할 수 있도록 틀을 맞춰준다.

**npm i 할때는 꼭 package.json을 저장하거나 닫고 하자**

nodejs only vs babel -> l: next-gen Js, r: past-gen

package.json -> node_modules에 저장되기 때문에 구분만 해줌

babel - config.json - presets -> preset-env - 최신 자바스크립트를 사용할 수 있게 해줌(plugins)

nodemon - 파일이 수정되는지 감지하는 모듈이다

import 할때 node_modules/express 할필요 없다 - express만 해도됨

server 24시간 켜있는 컴퓨터이다 -> request-> listen (message or google.com, play video , write a comments ...)

callback = valia button.addEventListen("click", handleClick) -> 서버가 시작될 때 작동되는 함수이다. 어떤 port에게 listening할지 선택 ->

Cannot Get /

- '/' = root = page

- Get : HTTP method = get me this page
- 사이트를 접속할때 http request를 보낸다.
- browser는 request post가 된다.
- get/ our homepage

-sandwich
express()
[ application]
listren

- ask send... = request

- res.end / send sendStatus ....

- router handler로 url 정돈하는 것

- middleware - express에 중요한 것! - software - req, res 사이에 있다. req 받고 res 보내주기 전에 middle있다. handler == middleware - handler(..., next)
- app.use (middleware) -first / app.get (next) - next

- Get 보조품을 가져다 주는 거지 / send / delete ...

  - application.get(route, handler)

- const handleHome = (req, res) => res.end();
  or =>{return res.end()};

  //ref express - API homepage

  () => console.log("dsdadasdad") or handleHome;

  - inline func

  const hoem = (req, res) => res.send("Hello");
  app.get("/", home);

  controller == middleware

- controller = ( A ,B ,C );

app.use (A, B) 마지막 use가 없을때?

npm - Morgan common, short ,dev, tiny, ...
index.js

book reference - 'clean code' first coding next clean

모듈 -> 다른 사람들도 사용할수 있게 해야되기때문에 export default로 변수 export 해줘야됨 - 그 후

app.get ( "/ab+cd ") abcd abbbbbbbbbcd abbbbcd
/ab?cd - abcd acd
/ab\*cd abdasdasddad abcd
regexr : 정규표현식
pug : html을 잘 정리 할수 있도록 도와주는 npm 툴 ::view engine -> app.set("view engine", "pug"); -> pug 파일을 html로 변환 시켜서 유저들이 볼수 있도록 해준다.

- process.cwd() +/views
  process.cwd -> 노드를 시작하는 directory = 서버 or node.js 를 기동하는 위치에서 시작한다. ( = package.json)
  pug 파일 명 - 띄어쓰기 x 대문자 x
- partials - pug를 사용하면 서버를 안끄고 변경가능
  express - api - x-powers-by

PUG

- template - iteration, conditional, my.css

- conditional (if, else)

- iterator - each a in as -> convention
  cannot read property 'length' -> as가 없다!!
  - mixin partial과 비슷하다 -> data를 받을수 있는 partial이다

href="/edit" => root/edit -
href="edit" => browser url /edit - relative url
localhost:400/profile/edit-profile/password

========> a(href ="potato")
localhost:400/profile/edit-profile/potato
========> a(href ="/potato")
localhost:400/potato

get form -> google 검색할때, 검색페이지 만들때
post form -> database 나 파일 보낼때 , 바꿀 data보낼때 로그인 할때 post

express - form 이해하도록 express-extended query string library

mongoDB - document based on DB
json like documents
