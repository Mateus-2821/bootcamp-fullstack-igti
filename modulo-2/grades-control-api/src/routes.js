import express from 'express'

import Controller from './controllers.js'

const routes = express.Router()

const controlller = new Controller()

routes.post('/', controlller.store)
routes.put('/:id', controlller.update)
routes.delete('/:id', controlller.destroy)
routes.get('/show/:id', controlller.show)
routes.get('/total', controlller.totalGrade)
routes.get('/average', controlller.average)
routes.get('/top', controlller.topThree)
routes.get('/', controlller.index)

export default routes