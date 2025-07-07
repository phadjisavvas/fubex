const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { plan } = req.body;

  const PRICES = {
    Pro: 'price_XXXXXXX', // Replace with your actual Stripe Price ID
  };

  if (!PRICES[plan]) {
    return res.status(400).json({ error: 'Invalid plan' });
  }

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
    res.status(500).json({ error: err.message });
  }
};
