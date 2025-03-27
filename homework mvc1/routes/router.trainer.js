import { Router } from "express";
import trainerController from "../controllers/trainerController.js";

const router = Router();

router.get("/", trainerController.getAllTrainers);
router.get("/:id", trainerController.getTrainerById);
router.post("/", trainerController.createTrainer);
router.put("/:id", trainerController.updateTrainerInfo);
router.delete("/:id", trainerController.removeTrainer);
router.delete("/", trainerController.removeAllTrainers);

export default router;
