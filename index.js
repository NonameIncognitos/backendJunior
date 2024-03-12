require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 7000;
const Post = require('./Post');

const app = express();

app.use(express.json());

app.post('/api', async (req, res) => {
    const { author, title, content, picture } = req.body;
    if (!author || !title || !content || !picture) {
        return res.status(400).json({ error: 'All fields are required!!!' });
    }

    try {
        const post = await Post.create(author, title, content, picture);
        res.json(post); 
    } catch (e) {
        console.error(`Error creating post - ${e} - |`);
        res.status(500).json({ error: 'Internal server error' });
    }
});



const start = async () => {
    try {
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT - ${PORT}`));
    } catch (error) {
        console.log(`Server stopped - ${error}`);
    }
};

start();
