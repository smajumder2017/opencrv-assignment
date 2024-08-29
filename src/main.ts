import express from 'express';
import config from '@/config';
import cors from 'cors';
import { json } from 'body-parser';

import { responseHandler } from './utils/handlers';
import { v1Routes } from './routes';

const app = express();

app.use(json());
app.use(cors());
app.use(responseHandler);

app.use('/api', v1Routes);

app.listen(config.SERVER.PORT, () => {
  console.log(`Server satrted @ ${config.SERVER.PORT}`);
});
