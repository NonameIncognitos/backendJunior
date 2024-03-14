const db = require('../db')

class UserManager {
    async create(username, email, password) {
        try {
            if (!username || !email || !password) {
                throw new Error('Введите все поняла')
            }

            const query = 'INSERT INTO "users" (username, email, password) VALUES ($1, $2, $3)';
            const values = [username, email, password];
            const result = await db.query(query, values)
            return result.rows[0]

        } catch (e) {
            console.log(`Error catching userCreator - ${e} |`)
            throw e;

        }
    }

    async getAll() {
        try {
            const query = await db.query('SELECT * FROM users');
            return query.rows
        } catch (e) {
            console.log(`Error fetching userAll - [${e}] |`)
            throw e;
        }
        
    }

    async getOneUser(id) {
        try {
            const query = await db.query('SELECT * FROM users WHERE id = $1', [id])
            return query.rows[0];
        } catch (e) {
            console.log(`Error fetching userOne - [${e}]`)
            throw e;
        }
    }
}

module.exports = new UserManager();
