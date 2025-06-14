import app from './app.js';
import { config } from 'dotenv';

config(); // Load .env variables

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});