const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { usersRouter, postsRouter } = require('./src/routes');
const createError = require('./src/utils/createError');

const app = express();
// middlewares
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// routes
app.use('/api/auth', usersRouter);
app.use('/api/posts', postsRouter);
// Api check
app.get('/', (req, res) => {
    res.send('Server is running...');
})
// Error catcher
app.use((err, _, res, __) => {
    const error = createError(err);
    console.log(error);
    return res.status(error.status).json(error); 
});

// ===================
const { PORT = 5000, DB_URL } = process.env;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((err) => console.log(`Error: ${err.message}`));
