require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 7000;
const routerPosts = require('./routes/postRoutes');
const routerUsers = require('./routes/userRoutes')
const app = express();
app.use(express.json());

app.use('/api', routerPosts)
app.use('/api', routerUsers)



const start = async () => {
    try {
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT - ${PORT}`));
    } catch (error) {
        console.log(`Server stopped - ${error}`);
    }
};

start();
