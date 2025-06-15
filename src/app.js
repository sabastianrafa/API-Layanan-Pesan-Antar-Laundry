import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/api-specs.json" with { type: "json" };
import authRoutes from './routes/authRoutes.js';
import layananRoutes from './routes/layananRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import pesananRoutes from './routes/pesananRoutes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/layanan', layananRoutes);
app.use('/api/pesanan', pesananRoutes);

// Error handler
app.use(errorHandler);

export default app;