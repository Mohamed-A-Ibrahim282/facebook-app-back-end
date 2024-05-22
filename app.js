import express from 'express'
import { sequelize } from './dbconnection/dbconnection.js'
import usersRouter from './modules/users/users.routes.js'
import postsRouter from './modules/posts/posts.routes.js'
import commentsRouter from './modules/comments/comments.routes.js'
import cors from 'cors'

const app = express()
const port = process.env.port || 3000

sequelize.sync()

app.use(express.json())
app.use(cors())

app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)

app.get('/', (req, res) => res.send('Home page'))
app.listen(port, () => console.log(`server is running...`))