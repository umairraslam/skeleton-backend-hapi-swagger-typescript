import * as Mongoose from "mongoose";
const mongoose = require('mongoose'), Schema = mongoose.Schema;

export interface Comment extends Mongoose.Document {
  text: string;
  createdAt: Date;
  updateAt: Date;
}

export const CommentSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    author : { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

export const CommentModel = Mongoose.model<Comment>("Comment", CommentSchema);
