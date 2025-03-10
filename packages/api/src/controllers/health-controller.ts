import { Request, Response } from 'express';

import prisma from '@/prisma';

export const getLiveness = (req: Request, res: Response) => {
	res.status(200).json({
		status: 'OK',
		message: 'API is alive👌',
	});

	return;
};

export const getReadiness = async (req: Request, res: Response) => {
	const isDBConnected = await prisma.$queryRaw`SELECT 1`;

	try {
		if (isDBConnected) {
			res.status(200).json({
				status: 'OK',
				message: 'API is ready 👍',
				database: 'Connected',
				app: req.app.get('app name'),
				version: req.app.get('api version'),
			});
		}
	} catch (error) {
		res.status(503).json({
			status: 'ERROR',
			message: 'Database not ready',
			database: 'Disconnected',
			error: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};
