import express from 'express';
import routes from './routes/index';
import fileHandler from './util/fileHandler';

const app = express();
const port = 3000;

app.get('/' ,(req ,res) => {
    res.redirect('/api');
});
app.use('/api'  , routes );
app.listen(port, async () : Promise <void>=> {
    await fileHandler.createImagePath();
    console.log(`server started at http://localhost:${port}`);
});
export default app;

