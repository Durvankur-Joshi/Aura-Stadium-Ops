import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import negotiateRoute from './routes/negotiate';
import campaignRoute from './routes/campaign';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/negotiate', negotiateRoute);
app.use('/api/deployCampaign', campaignRoute);

// Health Check for Render
app.get('/', (req, res) => {
  res.send('Aura Backend API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
