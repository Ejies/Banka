import express from 'express';
import bodyParser from 'body-parser';

// routes
import allRoutes from './routes/routes';

const app = express();
const PORT = 9001;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send({ message: 'The API is working' }));

// handle routes
app.use('/api/v1/', allRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
