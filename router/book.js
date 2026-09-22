import express from "express";
import { nanoid } from "nanoid";

const router = express.Router();
const idLength = 8;

router.get('/', async (req, res) => {
  try {
    const books = await req.app.db.get('books');
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const book = await req.app.db.get('books').find({ id: req.params.id }).value();
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const idBook = nanoid(idLength);
    const newBook = { id: idBook, ...req.body };
    await req.app.db.get('books').push(newBook).write();
    res.status(201).send(newBook);
  } catch (error) {
    res.status(500).send(error);   
}
});

router.put('/:id', async(req, res)=>{
  try {
    await req.app.db.get('books').find({ id: req.params.id }).assign(req.body).write();
    const updatedBook = await req.app.db.get('books').find({id: req.params.id}).value();
    res.status(200).send(updatedBook);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.delete('/:id', async (req, res) => {
  try{
    await req.app.db.get('books').remove({ id: req.params.id }).write()
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
})