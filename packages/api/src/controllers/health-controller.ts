import { Request, Response } from 'express';

export const getLiveness = (req: Request, res: Response) => {
	res.status(200).json({
		status: 'OK',
		message: 'API is alive👌',
	});

	return;
};

export const getReadiness = (req: Request, res: Response) => {
	const isDBConnected = false;

	if (!isDBConnected) {
		res.status(503).json({
			status: 'ERROR',
			message: 'Database not ready',
			database: 'Disconnected',
		});

		return;
	}

	res.status(200).json({
		status: 'OK',
		message: 'API is ready 👍',
		database: 'Connected',
		app: req.app.get('app name'),
		version: req.app.get('api version'),
	});

	return;
};
