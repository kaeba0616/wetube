import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
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
