import "dotenv/config";
import "./db"; // mongo에 연결!!
import "./models/Video";
import "./models/User";
import app from "./server";
// import "./models/Users";
// import "./models/Coments";
const PORT = 4000;

const handleListening = () =>
  console.log(`Server listening on ports httsp://localhost:${PORT}`);

app.listen(PORT, handleListening); //Vanlia
