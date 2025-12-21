import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
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
export {registerController,loginController,getAllUsers}
