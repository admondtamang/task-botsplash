import server from './server';
process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});
const port = 8000;
await server.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
// ? Graceful shutdown
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () =>
    server.close().then((err) => {
      console.log(`close application on ${signal}`);
      process.exit(err ? 1 : 0);
    }),
  );
}
//# sourceMappingURL=index.js.map
