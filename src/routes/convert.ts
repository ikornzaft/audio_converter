import express from 'express';
import { convertController } from '../controllers/convertController';
import { uploadMiddleware } from '../middleware/uploadMiddleware';

const router = express.Router();

router.post('/', uploadMiddleware.single('audio'), convertController);

export default router;
