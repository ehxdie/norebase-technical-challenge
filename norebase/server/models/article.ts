import mongoose, { Document, Schema } from 'mongoose';

interface IArticle extends Document {
    title: string;
    content: string;
    likes: number;
}

const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
});

export default mongoose.model<IArticle>('Article', ArticleSchema);