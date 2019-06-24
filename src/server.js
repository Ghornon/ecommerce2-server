import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

// Server
const port = process.env.PORT || 8080;

/* eslint no-console: 0 */
app.listen(port, () => console.log(`[Server] Test app listening on port ${port}!`));
