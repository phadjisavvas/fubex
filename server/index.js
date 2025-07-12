const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 4424;

app.use(cors({ origin: 'https://fubex.online' }));
app.use(express.json());

const PRICES = {
  Pro: 'price_1Rk1zhIjKZMEtZlcqibWTQO9' // ✅ real Stripe price ID here
};

app.post('/create-checkout-session', async (req, res) => {
  const { plan } = req.body;

  if (!PRICES[plan]) {
    return res.status(400).json({ error: 'Invalid plan selected' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: PRICES[plan], quantity: 1 }],
      mode: 'subscription',
      success_url: 'https://fubex.online/success',
      cancel_url: 'https://fubex.online/cancel',
    });

    console.log('Created Stripe session:', session);
    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
