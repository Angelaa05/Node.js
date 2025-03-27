import { v4 as uuidv4 } from "uuid";
import TrainerModel from "../model/trainerModel.js";

export default class TrainerService {
  static async getAll() {
    try {
      const trainers = await TrainerModel.getAll();
      return trainers;
    } catch (error) {
      throw new Error(`Failed to fetch trainers: ${error.message}`);
    }
  }

  static async findTrainerById(id) {
    if (!id) {
      throw new Error("Trainer ID is required.");
    }

    try {
      const trainer = await TrainerModel.getById(id);
      if (!trainer) {
        throw new Error(`Trainer with ID ${id} not found.`);
      }
      return trainer;
    } catch (error) {
      throw new Error(`Failed to find trainer with ID ${id}: ${error.message}`);
    }
  }

  static async addTrainer(data) {
    const { firstName, lastName, email } = data;

    if (!firstName || !lastName || !email) {
      throw new Error("Missing required fields: firstName, lastName, email.");
    }

    const id = data.id || uuidv4();

    try {
      const newTrainer = { id, firstName, lastName, email };
      return await TrainerModel.create(newTrainer);
    } catch (error) {
      throw new Error(`Failed to add trainer: ${error.message}`);
    }
  }

  static async updateTrainer(id, updatedData) {
    if (!id) {
      throw new Error("Trainer ID is required.");
    }

    try {
      const updatedTrainer = await TrainerModel.update(id, updatedData);
      if (!updatedTrainer) {
        throw new Error(`Trainer with ID ${id} not found.`);
      }
      return updatedTrainer;
    } catch (error) {
      throw new Error(
        `Failed to update trainer with ID ${id}: ${error.message}`
      );
    }
  }

  static async deleteTrainer(id) {
    if (!id) {
      throw new Error("Trainer ID is required.");
    }

    try {
      await TrainerModel.delete(id);
      return { message: `Trainer with ID ${id} deleted successfully.` };
    } catch (error) {
      throw new Error(
        `Failed to delete trainer with ID ${id}: ${error.message}`
      );
    }
  }

  static async deleteAllTrainers() {
    try {
      await TrainerModel.deleteAll();
      return { message: "All trainers deleted successfully." };
    } catch (error) {
      throw new Error(`Failed to delete all trainers: ${error.message}`);
    }
  }
}
