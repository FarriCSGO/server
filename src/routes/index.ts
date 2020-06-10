import express from 'express';

// Import route handlers
import homeRouter from './home.route';

const router = express.Router();

router.use('/', homeRouter);   

export default router;