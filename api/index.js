import express from 'express';
import bodyParser from 'body-parser';

//routes
import userRoutes from './routes/user.route';

const app = express();
const PORT = 9001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.send('The API is working');
});

// handle routes
app.use('/api/v1/users', userRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
    
});