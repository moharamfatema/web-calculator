import React, { useEffect, useState } from 'react'
import { Parser } from 'expr-eval'
import './App.css'

function App() {
    const [btns, setBtns] = useState([])
    const [disp, setDisp] = useState(0)
    const [operands, setOperands] = useState([])
    const [operations, setOperations] = useState([])
    const [currentOperand, setCurrentOperand] = useState(0)

    useEffect(() => {
        fetch('./BtnData.json')
            .then(response => response.json())
            .then(res => {
                setBtns([...res])
            })
    }, [])

    useEffect(() => {
        console.debug(`current Operand = ${currentOperand}`)
        console.debug(`Operands Array = ${operands}`)
        console.debug(`Operations Array = ${operations}`)

        let newDisplay = ''
        for (let n = 0; n < operands.length + operations.length; n += 1) {
            if (n % 2 === 0) {
                // even
                newDisplay += operands[n / 2]
            } else {
                // odd
                newDisplay += operations[(n - 1) / 2]
            }
        }

        newDisplay += currentOperand
        console.log(Parser.evaluate(newDisplay))
        setDisp(newDisplay)
    }, [currentOperand, operations, operands])

    const onClick = e => {
        switch (e.target.className) {
            case 'clear':
                setOperands([])
                setOperations([])
                setCurrentOperand(0)
                console.debug('clear button is pressed')
                break
            case 'operation':
                setOperations([...operations, e.target.value])
                setOperands([...operands, parseFloat(currentOperand)])
                setCurrentOperand(0)
                break
            case 'decimal':
                setCurrentOperand(
                    parseFloat(currentOperand === '.' ? 0 : currentOperand) +
                        e.target.value,
                )
                break
            case 'equals':
                // TODO: implement doMath()
                break
            default:
                setCurrentOperand(currentOperand + e.target.value)
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
                    <p>{disp}</p>
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
