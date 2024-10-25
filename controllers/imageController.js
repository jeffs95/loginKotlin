const addImage = async (req, res) => {
    const { user_id, image_url } = req.body;

    try {
        const result = await req.pool.query(
            'INSERT INTO user_images (user_id, image_url) VALUES ($1, $2) RETURNING id',
            [user_id, image_url]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.log("[ERROR] >>", error);
        res.status(500).json({ error: 'Error al agregar la imagen' });
    }
};

const getUserImages = async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await req.pool.query('SELECT * FROM user_images WHERE user_id = $1', [user_id]);
        res.json(result.rows);
    } catch (error) {
        console.log("[ERROR] >>", error);
        res.status(500).json({ error: 'Error al obtener las imágenes del usuario' });
    }
};

module.exports = { addImage, getUserImages };
