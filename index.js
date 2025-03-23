import express from 'express';
import cors from 'cors';
import { config } from './config.js';
// Importar las rutas
import librosRouter from './routers/librorouters.js';

const app = express();

// Middleware para parsear JSON y datos codificados en URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3000;
//Usar las rutas
app.use('/libros', librosRouter); // PRODUCTOS

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});