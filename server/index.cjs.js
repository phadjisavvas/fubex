import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express(); // ✅ THIS was missing
const PORT = process.env.PORT || 4424;

const corsOptions = {
  origin: 'https://fubex.online', // Your frontend URL
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

const PRICES = {
  Pro: 'price_XXXXXXXXXXXXXX', // Replace with your actual Stripe price ID
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
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
