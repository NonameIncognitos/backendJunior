const userManager = require('../manager/userManager');
const check_db = require('../checks/checkDB')
class userService {
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
            console.log(`Error userService catching createUser - [${e}] |`)
            throw e;

        }
    }

    async getAll(req, res) {
        try {
            const users = await userManager.getAll();
            res.json(users)
        } catch (e) {
            console.log('Error userService ', e, ' |')
        }
    }

    async getOneUser(req, res) {
        const userId = req.params.id;
        console.log(userId)
        try {
            const user = await userManager.getOneUser(userId);
            if (!user) {
                res.status(404).json({ error: 'нет такого пользователя' })

            } else {
                res.json(user)
            }
        } catch (e) {
            console.log('Error userService ', e, ' |')
        }
    }

    async update(req, res) {
        const userId = req.params.id;
        const { username, email, password } = req.body;
        try {
            const checkUser = await check_db.checkDatabaseRecord(userId, 'users')
            const userUpdateRequest = await userManager.update(userId, username, email, password)
            if (!checkUser) {
                res.status(404).json({ error: 'нет такого пользователя' });
            } else {
                res.status(200).json('Успешно обновлен')
            }
        } catch (e) {

            res.status(500).json({error: 'Не удалось обновить данные пользователя... Попробуйте позже'})

        }
    }

    async delete(req, res) {
        const userId = req.params.id
        try {
            const checkUser = await check_db.checkDatabaseRecord(userId, 'users')
            if (!checkUser) {
                res.status(404).json({error: 'нельзя удалить, пользователья нету'})
            } else {
                const deleteUser = await userManager.delete(userId)
                res.json('Пользователь удалён')
                console.log(deleteUser)
            }
            

        } catch (e) {
            res.status(500).json({error: "Ощибка сервера"})
        }
    }
}

module.exports = new userService();