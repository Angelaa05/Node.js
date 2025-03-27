import DataService from "../services/data.service.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const currentFileURL = import.meta.url;
const currentFilePath = fileURLToPath(currentFileURL);
const filePathDirectory = path.dirname(currentFilePath);
const dbPath = path.resolve(filePathDirectory, "..", "data", "trainer.json");

export default class TrainerModel {
  static async getAll() {
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error reading trainers data: ${error.message}`);
    }
  }

  static async getById(id) {
    const trainers = await this.getAll();
    return trainers.find((trainer) => trainer.id === id);
  }

  static async create(body) {
    const trainers = await this.getAll();
    if (trainers.some((trainer) => trainer.id === body.id)) {
      throw new Error("Trainer with this ID already exists");
    }
    if (!body.firstName || !body.lastName || !body.email) {
      throw new Error("Missing required fields: firstName, lastName, email");
    }
    trainers.push(body);
    await DataService.writeData(dbPath, trainers);
    return body;
  }

  static async update(id, body) {
    const trainers = await this.getAll();
    const index = trainers.findIndex((trainer) => trainer.id === id);
    if (index < 0) {
      throw new Error("Trainer not found");
    }
    trainers[index] = { ...trainers[index], ...body };
    await DataService.writeData(dbPath, trainers);
    return trainers[index];
  }

  static async delete(id) {
    const trainers = await this.getAll();
    const index = trainers.findIndex((trainer) => trainer.id === id);
    if (index < 0) {
      throw new Error("Trainer not found");
    }
    const filteredTrainers = trainers.filter((trainer) => trainer.id !== id);
    await DataService.writeData(dbPath, filteredTrainers);
    return trainers[index];
  }
  static async deleteAll() {
    try {
      const trainers = [];
      await DataService.writeData(dbPath, trainers); // Use dbPath here
    } catch (error) {
      throw new Error(`Failed to delete all trainers: ${error.message}`);
    }
  }
}
