import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UsuarioRouter from "./routes/Admin/usuarios.routes.js";
import ValidarRouter from "./routes/auth/validate.routes.js";
import RolesRouter from "./routes/Admin/roles.routes.js";
import TipoCarreraRouter from "./routes/Admin/tipo_carrera.routes.js";
import CarreraRouter from "./routes/Admin/carreras.routes.js";
import PensumRouter from "./routes/Admin/pensum.routes.js";
import AsignaturaRouter from "./routes/Admin/asignaturas.routes.js"
import CategoriaRouter from "./routes/Admin/categorias.routes.js"
import RecursoRouter from "./routes/Admin/recursos.routes.js"
import ReporteRouter from "./routes/Admin/reportes.routes.js"
import PQRSRouter from "./routes/Admin/pqrs.routes.js"
import NotifyRouter from "./routes/Admin/notificaciones.routes.js"
import LogRouter from "./routes/Admin/log_acceso.routes.js"
import DashboardRouter from "./routes/Admin/dashboard.routes.js"
import DerechosAutorRouter from "./routes/Admin/derechos_autor.routes.js"
import FavoritosRouter from "./routes/Usuarios/favoritos.routes.js"
import recursoLikesRoutes from './routes/Usuarios/recursoLikes.routes.js';
import comentariosRoutes from './routes/Usuarios/comentarios.routes.js'

// Agregar esta línea donde configuras tus otras rutas
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
app.use("/api/asignaturas",AsignaturaRouter)
app.use("/api/pensum",PensumRouter);
app.use("/api/categorias",CategoriaRouter);
app.use("/api/recursos",RecursoRouter);
app.use("/api/reportes",ReporteRouter);
app.use("/api/pqrs",PQRSRouter);
app.use("/api/notificaciones",NotifyRouter);
app.use("/api/logs",LogRouter);
app.use("/api/dashboard",DashboardRouter);
app.use("/api/derechos-autor",DerechosAutorRouter);
app.use("/api/favoritos",FavoritosRouter);
app.use('/api/comentarios', comentariosRoutes);

app.use('/api/recurso-likes', recursoLikesRoutes);


export default app;
