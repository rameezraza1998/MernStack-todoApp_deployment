import mongoose from "mongoose";
import Todos from "../models/todos.models.js";

const addTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title && !description) {
    return res.status(404).json({
      message: "title or description is required",
    });
  }

  try {
    const todo = await Todos.create({
      title,
      description,
    });
    res.status(201).json({
      message: "send todo successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const todo = await Todos.findByIdAndDelete({
      _id: id,
    });

    if (!todo) return res.status(404).json({ message: "no todo found" });

    res.status(201).json({
      message: "item deleted successfully",
      deletetodo: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
const getSingleTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const todo = await Todos.findById({ _id: id });

    if (!todo) return res.status(404).json({ message: "not found" });

    res.json({
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const getAllTodo = async (req, res) => {
  try {
    const todos = await Todos.find({});
    res.json({
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
const editTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const editItem = await Todos.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!editItem)
      return res.status(404).json({
        message: "no data found",
      });
    res.json({
      message: "edit item successfully",
      editData: editItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export { addTodo, deleteTodo, editTodo, getAllTodo, getSingleTodo };
