import express from 'express';
import morgan from 'morgan';
import ViteExpress from 'vite-express';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

import handlerFunctions from './controller.js';

const { getUsers, getGroups, getEvents, getWinners } = handlerFunctions

app.get('/api/users', getUsers)
app.get('/api/groups', getGroups)
app.get('/api/events', getEvents)
app.get('/api/winners', getWinners)

ViteExpress.listen(app, 9999, () => console.log(`Server running on http://localhost:9999`));