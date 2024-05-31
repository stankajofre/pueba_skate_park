import { pool } from '../database/connection.database.js';

const getAll = async () => {
    const query = {
        text: `
        SELECT * FROM skaters 
        ORDER BY id
        `,
        values: []
    }

    const { rows } = await pool.query(query);
    return rows;
}

const findOneByEmail = async (email) => {
    const query = {
        text: `
        SELECT * FROM skaters 
        WHERE email = $1
        `,
        values: [email]
    }

    const { rows } = await pool.query(query);
    return rows[0];
}

const create = async ({ email, nombre, password, anos_experiencia, especialidad, foto, estado = false }) => {
    const query = {
        text: `
        INSERT INTO skaters(email, nombre, password, anos_experiencia, especialidad, foto, estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        values: [email, nombre, password, anos_experiencia, especialidad, foto, estado]
    }

    const { rows } = await pool.query(query);
    return rows[0];
}

const remove = async (email) => {
    const query = {
        text: `
        DELETE FROM skaters 
        WHERE email = $1 
        RETURNING *;
        `,
        values: [email]
    }

    const { rows } = await pool.query(query);
    return rows[0];
}

const update = async ({ email, nombre, password, anos_experiencia, especialidad }) => {
    const query = {
        text: `
        UPDATE skaters SET 
        nombre = $1, 
        password = $2, 
        anos_experiencia = $3, 
        especialidad = $4 
        WHERE email = $5 
        RETURNING *;
        `,
        values: [nombre, password, anos_experiencia, especialidad, email]
    };

    const { rows } = await pool.query(query);
    return rows[0];
}

const updateState = async (email, estado) => {
    const query = {
        text: `
        UPDATE skaters SET 
        estado = $2 
        WHERE email = $1 
        RETURNING *;
        `,
        values: [email, estado]
    }

    const { rows } = await pool.query(query);
    return rows[0];
}


export const SkaterModel = {
    getAll,
    findOneByEmail,
    create,
    update,
    updateState,
    remove
}