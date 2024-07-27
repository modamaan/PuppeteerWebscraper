import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import  {evaluateWebsite}  from './index.js'; // Import the function from your module

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

app.post('/api/evaluate', async (req, res) => {
  const { url } = req.body;
  try {
    const result = await evaluateWebsite(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to evaluate website.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
