import { Express } from 'express';
import { rootHandler, helloHandler } from './handlers';


module.exports = function (app: Express) {
	
    app.get('/', rootHandler);
    app.get('/hello/:name', helloHandler);

}