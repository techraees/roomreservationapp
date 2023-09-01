import User from "../models/UserModel.js";

// Create
export const createUser = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    next(error);
  }
};

// Update
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(400).json("Not Found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json("User has been Deleted", deletedUser);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get User
export const getUser = async (req, res, next) => {
  try {
    const singleUser = await User.findById(req.params.id);
    if (singleUser) {
      res.status(200).json(singleUser);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
