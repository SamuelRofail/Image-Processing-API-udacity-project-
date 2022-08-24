import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/' , (req ,res) => {
    res.send(`
        <h1> Welcome to the main route </h1>
        Visit the image route now <a href = "/api/images"> From Here</a>
    `);
});

routes.use('/images' , images);




export default routes;