const https = require('https');
const payload = JSON.stringify({
  amount: 200,
  currency: "INR",
  receipt: "test_receipt",
  notes: {
    name: "Test",
    email: "test@example.com",
    phone: "9999999999"
  }
});
const options = {
  hostname: 'api.razorpay.com',
  path: '/v1/orders',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from('rzp_live_TaI6abvX9bmRCZ:NUbgJRfO330uNAW1ei0CO1O4').toString('base64'),
    'Content-Length': payload.length
  }
};
const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', data));
});
req.write(payload);
req.end();
