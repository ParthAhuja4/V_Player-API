// Use an auth-middleware so logout knows which user is currently logged in, because middleware reads & verifies the access token and puts the user in req.user.
// Why not do it directly inside the logout function:
// Because logout cannot identify the user on its own—it needs the decoded token first, and decoding/validating JWT is reusable logic that belongs in middleware, not repeated in every route.

import asyncHandler from "../utils/assyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }

  req.user = user;
  next();
});
