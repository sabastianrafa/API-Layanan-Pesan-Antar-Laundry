import express from 'express';
import authRoutes from './routes/authRoutes.js';
import {errorHandler} from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handler
app.use(errorHandler);

export default app;