const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { amount, currency, customerEmail, customerName, description } = req.body;

        // Validate required fields
        if (!amount || !currency || !customerEmail) {
            return res.status(400).json({
                error: 'Missing required fields: amount, currency, customerEmail'
            });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: description || 'ViewSmart Purchase',
                            description: `Compra para ${customerName || customerEmail}`,
                        },
                        unit_amount: amount, // Amount in centavos
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer_email: customerEmail,
            success_url: 'viewsmart://payment/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'viewsmart://payment/cancel',
            metadata: {
                customerName: customerName || '',
                description: description || '',
            },
        });

        res.status(200).json({
            sessionId: session.id,
            url: session.url,
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({
            error: 'Failed to create checkout session',
            message: error.message
        });
    }
};
