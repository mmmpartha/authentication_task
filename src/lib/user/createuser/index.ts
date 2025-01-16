import UserModel from "../../../models/user";

const bcrypt = require("bcrypt");

async function createUser(userData: any): Promise<any> {
  const verificationCode = Math.random().toString(36).substring(2, 8);
  const hashedCode = await bcrypt.hash(verificationCode, 10);
  const encodedVerificationCode = encodeURIComponent(hashedCode);

  const newUserObject = {
    ...userData,
    verification_Code: encodedVerificationCode,
  };
  return await UserModel.create(newUserObject);
}

export default createUser;