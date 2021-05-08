/** NODE_MODULES */
import express, {json, urlencoded} from 'express';
import cors from 'cors';

const port = '8000';
/** APP */
const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));
app.use(express.static('front'));

/** START SERVER */
const server = app.listen(port, function () {
  console.log('Express app listening at http://localhost:' + port);
});
