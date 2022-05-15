import useState from "./useState"

const useReducer = (reducer: any, initialState: any) => {

    const [ state, setState ] = useState(initialState)

    const dispatch = (action: object) => {
        if (Object.prototype.toString.call(action) !== '[object Object]') {
            throw new TypeError(`The parameter 'action' must be the type 'Object'`)
        }

        if (!action.hasOwnProperty('type')) {
            throw new ReferenceError(`The parameter 'action' need a property 'type'`)
        }

        reducer(state, action)
    }

    return [
        state, dispatch
    ]
}

export default useReducer
