const userManager = require('../manager/userManager');

class userRequest {
    async createUser(req, res) {
        const { username, email, password } = req.body;
        try {
            if (!username || !email || !password) {
                throw new Error('Все поля подлежит заполнению');
            }

            const user = await UserManager.create(username, email, password);
            res.json(user)
            console.log(user)
        } catch (e) {
            console.log(`Error userRequest catching createUser - [${e}] |`)
            throw e;

        }
    }

    async getAll(req, res) {
        try {
            const users = await userManager.getAll();
            res.json(users)
        } catch (e) {
            console.log('Error userRequest ', e, ' |')
        }
    }

    async getOneUser(req, res) {
        const userId = req.params.id;
        console.log(userId)
        try {
            const user = await userManager.getOneUser(userId);
            if (!user) {
                res.status(404).json({error: 'нет такого пользователя'})

            } else {
                res.json(user)
            }
        } catch (e) {
            console.log('Error userRequest ', e, ' |')
        }
    }
}

module.exports = new userRequest();