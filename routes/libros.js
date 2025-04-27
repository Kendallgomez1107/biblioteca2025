const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los libros
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM libros');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
});

// Crear un nuevo libro
router.post('/', async (req, res) => {
    const { titulo, autor_id, categoria_id, año_publicacion, estado, isbn, ubicacion_id, editorial_id } = req.body;
    try {
        await db.query(
            'INSERT INTO libros (titulo, autor_id, categoria_id, año_publicacion, estado, isbn, ubicacion_id, editorial_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [titulo, autor_id, categoria_id, año_publicacion, estado, isbn, ubicacion_id, editorial_id]
        );
        res.status(201).json({ message: 'Libro creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el libro' });
    }
});

// Obtener un libro por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM libros WHERE id_libro = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar el libro' });
    }
});

// Actualizar un libro
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, autor_id, categoria_id, año_publicacion, estado, isbn, ubicacion_id, editorial_id } = req.body;
    try {
        await db.query(
            'UPDATE libros SET titulo=$1, autor_id=$2, categoria_id=$3, año_publicacion=$4, estado=$5, isbn=$6, ubicacion_id=$7, editorial_id=$8 WHERE id_libro=$9',
            [titulo, autor_id, categoria_id, año_publicacion, estado, isbn, ubicacion_id, editorial_id, id]
        );
        res.json({ message: 'Libro actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
});

// Eliminar un libro
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM libros WHERE id_libro = $1', [id]);
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el libro' });
    }
});

module.exports = router;
