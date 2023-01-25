import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
});

userSchema.pre("save", async function () {
  // 저장하기 전에 가로채서 작업가능!
  console.log("Users password:", this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log("Hashed password:", this.password);
}); // this->create User
const User = mongoose.model("User", userSchema);

export default User;
