const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const ConnectDB = require('./src/db/connectDB')
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    optionSuccessStatus: 200
}

const Task = require('./src/model/TaskModel')
const User = require('./src/model/UsreModel')
//middleware
app.use(express.json());
app.use(cors(corsOptions));

ConnectDB()
    .then(() => {

        app.post('/tasks', async (req, res) => {
            try {
                const task = req.body;
                const createTask = new Task(task);
                const addTaskinDB = await createTask.save();
                res.send('succeed')
            } catch (err) {
                res.send(err)
            }
        })

        app.get('/tasks', async (req, res) => {
            const allTask = await Task.find();
            res.send(allTask)
        })
        app.get('/usertasks/:email', async (req, res) => {
            const email = req.params.email;
            const query = {email : email}
            const result = await Task.find(query);
            res.send(result)
        })
        app.delete('/deletetask/:id', async(req,res)=>{
           const id = req.params.id;
           const deleteTask = await Task.findByIdAndDelete(id);
           res.send({message:'succeed'})
        })

        app.get('/todotask', async (req, res) => {
            const query = { status: 'todo' }
            const result = await Task.find(query)
            res.send(result);
        })
        app.get('/finishedtask', async (req, res) => {
            const query = { status: 'finished' }
            const result = await Task.find(query)
            res.send(result);
        })

        app.patch('/taskupdate/:id', async (req, res) => {
          try{
            const taskId = req.params.id;
            console.log(taskId)  
            const updatedTask = await Task.findOneAndUpdate(
                {_id: taskId},
                {status: 'finished'},
                {upsert: true, new: true}
            )
            res.send({message:'succeed'})
          }
          catch(err){
            res.send(err)
          }
        })
        app.get('/users', async (req, res) => {
            const allUser = await User.find();
            res.send(allUser)
        })

        app.get('/', (req, res) => {
            res.send('Server is running')
        })
        app.listen(port, () => {
            console.log('server is running on', port)
        })
    })

