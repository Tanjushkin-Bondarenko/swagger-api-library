import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
},
{
    timestemps: true
  })

export const Book = mongoose.model("Book",bookSchema);