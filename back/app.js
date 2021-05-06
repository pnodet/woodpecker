/** NODE_MODULES */
import express, { json, urlencoded } from 'express';
import cors from 'cors';

/** APP */
const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));

/** ROUTES */
import puzzler from './routes/puzzler.js';
app.use('/puzzler', puzzler);
import lichess from './routes/lichess.js';
app.use('/lichess', lichess);

/** START SERVER */
app.listen(3000, () => console.log('Server running on port 3000!'));
