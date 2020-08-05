import express from 'express'
import routes from './routes.js'

const app = express()

app.use(express.json())

app.use(routes)

app.listen(3000, () => {
  console.log('> servidor iniciado\n> acessar: http://localhost:3000')
})