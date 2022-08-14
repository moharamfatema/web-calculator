import React, { useEffect, useState } from 'react'
import { Parser } from 'expr-eval'
import './App.css'

function App() {
    const initialState = {
        operands: [],
        operations: [],
        disp: 0,
        currentOperand: 0,
        result: false,
    }
    const [btns, setBtns] = useState([])
    const [state, setState] = useState(initialState)

    useEffect(() => {
        fetch('./BtnData.json')
            .then(response => response.json())
            .then(res => {
                setBtns([...res])
            })
    }, [])

    useEffect(() => {
        if (!state.result) {
            let newDisplay = ''
            for (
                let n = 0;
                n < state.operands.length + state.operations.length;
                n += 1
            ) {
                if (n % 2 === 0) newDisplay += state.operands[n / 2]
                else newDisplay += state.operations[(n - 1) / 2]
            }

            newDisplay += state.currentOperand
            setState(prev => ({ ...prev, disp: newDisplay }))
        }
    }, [state.currentOperand, state.operations, state.operands])

    const onClick = e => {
        let res = 0
        switch (e.target.className) {
            case 'clear':
                setState(initialState)
                break
            case 'operation':
                setState(prev => ({
                    ...prev,
                    operations: [...prev.operations, e.target.value],
                    operands: [
                        ...prev.operands,
                        parseFloat(prev.currentOperand),
                    ],
                    currentOperand: 0,
                    result: false,
                }))
                break
            case 'decimal':
                setState(prev => ({
                    ...prev,
                    result: false,
                    currentOperand:
                        parseFloat(
                            prev.currentOperand === '.'
                                ? 0
                                : prev.currentOperand,
                        ) + e.target.value,
                }))
                break
            case 'equals':
                try {
                    res = Parser.evaluate(state.disp)
                } catch (err) {
                    res = 0
                } finally {
                    setState({
                        ...initialState,
                        currentOperand: res,
                        result: true,
                        disp: res,
                    })
                }
                break
            default:
                setState(prev => ({
                    ...prev,
                    result: false,
                    currentOperand: prev.currentOperand + e.target.value,
                }))
        }
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
                    <p>{state.disp}</p>
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
