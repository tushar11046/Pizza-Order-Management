import express from 'express';
import { PORT, DB_CONN } from './config';
import { apiRouter, adminRouter } from './routes';
import { auth, admin, errorHandler } from './middlewares/'
import mongoose from 'mongoose';

const app = express();
app.use(express.json())

mongoose.connect(DB_CONN, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', ()=>{
    console.log('DB connection successful');
})

app.use('/api', apiRouter);
app.use('/admin', [auth, admin], adminRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})