import { promises as fs } from 'fs'

class Main {
  constructor() {
    this.states = []
    this.cities = []
  }

  createLine() {
    console.log('=======================================================')
  }

  async read() {
    try {
      const readStates = JSON.parse(await fs.readFile('Estados.json'))
      const readCities = JSON.parse(await fs.readFile('Cidades.json'))

      this.states = [...readStates]
      this.cities = [...readCities]      

      this.createLine()
      console.log('> Estados.json e Cidades.json, lidos.')
    } catch (error) {
      console.log('Erro na função read!', error)
    }
  }

  async createStateFiles() {
    this.states.forEach(state => {
      const stateContent = []
  
      this.cities.filter(city => {
        if(city.Estado == state.ID) {
          stateContent.push(city.Nome)
          fs.writeFile('./estados/' + `${state.Sigla}.json`, JSON.stringify(stateContent))
        }  
      })
    })

    this.createLine()
    console.log('> Arquivos criados na pasta estados.')
  }

  async countCities(uf = 'ba') {
    const state = uf.toUpperCase()
  
    const cities = JSON.parse(await fs.readFile('./estados/' + `${state}.json`))
  
    this.createLine()
    console.log(`> ${state} tem ${cities.length} cidades.`)
  }

  async maxMinCities() {
    const totalCities = []

    this.states.forEach((state, index) => {
      const stateContent = []
  
      this.cities.filter(city => {
        if(city.Estado == state.ID) {
          stateContent.push(city.Nome)
          totalCities.splice(index, 1, `${state.Sigla}: ${stateContent.length}`)
        }  
      })
    })

    const topFive = totalCities.sort((a, b) => a.replace(/\D+/g, '') - b.replace(/\D+/g, '')).slice(-5).reverse()
    const bottomFive = totalCities.sort((a, b) => a.replace(/\D+/g, '') - b.replace(/\D+/g, '')).slice(0, 5).reverse()

    this.createLine()
    console.log('> Os cinco estados com mais cidades são:', topFive)
    this.createLine()
    console.log('> Os cinco estados com menos cidades são:', bottomFive)
  }

  async maxMinLetters() {
    const citiesOfState = []

    this.states.forEach((state, index) => {
      const stateContent = []
  
      this.cities.filter(city => {
        const letter = city.Nome.replace(/\s/g, '').length

        if(city.Estado == state.ID) 
          stateContent.push(`${city.Nome} - ${state.Sigla}: ${letter}`)
      })

      citiesOfState.splice(index, 1, stateContent)
    })

    this.createLine()
    console.log('> A cidade com mais letras de cada Estado é:')

    for(let pos in citiesOfState) 
      console.log(citiesOfState[pos].sort((a, b) => a.replace(/\D+/g, '') - b.replace(/\D+/g, ''))[citiesOfState[pos].length - 1])
    
    this.createLine()
    console.log('> A cidade com menos letras de cada Estado é:')

    for(let pos in citiesOfState) 
      console.log(citiesOfState[pos].sort((a, b) => a.replace(/\D+/g, '') - b.replace(/\D+/g, ''))[0])
  }

  async maxMinLettersAll() {
    const allCities = []

    this.cities.forEach(city => {
      const letter = city.Nome.replace(/\s/g, '').length
      allCities.push(`${city.Nome}: ${letter}`)
    })

    allCities.sort((a, b) => a.replace(/\D+/g, '') - b.replace(/\D+/g, ''))

    const maxLength = allCities[allCities.length - 1].replace(/\D+/g, '')
    const maxLengthCities = []

    const minLength = allCities[0].replace(/\D+/g, '')
    const minLengthCities = []

    allCities.forEach(city => {
      if(city.replace(/\D+/g, '') == maxLength)
        maxLengthCities.push(city)

      if(city.replace(/\D+/g, '') == minLength)
        minLengthCities.push(city)
    })

    this.createLine()
    console.log('> A cidade com mais letras entre todos os Estados é:')

    console.log(maxLengthCities.sort()[maxLengthCities.length - 1])

    this.createLine()
    console.log('> A cidade com menos letras entre todos os Estados é:')

    console.log(minLengthCities.sort()[0])
    
  }
}

const main = new Main()

main.read()
  .then(() => main.createStateFiles())
  .then(() => main.countCities('df'))
  .then(() => main.maxMinCities())
  .then(() => main.maxMinLetters())
  .then(() => main.maxMinLettersAll())
  .catch(error => console.log('Erro Encontrado!', error))