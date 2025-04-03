import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import dbConnection from './config/database.js'
import categoryRoute from './routes/category.route.js'
dotenv.config({ path: 'config.env' })

// database connection
dbConnection();

const app = express()

// middleware
app.use(express.json())

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))    
}

// Mount Routes
app.use('api/v1/categories', categoryRoute)


const port = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Hello World! 1'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))