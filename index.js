const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('M-Pesa Callback Server is running.');
});

app.post('/mpesa-callback', (req, res) => {
  console.log('M-Pesa Callback Received:', req.body);

  res.status(200).json({
    ResultCode: 0,
    ResultDesc: 'Callback received successfully'
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
