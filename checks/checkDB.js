const db = require('../db')
class checkDbRecords {

    async checkDatabaseRecord (id, table) {
        try {
            if (table == 'users') {
                const userRecord = await db.query('SELECT id FROM users WHERE id = $1', [id]);
                return userRecord.rows[0];
            } else if (table == 'posts') {
                const postRecord = await db.query('SELECT id FROM posts WHERE id = $1', [id]);
                return postRecord.rows;
            }
        } catch (error) {
            console.error(`Error : ${error.stack}`);
        }
    }
}
module.exports = new checkDbRecords();
