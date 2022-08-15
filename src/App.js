import React, { useEffect, useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'

function App() {
    const store = useSelector(state => state)
    const dispatch = useDispatch()
    const [btns, setBtns] = useState([])

    useEffect(() => {
        fetch('./BtnData.json')
            .then(response => response.json())
            .then(res => {
                setBtns([...res])
            })
        dispatch({ type: 'clear' })
    }, [])

    const onClick = e => {
        dispatch({ type: e.target.className, payload: e.target.value })
    }

    return (
        <div className="App">
            <header className="App-header">
                <img
                    src="./icons8-math-64.png"
                    width={64}
                    height={64}
                    alt="calculator icon"
                />
                <p className="title">Calculator</p>
            </header>

            <div className="board">
                <div id="display">
                    <p>{store.disp}</p>
                </div>

                <div className="keypad">
                    {btns.map(btn => (
                        <button
                            key={btn.id}
                            id={btn.id}
                            onClick={onClick}
                            value={btn.value}
                            className={btn.type}
                            type="button"
                        >
                            {btn.value}
                        </button>
                    ))}
                </div>
            </div>

            <footer className="App-footer">
                <p>Icons from&nbsp;</p>
                <a href="https://icons8.com" className="icon-ref">
                    icons8
                </a>
            </footer>
        </div>
    )
}

export default App
