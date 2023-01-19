const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// CRUD method import
const {getTodos, createTodo, updateTodo, deleteTodo} = require('./controllers/todoController');

// App config
const app = express();

const PORT = process.env.PORT || 5000;

const connectionURL = process.env.MONGO_URL;

// Middlewares
//convert into json
app.use(express.json());
//connect client & backend url api_cors policy
app.use(cors());

// DB config
mongoose.connect(connectionURL)
.then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
})
.catch((error) => {
    console.log(error);
});

// API endpoints
//get todos list
app.get("/todos", getTodos);

//create a new todo
app.post("/todos", createTodo);

//update a todo
app.put("/todos/:id", updateTodo);

//delete a todo
app.delete("/todos/:id", deleteTodo);