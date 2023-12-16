
import UserModel from '../models/UserModel.js';

export const getUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const saveUser = async (req, res) => {
  const user = new UserModel(req.body);
  try {
    const insertUser = await user.save();
    console.log("User saved", insertUser);
    res.status(201).json(insertUser);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateUser = async (req, res) => {

  try {
    const updateUser = await UserModel.updateOne({ _id: req.params.id }, { $set: req.body });
    console.log("User updated", updateUser);
    res.status(200).json(updateUser);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteUser = async (req, res) => {

  try {
    const deleteUser = await UserModel.deleteOne({ _id: req.params.id });
    console.log("User deleted", deleteUser);
    res.status(200).json(deleteUser);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}