const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 4424;

app.use(cors({
  origin: 'https://fubex.online',
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

const PRICES = {
  Pro: 'price_1Rk1zhIjKZMEtZlcqibWTQO9', // ✅ Your real Stripe price ID
};

app.post('/create-checkout-session', async (req, res) => {
  const { plan } = req.body;

  if (!PRICES[plan]) {
    return res.status(400).json({ error: 'Invalid plan selected' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: PRICES[plan],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'https://fubex.online/success',
      cancel_url: 'https://fubex.online/cancel',
    });

    console.log('✅ Stripe session created:', session.id);
    res.json({ id: session.id });
  } catch (err) {
    console.error('❌ Stripe session error:', err.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
