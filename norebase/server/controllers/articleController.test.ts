import { Request, Response } from 'express';
import { getLikes, postLike } from '../controllers/articleController';
import Article from '../models/article';

jest.mock('../models/article'); // Mock the Article model

describe('Article Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        req = { params: { articleId: '123' } };
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();
        res = {
            status: statusMock,
            json: jsonMock,
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getLikes', () => {
        it('should return likes when article is found', async () => {
            const mockArticle = { likes: 10 };
            (Article.findById as jest.Mock).mockResolvedValue(mockArticle);

            await getLikes(req as Request, res as Response);

            expect(Article.findById).toHaveBeenCalledWith('123');
            expect(jsonMock).toHaveBeenCalledWith({ likes: 10 });
        });

        it('should return 404 if article is not found', async () => {
            (Article.findById as jest.Mock).mockResolvedValue(null);

            await getLikes(req as Request, res as Response);

            expect(Article.findById).toHaveBeenCalledWith('123');
            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Article not found' });
        });

        it('should return 500 on database error', async () => {
            (Article.findById as jest.Mock).mockRejectedValue(new Error('Database error'));

            await getLikes(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Error fetching likes' });
        });
    });

    describe('postLike', () => {
        it('should increment likes and return updated likes when article is found', async () => {
            const mockUpdatedArticle = { likes: 11 };
            (Article.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedArticle);

            await postLike(req as Request, res as Response);

            expect(Article.findByIdAndUpdate).toHaveBeenCalledWith('123', { $inc: { likes: 1 } }, { new: true });
            expect(jsonMock).toHaveBeenCalledWith({ likes: 11 });
        });

        it('should return 404 if article is not found', async () => {
            (Article.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

            await postLike(req as Request, res as Response);

            expect(Article.findByIdAndUpdate).toHaveBeenCalledWith('123', { $inc: { likes: 1 } }, { new: true });
            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Article not found' });
        });

        it('should return 500 on database error', async () => {
            (Article.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Database error'));

            await postLike(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Error updating like' });
        });
    });
});
