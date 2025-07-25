// server.js
import dotenv from 'dotenv';
import app from './app.js';
import { sequelize } from './config/db.js';

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 5000;
 
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established.');

    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate (not recommended for prod)
    console.log('✅ All models were synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    process.exit(1);
  }
};

startServer();
