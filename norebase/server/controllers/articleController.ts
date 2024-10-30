import { Request, Response } from 'express';
import Article from '../models/article';

export const getLikes = async (req: Request, res: Response): Promise<void> => {
    try {
        const article = await Article.findById(req.params.articleId);
        if (article) {
            res.json({ likes: article.likes });
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching likes' });
    }
};

export const postLike = async (req: Request, res: Response): Promise<void> => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.articleId,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (article) {
            res.json({ likes: article.likes });
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating like' });
    }
};