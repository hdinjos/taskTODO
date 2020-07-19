const pool = require("./database");

//get all tasks
const listTasks = (req, res) => {
    pool.query("SELECT * FROM tasks", (err, results) => {
        if (err) throw err;
        res.status(200).json(results.rows);
    });
};

const showTasks = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("SELECT * FROM tasks WHERE id=$1", [id], (err, results) => {
        if (err) throw err;
        res.status(200).json(results.rows);
    });
};

const addTasks = (req, res) => {
    const { title } = req.body;
    pool.query("INSERT INTO tasks (title) VALUES ($1)", [title], (err, results) => {
        if (err) throw err;
        res.status(201).send(`task added`);
    });
};

const updateTasks = (req, res) => {
    const id = parseInt(req.params.id);
    const { title } = req.body;
    pool.query(
        "UPDATE tasks SET title = $1 WHERE id=$2", [title, id], (err, results) => {
            if (err) throw err;
            res.status(200).send(`task modified with id: ${id}`);
        }
    )
}

const delTasks = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("DELETE FROM tasks WHERE id = $1", [id], (err, results) => {
        if (err) throw err;
        res.status(200).send(`tasks deleted with id: ${id}`);
    });
};

module.exports = {
    listTasks,
    showTasks,
    addTasks,
    updateTasks,
    delTasks
};