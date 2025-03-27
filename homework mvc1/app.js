import express from "express";
import router from "./routes/router.trainer.js";

const app = express();
app.use(express.json());
const PORT = 3000;
app.use("/api/trainer", router);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
