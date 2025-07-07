const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 4242;

app.use(cors({
  origin: 'https://fubex.online',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.options('*', cors()); // enable preflight across-the-board

app.use(express.json());

const PRICES = {
  Pro: 'your_stripe_price_id_here', // Replace with your real Stripe price ID
};

app.post('/create-checkout-session', async (req, res) => {
  const { plan } = req.body;
  if (!PRICES[plan]) return res.status(400).json({ error: 'Invalid plan selected' });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: PRICES[plan], quantity: 1 }],
      mode: 'subscription',
      success_url: 'https://fubex.online/success',
      cancel_url: 'https://fubex.online/cancel',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
