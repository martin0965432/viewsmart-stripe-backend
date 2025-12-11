// Stripe PaymentIntent API for ViewSmart
// Deploy to Vercel and set STRIPE_SECRET_KEY in environment variables

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { amount, currency = 'mxn', customerEmail, customerName, description } = req.body;

        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        // Create PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount), // Amount in centavos
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                customerEmail: customerEmail || '',
                customerName: customerName || '',
                description: description || 'ViewSmart Purchase'
            },
            receipt_email: customerEmail || undefined
        });

        console.log('PaymentIntent created:', paymentIntent.id);

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });

    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({
            error: error.message || 'Error creating payment intent'
        });
    }
};
