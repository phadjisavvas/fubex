import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 4424;

// ✅ CORS configuration
app.use(cors({
  origin: 'https://fubex.online', // front-end domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200,
}));

app.use(express.json());

// ✅ Stripe Price ID from Stripe dashboard
const PRICES = {
  Pro: 'price_1Rk1zhIjKZMEtZlcqibWTQO9', // replace with your actual price ID
};

app.post('/create-checkout-session', async (req, res) => {
  const { plan } = req.body;

  if (!PRICES[plan]) {
    return res.status(400).json({ error: 'Invalid plan selected' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
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

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe session error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
