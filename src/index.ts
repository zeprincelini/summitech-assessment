import express from "express";
import routes from "./modules";
import { handleError } from "./modules/utils/middlewares";

const { PORT, DB_NAME } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.disable("x-powered-by");

app.use("/v1", routes);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and connected to ${DB_NAME}`);
});
