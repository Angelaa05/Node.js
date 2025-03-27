import TrainerService from "../services/trainerService.js";

export default class TrainerController {
  static async getAllTrainers(req, res) {
    try {
      const trainers = await TrainerService.getAll();
      res.json(trainers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getTrainerById(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).send({ message: "Trainer ID is required." });
      }
      const trainer = await TrainerService.findTrainerById(req.params.id);
      if (!trainer) {
        return res
          .status(404)
          .send({ message: `Trainer with ID ${req.params.id} not found.` });
      }
      res.json(trainer);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async createTrainer(req, res) {
    try {
      const { firstName, lastName, email } = req.body;
      if (!firstName || !lastName || !email) {
        return res
          .status(400)
          .send({
            message: "Missing required fields: firstName, lastName, email.",
          });
      }
      const trainer = await TrainerService.addTrainer(req.body);
      res.status(201).send(trainer);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async updateTrainerInfo(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).send({ message: "Trainer ID is required." });
      }
      const updatedTrainer = await TrainerService.updateTrainer(
        req.params.id,
        req.body
      );
      res.json({
        message: "Trainer updated successfully",
        trainer: updatedTrainer,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async removeTrainer(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).send({ message: "Trainer ID is required." });
      }
      const trainer = await TrainerService.findTrainerById(req.params.id);
      if (!trainer) {
        return res
          .status(404)
          .json({ message: `Trainer with ID ${req.params.id} not found.` });
      }
      await TrainerService.deleteTrainer(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async removeAllTrainers(req, res) {
    try {
      const trainers = await TrainerService.getAll();
      if (!trainers.length) {
        return res.status(404).json({ message: "No trainers to delete." });
      }
      await TrainerService.deleteAllTrainers();
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
