import { v4 as uuidv4 } from "uuid";
import TrainerModel from "../model/trainerModel.js";

export default class TrainerService {
  static async getTrainers() {
    return await TrainerModel.getAll();
  }
  static async findTrainerById(id) {
    const trainer = await TrainerModel.getById(id);
    if (!trainer) {
      throw new Error(`Trainer with ID ${id} not found`);
    }
    return trainer;
  }
  static async addTrainer(data) {
    const { id, firstName, lastName, email } = data;
    if (!id || !firstName || !lastName || !email) {
      throw new Error(
        "Missing required fields: id, firstName, lastName, email"
      );
    }
    return await TrainerModel.create(data);
  }
  static async updateTrainer(id, updatedData) {
    const trainer = await TrainerModel.update(id, updatedData);
    if (!trainer) {
      throw new Error(`Trainer with ID ${id} not found`);
    }
    return trainer;
  }
  static async deleteTrainer(id) {
    await TrainerModel.delete(id);
  }
  static async deleteAllTrainers() {
    await TrainerModel.getAll();
    await TrainerModel.deleteAll();
  }
}
