import Book from "../models/book.js";

async function booksRouter(fastify, _opts) {
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      const book = await Book.findByPk(id);
      reply.send(book);
    } catch (err) {
      console.error("Error occurred:", err.message);
      reply.send(err);
    }
  });

  fastify.get("/", async (request, reply) => {
    try {
      const books = await Book.findAll();
      reply.send(books);
    } catch (err) {
      console.error("Error occurred:", err.message);
      reply.send(err);
    }
  })

  fastify.post("/", async (request, reply) => {
    const { title, author } = request.body;
    try {
      const book = await Book.findOne({ where: { title }});
      if (book) {
        // If book exists, increase the count
        book.count += 1
        book.save();
      } else {
        // If book not exit
        const newBook = await Book.create({ title, author, count: 1 });
        reply.send(newBook);
      }
    } catch (err) {
      console.error("Error occurred:", err.message);
      reply.send(e);
    }
  });

  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params;
    const { title, author } = request.body;
    console.log(id, title, author)
    try {
      const book  = await Book.update({ title, author }, {
        where: { id },
      });
      reply.send(book);
    } catch (err) {
      console.error("Error occurred:", err.message);
      reply.send(err);
    }
  });

  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      const book = await Book.destroy({
        where: { id }
      });
      reply.send(book);
    } catch (err) {
      console.error("Error occurred:", err.message);
      reply.send(err);
    }
  });

}

export default booksRouter
