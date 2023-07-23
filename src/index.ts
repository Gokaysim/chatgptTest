import express, { Express } from 'express';
import dotenv from 'dotenv';
import { createUserInputController } from './controllers';
import { logger } from './utils';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json({ limit: '1MB' }));

// no router or nested structure is defined for simplicity
app.post('/userInputs', createUserInputController);
// eslint-disable-next-line
app.use((err: any, req: express.Request, res: express.Response) => {
  res
    .status(err.status || 500)
    .json({ message: err.message, data: err.data })
    .end();
});

app.listen(port, () => {
  logger.info(`The server has been started at port of ${port}`);
});
