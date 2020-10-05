import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json()); // faz com que o express entenda requisições em formato JSON

app.use(routes);

app.get('/', (request, response) => response.json({ message: 'API Rodando!' }));

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
