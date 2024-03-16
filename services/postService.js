const postManager = require("../manager/postManager");
const checkDbRecords = require('../checks/checkDB')
class postService {
    async createPost(req, res) {
        const { author, title, content, picture } = req.body;
        try {
            if (!author || !title || !content || !picture) {
                throw new Error('Заполните все author, title, content, picture')
            }

            const post = await postManager.create(author, title, content, picture);
            res.json(post)

        } catch (e) {
            console.log(e)

        }
    }

    async getAllPosts(req, res) {
        try {
            const posts = await postManager.getAll();
            res.json(posts)
        } catch (e) {
            console.log(e)
            res.status(500).json(`Ошибка при получении всех постов`)

        }
    }

    async getOnePost(req, res) {
        const postId = req.params.id;
        console.log(postId)
        try {
            const post = await postManager.getOne(postId);

            if (!post) {
                res.status(404).json({ error: 'пост не найден' })
            } else {
                res.json(post)
            }


        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'ошибка при получении поста' })

        }
    }

    async update(req, res) {
        const postId = req.params.id
        const { author, title, content, picture } = req.body;
        try {
            const updatePostRequest = await postManager.update(postId, author, title, content, picture);

            const check_db = await checkDbRecords.checkDatabaseRecord(postId, 'posts')
            if (!check_db) {
                res.status(404).json({ error: 'нет такого поста, нельзя обновить' })
            } else {

                res.status(200).json('Успешно обновлен')
                console.log(updatePostRequest)

            }

        } catch (e) {
            console.log(`Error: {| ошибка в ${e.stack}, ${e} |}`)

        }
    }

    async delete(req, res) {
        const postId = req.params.id
        try {

            const check_db = await checkDbRecords.checkDatabaseRecord(postId, 'posts')
            if (!check_db) {
                res.status(404).json({ error: 'нет такого поста, нельзя удалить' })
            } else {
                const deletePost = await postManager.delete(postId)
                res.status(200).json('Успешно удалён')
                console.log(deletePost)

            }
        } catch (e) {

            res.json(500).json({error: "Ошибка сервера"})

        }

    }

}

module.exports = new postService();