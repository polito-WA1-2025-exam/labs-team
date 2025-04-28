import express from 'express';
import morgan from 'morgan';
import establishmentsRoutes from './routes/establishmentsRoutes.mjs';
import bagsRoutes from './routes/bagsRoutes.mjs';
import foodItemsRoutes from './routes/foodItemsRoutes.mjs';
import shoppingCartRoutes from './routes/shoppingCartRoutes.mjs';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/establishments', establishmentsRoutes);
app.use('/bags', bagsRoutes);
app.use('/food_items', foodItemsRoutes);
app.use('/shopping_cart', shoppingCartRoutes);

// Server start
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
