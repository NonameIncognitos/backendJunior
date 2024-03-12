const pool = require('./db');

const Post = {
    create: async (author, title, content, picture) => {
        try {
            // Проверка наличия всех значений
            if (!author || !title || !content || !picture) {
                throw new Error('All fields are required');
            }

            const query = 'INSERT INTO posts (author, title, content, picture) VALUES ($1, $2, $3, $4)';
            const values = [author, title, content, picture];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            // Вывод сообщения с подробностями о переданных значениях
            console.error(`Error creating post: ${error.message}. Author: ${author}, Title: ${title}, Content: ${content}, Picture: ${picture}`);
            throw error;
        }
    }
};

module.exports = Post;
