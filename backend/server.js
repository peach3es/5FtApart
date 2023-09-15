const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Add your Express middleware and routes here
  server.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Express!' });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(5000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:5000');
  });
});
