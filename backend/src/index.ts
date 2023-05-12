import express from 'express';
import { rootHandler, helloHandler } from './handlers';

const app = express();
const port = process.env.PORT || '3000';

app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
