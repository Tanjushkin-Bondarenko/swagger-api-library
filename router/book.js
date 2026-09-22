import express from "express";
import { nanoid } from "nanoid";

const router = express.Router();
const idLength = 8;

router.get('/', async (req, res) => {
  const books = await req.app.db.get('books');
  res.send(books);
})

router.get('/:id', async (req, res) => {
  const book = await req.app.db.get('books').find({ id: req.params.id }).value();
  if (!book) {
    return res.sendStatus(404).send({ error: 'Book not found' });
  }
  res.send(book);
});

router.post('/', async (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).send({ error: "Missing requred fields: title, author, year" });
  }
  const id = nanoid(idLength);
  const newBook = { id, title, author, year };
  await req.app.db.get('books').post(newBook);
  res.status(201).send(newBook);;
});