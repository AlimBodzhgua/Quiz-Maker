import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/ApiError';

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
	console.log('Error Handler', err);

	if (err instanceof ApiError) {
		const { message, errors } = err;
		res.status(err.status).json({ message, errors });
	}

	res.status(500).json({ message: 'An unexpected error occured' });
};

export default errorHandler;
