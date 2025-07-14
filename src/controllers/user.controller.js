import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  //get user details from fronted
  //validation - not empty
  //check if user alread exists:username,email
  //check for images , check for avatar
  //upload them to cloudinary, avatar
  //create user object - create entry in db
  //remove password & refresh token field from response
  //check for user creation
  //return response

  const { fullName, email, username, password } = req.body;
  // console.log("email : ", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400 , "All fields are required!!");
  }

  const existedUser = await User.findOne({
    $or:[{ username },{ email }]
  })

  // console.log(existedUser);
  if(existedUser){
    throw new ApiError(409, "User with email or username alread exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400 , "Avatar file is Required!! CLIENT");
  }
  // console.log(avatarLocalPath);
  // console.log(coverImageLocalPath);
  
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(400, "avatar file is Required!! SERVER");
  }
  // console.log(avatar);

  const user = await User.create({
    fullName,
    avatar:avatar.url,
    covetImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registring the user");
  }

  return res.status(201).json(
    new ApiResponse(200 , createdUser , "User registered Succesfully")
  )

});

export { registerUser };
