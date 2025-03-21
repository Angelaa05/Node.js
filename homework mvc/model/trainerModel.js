import DataService from "../services/data.service.js";
import path from "path";
import { fileURLToPath } from "url";

const currentFileURL = import.meta.url;
const currentFilePath = fileURLToPath(currentFileURL);
const filePathDirectory = path.dirname(currentFilePath);
const trainerPath = path.join(filePathDirectory, "..", "data", "trainer.json");

export default class TrainerModel {
  static async getAll() {
    return await DataService.readData(trainerPath);
  }

  static async getById(id) {
    const trainers = await this.getAll();
    const foundTrainer = trainers.find((trainer) => trainer.id === id);
    return foundTrainer;
  }
  static async create(body) {
    const trainers = await this.getAll();
    const exists = trainers.some((trainer) => trainer.id === body.id);
    if (exists) {
      throw new Error("Trainer with this ID already exists");
    }
    trainers.push(body);
    await DataService.writeData(trainerPath, trainers);
    return body;
  }

  static async update(id, body) {
    const trainers = await this.getAll();
    const index = trainers.findIndex((trainer) => trainer.id === id);
    if (index < 0) {
      throw new Error("Trainer not found");
    }
    trainers[index] = { ...trainers[index], ...body };
    await DataService.writeData(trainerPath, trainers);
    return trainers[index];
  }

  static async delete(id) {
    const trainers = await this.getAll();
    const index = trainers.findIndex((trainer) => trainer.id === id);
    if (index < 0) {
      throw new Error("Trainer not found");
    }
    const filteredTrainers = trainers.filter((trainer) => trainer.id !== id);
    await DataService.writeData(trainerPath, filteredTrainers);
  }
}
