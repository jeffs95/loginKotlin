const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use((req, res, next) => {
    req.pool = pool;
    next();
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
