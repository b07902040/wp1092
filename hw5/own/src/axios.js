import axios from 'axios'

const instance = axios.create({ 
  baseURL: 'http://localhost:4000/api/guess' 
})

const startGame = async () => {
  const {
    data: { msg }
  } = await instance.post('/start')

  return msg
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try {
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })
    return msg
  } catch (error) {
    if ( error.response ) {
      return "server not connected"
    }
    else {
      return 'Error: "'+ number + '" is not a valid number (1 - 100)'
    }
  }
}

const restart = async () => {
  const {
    data: { msg }
  } = await instance.post('/restart')

  return msg
}

export { startGame, guess, restart }
