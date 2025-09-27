async function booksRouter(fastify, _opts) {
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      const book = { id };
      reply.send(book);
    } catch (err) {
      console.error("Error occurred:", e.message);
      reply.send(e);
    }
  });
}

export default booksRouter
