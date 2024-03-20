const Task = require("../models/task");

// Créer une nouvelle tâche
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = new Task({ title, description, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir toutes les tâches
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une tâche par son ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Tâche non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une tâche
const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate });
    res.json({ message: "Tâche mise à jour" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tâche supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
