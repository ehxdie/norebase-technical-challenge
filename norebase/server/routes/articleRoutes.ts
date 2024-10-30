import express from 'express';
import { getLikes, postLike } from '../controllers/articleController';

const router = express.Router();

router.get('/:articleId/likes', getLikes);
router.post('/:articleId/like', postLike);

export default router;