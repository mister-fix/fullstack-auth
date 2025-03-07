import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import mainRouter from '@/routes/main-router';

const app: Express = express();

// Application settings
app.set('app name', 'Full-stack Authentication API'); // Setting the app name
app.set('api version', '0.1.0'); // Setting the API version
app.set('env', process.env.NODE_ENV || 'development'); // Set environment
app.set('trust proxy', 1); // Trust the first proxy
app.set('x-powered-by', false); // Disable X-Powered-By header
app.set('etag', 'strong'); // Use strong ETags for caching
app.set('json spaces', 2); // Set JSON response formatting
app.set('case sensitive routing', false); // Disable case-sensitive routing
app.set('strict routing', false); // Enable strict routing
app.set('query parsers', 'simple'); // Parse queries as key-value pairs

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 10 requests per window
	standardHeaders: 'draft-8',
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.get('/', (req: Request, res: Response) => {
	res.redirect('/api');
});

app.use('/api', mainRouter);

export default app;
