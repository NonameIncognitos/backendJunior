const { QueryError } = require('sequelize');
const db = require('../db')

class postManager {
    async create(author, title, content, picture) {
        try {
            if (!author || !title || !content || !picture) {
                throw new Error('All fields are required')
            }

            const query = 'INSERT INTO posts (author, title, content, picture) VALUES ($1, $2, $3, $4)'
            const values = [author, title, content, picture];
            const result = await db.query(query, values);
            return result.rows[0]

        } catch (e) {
            console.log(`Error catching postCreator - ${e} |`)
            throw e;

        }
    }

    async getAll() {
        try {
            const query = await db.query('SELECT * FROM posts')
            return query.rows;
        } catch (e) {
            console.log(`Error fetching all posts - ${e} |`)
        }

    }

    async getOne(id) {
        try {
            const query = await db.query('SELECT * FROM posts WHERE id = $1', [id])
            return query.rows[0]
        } catch (e) {
            console.log(`Error: [${e}]`)
        }



    }

    // async update(req, res) {

    // }

    // async delete(req, res) {

    // }
}

module.exports = new postManager();