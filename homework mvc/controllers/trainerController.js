import TrainerService from "../services/trainerService.js";

export default class TrainerController {
  static async getAllTrainers(req, res) {
    try {
      const trainers = await TrainerService.getAll();
      res.json(trainers);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async getTrainerById(req, res) {
    try {
      const trainer = await TrainerService.findTrainerById(req.params.id);
      res.json(trainer);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async createTrainer(req, res) {
    try {
      const trainer = await TrainerService.addTrainer(req.body);
      res.status(201).send(trainer);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async updateTrainerInfo(req, res) {
    try {
      const updatedTrainer = await TrainerService.updateTrainer(
        req.params.id,
        req.body
      );
      res.json({
        message: "Trainer updated successfully",
        trainer: updatedTrainer,
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async removeTrainer(req, res) {
    try {
      await TrainerService.deleteTrainer(req.params.id);
      res.json({ message: "Trainer deleted successfully" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async removeAllTrainers(req, res) {
    try {
      await TrainerService.deleteAllTrainers();
      res.json({ message: "All trainers deleted successfully" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}
