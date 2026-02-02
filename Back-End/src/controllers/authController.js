
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const register = async (req,res)=>{
    try {
        const {name,email,password,role,profileImage,bio,isActive} = req.body;
        
        const existEmail = await userModel.findOne({email});
        if(existEmail) return res.status(400).json({message:"Email is already register"});

        // const existMobile = await userModel.findOne({mobile});
        // if(existMobile) return res.status(400).json({message: "Mobile number is already registered"});

        const hashPassword = await bcrypt.hash(password,10)

        const user = await userModel.create({
          name,
          email,
          password:hashPassword,
          role,
          profileImage:req.file ? req.file.path : undefined,
          bio,
          isActive: isActive !== undefined ? isActive : true,
        });
        res.status(201).send({message:"User created", user})
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

  
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

 
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "6h",
      },
    );

    res.json({ message: "Login successful", user, token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "Fetched user", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (req.file) user.profileImage = req.file.path;
    
    res.status(200).json({ success: true, message: "User updated", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};


export { register, login, getUserById, updateUser, deleteUser };