import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UsuarioRouter from "./routes/Admin/users.routes.js";
import ValidarRouter from "./routes/auth/validate.routes.js";
import RolesRouter from "./routes/Admin/roles.routes.js";
import TipoCarreraRouter from "./routes/Admin/careers-types.routes.js";
import CarreraRouter from "./routes/Admin/careers.routes.js";
const app = express();

app.set("PORT", 4000);

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/usuarios", UsuarioRouter);
app.use("/api/validar-codigo",ValidarRouter)
app.use("/api/roles",RolesRouter)
app.use("/api/tipo_carrera",TipoCarreraRouter)
app.use("/api/carreras",CarreraRouter)


export default app;
