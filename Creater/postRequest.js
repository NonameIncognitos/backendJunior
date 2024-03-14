const postManager = require("../manager/postManager");

class postRequest {
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

}

module.exports = new postRequest();