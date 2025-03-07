import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const registerUser = asyncHandler(async (req, res, next) => {
  // get user details from frontend
  const { fullname, username, email, password } = req.body;
  console.log(email);
  // validation - not empty
  if (
    [fullname, email, password, username].some((field) => field?.trim == "")
  ) {
    throw new ApiError(400, "All Fields are Required");
  }

  // check if user already exists: username, email
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User Already Exists");
  }
  // check for images, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Need Avatar");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Need Avatar");
  }
  // create user object - create entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
    email,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  // check for user creation

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while creating user");
  }
  // return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Register successfully"));
});

// export default registerUser;
