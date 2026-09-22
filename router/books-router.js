import express from "express";
import { nanoid } from "nanoid";
import { Book } from "../models/books.js";

const router = express.Router();
const idLength = 8;

/**
 * @swagger
 * components: 
 *   schemas:
 *     Book:
 *      type: object
 *      required:
 *        - title
 *        - author
 *        - year     
 *      properties:
 *        id: 
 *          type: string
 *          description: The auto-generated id of the book
 *        title: 
 *          type: string
 *          description: The book title
 *        author:
 *          type: string
 *          description: The book's author
 *        year:
 *          type: number
 *          description:  The year of the book's publication
 *      example:
 *         id: '1bvFd57R'
 *         title: 'The new training Book'
 *         author: 'John Dou'
 *  
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The book managing API
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all books
 *     tags: [Books] 
 *     responses: 
 *       200:
 *         description: The books list
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Book'
 * 
 */

router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    res.status(200).send(books);
  } catch (error) {
     console.error(error);
     res.status(500).send(error);
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

export default router;