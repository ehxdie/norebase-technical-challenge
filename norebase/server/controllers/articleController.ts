import { Request, Response } from 'express';
import Article from '../models/article';

const ARTICLE_NOT_FOUND_MSG = { message: 'Article not found' };
const ERROR_FETCHING_LIKES_MSG = { message: 'Error fetching likes' };
const ERROR_UPDATING_LIKE_MSG = { message: 'Error updating like' };

export const getLikes = async (req: Request, res: Response): Promise<void> => {
    try {
        const article = await Article.findById(req.params.articleId);
        if (!article) {
            res.status(404).json(ARTICLE_NOT_FOUND_MSG);
            return;
        }
        res.json({ likes: article.likes });
    } catch (error) {
        console.error("Error fetching likes:", error);
        res.status(500).json(ERROR_FETCHING_LIKES_MSG);
    }
};

export const postLike = async (req: Request, res: Response): Promise<void> => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.articleId,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!article) {
            res.status(404).json(ARTICLE_NOT_FOUND_MSG);
            return;
        }
        res.json({ likes: article.likes });
    } catch (error) {
        console.error("Error updating like:", error);
        res.status(500).json(ERROR_UPDATING_LIKE_MSG);
    }
};
