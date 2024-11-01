import { Request, Response } from 'express';
import { getLikes, postLike } from '../controllers/articleController';
import Article from '../models/article';

jest.mock('../models/article'); // Mock the Article model

const ARTICLE_NOT_FOUND_MSG = { message: 'Article not found' };
const ERROR_FETCHING_LIKES_MSG = { message: 'Error fetching likes' };
const ERROR_UPDATING_LIKE_MSG = { message: 'Error updating like' };

describe('Article Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    const statusMock = jest.fn().mockReturnThis();
    const jsonMock = jest.fn();

    beforeAll(() => {
        res = {
            status: statusMock,
            json: jsonMock,
        };
    });

    beforeEach(() => {
        req = { params: { articleId: '123' } };
        jest.clearAllMocks();
    });

    const mockResolvedValue = (mockReturnValue: any) =>
        (Article.findById as jest.Mock).mockResolvedValue(mockReturnValue);

    const mockRejectedValue = (error: Error) =>
        (Article.findById as jest.Mock).mockRejectedValue(error);

    describe('getLikes', () => {
        it('should return likes when article is found', async () => {
            mockResolvedValue({ likes: 10 });

            await getLikes(req as Request, res as Response);

            expect(Article.findById).toHaveBeenCalledWith('123');
            expect(jsonMock).toHaveBeenCalledWith({ likes: 10 });
        });

        it('should return 404 if article is not found', async () => {
            mockResolvedValue(null);

            await getLikes(req as Request, res as Response);

            expect(Article.findById).toHaveBeenCalledWith('123');
            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith(ARTICLE_NOT_FOUND_MSG);
        });

        it('should return 500 on database error', async () => {
            mockRejectedValue(new Error('Database error'));

            await getLikes(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith(ERROR_FETCHING_LIKES_MSG);
        });
    });

    describe('postLike', () => {
        const mockFindByIdAndUpdate = (mockReturnValue: any) =>
            (Article.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockReturnValue);

        it('should increment likes and return updated likes when article is found', async () => {
            mockFindByIdAndUpdate({ likes: 11 });

            await postLike(req as Request, res as Response);

            expect(Article.findByIdAndUpdate).toHaveBeenCalledWith('123', { $inc: { likes: 1 } }, { new: true });
            expect(jsonMock).toHaveBeenCalledWith({ likes: 11 });
        });

        it('should return 404 if article is not found', async () => {
            mockFindByIdAndUpdate(null);

            await postLike(req as Request, res as Response);

            expect(Article.findByIdAndUpdate).toHaveBeenCalledWith('123', { $inc: { likes: 1 } }, { new: true });
            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith(ARTICLE_NOT_FOUND_MSG);
        });

        it('should return 500 on database error', async () => {
            (Article.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Database error'));

            await postLike(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith(ERROR_UPDATING_LIKE_MSG);
        });
    });
});
