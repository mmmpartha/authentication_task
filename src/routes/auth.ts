import express from 'express'
import getRoot from '../controllers/root/getRoot'
import postRoot from '../controllers/root/postRoot'
import signup from '../controllers/auth/signup';
import verifyEmail from '../controllers/auth/verify-email';
import verifySuccess from '../controllers/auth/verify-success';
import alreadyVerified from '../controllers/auth/already-verify';
import LogIn from '../controllers/auth/login';
import forgotPassword from '../controllers/auth/forgot-password';
import resetPassword from '../controllers/auth/reset-password';
import rateLimiter from "../middleware/rateLimiter/reateLimiter";
import invalidToken from '../controllers/auth/invalid-token'
import validateResetToken from '../controllers/auth/validate-reset-token';
import validateOtp from '../controllers/auth/valid-otp';
import updateProfile from '../controllers/auth/update-profile'
import getAllUsers from '../controllers/auth/get-all-user';
import getAllSingleUsers from '../controllers/auth/get-single-user';

const auth = express.Router()

auth.get('/', getRoot)


auth.post('/create',rateLimiter, signup)


auth.get("/verify-email/:token", verifyEmail);

auth.get("/verify-success", verifySuccess);

auth.get("/already-verified", alreadyVerified);

auth.get("/invalid-token", invalidToken);

auth.post("/login", LogIn);

auth.post("/forgot-password", forgotPassword);

auth.post("/valid-otp", validateOtp);

auth.post("/reset-password", resetPassword);

auth.post("/update/:id", updateProfile);

auth.get("/users", getAllUsers);

auth.get("/user/:id", getAllSingleUsers);

export default auth