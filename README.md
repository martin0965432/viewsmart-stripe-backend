# ViewSmart Stripe Backend

Backend API para procesar pagos con Stripe en la app ViewSmart.

## Despliegue en Vercel

### 1. Subir a GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/viewsmart-stripe-backend.git
git push -u origin main
```

### 2. Conectar con Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Clic en "Add New Project"
3. Importa tu repositorio de GitHub
4. En "Environment Variables" agrega:
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** `sk_test_...` (tu secret key)
5. Clic en "Deploy"

### 3. Obtener URL
Después del deploy, Vercel te dará una URL como:
```
https://viewsmart-stripe-backend.vercel.app
```

Tu endpoint será:
```
https://viewsmart-stripe-backend.vercel.app/api/create-payment-intent
```

## API Endpoints

### 1. Create Payment Intent
**POST** `/api/create-payment-intent`

Creates a PaymentIntent for custom payment flows.

**Request:**
```json
{
  "amount": 50000,
  "currency": "mxn",
  "customerEmail": "cliente@example.com",
  "customerName": "Juan Pérez",
  "description": "Cámara HD Pro"
}
```

**Response:**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### 2. Create Checkout Session (Recommended)
**POST** `/api/create-checkout-session`

Creates a Stripe Checkout Session for hosted payment page.

**Request:**
```json
{
  "amount": 50000,
  "currency": "mxn",
  "customerEmail": "cliente@example.com",
  "customerName": "Juan Pérez",
  "description": "Cámara HD Pro"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_xxx",
  "url": "https://checkout.stripe.com/c/pay/cs_test_xxx"
}
```

## Tarjetas de Prueba
- `4242 4242 4242 4242` → Éxito
- `4000 0000 0000 0002` → Rechazada
