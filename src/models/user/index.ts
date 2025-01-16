import { Schema, model } from "mongoose";
import UserType from '../../validator/user/index';

const UserSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile_number: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], required: true },
  account_status: {
    type: String,
    enum: ["unverified", "active", "inactive", "banned"],
    default: "unverified",
    required: false,
  },
  account_status_description: { type: String, required: false },
  isVerified: { type: Boolean, required: false,default:false },
  verification_Code: { type: String, required: false },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
});

const UserModel = model<UserType>("User", UserSchema);

export default UserModel;