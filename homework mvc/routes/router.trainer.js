import { Router } from "express";
import trainerController from "../controllers/trainerController.js";

const router = Router();

router.get("/", trainerController.getAllTrainers);
router.get("/:id", trainerController.getTrainerById);
router.post("/", trainerController.updateTrainerInfo);
router.put("/:id", trainerController.addTrainer);
router.delete("/:id", trainerController.deleteTrainer);
router.delete("/", trainerController.deleteAllTrainers);

export default router;
