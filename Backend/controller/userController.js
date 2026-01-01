import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
import blogModel from '../models/blogModel.js';
import mongoose from 'mongoose';
const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill all fields",
      });
    }
    //exisiting user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).json({
        success: false,
        message: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //save new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error In Register callback",
      success: false,
      error,
    });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};

//login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email is not registered",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invlid username or password",
      });
    }
    return res.status(200).json({
      success: true,
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};
const deleteUser = async (req,res)=>{
  let session;
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"user not found"
      })
    }
    session = await mongoose.startSession();
    session.startTransaction();
    await blogModel.deleteMany({user : userId}).session(session)
    await user.deleteOne({session})
    await session.commitTransaction()
    session.endSession()
    return res.status(200).json({
      success:true,
      message:"user deleted successfully"
    })
  } catch (error) {
    if(session){
      await session.abortTransaction()
      session.endSession()
    }
    res.status(500).json({
      success:false,
      message:"something went wrong",
      error:error.message,
    })
  }

}
export {registerController,loginController,getAllUsers,deleteUser}
