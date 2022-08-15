import { configureStore } from '@reduxjs/toolkit'
import { Parser } from 'expr-eval'

const EQUALS = `equals`
const CLEAR = `clear`
const OPERATION = `operation`
const DECIMAL = `decimal`
const NUMBER = `number`

const initialState = {
    operands: [],
    operations: [],
    disp: 0,
    currentOperand: 0,
    expression: '',
}
const getExpression = (state = initialState) => {
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
    return newDisplay
}

const reducer = (state = initialState, action = { type: CLEAR }) => {
    let res = 0
    switch (action.type) {
        case CLEAR:
            return initialState
        case OPERATION:
            return {
                ...state,
                operations: [...state.operations, action.payload],
                operands: [...state.operands, parseFloat(state.currentOperand)],
                currentOperand: 0,
                disp: action.payload,
            }
        case DECIMAL:
            return {
                ...state,
                currentOperand:
                    parseFloat(
                        state.currentOperand === `.` ? 0 : state.currentOperand,
                    ) + action.payload,
            }
        case EQUALS:
            try {
                res = Parser.evaluate(getExpression(state))
            } catch (err) {
                res = `${err}: cannot evaluate this expression`
            }
            return {
                ...initialState,
                currentOperand: res,
                disp: res,
            }
        case NUMBER:
        default: {
            return {
                ...state,
                currentOperand:
                    (`${state.currentOperand}` === `0`
                        ? ``
                        : state.currentOperand) + action.payload,
                disp:
                    (`${state.currentOperand}` === `0`
                        ? ``
                        : state.currentOperand) + action.payload,
            }
        }
    }
}
/* eslint-disable no-underscore-dangle */
export default configureStore(
    { reducer, initialState },
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
)
/* eslint-enable */
