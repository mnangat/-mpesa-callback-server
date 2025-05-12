const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('M-Pesa Callback Server is running.');
});


  console.log('M-Pesa Callback Received:', req.body);

  res.status(200).json({
    ResultCode: 0,
    ResultDesc: 'Callback received successfully'
  });
  app.post('/mpesa-callback', (req, res) => {
    const callback = req.body?.Body?.stkCallback;
  
    if (!callback) {
      console.log('Invalid callback data received:', JSON.stringify(req.body, null, 2));
      return res.status(400).json({ ResultCode: 1, ResultDesc: 'Invalid callback data' });
    }
  
    const resultCode = callback.ResultCode;
    const resultDesc = callback.ResultDesc;
  
    if (resultCode === 0) {
      console.log('✅ Payment Success!');
      console.log('Details:', JSON.stringify(callback, null, 2));
    } else {
      console.log('❌ Payment Failed or Cancelled.');
      console.log('Details:', JSON.stringify(callback, null, 2));
    }
  
    // Send success response back to M-Pesa
    res.status(200).json({
      ResultCode: 0,
      ResultDesc: 'Callback received successfully'
    });
  });
  

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
