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

## API

### POST /api/create-payment-intent

**Request:**
```json
{
  "amount": 249900,
  "currency": "mxn",
  "customerEmail": "cliente@email.com",
  "customerName": "Juan Pérez",
  "description": "Bastón Inteligente"
}
```

**Response:**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

## Tarjetas de Prueba
- `4242 4242 4242 4242` → Éxito
- `4000 0000 0000 0002` → Rechazada
