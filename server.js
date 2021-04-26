import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';
import usersRoute from './app/routes/usersRoute';
import seedRoute from './app/routes/seedRoute';
import productsRoute from "./app/routes/productsRoute";
import orderRoute from "./app/routes/orderRoute";

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors);
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', usersRoute);
app.use('/api/v1', seedRoute);
app.use('/api/v1/products', productsRoute);
app.use('/api/v1/order', orderRoute);


// app.listen(env.port).on('listening', () => {
app.listen(env.port, "0.0.0.0").on('listening', () => {
    console.log(`live on port ${env.port}`);
});


export default app;
