import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB  from './config/database.js'
import { router } from './routes/tasks.routes.js'
const app = express()
dotenv.config()

const PORT = process.env.PORT || 3402

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', router)
async function StartServer() {
    try {
        await ConnectDB.conectar();
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
    
}

StartServer()