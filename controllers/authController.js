const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await req.pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
            [username, hashedPassword]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.log("[ERROR] >>", error);
        res.status(500).json({ error: 'Error creando usuario' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await req.pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.log("[ERROR] >>", error);
        res.status(500).json({ error: 'Error en el inicio de sesión' });
    }
};

module.exports = { register, login };
