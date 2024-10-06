import express, { Request, Response } from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
//app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const DATABASE = process.env.DATABASE!.replace(
	'PASSWORD',
	process.env.DB_PASSWORD!
);

mongoose
	.connect(DATABASE)
	.then(() => console.log('DB Connection successful'))
	.catch(() => console.log('DB Connection failed'))



app.get('/', (req: Request, res: Response) => {
	res.send('Hello world');
});


app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
});

