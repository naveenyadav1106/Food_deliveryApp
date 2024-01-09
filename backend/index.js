import express from 'express';
import cors from 'cors';
import connectMongo from './db.js';
import router from './Routes/CreateUser.js';
import displayDataRouter from './Routes/DisplayData.js'
import OrderDataRouter from './Routes/OrderData.js';

const app = express();
const port = 5000;

const startServer = async () => {
    try {
        await connectMongo();
        console.log("MongoDB connected!");

        // Enable CORS globally
        app.use(cors({
            origin: 'http://localhost:3000', // Allow requests from this origin
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true, // Allow cookies to be sent with the requests
        }));

        app.get('/', (req, res) => {
            res.send('Hello World!-------');
        });

        app.use(express.json());

        app.use('/api/', router);

        app.use('/api/', displayDataRouter);

        app.use('/api/', OrderDataRouter);

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

startServer();
