import { promises as fs } from 'fs'

class Controller {
  async store(req, res) {
    const data = JSON.parse(await fs.readFile('grades.json'))

    const { student, subject, type, value } = req.body

    if(!student)
      return res.send('student is required')

    if(!subject)
      return res.send('subject is required')

    if(!type)
      return res.send('type is required')

    if(!value || !Number.isInteger(parseInt(value)))
      return res.send('value is required')

    const grade = {
      id: data.nextId++,
      student,
      subject,
      type,
      value: parseInt(value),
      timestamp: new Date().toLocaleDateString('pt-br', { dateStyle: 'short', timeStyle: 'short' })
    }

    data.grades.push(grade)

    await fs.writeFile('grades.json', JSON.stringify(data, null, 2))

    return res.send(grade)
  }  

  async update(req, res) {
    const data = JSON.parse(await fs.readFile('grades.json'))

    const { student, subject, type, value } = req.body

    const id = data.grades.find(grade => grade.id == req.params.id)

    if(!student)
      return res.send('student is required')

    if(!subject)
      return res.send('subject is required')

    if(!type)
      return res.send('type is required')

    if(!value || !Number.isInteger(parseInt(value)))
      return res.send('value is required')

    if(!id)
      return res.send('id does not exist')

    const grade = {
      id: parseInt(req.params.id),
      student,
      subject,
      type,
      value: parseInt(value),
      timestamp: new Date().toLocaleDateString('pt-br', { dateStyle: 'short', timeStyle: 'short' })
    }

    data.grades[req.params.id - 1] = grade

    await fs.writeFile('grades.json', JSON.stringify(data, null, 2))

    return res.send(data)
  }

  async destroy(req, res) {
    const data = JSON.parse(await fs.readFile('grades.json'))

    const id = data.grades.find(grade => grade.id == req.params.id)

    if(!id)
      return res.send('id does not exist')

    delete data.grades[req.params.id - 1]

    await fs.writeFile('grades.json', JSON.stringify(data, null, 2))

    return res.send(data)
  }

  async show(req, res) {
    const data = JSON.parse(await fs.readFile('grades.json'))

    const result = data.grades.find(grade => grade.id == req.params.id)

    return res.send(result)
  }

  async totalGrade(req, res) {
    const data = JSON.parse(await fs.readFile('grades.json'))

    const { student, subject } = req.body

    if(!student)
      return res.send('student is required')

    if(!subject)
      return res.send('subject is required')
      
    const result = data.grades.filter(grade => {
      return grade.student == student && grade.subject == subject
    })

    if(result.length === 0)
      return res.send('no results')

    const total = result.reduce((total, grade) => {return total += grade.value}, 0)

    return res.json('Total Grade: ' + total)
  }

  async average(req, res) {
    const data = JSON.parse(await fs.readFile('grades.json'))

    const { subject, type } = req.body

    if(!subject)
      return res.send('subject is required')
    
    if(!type)
      return res.send('type is required')
      
    const result = data.grades.filter(grade => {
      return grade.subject == subject && grade.type == type
    })

    if(result.length === 0)
      return res.send('no results')

    const total = result.reduce((total, grade) => {return total += grade.value}, 0)

    const media = total / result.length

    return res.json('Average: ' + media.toFixed(2))
  }

  async topThree(req, res) {
    const data = JSON.parse(await fs.readFile('grades.json'))

    const { subject, type } = req.body

    if(!subject)
      return res.send('subject is required')
    
    if(!type)
      return res.send('type is required')

    const result = data.grades.filter(grade => {
      return grade.subject == subject && grade.type == type
    })

    if(result.length === 0)
      return res.send('no results')

    result.sort((a, b) => b.value - a.value)

    return res.send(result.splice(0, 3))
  }

  async index(req, res) {
    const data = await fs.readFile('grades.json')

    return res.send(data)
  } 
}

export default Controller