import {useState} from 'react'
import './App.css'
import {guess, startGame, restart} from './axios'

function App() {
    const [hasStarted, setHasStarted] = useState(false)
    const [hasWon, setHasWon] = useState(false)
    const [number, setNumber] = useState('')
    const [status, setStatus] = useState('')

    const startMenu = (
        <div>
            <button
                onClick={async () => {
                    const success = await startGame();
                    if (success) {
                        setHasStarted(true);
                    }
                    else {
                        alert("Server NOT responding");
                    }
                }}
            >
                start game
            </button>
        </div>
    )

    const winningMode = (
        <>
            <p>you won! the number was {number}.</p>
            <button
                onClick={async () => {
                    await restart()
                    setHasWon(false)
                    setStatus('')
                    setNumber('')
                }}
            >
                restart
            </button>
        </>
    )

    // TODO:
    // 1. use async/await to call guess(number) in Axios
    // 2. Process the response from server to set the proper state values
    const handleGuess = async () => {
        const res = await guess(number);
        if (res === "Equal"){
            setHasWon(true);
        }
        setStatus(res);
    }

    const gameMode = (
        <>
            <p>Guess a number between 1 to 100</p>
            <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <button
                onClick={handleGuess}
                disabled={!number}
            >
                guess!
            </button>
            <p>{status}</p>
        </>
    )

    const game = (
        <div>
            {hasWon ? winningMode : gameMode}
        </div>
    )

    return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
