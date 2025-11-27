import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { DatabaseService } from './services/DatabaseService';
import errorHandler from './middleware/errorHandler';
import router from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

DatabaseService.connectDB();

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
});

